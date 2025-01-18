import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Games from "./components/Games/Games";
import TicTacToe from "./components/TicTacToe/TicTacToe";
import MemoryGame from "./components/MemoryGame/MemoryGame";
import Puzzle from "./components/Puzzle/Puzzle";
import WordFindGame from "./components/WordFindGame/WordFindGame";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Scores from "./pages/Scores/Scores";

// ProtectedRoute bileşeni
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <div>Please log in to access this page.</div>;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giriş durumu
  const [isLoading, setIsLoading] = useState(true); // Yüklenme durumu

  // localStorage'daki token'ı kontrol et
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Eğer token varsa, giriş yapılmış olarak kabul et
    setIsLoading(false); // Yüklenme tamamlandı
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>; // Yüklenme sırasında gösterilecek mesaj
  }

  return (
    <Router>
      <div className="container">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/ticTacToe" element={<TicTacToe />} />
            <Route path="/memoryGame" element={<MemoryGame />} />
            <Route path="/puzzle" element={<Puzzle />} />
            <Route path="/wordFindGame" element={<WordFindGame />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/scores"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Scores />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
