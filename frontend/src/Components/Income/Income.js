import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Fetching incomes with token:', token); // Log token to verify
            getIncomes(token); // Pass the token to fetch user-specific data
        } else {
            console.error('No token found in localStorage');
        }
    }, [getIncomes]);

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
                        <Form addIncome={addIncome} />
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
    overflow: auto;
    transition: margin-left 0.3s ease;

    &.nav-open {
        margin-left: 250px;
    }

    .total-income {
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
            color: var(--color-green);
        }
    }
    
    .income-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        .incomes {
            flex: 1;
        }
    }

    @media (max-width: 768px) {
        .income-content {
            flex-direction: column;
        }

        .total-income {
            font-size: 1.5rem;
            span {
                font-size: 2rem;
            }
        }
    }

    @media (max-width: 480px) {
        .total-income {
            font-size: 1.2rem;
            padding: 0.8rem;
            span {
                font-size: 1.8rem;
            }
        }
    }
`;

export default Income;
