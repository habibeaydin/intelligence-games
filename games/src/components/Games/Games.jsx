import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import './Games.css';

// Lottie Animasyonlarını İçe Aktar
import MemoryGameAnimation from '../../assets/memory.json';
import TicTacToeAnimation from '../../assets/ttt.json';
import SlidingPuzzleAnimation from '../../assets/puzzle.json';
import WordFindAnimation from '../../assets/word.json';
import LoadingAnimation from '../../assets/load.json'; // Yükleme animasyonu

const games = [
  {
    id: 1,
    title: 'Memory Game',
    description: 'Test your memory skills by matching pairs of cards. Find all pairs to win!',
    howToPlay: 'Flip two cards at a time to reveal their images. Match all pairs in the fewest moves.',
    animation: MemoryGameAnimation,
    route: '/memoryGame',
  },
  {
    id: 2,
    title: 'Tic Tac Toe',
    description: 'Classic two-player game. Get three marks in a row to win!',
    howToPlay: 'Place X or O in an empty spot. First to align three marks wins!',
    animation: TicTacToeAnimation,
    route: '/ticTacToe',
  },
  {
    id: 3,
    title: 'Sliding Image Puzzle',
    description: 'Rearrange the pieces of the image to solve the puzzle.',
    howToPlay: 'Slide tiles to arrange them in the correct order.',
    animation: SlidingPuzzleAnimation,
    route: '/slidingImagePuzzle',
  },
  {
    id: 4,
    title: 'Word Find Game',
    description: 'Find hidden words in a grid of letters.',
    howToPlay: 'Scan the grid and find all hidden words, horizontally, vertically, or diagonally.',
    animation: WordFindAnimation,
    route: '/wordFindGame',
  },
];

const Games = () => {
  const [loading, setLoading] = useState(false); // Yükleme durumu
  const navigate = useNavigate();

  const handlePlayGame = (route) => {
    setLoading(true);
    setTimeout(() => {
      navigate(route);
      setLoading(false);
    }, 2500); //yükleme süresi
  };

  return (
    <div className="games">
      <header className="games-header">
        <h1>Games</h1>
        <p>Explore our fun and interactive games to challenge and enhance your skills!</p>
      </header>
      <div className="games-list">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-animation">
              <Lottie animationData={game.animation} style={{ height: 150 }} />
            </div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <h4>How to Play:</h4>
            <p>{game.howToPlay}</p>
            <button className="play-button" onClick={() => handlePlayGame(game.route)}>
              Play {game.title}
            </button>
          </div>
        ))}
      </div>

      {loading && (
        <div className="loading-overlay">
          <Lottie animationData={LoadingAnimation} style={{ height: 350 }} />
          <p>Loading Game...</p>
        </div>
      )}
    </div>
  );
};

export default Games;
