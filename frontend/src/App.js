import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/Login/forgotpassword';
import Register from './Components/Register/Register';
import ScrollableContent from './Components/ScrollableContent/ScrollableContent';



function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    if (!token) {
      setSidebarOpen(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setDataFetched(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      setDataFetched(false);
    }
  }, [token]);

  const ConditionalWrapper = ({ children }) => {
    const location = useLocation();
    const centerRoutes = ['/login', '/forgot-password', '/register'];
  
    if (centerRoutes.includes(location.pathname)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      );
    }
  
    return (
      <div className="bg-white rounded-lg shadow-xl p-6 lg:p-10">
        {children}
      </div>
    );
  };


  return (
    <Router>
  <div className="flex h-screen overflow-hidden">
    {token && <Navigation token={token} setSidebarOpen={setSidebarOpen} />}
    <main className={`flex-1 transition-margin duration-300 ${sidebarOpen && token ? 'ml-64' : ''}`}>
      <ScrollableContent>
        <ConditionalWrapper>
          <Routes>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/admin-dashboard"
                  element={token && userType === 'Admin' ? <AdminDashboard token={token} /> : <Navigate to="/login" />}
                />
                <Route
                  path="/dashboard"
                  element={token ? <Dashboard token={token} dataFetched={dataFetched} setDataFetched={setDataFetched} /> : <Navigate to="/login" />}
                />
                <Route 
                  path="/income" 
                  element={token ? <Income token={token} dataFetched={dataFetched} setDataFetched={setDataFetched} /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/expenses" 
                  element={token ? <Expenses token={token} dataFetched={dataFetched} setDataFetched={setDataFetched} /> : <Navigate to="/login" />} 
                />
                <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
                </Routes>
        </ConditionalWrapper>
      </ScrollableContent>
    </main>
  </div>
</Router>
  );
}

export default App;