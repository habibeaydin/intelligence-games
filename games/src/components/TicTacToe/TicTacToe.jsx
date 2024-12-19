import React, { useState, useEffect, useRef } from "react";
import "./TicTacToe.css";
import Lottie from "lottie-react";
import WinAnimation from "../../assets/win.json";
import DrawAnimation from "../../assets/draw.json";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Oyuncu mu?
  const [winner, setWinner] = useState(null);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  // Zamanlayıcı
  useEffect(() => {
    if (!winner) {
      timerRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [winner]);

  // Oyuncunun hamlesi
  const handleClick = (index) => {
    if (board[index] || winner || !isPlayerTurn) return;

    makeMove(index, "X"); // Oyuncu "X" yapar
    setIsPlayerTurn(false); // PC sırası
  };

  // Hamle yapma
  const makeMove = (index, symbol) => {
    const newBoard = [...board];
    newBoard[index] = symbol;
    setBoard(newBoard);
    checkWinner(newBoard);
  };

  // Bilgisayarın hamlesi
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const emptyCells = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((index) => index !== null);

      if (emptyCells.length > 0) {
        const randomIndex =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        setTimeout(() => {
          makeMove(randomIndex, "O"); // PC "O" yapar
          setIsPlayerTurn(true); // Oyuncu sırası
        }, 500); // PC hamlesi gecikmeli olsun
      }
    }
  }, [isPlayerTurn, board, winner]);

  // Kazananı kontrol et
  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (board.every((cell) => cell)) {
      setWinner("Draw");
    }
  };

  // Oyunu sıfırla
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setTime(0);
    clearInterval(timerRef.current);
  };

  return (
    <div className="tictactoe-game">
      <h1 className="tictactoe-title">Tic Tac Toe</h1>
      <div className="game-container">
        <div className="game-stats-inline">
          <p>Player: X</p>
          <p>Time: {time} sec</p>
        </div>
        {winner ? (
          <div className="win-screen">
            <Lottie
              animationData={winner === "Draw" ? DrawAnimation : WinAnimation}
              style={{ height: 200 }}
            />
            <h2>
              {winner === "Draw"
                ? "It's a Draw!"
                : `Congratulations! Winner: ${winner}`}
            </h2>
            <button onClick={resetGame} className="reset-button">
              Play Again
            </button>
          </div>
        ) : (
          <div className="board-grid">
            {board.map((cell, index) => (
              <div
                key={index}
                className="board-cell"
                onClick={() => handleClick(index)}
              >
                {cell}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
