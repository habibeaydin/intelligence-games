import React, { useState, useEffect } from "react";
import "./memorygame.css";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  // kartları oluşturma ve karıştırma
  useEffect(() => {
    const cardIcons = ["🍎", "🍓", "🍇", "🍉", "🍒", "🍍"];
    const shuffledCards = [...cardIcons, ...cardIcons]
      .map((icon) => ({ id: Math.random(), icon, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  // eşleşme kontrolü
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].icon === cards[second].icon) {
        setMatchedCards((prev) => [...prev, cards[first].icon]);
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === first || index === second
              ? { ...card, isMatched: true }
              : card
          )
        );
      }
      setTimeout(() => setFlippedCards([]), 500); // Kartları tekrar kapat
    }
  }, [flippedCards, cards]);

  // karta tıklanıldığında
  const handleFlip = (index) => {
    if (
      flippedCards.length < 2 &&    
      !flippedCards.includes(index) &&  //aynı kart değilse
      !cards[index].isMatched   //eşleşmemişse
    ) {
      setFlippedCards((prev) => [...prev, index]);
      setMoves((prev) => prev + 1);
    }
  };

  return (
    <div className="memory-game-container">
      {matchedCards.length === cards.length / 2 ? (
        <div className="game-over-screen">
          <h1>Kazandın!</h1>
          <p className="moves">Toplam Hamle: {moves}</p>
        </div>
      ) : (
        <>
          <h1>Memory Card Game</h1>
          <p>Moves: {moves}</p>
          <div className="memory-card-grid">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`memory-card ${
                  flippedCards.includes(index) || card.isMatched ? "flipped" : ""
                }`}
                onClick={() => handleFlip(index)}
              >
                <div className="card-front">{card.icon}</div>
                <div className="card-back"></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MemoryGame;
