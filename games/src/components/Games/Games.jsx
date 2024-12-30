import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import './Games.css';
import MemoryGameAnimation from '../../assets/memory.json';
import TicTacToeAnimation from '../../assets/ttt.json';
import SlidingPuzzleAnimation from '../../assets/puzzle.json';
import WordFindAnimation from '../../assets/word.json';
import LoadingAnimation from '../../assets/load.json';

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
    description: 'Challenge yourself against the computer in this classic Tic Tac Toe game!',
    howToPlay: 'Take turns with the computer. Place X on an empty spot and try to align three in a row before the computer does!',
    animation: TicTacToeAnimation,
    route: '/ticTacToe',
  },
  {
    id: 3,
    title: 'Puzzle',
    description: 'Recreate the full image by dragging and dropping the pieces into their correct positions.',
    howToPlay: 'Drag and drop each piece to its correct position. Complete the puzzle to win!',
    animation: SlidingPuzzleAnimation,
    route: '/puzzle',
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
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handlePlayGame = (route) => {
    setLoading(true);
    setTimeout(() => {
      navigate(route);
      setLoading(false);
    }, 2000); 
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