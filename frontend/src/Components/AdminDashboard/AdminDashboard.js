import React, { useState } from 'react';
import axios from 'axios';

function AdminDashboard({ token }) {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const fetchUserByEmail = async () => {
    try {
      const encodedEmail = encodeURIComponent(email);  // Encode email to handle special characters
      const response = await axios.get(`http://localhost:5000/api/v1/auth/email/${encodedEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setError('');  // Clear any previous errors
    } catch (err) {
      setError('Error fetching user data. Please check the email and try again.');
      setUserData(null);  // Clear any previous data
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={fetchUserByEmail}>Search User</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData && (
        <div>
          <h2>User Data</h2>
          <p>Email: {userData.email}</p>
          <p>First Name: {userData.fname}</p>
          <p>Last Name: {userData.lname}</p>

          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
