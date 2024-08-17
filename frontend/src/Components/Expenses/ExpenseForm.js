import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem; /* Adjust gap to better fit within the container */
    padding: 1rem; /* Add padding to give some space inside the form */
    background-color: #fff; /* Ensure the background is white */

    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 2px solid #e0e0e0; /* Lighter border */
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05); /* Reduce shadow intensity */
        color: rgba(34, 34, 96, 0.9);
        width: 100%; /* Make inputs take full width */

        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }

    .input-control {
        width: 100%;
    }

    .selects {
        display: flex;
        justify-content: flex-start; /* Align select box to the left */
        width: 100%;

        select {
            width: 100%; /* Ensure select takes full width */
            color: rgba(34, 34, 96, 0.6); /* Make text color a bit darker */
            &:focus, &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn {
        display: flex;
        justify-content: center; /* Center the submit button */
        width: 100%;

        button {
            box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
            padding: 0.8rem 1.6rem;
            border-radius: 30px;
            background-color: var(--color-accent);
            color: #fff;
            width: 100%; /* Button takes full width on smaller screens */
            max-width: 200px; /* Button has a maximum width */
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }

    @media (max-width: 768px) {
        /* For smaller screens, ensure everything is centered and full width */
        .input-control, .selects, .submit-btn {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        input, textarea, select, button {
            width: 100%;
        }
    }
`;


function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });
    const [file, setFile] = useState(null);

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleFileChange = e => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('amount', amount);
        formData.append('date', date);
        formData.append('category', category);
        formData.append('description', description);
        if (file) {
            formData.append('file', file);
        }
        await addExpense(formData);

        // Reset all inputs except the file input
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });

        // Optionally, you can keep the file input if needed for the next expense entry.
        // Uncomment the line below if you want to clear the file input too.
         setFile(null);
         document.querySelector('input[type="file"]').value = null;

    };

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                    value={amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date });
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder='Add A Reference' 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="input-control">
                <input type="file" onChange={handleFileChange} />
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Add Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    );
}

export default ExpenseForm;
