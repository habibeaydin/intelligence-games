import React from 'react';
import GameCard from '../../components/GameCard/GameCard';
import './Games.css';
import memoryImage from '../../assets/memory.png';
import tictactoeImage from '../../assets/ttt3.png';
import image from '../../assets/image2.jpeg';
import wordimg  from '../../assets/wordimg.jpeg';

const games = [
  {
    id: 1,
    title: 'Hafıza Oyunu',
    image: memoryImage,
    route: '/memoryGame'
  },
  {
    id: 2,
    title: 'Tic Tac Toe',
    image: tictactoeImage,
    route: '/ticTacToe'
  },
  {
    id: 3,
    title: 'Sliding Image Puzzle',
    image: image,
    route: '/slidingImagePuzzle'
  },
  {
    id: 4,
    title: 'Word Find Game',
    image: wordimg,
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