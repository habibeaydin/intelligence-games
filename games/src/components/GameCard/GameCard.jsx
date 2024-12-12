import React from 'react';
import './GameCard.css';
import { Link } from 'react-router-dom';

const GameCard = ({ title, description, image, route }) => {
  return (
    <div className="game-card">
      <img src={image} alt={title} className="game-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <button>
        <Link to={route}>Oyna</Link>
      </button>
    </div>
  );
};

export default GameCard;
