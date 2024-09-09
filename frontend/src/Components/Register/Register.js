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
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Register</h3>

          <div>
            <label>Register As</label>
            <div>
              <input
                type="radio"
                name="userType"
                value="User"
                checked={userType === 'User'}
                onChange={(e) => setUserType(e.target.value)}
              />
              User
              <input
                type="radio"
                name="userType"
                value="Admin"
                checked={userType === 'Admin'}
                onChange={(e) => setUserType(e.target.value)}
              />
              Admin
            </div>
          </div>

          {userType === 'Admin' && (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email Address</label>
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
              Register
            </button>
          </div>

          {message && <p>{message}</p>}
          <p className="forgot-password text-right">
            Already registered? <Link to="/login">Login?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;