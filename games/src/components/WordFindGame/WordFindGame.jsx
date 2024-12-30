import React, { useState, useEffect } from 'react';
import './WordFindGame.css';

// Word list with hints
const wordList = [
  { word: 'apple', hint: 'A fruit that keeps the doctor away' },
  { word: 'dog', hint: 'A common pet animal' },
  { word: 'car', hint: 'A vehicle with four wheels' },
  { word: 'java', hint: 'A programming language' },
  { word: 'react', hint: 'A JavaScript library for building user interfaces' },
];

const WordFindGame = () => {
  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [win, setWin] = useState(false);
  const [currentCorrectLetters, setCurrentCorrectLetters] = useState([]);

  useEffect(() => {
    startNewWord();
    startTimer();
    return () => clearInterval(timerRef);
  }, []);

  const timerRef = React.useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startNewWord = () => {
    const randomWord = wordList[wordCount % wordList.length];
    setWord(randomWord.word);
    setHint(randomWord.hint);
    setShuffledLetters(shuffleArray(randomWord.word.split('')));
    setSelectedLetters([]);
    setCurrentCorrectLetters([]);
    setGameOver(false);
  };

  const handleLetterClick = (letter) => {
    const currentWord = selectedLetters.join('');
    const currentCount = currentWord.split(letter).length - 1;
    const wordCount = word.split(letter).length - 1;

    if (currentCount < wordCount) {
      setSelectedLetters([...selectedLetters, letter]);
      const correctLetters = [...currentCorrectLetters, letter];
      setCurrentCorrectLetters(correctLetters);
    }
  };

  const checkWord = () => {
    if (selectedLetters.join('') === word) {
      if (wordCount + 1 === 5) {
        stopTimer();
        setWin(true);
      } else {
        setWordCount((prevCount) => prevCount + 1);
        startNewWord();
      }
    } else {
      setGameOver(true);
    }
  };

  const resetCurrentWord = () => {
    setSelectedLetters([]);
    setCurrentCorrectLetters([]);
  };

  return (
    <div className="word-game-container">
      <h1>Word Find Game</h1>
      <div className="word-hint">
        <p>Hint: {hint}</p>
      </div>
      <div className="word-timer">Time: {time} sec</div>
      <div className="word-shuffled-letters">
        {shuffledLetters.map((letter, index) => (
          <button
            key={index}
            className="word-letter-button"
            onClick={() => handleLetterClick(letter)}
            disabled={selectedLetters.filter((l) => l === letter).length >= word.split(letter).length}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="word-selected-letters">
        {selectedLetters.map((letter, index) => (
          <span key={index} className="word-selected-letter">
            {letter}
          </span>
        ))}
      </div>
      <div className="word-correct-letters">
        <p>Correct Letters: {currentCorrectLetters.join(' ')}</p>
      </div>
      {!gameOver && !win && (
        <div className="word-check-button">
          <button onClick={checkWord} disabled={selectedLetters.length !== word.length}>
            Check Word
          </button>
        </div>
      )}
      {gameOver && !win && (
        <div className="word-game-over">
          <p>Oops! Try Again!</p>
          <button onClick={startNewWord}>Next Word</button>
        </div>
      )}
      {win && (
        <div className="word-game-over">
          <p>Congratulations! You completed all words!</p>
          <p>Your Time: {time} sec</p>
          <button onClick={startNewWord}>Play Again</button>
        </div>
      )}
      <div className="word-reset-button">
        <button onClick={resetCurrentWord}>Reset Current Word</button>
      </div>
    </div>
  );
};

export default WordFindGame;