import React from 'react';
import GameCard from '../../components/GameCard/GameCard';
import './Games.css';
import memoryImage from '../../assets/memory.png';
import tictactoeImage from '../../assets/tictactoe.png';
import puzzle from '../../assets/puzzle.png';
import wordImage from '../../assets/word.png';

const games = [
  {
    id: 1,
    title: 'Hafıza Oyunu',
    description: 'Kartları eşleştirerek hafızanızı test edin.',
    image: memoryImage,
    route: '/memoryGame'
  },
  {
    id: 2,
    title: 'Tic Tac Toe',
    description: 'Verilen ipuçlarına göre kelimeyi tahmin edin.',
    image: tictactoeImage,
    route: '/ticTacToe'
  },
  {
    id: 3,
    title: 'Sliding Image Puzzle',
    description: 'abc',
    image: puzzle,
    route: '/slidingImagePuzzle'
  },
  {
    id: 4,
    title: 'Word Find Game',
    description: 'abc',
    image: wordImage,
    route: '/wordFindGame'
  },
];

const Games = () => {
  return (
    <div className="games">
      <h1>GAMES</h1>
      <div className="games-grid">
        {games.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
};

export default Games;