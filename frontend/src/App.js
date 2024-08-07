import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

function App() {
  const [active, setActive] = useState(1);
  const [token, setToken] = useState('');

  const global = useGlobalContext();
  console.log(global);

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <Router>
      <AppStyled>
        {orbMemo}
        <MainLayout>
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/income" element={token ? <Income /> : <Navigate to="/login" />} />
            <Route path="/expenses" element={token ? <Expenses /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          </Routes>
          {token && (
            <>
              <Navigation active={active} setActive={setActive} setToken={setToken} />
              <MainContent>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/income" element={<Income />} />
                  <Route path="/expenses" element={<Expenses />} />
                </Routes>
              </MainContent>
            </>
          )}
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

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
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
  }
`;

const MainContent = styled.main`
  flex: 1;
  background: rgba(252, 246, 249, 0.78);
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
