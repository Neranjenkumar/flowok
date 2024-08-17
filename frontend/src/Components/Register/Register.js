import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('User'); // Default to 'User'
  const [secretKey, setSecretKey] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin validation
    if (userType === 'Admin' && secretKey !== 'AdarshT') {
      setMessage('Invalid Admin');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
        fname,
        lname,
        email,
        password,
        userType,
      });

      if (response.data.status === 'ok') {
        setMessage('User registered successfully');
        // Redirect to login page or another page
        navigate('/login');
      } else {
        setMessage(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Error registering user');
      console.error('Error registering user', error.response?.data);
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








// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
//         username,
//         password,
//         isAdmin,
//       });
//       setMessage('User registered successfully');
//       console.log(response.data);
//     } catch (error) {
//       setMessage('Error registering user');
//       console.error('Error registering user', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Admin:</label>
//           <input
//             type="checkbox"
//             checked={isAdmin}
//             onChange={(e) => setIsAdmin(e.target.checked)}
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Register;