import React, { useState } from 'react';
import axios from 'axios';
import { dollar } from '../../utils/Icons'; // Ensure this path is correct
import Chart from '../Chart/Chart'; // Adjust this import according to your project structure
import History from '../../History/History';

function AdminDashboard({ token }) {
  const [email, setEmail] = useState(''); // Email input from the admin
  const [userData, setUserData] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  // Fetch User Data based on email input
  const fetchUserData = async () => {
    try {
      const encodedEmail = encodeURIComponent(email); // Encode email to handle special characters properly
      console.log('Fetching data for email:', email); // Debugging email being sent

      // Fetch user details by email
      const userResponse = await axios.get(`http://localhost:5000/api/v1/auth/email/${encodedEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setUserData(userResponse.data); // Set the user data

      // Fetch incomes for the specific user
      const incomeResponse = await axios.get(`http://localhost:5000/api/v1/income/get-incomes?email=${encodedEmail}`, {
        headers: { Authorization: `Bearer ${token}` }, // Admin token for authorization
      });

      console.log('Income API Response:', incomeResponse.data); // Debug the response
      setIncomes(incomeResponse.data); // Set incomes data

      // Fetch expenses for the specific user
      const expenseResponse = await axios.get(`http://localhost:5000/api/v1/expense/get-expenses?email=${encodedEmail}`, {
        headers: { Authorization: `Bearer ${token}` }, // Admin token for authorization
      });

      console.log('Expense API Response:', expenseResponse.data); // Debug the response
      setExpenses(expenseResponse.data); // Set expenses data

      setError(''); // Clear previous errors if any
    } catch (err) {
      console.error('Error fetching data:', err.response || err);
      setError('Error fetching user data or financial information.');
      setUserData(null);
      setIncomes([]);
      setExpenses([]);
    }
  };
  // Check for any issues with the response data
  console.log('Incomes Array:', incomes);
  

  // Calculate totals for income, expenses, and balance
  const totalIncome = () => {
    const total = incomes.reduce((acc, income) => acc + (income.amount || 0), 0);
  
    return total;
  };

  const totalExpenses = () => {
    const total = expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0);
 
    return total;
  };

  const totalBalance = () => {
    const balance = totalIncome() - totalExpenses();

    return balance;
  };

  // Calculate min and max values for income and expenses
  const minIncome = incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0;
  const maxIncome = incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0;
  const minExpense = expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0;
  const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0;

  // console.log('Min Income:', minIncome, 'Max Income:', maxIncome); // Debugging logs
  // console.log('Min Expense:', minExpense, 'Max Expense:', maxExpense);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={fetchUserData}>Search User</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userData && (
        <div>
          <h2>User Data</h2>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>First Name:</strong> {userData.fname}</p>
          <p><strong>Last Name:</strong> {userData.lname}</p>
        </div>
      )}

      <div className="stats-con">
        <div className="chart-con">
          <Chart />
          <div className="amount-con">
            <div className="income">
              <h2>Total Income</h2>
              <p>{dollar} {totalIncome()}</p>
            </div>
            <div className="expense">
              <h2>Total Expense</h2>
              <p>{dollar} {totalExpenses()}</p>
            </div>
            <div className="balance">
              <h2>Total Balance</h2>
              <p>{dollar} {totalBalance()}</p>
            </div>
          </div>
        </div>

        <div className="history-con">
          <History />
          <h2 className="salary-title">Min <span>Income</span> Max</h2>
          <div className="salary-item">
            <p>${minIncome}</p>
            <p>${maxIncome}</p>
          </div>
          <h2 className="salary-title">Min <span>Expense</span> Max</h2>
          <div className="salary-item">
            <p>${minExpense}</p>
            <p>${maxExpense}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;