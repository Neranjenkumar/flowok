import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/forgot-password', { email });
      console.log(response.data);

      if (response.data.status === 'ok') {
        alert('Password reset link sent to your email');
        navigate('/login'); // Redirect to login after successful request
      } else {
        alert('Error: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error sending reset link', error);
      alert('Error sending reset link: ' + error.message);
    }

  };

  return (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-2xl font-bold text-center text-indigo-900 mb-6">Forgot Password</h3>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
  
          <div className="text-center">
            <Link to="/login" className="text-sm text-indigo-600 hover:text-indigo-500">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
  );
};

export default ForgotPassword;
