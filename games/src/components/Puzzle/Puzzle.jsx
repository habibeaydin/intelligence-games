import React, { useState, useEffect } from "react";
import "./Puzzle.css";
import Lottie from "lottie-react";
import WinAnimation from "../../assets/win.json"; // Kazanma animasyonu
import puzzleImage from "../../assets/puzzleImage.png"; // Kullanılacak resim

const Puzzle = () => {
  const [pieces, setPieces] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    generatePieces();
  }, []);

  const generatePieces = () => {
    const newPieces = [];
    const rows = 3; // Puzzle için satır sayısı
    const cols = 3; // Puzzle için sütun sayısı

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newPieces.push({
          id: `${row}-${col}`,
          position: { row, col },
          correct: false,
        });
      }
    }

    setPieces(shuffle(newPieces));
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text");
    const draggedPiece = pieces.find((piece) => piece.id === draggedId);

    const updatedPieces = pieces.map((piece) => {
      if (piece.id === draggedId) return { ...piece, position: target };
      if (piece.position.row === target.row && piece.position.col === target.col)
        return { ...piece, position: draggedPiece.position };
      return piece;
    });

    setPieces(updatedPieces);
    checkCompletion(updatedPieces);
  };

  const checkCompletion = (updatedPieces) => {
    const isCompleted = updatedPieces.every(
      (piece) => piece.position.row === parseInt(piece.id.split("-")[0]) &&
                  piece.position.col === parseInt(piece.id.split("-")[1])
    );
    if (isCompleted) setCompleted(true);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text", id);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="jigsaw-puzzle">
      <h1>Jigsaw Puzzle</h1>
      {completed ? (
        <div className="win-screen">
          <Lottie animationData={WinAnimation} style={{ height: 200 }} />
          <h2>Congratulations! You completed the puzzle!</h2>
        </div>
      ) : (
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
                backgroundPosition: `${-piece.position.col * 100}px ${
                  -piece.position.row * 100
                }px`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Puzzle;
