import React, { useState, useEffect, useRef } from 'react';
import './MemoryGame.css';
import Lottie from 'lottie-react';
import WinAnimation from '../../assets/win.json';

const cardIcons = ["🥕", "🍓", "🍇", "🍉", "🍒", "🥑"];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  // Oyunu Başlat
  useEffect(() => {
    resetGame();
  }, []);

  // Zamanlayıcı Başlat
  useEffect(() => {
    if (!gameWon) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameWon]);

  const resetGame = () => {
    clearInterval(timerRef.current);
    setTime(0);
    const shuffledCards = [...cardIcons, ...cardIcons]
      .map((icon) => ({ id: Math.random(), icon, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleFlip = (index) => {
    if (
      flippedCards.length < 2 && // İki karttan fazla çevrilmesine izin verme
      !flippedCards.includes(index) &&
      !cards[index].isMatched
    ) {
      setFlippedCards([...flippedCards, index]);

      // İkinci kart açıldığında moves sayısını arttır
      if (flippedCards.length === 1) {
        setMoves((prevMoves) => prevMoves + 1);
      }
    }
  };

  // Eşleşme Kontrolü
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].icon === cards[second].icon) {
        setMatchedCards([...matchedCards, cards[first].icon]);
        setCards((prevCards) =>
          prevCards.map((card, i) =>
            i === first || i === second ? { ...card, isMatched: true } : card
          )
        );
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards]);

  // Oyunu Kazanma Kontrolü
  useEffect(() => {
    if (matchedCards.length === cardIcons.length) {
      clearInterval(timerRef.current);
      setGameWon(true);
    }
  }, [matchedCards]);

  return (
    <div className="memory-game">
      <h1>Memory Card Game</h1>
      <div className="game-container">
        <div className="game-stats">
          <p>Moves: {moves}</p>
          <p>Time: {time} sec</p>
        </div>
        {gameWon ? (
          <div className="win-screen">
            <Lottie animationData={WinAnimation} style={{ height: 200 }} />
            <h2>Congratulations! You won!</h2>
            <p>Total Time: {time} seconds</p>
            <button onClick={resetGame} className="reset-button">
              Play Again
            </button>
          </div>
        ) : (
          <div className="card-grid">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`memory-card ${flippedCards.includes(index) || card.isMatched ? 'flipped' : ''}`}
                onClick={() => handleFlip(index)}
              >
                <div className="card-inner">
                  <div className="card-front">{card.icon}</div>
                  <div className="card-back"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;