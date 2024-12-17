import React from 'react';
import Lottie from 'lottie-react';
import './Games.css';

// Lottie Animasyonlarını İçe Aktar
import MemoryGameAnimation from '../../assets/memory.json';
import TicTacToeAnimation from '../../assets/ttt.json';
import SlidingPuzzleAnimation from '../../assets/puzzle.json';
import WordFindAnimation from '../../assets/word.json';
import { Link } from 'react-router-dom';

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

const About = () => {
  return (
    <div className="about">
      <header className="about-header">
        <h1>Games</h1>
      </header>
      <div className="games-list">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-animation">
              <Lottie animationData={game.animation} style={{ height: 150, marginBottom: 10 }} />
            </div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <h4>How to Play:</h4>
            <p>{game.howToPlay}</p>
            <Link to={game.route}>
              <button className="play-button">Play {game.title}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
