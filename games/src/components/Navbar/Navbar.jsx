import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logo from "../../assets/logo.png";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".settings-container")) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/games">Games</Link>
        </li>
      </ul>

      <div className="settings-container">
        {!isLoggedIn ? (
          <Link to="/login" className="login-link">
            <FontAwesomeIcon icon={faSignInAlt} className="login-icon" />
            Login
          </Link>
        ) : (
          <div>
            <div
              className="settings-icon"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <FontAwesomeIcon icon={faCog} />
            </div>
            <div
              className={`dropdown-menu ${
                dropdownVisible ? "visible" : ""
              }`}
            >
              <ul>
                <li onClick={() => navigate("/scores")}>Scores</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
