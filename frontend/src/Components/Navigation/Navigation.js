import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import styled from 'styled-components';

function Navigation({ token, setSidebarOpen }) {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showSidebar = () => {
    setSidebar(!sidebar);
    setSidebarOpen(!sidebar);
  };

  const handleLogout = () => {
    // Clear the token and navigate to login
    window.localStorage.removeItem('token');
    navigate('/login');
  };

  const sidebarData = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text',
    },
    {
      title: 'Income',
      path: '/income',
      icon: <FaIcons.FaCartPlus />,
      cName: 'nav-text',
    },
    {
      title: 'Expenses',
      path: '/expenses',
      icon: <AiIcons.AiFillCreditCard />,
      cName: 'nav-text',
    },
    {
      title: 'Logout',
      path: '/login',
      icon: <AiIcons.AiOutlineLogout />,
      cName: 'nav-text',
      onClick: handleLogout, // Set up the logout action
    },
  ];

  // Conditionally render Navigation based on current path
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/admin-dashboard' || location.pathname === '/forgot-password' ) {
    return null;
  }

  return (
    <NavStyled>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {sidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path} onClick={item.onClick || showSidebar}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </NavStyled>
  );
}


const NavStyled = styled.div`
  .navbar {
    background-color: #060b26;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
    position: fixed;
    width: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
  }

  .menu-bars {
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
  }

  .nav-menu {
    background-color: #060b26;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 80px;
    left: -100%;
    transition: 350ms;
    z-index: 1001;
  }

  .nav-menu.active {
    left: 0;
    transition: 350ms;
  }

  .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
  }

  .nav-text a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }

  .nav-text a:hover {
    background-color: #1a83ff;
  }

  .nav-menu-items {
    width: 100%;
  }

  .navbar-toggle {
    background-color: #060b26;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  span {
    margin-left: 16px;
  }

  @media (max-width: 768px) {
    .nav-menu {
      width: 100%;
      height: auto;
      top: 80px;
    }

    .nav-text {
      justify-content: center;
      font-size: 20px;
    }

    .nav-text a {
      text-align: center;
      padding: 20px;
    }
  }
`;

export default Navigation;
