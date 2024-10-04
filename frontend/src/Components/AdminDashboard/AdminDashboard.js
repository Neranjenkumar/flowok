// import React, { useState } from 'react';
// import axios from 'axios';
// import { dollar } from '../../utils/Icons'; // Ensure this path is correct
// import Chart from '../Chart/Chart'; // Adjust this import according to your project structure
// import History from '../../History/History';
// import './AdminDashboard.css'; // Import the CSS file

// function AdminDashboard({ token }) {
//   const [email, setEmail] = useState(''); // Email input from the admin
//   const [userData, setUserData] = useState(null);
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState('');

//   // Fetch User Data based on email input
//   const fetchUserData = async () => {
//     try {
//       const encodedEmail = encodeURIComponent(email); // Encode email to handle special characters properly
//       console.log('Fetching data for email:', email); // Debugging email being sent

//       // Fetch user details by email
//       const userResponse = await axios.get(`http://localhost:5000/api/v1/auth/email/${encodedEmail}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       setUserData(userResponse.data); // Set the user data

//       // Fetch incomes for the specific user
//       const incomeResponse = await axios.get(`http://localhost:5000/api/v1/income/get-incomes?email=${encodedEmail}`, {
//         headers: { Authorization: `Bearer ${token}` }, // Admin token for authorization
//       });

//       console.log('Income API Response:', incomeResponse.data); // Debug the response
//       setIncomes(incomeResponse.data.map(income => ({ ...income, type: 'income' }))); // Set incomes data with type

//       // Fetch expenses for the specific user
//       const expenseResponse = await axios.get(`http://localhost:5000/api/v1/expense/get-expenses?email=${encodedEmail}`, {
//         headers: { Authorization: `Bearer ${token}` }, // Admin token for authorization
//       });

//       console.log('Expense API Response:', expenseResponse.data); // Debug the response
//       setExpenses(expenseResponse.data.map(expense => ({ ...expense, type: 'expense' }))); // Set expenses data with type

//       setError(''); // Clear previous errors if any
//     } catch (err) {
//       console.error('Error fetching data:', err.response || err);
//       setError('Error fetching user data or financial information.');
//       setUserData(null);
//       setIncomes([]);
//       setExpenses([]);
//     }
//   };

//   // Calculate totals for income, expenses, and balance
//   const totalIncome = () => {
//     const total = incomes.reduce((acc, income) => acc + (income.amount || 0), 0);
//     return total;
//   };

//   const totalExpenses = () => {
//     const total = expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0);
//     return total;
//   };

//   const totalBalance = () => {
//     const balance = totalIncome() - totalExpenses();
//     return balance;
//   };

//   // Calculate min and max values for income and expenses
//   const minIncome = incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0;
//   const maxIncome = incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0;
//   const minExpense = expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0;
//   const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0;

//   // Combine and sort incomes and expenses by date
//   const combinedData = [...incomes, ...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));

//   // Print or download the report
//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDownload = () => {
//     const csvContent = "data:text/csv;charset=utf-8,"
//       + combinedData.map(e => `${e.title},${e.category},${e.type === 'income' ? e.amount : ''},${e.type === 'expense' ? e.amount : ''},${e.date}`).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "report.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>
//       <input
//         type="email"
//         placeholder="Enter user email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={fetchUserData}>Search User</button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {userData && (
//         <div>
//           <h2>User Data</h2>
//           <p><strong>Email:</strong> {userData.email}</p>
//           <p><strong>First Name:</strong> {userData.fname}</p>
//           <p><strong>Last Name:</strong> {userData.lname}</p>
//         </div>
//       )}

//       <div className="stats-con">
//         <div className="chart-con">
//           <Chart incomes={incomes} expenses={expenses} /> {/* Pass incomes and expenses data to Chart */}
//           <div className="amount-con">
//             <div className="income">
//               <h2>Total Income</h2>
//               <p>{dollar} {totalIncome()}</p>
//             </div>
//             <div className="expense">
//               <h2>Total Expense</h2>
//               <p>{dollar} {totalExpenses()}</p>
//             </div>
//             <div className="balance">
//               <h2>Total Balance</h2>
//               <p>{dollar} {totalBalance()}</p>
//             </div>
//           </div>
//         </div>

