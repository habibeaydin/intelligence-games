import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7148/api/user/login", {
        username,
        password,
      });
      setIsLoggedIn(true); // Oturum durumunu güncelle
      setError("");
      navigate("/games"); // Kullanıcıyı yönlendir
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
