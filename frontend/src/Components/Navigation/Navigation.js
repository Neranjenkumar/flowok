import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ active, setActive, setToken }) => {
  const navigate = useNavigate();

  const handleNavigation = (index, path) => {
    setActive(index);
    navigate(path);
  };

  const handleLogout = () => {
    setToken('');
    navigate('/login');
  };

  return (
    <NavStyled>
      <ul>
        <li className={active === 1 ? 'active' : ''} onClick={() => handleNavigation(1, '/dashboard')}>Dashboard</li>
        <li className={active === 2 ? 'active' : ''} onClick={() => handleNavigation(2, '/dashboard')}>Dashboard</li>
        <li className={active === 3 ? 'active' : ''} onClick={() => handleNavigation(3, '/income')}>Income</li>
        <li className={active === 4 ? 'active' : ''} onClick={() => handleNavigation(4, '/expenses')}>Expenses</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </NavStyled>
  );
};

const NavStyled = styled.nav`
  ul {
    list-style: none;
    li {
      cursor: pointer;
      &.active {
        color: red;
      }
    }
  }
`;

export default Navigation;
