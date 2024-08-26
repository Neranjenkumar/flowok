import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setDataFetched(true);
    } else {
      localStorage.removeItem('token');
      setDataFetched(false);
    }
  }, [token]);

  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <Router>
      <AppStyled>
        {orbMemo}
        <MainLayout className={sidebarOpen ? 'nav-open' : ''}>
          {token && <Navigation token={token} setSidebarOpen={setSidebarOpen} />}
          <MainContent sidebarOpen={sidebarOpen}>
            <Routes>
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register />} />
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
          </MainContent>
        </MainLayout>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(72.3deg, rgb(29, 7, 64) 8.5%, rgb(253, 105, 139) 92.2%);
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.main`
  flex: 1;
  background: linear-gradient(72.3deg, rgb(29, 7, 64) 8.5%, #fff 92.2%);
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;
  padding: 1rem;
  margin: 1rem;
  margin-top: 100px;
  margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '250px' : '0')};
  transition: margin-left 350ms ease;

  @media (min-width: 768px) {
    padding: 2rem;
    margin: 2rem;
    margin-top: 100px;
  }

  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 120px;
  }
`;

export default App;
