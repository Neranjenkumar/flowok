import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('User'); // Default to 'User'
  const [secretKey, setSecretKey] = useState('');
  const [adminKey, setAdminKey] = useState('');  // Store admin key from backend
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the admin key from the backend when the component mounts
    const fetchAdminKey = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/auth/get-admin-key'); // Adjust the URL to match your API endpoint
        setAdminKey(response.data.adminKey);
      } catch (error) {
        console.error('Error fetching admin key:', error);
      }
    };

    fetchAdminKey(); // Call the function when the component loads
  }, []); // Empty dependency array means it runs only on mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin validation
    if (userType === 'Admin' && secretKey !== adminKey) {
      setMessage('Invalid Admin');
      return;
    }

    try {
      // Prepare the request payload
      const payload = {
        fname,
        lname,
        email,
        password,
        userType,
      };

      // Include secretKey only for Admin registration
      if (userType === 'Admin') {
        payload.secretKey = secretKey;
      }

      // Send the registration request to the backend
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', payload);

      if (response.data.status === 'ok') {
        setMessage('User registered successfully');
        // Redirect to login page or another page
        navigate('/login');
      } else {
        setMessage(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Error registering user';
      setMessage(errorMsg);
      console.error('Error registering user:', error.response?.data);
    }
  };

  return (
      <div className="bg-white p-8 rounded-lg shadow-xl w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-2xl font-bold text-center text-indigo-900 mb-6">Register</h3>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Register As</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="User"
                  checked={userType === 'User'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">User</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="Admin"
                  checked={userType === 'Admin'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Admin</span>
              </label>
            </div>
          </div>
  
          {userType === 'Admin' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Secret Key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          )}
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>
  
          <div className="text-center mt-4">
            <Link to="/login" className="text-sm text-indigo-600 hover:text-indigo-500">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
  );
};

export default Register;