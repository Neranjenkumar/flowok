// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useGlobalContext } from '../../context/globalContext';
// import { InnerLayout } from '../../styles/Layouts';
// import IncomeItem from '../IncomeItem/IncomeItem';
// import ExpenseForm from './ExpenseForm';
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
        const token = localStorage.getItem('token');
        if (token) {
            getExpenses(token); // Pass the token to fetch user-specific data
        }
    }, [getExpenses]);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    return (
        <ExpenseStyled className={navOpen ? 'nav-open' : ''}>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">Total Expense: <span>${totalExpenses()}</span></h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm addExpense={addExpense} />
                    </div>
                    <div className="expenses">
                        {expenses.length > 0 ? (
                            expenses.map((expense) => {
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
                            })
                        ) : (
                            <p>No expenses to display.</p>
                        )}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    transition: margin-left 0.3s ease;

    &.nav-open {
        margin-left: 250px;
    }

    .total-expense {
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
        flex-direction: column;
        gap: 2rem;
        .expenses {
            flex: 1;
        }
    }

    @media (max-width: 768px) {
        .expense-content {
            flex-direction: column;
        }

        .total-expense {
            font-size: 1.5rem;
            span {
                font-size: 2rem;
            }
        }
    }

    @media (max-width: 480px) {
        .total-expense {
            font-size: 1.2rem;
            padding: 0.8rem;
            span {
                font-size: 1.8rem;
            }
        }
    }
`;

export default Expenses;
