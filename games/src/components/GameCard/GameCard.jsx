import React from 'react';
import './GameCard.css';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';

const GameCard = ({ title, animation, route }) => {
  return (
    <div className="game-card">
      <div className="game-animation">
        <Lottie animationData={animation} style={{ height: 150, width: 150 }} loop={true} />
      </div>
      <h3>{title}</h3>
      <button>
        <Link to={route}>Oyna</Link>
      </button>
    </div>
  );
};

export default GameCard;
