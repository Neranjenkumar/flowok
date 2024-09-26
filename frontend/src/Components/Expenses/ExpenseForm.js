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
        
        // Create FormData to send the expense data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('amount', amount);
        formData.append('date', date ? date.toISOString() : '');  // Convert date to ISO string
        formData.append('category', category);
        formData.append('description', description);
        if (file) formData.append('file', file);  // Append file if selected

        // Call addExpense function with FormData
        addExpense(formData);

        // Reset form state after submission
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
          <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
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
      </FormStyled>
    )
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  box-sizing: border-box;

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: .5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgb(88, 0, 0);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }

  .input-control {
    width: 100%;
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus, &:active {
        color: rgba(34, 34, 96, 1);
      }
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

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 1rem;
    .submit-btn button {
      padding: 0.8rem 1rem;
    }
  }

  @media (max-width: 480px) {
    .submit-btn button {
      padding: 0.6rem 0.8rem;
    }
  }
`;

export default ExpenseForm;