import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Use navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login-user', {
        email,
        password,
      });

      if (response.data.status === 'ok') {
        const { token, userType } = response.data;
        console.log('Login successful', response.data);
        alert('Login successful');
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('userType', userType);
        window.localStorage.setItem('loggedIn', true);

        setToken(token);  // Set the token in the state

        // Redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error logging in', error.response?.data);
      alert('Login failed: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <p className="forgot-password text-right">
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
