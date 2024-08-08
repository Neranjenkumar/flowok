import React, { useState, useMemo } from 'react';
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
  const [active, setActive] = useState(1);
  const [token, setToken] = useState('');

  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <Router>
      <AppStyled>
        {orbMemo}
        <MainLayout>
          {token && <Navigation active={active} setActive={setActive} setToken={setToken} />}
          <MainContent>
            <Routes>
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/income" element={token ? <Income /> : <Navigate to="/login" />} />
              <Route path="/expenses" element={token ? <Expenses /> : <Navigate to="/login" />} />
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
  position: relative;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.main`
  flex: 1;
  background: rgba(25, 246, 249, 0.78);
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;
  padding: 1rem;
  margin: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
    margin: 2rem;
  }

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default App;
