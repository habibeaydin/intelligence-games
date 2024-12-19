import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import HeroAnimation from '../../assets/hero.json';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <header className="home-hero">
        <div className="hero-content">
          <h1>Welcome to NeuroNeva!</h1>
          <p>Discover fun and interactive games that improve memory, boost creativity, and challenge your brain!</p>
          <div className="hero-buttons">
            <Link to="/games">
              <button className="explore-button">Explore Games</button>
            </Link>
          </div>
        </div>
        <div className="hero-animation">
          <Lottie animationData={HeroAnimation} style={{ height: 300 }} />
        </div>
      </header>

      {/* Benefits Section */}
      <section className="benefits">
        <h2>Why Play NeuroNeva Games?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Boost Memory</h3>
            <p>Enhance your brain's memory with fun matching games.</p>
          </div>
          <div className="benefit-card">
            <h3>Unleash Creativity</h3>
            <p>Play games that inspire imagination and quick thinking.</p>
          </div>
          <div className="benefit-card">
            <h3>Improve Strategy</h3>
            <p>Challenge yourself with strategic and logic-based puzzles.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
