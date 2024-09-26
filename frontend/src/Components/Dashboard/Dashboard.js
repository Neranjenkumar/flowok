import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import styled from 'styled-components';
import History from '../../History/History';
import {  rupee } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import './Dashboard.css';

function Dashboard() {
  const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();
  
  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getIncomes, getExpenses]);

  const minIncome = incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0;
  const maxIncome = incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0;
  const minExpense = expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0;
  const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0;

  
  return (
    <DashboardStyled className="min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Transactions</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <Chart />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Total Income</h2>
              <p className="text-2xl font-bold text-green-600">{rupee} {totalIncome()}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Total Expense</h2>
              <p className="text-2xl font-bold text-red-600">{rupee} {totalExpenses()}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Total Balance</h2>
              <p className="text-2xl font-bold text-blue-600">{rupee} {totalBalance()}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <History />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Income Range</h2>
            <div className="flex justify-between bg-gray-100 p-3 rounded">
              <span>{rupee}{minIncome}</span>
              <span>{rupee}{maxIncome}</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Expense Range</h2>
            <div className="flex justify-between bg-gray-100 p-3 rounded">
              <span>{rupee}{minExpense}</span>
              <span>{rupee}{maxExpense}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardStyled>
  );
}

  const DashboardStyled = styled.div`
  padding: 1rem;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;


export default Dashboard;

