import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        file: null,
    });

    const { title, amount, date, category, description, file } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleFileChange = e => {
        setInputState({ ...inputState, file: e.target.files[0] });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('amount', amount);
        formData.append('date', date ? date.toISOString() : '');
        formData.append('category', category);
        formData.append('description', description);
        if (file) formData.append('file', file);

        addExpense(formData);

        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
            file: null,
        });
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
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
                    type="text" 
                    value={amount}
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
                        setInputState({...inputState, date: date})
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
            <div className="submit-btn">
                <Button 
                    name={'Add Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'blue'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.8rem 1rem;
    border-radius: 5px;
    border: 2px solid #dcdcdc;
    background: white;
    resize: none;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
    color: #333;
    width: 100%;

    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }

    &:focus {
      border-color: #007bff;
      box-shadow: 0px 0px 6px rgba(0, 123, 255, 0.3);
    }
  }

  .input-control {
    width: 100%;
  }

  .selects select {
    color: rgba(34, 34, 96, 0.8);
    &:focus, &:active {
      color: rgba(34, 34, 96, 1);
    }
  }

  .submit-btn {
    display: flex;
    justify-content: center;
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }

  .error {
    color: red;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 1rem;
    
    input, textarea, select {
      padding: 0.7rem 1rem;
    }

    .submit-btn button {
      padding: 0.7rem 1.2rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    gap: 0.75rem;

    input, textarea, select {
      padding: 0.6rem 0.8rem;
    }

    .submit-btn button {
      padding: 0.6rem 1rem;
    }
  }
`;

export default ExpenseForm;
