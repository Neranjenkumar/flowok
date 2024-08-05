import React from 'react';
import styled from 'styled-components';

const Navigation = ({ active, setActive, setToken }) => {
  const handleLogout = () => {
    setToken('');
  };

  return (
    <NavStyled>
      <ul>
        <li className={active === 1 ? 'active' : ''} onClick={() => setActive(1)}>Dashboard</li>
        <li className={active === 2 ? 'active' : ''} onClick={() => setActive(2)}>Dashboard</li>
        <li className={active === 3 ? 'active' : ''} onClick={() => setActive(3)}>Income</li>
        <li className={active === 4 ? 'active' : ''} onClick={() => setActive(4)}>Expenses</li>
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
