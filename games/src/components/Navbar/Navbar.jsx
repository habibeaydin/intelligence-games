import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="logo-name"></div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/games">Games</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="login-box">
        <Link to="/login" className="login-link">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
