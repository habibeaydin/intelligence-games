import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import logo from '../../assets/logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Navbar Linkleri */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/games">Games</Link>
        </li>
      </ul>

      {/* Login Butonu */}
      <div className="login-box">
        <Link to="/login" className="login-link">
          <FontAwesomeIcon icon={faSignInAlt} className="login-icon" />
          Login
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
