import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logo from "../../assets/logo.png";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false); // Kullanıcı oturum durumunu sıfırla
    localStorage.removeItem("user"); // Oturumu temizle
    navigate("/login"); // Giriş ekranına yönlendir
  };

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

      {/* Ayarlar İkonu veya Login */}
      <div className="settings-container">
        {!isLoggedIn ? (
          <div className="login-box">
              <Link to="/login" className="login-link">
            <FontAwesomeIcon icon={faSignInAlt} className="login-icon" />
            Login
          </Link>
          </div>
        ) : (
          <div
            className="settings-icon"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            <FontAwesomeIcon icon={faCog} />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => navigate("/profile")}>Profile</li>
                  <li onClick={() => navigate("/scores")}>Scores</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
