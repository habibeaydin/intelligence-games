import React, { useState, useEffect } from 'react';
import './WordFindGame.css';

// Kelimeler ve ipuçları
const wordList = [
  { word: 'apple', hint: 'A fruit that keeps the doctor away' },
  { word: 'dog', hint: 'A common pet animal' },
  { word: 'car', hint: 'A vehicle with four wheels' },
  { word: 'java', hint: 'A programming language' },
  { word: 'react', hint: 'A JavaScript library for building user interfaces' },
];

const WordFindGame = () => {
  // Rastgele bir kelime seçme
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Oyun başlatma
  useEffect(() => {
    const { word, hint } = getRandomWord();
    setWord(word);
    setHint(hint);
    setShuffledLetters(shuffleArray(word.split('')));
    setSelectedLetters([]);
    setGameOver(false);
  }, []);

  // Harfleri karıştırma
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Kullanıcının harf tıklaması
  const handleLetterClick = (letter) => {
    // Aynı harfi seçmemek için, sadece o harf eksikse seçilebilir
    const currentWord = selectedLetters.join('');
    const currentCount = currentWord.split(letter).length - 1;
    const wordCount = word.split(letter).length - 1;

    if (currentCount < wordCount) {
      setSelectedLetters([...selectedLetters, letter]);
    }
  };

  // Kelimeyi kontrol etme
  const checkWord = () => {
    if (selectedLetters.join('') === word) {
      setGameOver(true);
    }
  };

  // Kelimenin doğru olup olmadığını kontrol etme
  const checkWin = () => {
    return selectedLetters.join('') === word;
  };

  // Yeniden başlatmak için
  const restartGame = () => {
    const { word, hint } = getRandomWord();
    setWord(word);
    setHint(hint);
    setShuffledLetters(shuffleArray(word.split('')));
    setSelectedLetters([]);
    setGameOver(false);
  };

  // Karıştırılmış harfleri render etme
  const renderShuffledLetters = () => {
    return shuffledLetters.map((letter, index) => (
      <button
        key={index}
        className="letter-button"
        onClick={() => handleLetterClick(letter)}
        disabled={selectedLetters.filter(l => l === letter).length >= word.split(letter).length}
      >
        {letter}
      </button>
    ));
  };

  // Seçilen harfleri render etme
  const renderSelectedLetters = () => {
    return selectedLetters.map((letter, index) => (
      <span key={index} className="selected-letter">
        {letter}
      </span>
    ));
  };

  return (
    <div className="game-container">
      <h1>Word Find Game</h1>
      <div className="hint">
        <p>Hint: {hint}</p>
      </div>

      <div className="shuffled-letters">
        {renderShuffledLetters()}
      </div>

      <div className="selected-letters">
        {renderSelectedLetters()}
      </div>

      <div className="check-button">
        <button onClick={checkWord} disabled={selectedLetters.length !== word.length}>
          Check Word
        </button>
      </div>

      {gameOver && (
        <div className="game-over">
          <p>Congratulations! You found the word: {word}</p>
          <button onClick={restartGame}>Start New Game</button>
        </div>
      )}

      {!gameOver && selectedLetters.length === word.length && !checkWin() && (
        <div className="game-over">
          <p>Oops! Try Again!</p>
        </div>
      )}
    </div>
  );
};

export default WordFindGame;
