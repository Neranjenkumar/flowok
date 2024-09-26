import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { signout } from '../../utils/Icons';

function Navigation({ token, setSidebarOpen}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setSidebarOpen(!isOpen);
  };

  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    // Redirect to the login page
    navigate('/login');
  };

// Conditionally render Navigation based on current path
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/admin-dashboard' || location.pathname === '/forgot-password' ) {
    return null;
  }

  return (
    <nav className="bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`fixed inset-y-0 left-0 w-64 bg-indigo-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out overflow-y-auto`}>
      <div className={`fixed inset-y-0 left-0 w-64 bg-indigo-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-6">
          <Link to="/dashboard" onClick={toggleSidebar} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">Dashboard</Link>
          <Link to="/income" onClick={toggleSidebar} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">Income</Link>
          <Link to="/expenses" onClick={toggleSidebar} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">Expenses</Link>
          <button onClick={handleSignOut} className="w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">
            {signout} Sign Out
          </button>
        </div>
        </div>
        </div>
    </nav>
  );
}

export default Navigation;
