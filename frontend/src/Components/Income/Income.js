// Income.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import IncomeItem from '../IncomeItem/IncomeItem';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Income() {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome, error, setError, token } = useGlobalContext();
    const [navOpen, setNavOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(),
        category: '',
        description: '',
        type: ''
    });

    useEffect(() => {
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserId(decodedToken.id);
        }
    }, [token]);

    useEffect(() => {
        getIncomes();
    }, []);

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleDateChange = (date) => {
        setInputState({ ...inputState, date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, amount, date, category, description, type } = inputState;
        const incomeType = type || 'income';

        if (!title || !amount || !date || !category || !description || !incomeType) {
            setError('All fields are required');
            return;
        }

        const formattedDate = new Date(date);
        const income = {
            title,
            amount: parseFloat(amount),
            date: formattedDate,
            category,
            description,
            userId,
            type: incomeType
        };

        try {
            const data = await addIncome(income);
            console.log('Income added successfully:', data);
            // Clear form after successful submission
            setInputState({
                title: '',
                amount: '',
                date: new Date(),
                category: '',
                description: '',
                type: ''
            });
        } catch (error) {
            console.error('Error adding income:', error.message);
        }
    };

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    return (
        <IncomeStyled className={navOpen ? 'nav-open' : ''}>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        {error && <p className='error'>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="input-control">
                                <input
                                    type="text"
                                    value={inputState.title}
                                    name='title'
                                    placeholder="Salary Title"
                                    onChange={handleInput('title')}
                                />
                            </div>
                            <div className="input-control">
                                <input
                                    value={inputState.amount}
                                    type="number"
                                    name='amount'
                                    placeholder='Salary Amount'
                                    onChange={handleInput('amount')}
                                />
                            </div>
                            <div className="input-control">
                                <DatePicker
                                    id='date'
                                    placeholderText='Enter A Date'
                                    selected={inputState.date}
                                    dateFormat="yyyy/MM/dd"
                                    onChange={handleDateChange}
                                    className="date-picker"
                                />
                            </div>
                            <div className="selects input-control">
                                <select
                                    required
                                    value={inputState.category}
                                    name="category"
                                    id="category"
                                    onChange={handleInput('category')}
                                >
                                    <option value="" disabled>Select Option</option>
                                    <option value="salary">Salary</option>
                                    <option value="freelancing">Freelancing</option>
                                    <option value="investments">Investments</option>
                                    <option value="stocks">Stocks</option>
                                    <option value="bitcoin">Bitcoin</option>
                                    <option value="bank">Bank Transfer</option>
                                    <option value="youtube">YouTube</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="input-control">
                                <textarea
                                    name="description"
                                    value={inputState.description}
                                    placeholder='Add A Reference'
                                    id="description"
                                    cols="30"
                                    rows="4"
                                    onChange={handleInput('description')}
                                ></textarea>
                            </div>
                            <div className="submit-btn">
                                <Button
                                    name={'Add Income'}
                                    icon={plus}
                                    bPad={'.8rem 1.6rem'}
                                    bRad={'30px'}
                                    bg={'blue'}
                                    color={'white'}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="incomes">
                        {incomes.length > 0 ? (
                            incomes.map((income) => {
                                const { _id, title, amount, date, category, description, type } = income;
                                return (
                                    <IncomeItem
                                        key={_id}
                                        id={_id}
                                        title={title}
                                        description={description}
                                        amount={amount}
                                        date={date}
                                        type={type}
                                        category={category}
                                        indicatorColor="var(--color-green)"
                                        deleteItem={deleteIncome}
                                    />
                                );
                            })
                        ) : (
                            <p>No incomes to display.</p>
                        )}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 1rem;
  transition: margin-left 0.3s ease;
  box-sizing: border-box;

  &.nav-open {
    margin-left: 250px;
  }

  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffe4e6;
    border-radius: 8px;
    padding: 1rem;
    font-size: 1.5rem;
    color: #1f2937;
    font-weight: bold;
    width: 100%;
    max-width: 600px;
    margin: 0 auto 1rem auto;

    span {
      font-size: 2rem;
      color: #000;
      font-weight: 800;
    }

    @media (max-width: 768px) {
      font-size: 1.3rem;
      span {
        font-size: 1.8rem;
      }
    }

    @media (max-width: 480px) {
      padding: 0.75rem;
      font-size: 1.2rem;

      span {
        font-size: 1.5rem;
      }
    }
  }

  .income-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
  }

  .form-container {
    width: 100%;
    max-width: 600px;
  }

  .input-control {
    width: 100%;
    margin-bottom: 1rem;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #ddd;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: #333;
    font-size: 1rem;
  }

  .date-picker {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #ddd;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: #333;
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  .submit-btn {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
  }

  .incomes {
    width: 100%;
    max-width: 600px;
  }

  .error {
    color: red;
    text-align: center;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;

    h1 {
      font-size: 1.5rem;
    }

    .total-income {
      font-size: 1.3rem;
      span {
        font-size: 1.8rem;
      }
    }

    .income-content {
      gap: 1.2rem;
    }

    .input-control {
      margin-bottom: 0.8rem;
    }

    input, textarea, select, .date-picker {
      padding: 0.6rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;

    h1 {
      font-size: 1.5rem;
    }

    .total-income {
      padding: 0.75rem;
      font-size: 1.2rem;

      span {
        font-size: 1.5rem;
      }
    }

    .income-content {
      gap: 1rem;
    }

    .input-control {
      margin-bottom: 0.75rem;
    }

    input, textarea, select, .date-picker {
      padding: 0.5rem;
      font-size: 0.85rem;
    }

    .submit-btn {
      margin-top: 0.75rem;
    }
  }
`;

export default Income;
