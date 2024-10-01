// // import React, { useEffect, useState } from 'react';
// // import styled from 'styled-components';
// // import { useGlobalContext } from '../../context/globalContext';
// // import { InnerLayout } from '../../styles/Layouts';
// // import IncomeItem from '../IncomeItem/IncomeItem';
// // import ExpenseForm from './ExpenseForm';
// // import React, { useEffect, useState } from 'react';
// // import styled from 'styled-components';
// // import { useGlobalContext } from '../../context/globalContext';
// // import { InnerLayout } from '../../styles/Layouts';
// // import IncomeItem from '../IncomeItem/IncomeItem';
// // import ExpenseForm from './ExpenseForm';

// // function Expenses() {
// //     const { addExpense, expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();
// //     const [navOpen, setNavOpen] = useState(false);

// //     useEffect(() => {
// //         const token = localStorage.getItem('token');
// //         if (token) {
// //             console.log('Token found:', token);
// //             getExpenses(token); // Pass the token to fetch user-specific data
// //         } else {
// //             console.error('No token found');
// //         }
// //     }, [getExpenses]);

// //     const toggleNav = () => {
// //         setNavOpen(!navOpen);
// //     };

// //     return (
// //         <ExpenseStyled className={navOpen ? 'nav-open' : ''}>
// //             <InnerLayout>
// //                 <h1>Expenses</h1>
// //                 <h2 className="total-expense">Total Expense: <span>${totalExpenses()}</span></h2>
// //                 <div className="expense-content">
// //                     <div className="form-container">
// //                         <ExpenseForm addExpense={addExpense} />
// //                     </div>
// //                     <div className="expenses">
// //                         {expenses.length > 0 ? (
// //                             expenses.map((expense) => {
// //                                 const { _id, title, amount, date, category, description, type } = expense;
// //                                 return (
// //                                     <IncomeItem
// //                                         key={_id}
// //                                         id={_id}
// //                                         title={title}
// //                                         description={description}
// //                                         amount={amount}
// //                                         date={date}
// //                                         type={type}
// //                                         category={category}
// //                                         indicatorColor="var(--color-red)"
// //                                         deleteItem={deleteExpense}
// //                                     />
// //                                 );
// //                             })
// //                         ) : (
// //                             <p>No expenses to display.</p>
// //                         )}
// //                     </div>
// //                 </div>
// //             </InnerLayout>
// //         </ExpenseStyled>
// //     );
// // }

// // const ExpenseStyled = styled.div`
// //     display: flex;
// //     flex-direction: column;
// //     overflow: auto;
// //     transition: margin-left 0.3s ease;

// //     &.nav-open {
// //         margin-left: 250px;
// //     }

// //     .total-expense {
// //         display: flex;
// //         justify-content: center;
// //         align-items: center;
// //         background: #FCF6F9;
// //         border: 2px solid #FFFFFF;
// //         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
// //         border-radius: 20px;
// //         padding: 1rem;
// //         margin: 1rem 0;
// //         font-size: 2rem;
// //         gap: .5rem;
// //         span {
// //             font-size: 2.5rem;
// //             font-weight: 800;
// //             color: var(--color-red);
// //         }
// //     }
    
// //     .expense-content {
// //         display: flex;
// //         flex-direction: column;
// //         gap: 2rem;
// //         .expenses {
// //             flex: 1;
// //         }
// //     }

// //     @media (max-width: 768px) {
// //         .expense-content {
// //             flex-direction: column;
// //         }

// //         .total-expense {
// //             font-size: 1.5rem;
// //             span {
// //                 font-size: 2rem;
// //             }
// //         }
// //     }

// //     @media (max-width: 480px) {
// //         .total-expense {
// //             font-size: 1.2rem;
// //             padding: 0.8rem;
// //             span {
// //                 font-size: 1.8rem;
// //             }
// //         }
// //     }
// // `;

// // export default Expenses;
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useGlobalContext } from '../../context/globalContext';
// import { InnerLayout } from '../../styles/Layouts';
// import IncomeItem from '../IncomeItem/IncomeItem';
// import ExpenseForm from './ExpenseForm';

// function Expenses() {
//     const { addExpense, expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();
//     const [navOpen, setNavOpen] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             console.log('Token found:', token);
//             getExpenses(token); // Pass the token to fetch user-specific data
//         } else {
//             console.error('No token found');
//         }
//     }, [getExpenses]); // Ensure this effect runs when `getExpenses` changes

//     const toggleNav = () => {
//         setNavOpen(!navOpen);
//     };

//     return (
//         <ExpenseStyled className={navOpen ? 'nav-open' : ''}>
//             <InnerLayout>
//                 <h1>Expenses</h1>
//                 <h2 className="total-expense">Total Expense: <span>${totalExpenses()}</span></h2>
//                 <div className="expense-content">
//                     <div className="form-container flex justify-center">
//                         <ExpenseForm addExpense={addExpense} />
//                     </div>
//                     <div className="expenses">
//                         {expenses.length > 0 ? (
//                             expenses.map((expense) => {
//                                 const { _id, title, amount, date, category, description, type } = expense;
//                                 return (
//                                     <IncomeItem
//                                         key={_id}
//                                         id={_id}
//                                         title={title}
//                                         description={description}
//                                         amount={amount}
//                                         date={date}
//                                         type={type}
//                                         category={category}
//                                         indicatorColor="var(--color-red)"
//                                         deleteItem={deleteExpense}
//                                     />
//                                 );
//                             })
//                         ) : (
//                             <p>No expenses to display.</p>
//                         )}
//                     </div>
//                     </div>
//             </InnerLayout>
//         </ExpenseStyled>
//     );

// }

// const ExpenseStyled = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
//   padding: 1rem;
//   box-sizing: border-box;

//   &.nav-open {
//     margin-left: 250px;
//   }

//   .total-expense {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: #ffe4e6;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     border-radius: 20px;
//     padding: 1rem;
//     margin: 1rem 0;
//     font-size: 2rem;
//     gap: .5rem;
//     span {
//       font-size: 2.5rem;
//       font-weight: 800;
//       color: var(--color-red);
//     }
//   }

//   .expense-content {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 2rem;
//     flex-grow: 1;
//   }

//   .form-container {
//     width: 100%;
//     max-width: 600px;
//   }

//   .expenses {
//     width: 100%;
//     max-width: 600px;
//   }

//   @media (max-width: 768px) {
//     padding: 0.5rem;
//     .total-expense {
//       font-size: 1.5rem;
//       span {
//         font-size: 2rem;
//       }
//     }
//   }

//   @media (max-width: 480px) {
//     .total-expense {
//       font-size: 1.2rem;
//       padding: 0.8rem;
//       span {
//         font-size: 1.8rem;
//       }
//     }
//   }
// `;

// export default Expenses;
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
            console.log('Token found:', token);
            getExpenses(token); // Pass the token to fetch user-specific data
        } else {
            console.error('No token found');
        }
    }, [getExpenses]); // Ensure this effect runs when `getExpenses` changes

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

  .total-expense {
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

  .expense-content {
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

  .expenses {
    width: 100%;
    max-width: 600px;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;

    h1 {
      font-size: 1.5rem;
    }

    .total-expense {
      font-size: 1.3rem;
      span {
        font-size: 1.8rem;
      }
    }

    .expense-content {
      gap: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;

    h1 {
      font-size: 1.5rem;
    }

    .total-expense {
      padding: 0.75rem;
      font-size: 1.2rem;

      span {
        font-size: 1.5rem;
      }
    }

    .expense-content {
      gap: 1rem;
    }
  }
`;

export default Expenses;
