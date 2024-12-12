import React from 'react';
import GameCard from '../../components/GameCard/GameCard';
import './Games.css';

const games = [
  {
    id: 1,
    title: 'Hafıza Oyunu',
    description: 'Kartları eşleştirerek hafızanızı test edin.',
    image: '/images/memory-game.jpg',
    route: '/memoryGame'
  },
  {
    id: 2,
    title: 'Tic Tac Toe',
    description: 'Verilen ipuçlarına göre kelimeyi tahmin edin.',
    image: '/images/word-game.jpg',
    route: '/ticTacToe'
  },
  {
    id: 3,
    title: 'Matematik Oyunu',
    description: 'Matematik problemlerini çözerek puan toplayın.',
    image: '/images/math-game.jpg',
    route: '/mathGame'
  },
  {
    id: 4,
    title: 'Sliding Image Puzzle',
    description: '',
    image: '/images/.jpg',
    route: '/slidingImagePuzzle'
  },
];

const Games = () => {
  return (
    <div className="games">
      <h1>Oyunlarımız</h1>
      <div className="games-grid">
        {games.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
};

export default Games;
