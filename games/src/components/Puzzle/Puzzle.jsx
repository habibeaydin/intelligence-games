import React, { useState, useEffect, useRef } from "react";
import "./Puzzle.css";
import Lottie from "lottie-react";
import WinAnimation from "../../assets/win.json"; 
import puzzleImage from "../../assets/puzzleImage.png";

const Puzzle = () => {
  const [pieces, setPieces] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    generatePieces();
  }, []);

  useEffect(() => {
    if (!completed) {
      timerRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [completed]);

  const generatePieces = () => {
    const rows = 3;
    const cols = 3;
    const newPieces = [];

    // Her parçayı oluştur
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newPieces.push({
          id: `${row}-${col}`, // Doğru pozisyon bilgisi
          position: { row, col }, // Başlangıç pozisyonu
        });
      }
    }

    // Parçaları karıştır ve `position` değerlerini de değiştir
    const shuffledPositions = shuffle(newPieces.map((piece) => piece.position));

    const shuffledPieces = newPieces.map((piece, index) => ({
      ...piece,
      position: shuffledPositions[index], // Yeni karıştırılmış pozisyonu ata
    }));

    setPieces(shuffledPieces);
  };

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text", id);
  };

  const handleDrop = (e, targetPosition) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text");

    const draggedPiece = pieces.find((piece) => piece.id === draggedId);
    if (!draggedPiece) return;

    const updatedPieces = pieces.map((piece) => {
      if (piece.id === draggedId) {
        return { ...piece, position: targetPosition };
      }
      if (
        piece.position.row === targetPosition.row &&
        piece.position.col === targetPosition.col
      ) {
        return { ...piece, position: draggedPiece.position };
      }
      return piece;
    });

    setPieces(updatedPieces);
    setMoves((prev) => prev + 1); // Hamle sayısını artır
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const checkCompletion = () => {
    const isCompleted = pieces.every((piece) => {
      const [expectedRow, expectedCol] = piece.id.split("-").map(Number);
      return (
        piece.position.row === expectedRow &&
        piece.position.col === expectedCol
      );
    });
    console.log("Is Completed:", isCompleted);

    if (isCompleted) {
      setCompleted(true);
    } else {
      setTimeout(() => {
        const messageBox = document.createElement('div');
        messageBox.className = 'error-message';
        messageBox.textContent = 'The puzzle is not completed yet! Please check again.';
        document.body.appendChild(messageBox);
        setTimeout(() => {
          messageBox.remove();
        }, 3000);
      }, 0);
    }
  };

  const resetGame = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setMoves(0);
    setCompleted(false);
    generatePieces(); // Parçaları yeniden oluştur ve karıştır
  };  

  return (
    <div className="puzzle">
      <h1>Puzzle</h1>
      <div className="puzzle-game-stats">
        <div className="puzzle-stat-item">
          <span className="puzzle-stat-label">Moves:</span> <span className="stat-value">{moves}</span>
        </div>
        <div className="puzzle-stat-item">
          <span className="puzzle-stat-label">Time:</span> <span className="stat-value">{time} sec</span>
        </div>
      </div>
      <div className="puzzle-grid">
        {pieces.map((piece) => (
          <div
            key={piece.id}
            className="puzzle-piece"
            draggable
            onDragStart={(e) => handleDragStart(e, piece.id)}
            onDrop={(e) => handleDrop(e, piece.position)}
            onDragOver={allowDrop}
            style={{
              backgroundImage: `url(${puzzleImage})`,
              backgroundPosition: `${-piece.position.col * 100}px ${-piece.position.row * 100}px`,
            }}
          ></div>
        ))}
      </div>
      <button onClick={checkCompletion} className="check-button">
        Check it!
      </button>
      {completed && (
        <div className="win-screen-overlay">
          <Lottie animationData={WinAnimation} style={{ height: 200 }} />
          <h2>Congratulations! You completed the puzzle!</h2>
          <p>Time: {time} seconds</p>
          <p>Moves: {moves}</p>
          <button onClick={resetGame} className="button reset-button">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Puzzle;


