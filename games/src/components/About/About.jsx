import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';
import memory from '../../assets/memory.png';
import image from '../../assets/image2.jpeg';
import wordimg  from '../../assets/wordimg.jpeg';
import tictactoeImage from '../../assets/ttt3.png';


const games = [
  {
    title: 'Memory Game',
    description: 'Test your memory by matching pairs of cards.',
    tips: 'Try to remember the positions of the cards!',
    image: '/memory-game-image.png',
    link: '/memoryGame',
    characterImage: memory,  // Her oyun için karakter
  },
  {
    title: 'Tic Tac Toe',
    description: 'Get three marks in a row!',
    tips: 'Block your opponent while trying to win.',
    image: '/tic-tac-toe-image.png',
    link: '/ticTacToe',
    characterImage: tictactoeImage,
  },
  {
    title: 'Sliding Image Puzzle',
    description: 'Arrange the scrambled pieces to solve the puzzle.',
    tips: 'Work from one corner to the other.',
    image: '/sliding-puzzle-image.png',
    link: '/slidingImagePuzzle',
    characterImage: image,
  },
  {
    title: 'Word Find Game',
    description: 'Search for hidden words in a grid of letters.',
    tips: 'Look for common letter patterns.',
    image: '/word-find-image.png',
    link: '/wordFindGame',
    characterImage: wordimg,
  },
];

const About = () => {
  return (
    <div className="about">
      <header className="about-header">
        <h1>About Our Games</h1>
        <p>Explore our fun and interactive games!</p>
      </header>

      <section className="games-list">
        {games.map((game, index) => (
          <div key={index} className="game-card">
            <div className="game-card-header">
              <h2>{game.title}</h2>
              <img src={game.characterImage} alt={`${game.title} Character`} className="game-character" />
            </div>
            <div className="game-card-body">
              <h3>How to Play:</h3>
              <p>{game.description}</p>
              
              <p><strong>Tip : </strong> {game.tips}</p>
              <Link to={game.link}>
                <button className="play-button">Oyna</button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default About;
