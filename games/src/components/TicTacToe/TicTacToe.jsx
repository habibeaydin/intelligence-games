import React, { useState } from 'react';
import './tictactoe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 grid
  const [isXNext, setIsXNext] = useState(true); // Turn tracker
  const [winner, setWinner] = useState(null); // Game result

  const handleClick = (index) => {
    if (board[index] || winner) return; //hücre doluysa veya oyun bitmişse işlem yapma

    const newBoard = [...board]; //// Mevcut tahtayı kopyala
    newBoard[index] = isXNext ? 'X' : 'O';  
    setBoard(newBoard);
    setIsXNext(!isXNext);

    checkWinner(newBoard);
  };

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        return;
      }
    }

    if (newBoard.every((cell) => cell)) setWinner('Draw'); // No winner, all cells filled
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  return (
    <div className="tictactoe-container">
      <h1 className='ttt-h1'>Tic Tac Toe</h1>
      {winner && <h2>{winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`}</h2>}
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell ? 'occupied' : ''}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default TicTacToe;
