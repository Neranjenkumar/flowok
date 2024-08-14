//import React, { useEffect } from 'react'
//import styled from 'styled-components'
//import { useGlobalContext } from '../../context/globalContext';
//import { InnerLayout } from '../../styles/Layouts';
//import Form from '../Form/Form';
//import IncomeItem from '../IncomeItem/IncomeItem';
//import ExpenseForm from './ExpenseForm';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const { addExpense, expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        getExpenses();
    }, []);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    return (
        <ExpenseStyled className={navOpen ? 'nav-open' : ''}>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expenses">Total Expenses: <span>${totalExpenses()}</span></h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                        {expenses.map((expense) => {
                            const { _id, title, amount, date, category, description, type } = expense;
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
                                    indicatorColor="var(--color-red)"
                                    deleteItem={deleteExpense}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    transition: margin-left 0.3s ease;

    &.nav-open {
        margin-left: 250px;
    }

    .total-expenses {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-red);
        }
    }
    
    .expense-content {
        display: flex;
        gap: 2rem;
        .expenses {
            flex: 1;
        }
    }

    @media (max-width: 768px) {
        .expense-content {
            flex-direction: column;
        }

        .total-expenses {
            font-size: 1.5rem;
            span {
                font-size: 2rem;
            }
        }
    }

    @media (max-width: 480px) {
        .total-expenses {
            font-size: 1.2rem;
            padding: 0.8rem;
            span {
                font-size: 1.8rem;
            }
        }
    }
`;

export default Expenses;
