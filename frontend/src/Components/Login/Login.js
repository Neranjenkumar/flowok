import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        // Store the token and userType in localStorage
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('userType', userType);
        window.localStorage.setItem('loggedIn', 'true');

        // Set the token in the parent state
        setToken(token);

        // Redirect based on user type
        if (userType === 'Admin') {
          navigate('/admin-dashboard'); // Navigate to admin dashboard for admin user
        } else {
          navigate('/dashboard'); // Navigate to regular dashboard for other users
        }
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error logging in', error.response?.data);
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
      <div className="bg-white p-8 rounded-lg shadow-xl w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-2xl font-bold text-center text-indigo-900 mb-6">Login</h3>

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
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
          </div>

          <div className="text-center">
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
          </div>

          <div className="text-center">
            <Link to="/register" className="text-sm text-indigo-600 hover:text-indigo-500">
              Register
            </Link>
          </div>
        </form>
      </div>
  
  );
};

export default Login;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const Login = ({ setToken }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/v1/auth/login-user', {
//         email,
//         password,
//       });

//       if (response.data.status === 'ok') {
//         const { token, userType } = response.data;
//         console.log('Login successful', response.data);
//         alert('Login successful');
//         // Store the token and userType in localStorage
//         window.localStorage.setItem('token', token);
//         window.localStorage.setItem('userType', userType);
//         window.localStorage.setItem('loggedIn', 'true');

//         // Set the token in the parent state
//          // Redirect based on userType
//       if (userType === 'Admin') {
//       navigate('/admin-dashboard');  // Admin dashboard
//       } else {
//       navigate('/dashboard');  // User dashboard
//       }
// } else {
//   alert('Login failed: ' + response.data.message);
// }
//     } catch (error) {
//       console.error('Error logging in', error.response?.data);
//       alert('Login failed: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-inner">
//         <form onSubmit={handleSubmit}>
//           <h3>Login</h3>

//           <div className="mb-3">
//             <label>Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="d-grid">
//             <button type="submit" className="btn btn-primary">
//               Submit
//             </button>
//           </div>
//           <p className="forgot-password text-right">
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </p>
//           <p className="forgot-password text-right">
//             <Link to="/register">Register</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;