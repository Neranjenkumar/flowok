// import React, { useEffect, useCallback } from 'react';
// import { useGlobalContext } from '../../context/globalContext';
// import History from '../../History/History';
// import { InnerLayout } from '../../styles/Layouts';
// import { dollar } from '../../utils/Icons';
// import Chart from '../Chart/Chart';
// import './Dashboard.css';

// function Dashboard() {
//     const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();
    
//     useEffect(() => {
//         getIncomes(); // Ensure incomes are fetched when component loads
//         getExpenses(); // Ensure expenses are fetched when component loads
//     }, [getIncomes, getExpenses]); // Use dependency array to avoid multiple calls

//     const minIncome = incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0;
//     const maxIncome = incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0;
//     const minExpense = expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0;
//     const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0;

//     return (
//         <div className="dashboard">
//             <InnerLayout>
//                 <h1>All Transactions</h1>
//                 <div className="stats-con">
//                     <div className="chart-con">
//                         <Chart />
//                         <div className="amount-con">
//                             <div className="income">
//                                 <h2>Total Income</h2>
//                                 <p>
//                                     {dollar} {totalIncome()}
//                                 </p>
//                             </div>
//                             <div className="expense">
//                                 <h2>Total Expense</h2>
//                                 <p>
//                                     {dollar} {totalExpenses()}
//                                 </p>
//                             </div>
//                             <div className="balance">
//                                 <h2>Total Balance</h2>
//                                 <p>
//                                     {dollar} {totalBalance()}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="history-con">
//                         <History />
//                         <h2 className="salary-title">Min <span>Salary</span>Max</h2>
//                         <div className="salary-item">
//                             <p>${minIncome}</p>
//                             <p>${maxIncome}</p>
//                         </div>
//                         <h2 className="salary-title">Min <span>Expense</span>Max</h2>
//                         <div className="salary-item">
//                             <p>${minExpense}</p>
//                             <p>${maxExpense}</p>
//                         </div>
//                     </div>
//                 </div>
//             </InnerLayout>
//         </div>
//     );
// }

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import './Dashboard.css';

function Dashboard({ dataFetched }) {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();
    const [loading, setLoading] = useState(true);  // Introduce loading state

    useEffect(() => {
        const fetchData = async () => {
            if (dataFetched) {
                await getIncomes();  // Fetch incomes
                await getExpenses(); // Fetch expenses
            }
            setLoading(false);  // Set loading to false after data is fetched
        };
        fetchData();
    }, [dataFetched, getIncomes, getExpenses]);

    if (loading) {
        return <div>Loading...</div>;  // Show loading state
    }

    const minIncome = incomes && incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0;
    const maxIncome = incomes && incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0;
    const minExpense = expenses && expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0;
    const maxExpense = expenses && expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0;

    return (
        <div className="dashboard">
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>${minIncome}</p>
                            <p>${maxIncome}</p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>${minExpense}</p>
                            <p>${maxExpense}</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </div>
    );
}

export default Dashboard;

