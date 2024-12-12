import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Games from './components/Games/Games';
import TicTacToe from './components/TicTacToe/TicTacToe';
import MemoryGame from './components/MemoryGame/MemoryGame';
import SlidingImagePuzzle from './components/SlidingImagePuzzle/SlidingImagePuzzle';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/ticTacToe" element={<TicTacToe />} />
          <Route path="/memoryGame" element={<MemoryGame/>} />
          <Route path="/slidingImagePuzzle" element={<SlidingImagePuzzle/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App