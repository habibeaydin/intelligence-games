import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Games from './components/Games/Games';
import TicTacToe from './components/TicTacToe/TicTacToe';
import MemoryGame from './components/MemoryGame/MemoryGame';
import Puzzle from './components/Puzzle/Puzzle';
import WordFindGame from './components/WordFindGame/WordFindGame';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/ticTacToe" element={<TicTacToe />} />
            <Route path="/memoryGame" element={<MemoryGame />} />
            <Route path="/puzzle" element={<Puzzle />} />
            <Route path="/wordFindGame" element={<WordFindGame />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
