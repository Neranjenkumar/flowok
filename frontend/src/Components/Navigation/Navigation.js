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
        <li className={active === 1 ? 'active' : ''} onClick={() => handleNavigation(2, '/dashboard')}>Dashboard</li>
        <li className={active === 2 ? 'active' : ''} onClick={() => handleNavigation(3, '/income')}>Income</li>
        <li className={active === 3 ? 'active' : ''} onClick={() => handleNavigation(4, '/expenses')}>Expenses</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </NavStyled>
  );
};

const NavStyled = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-around;
    }

    li {
      cursor: pointer;
      padding: 1rem;
      margin: 0.5rem 0;
      text-align: center;

      @media (min-width: 768px) {
        margin: 0 0.5rem;
      }

      &.active {
        color: red;
      }

      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

export default Navigation;