//         <div className="history-con">
//           <History />
//           <h2 className="salary-title">Min <span>Income</span> Max</h2>
//           <div className="salary-item">
//             <p>${minIncome}</p>
//             <p>${maxIncome}</p>
//           </div>
//           <h2 className="salary-title">Min <span>Expense</span> Max</h2>
//           <div className="salary-item">
//             <p>${minExpense}</p>
//             <p>${maxExpense}</p>
//           </div>
//         </div>
//       </div>

//       <div className="report-con">
//         <h2>Income and Expense Report</h2>
//         <div className="report-buttons">
//           <button onClick={handlePrint}>Print</button>
//           <button onClick={handleDownload}>Download</button>
//         </div>
//         <table>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Income</th>
//               <th>Expense</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {combinedData.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.title}</td>
//                 <td>{item.category}</td>
//                 <td>{item.type === 'income' ? item.amount : ''}</td>
//                 <td>{item.type === 'expense' ? item.amount : ''}</td>
//                 <td>{item.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

// frontend/src/Components/AdminDashboard/AdminDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import { dollar } from '../../utils/Icons'; // Ensure this path is correct
import Chart from '../Chart/Chart'; // Adjust this import according to your project structure
import History from '../../History/History';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AdminDashboard.css'; // Import the CSS file

function AdminDashboard({ token }) {
  const [email, setEmail] = useState(''); // Email input from the admin
  const [userData, setUserData] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

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
      setIncomes(incomeResponse.data.map(income => ({ ...income, type: 'income' }))); // Set incomes data with type

      // Fetch expenses for the specific user
      const expenseResponse = await axios.get(`http://localhost:5000/api/v1/expense/get-expenses?email=${encodedEmail}`, {
        headers: { Authorization: `Bearer ${token}` }, // Admin token for authorization
      });

      console.log('Expense API Response:', expenseResponse.data); // Debug the response
      setExpenses(expenseResponse.data.map(expense => ({ ...expense, type: 'expense' }))); // Set expenses data with type

      setError(''); // Clear previous errors if any
    } catch (err) {
      console.error('Error fetching data:', err.response || err);
      setError('Error fetching user data or financial information.');
      setUserData(null);
      setIncomes([]);
      setExpenses([]);
    }
  };

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

  // Combine and sort incomes and expenses by date in descending order
  const combinedData = [...incomes, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Pagination logic
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = combinedData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Format date to mm/dd/yyyy
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Download the report as PDF
  const handleDownload = () => {
    const doc = new jsPDF();
    const userName = userData ? `${userData.fname} ${userData.lname}` : 'User';
    const userEmail = userData ? userData.email : 'email@example.com';

    // Add user information at the top
    doc.text(`Name: ${userName}`, 10, 10);
    doc.text(`Email: ${userEmail}`, 10, 20);

    // Add table
    doc.autoTable({
      startY: 30,
      head: [['S.No', 'Title', 'Category', 'Income', 'Expense', 'Date']],
      body: combinedData.map((item, index) => [
        index + 1,
        item.title,
        item.category,
        item.type === 'income' ? item.amount : '',
        item.type === 'expense' ? item.amount : '',
        formatDate(item.date)
      ])
    });

    // Save the PDF with the user's name
    doc.save(`${userName}_report.pdf`);
  };

  return (
    <div className="admin-dashboard">
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
          <Chart incomes={incomes} expenses={expenses} /> {/* Pass incomes and expenses data to Chart */}
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

      <div className="report-con">
        <h2>Income and Expense Report</h2>
        <div className="report-buttons">
          <button onClick={handleDownload}>Download PDF</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Category</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.type === 'income' ? item.amount : ''}</td>
                <td>{item.type === 'expense' ? item.amount : ''}</td>
                <td>{formatDate(item.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(combinedData.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
