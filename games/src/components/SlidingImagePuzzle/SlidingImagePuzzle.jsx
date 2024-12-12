/* import React, { useState } from "react";
import "./slidingImagePuzzle.css";

const SlidingImagePuzzle = ({ image }) => {
  // Initialize a 3x3 grid with numbers 0-8, representing the tiles
  const [grid, setGrid] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  // Shuffle tiles when the component mounts
  React.useEffect(() => {
    shuffleGrid();
  }, []);

  const shuffleGrid = () => {
    let shuffled = [...grid].sort(() => Math.random() - 0.5);
    setGrid(shuffled);
  };

  // Check if the game is solved
  const isSolved = () => {
    return JSON.stringify(grid) === JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  };

  // Handle a tile click to move it
  const handleTileClick = (index) => {
    const emptyIndex = grid.indexOf(8); // Find the empty space (tile 8 represents the blank space)
    const validMoves = [
      emptyIndex - 3,
      emptyIndex + 3,
      emptyIndex % 3 !== 0 ? emptyIndex - 1 : -1,
      emptyIndex % 3 !== 2 ? emptyIndex + 1 : -1,
    ];

    if (validMoves.includes(index)) {
      const newGrid = [...grid];
      [newGrid[emptyIndex], newGrid[index]] = [newGrid[index], newGrid[emptyIndex]];
      setGrid(newGrid);
    }
  };

  return (
    <div>
      <h1>Sliding Image Puzzle</h1>
      <div className="puzzle-grid">
        {grid.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile === 8 ? "empty" : ""}`}
            onClick={() => handleTileClick(index)}
            style={{
                backgroundImage: tile !== 8 ? `url(${image})` : "none",
                backgroundPosition: `${(tile % 3) * -100}px ${(Math.floor(tile / 3) * -100)}px`,
              }}              
          >
            {tile !== 8 && <span>{tile}</span>}
          </div>
        ))}
      </div>
      {isSolved() && <div className="solved">Congratulations! Puzzle Solved!</div>}
      <button onClick={shuffleGrid}>Shuffle</button>
    </div>
  );
};

export default SlidingImagePuzzle;
*/
import React, { useState } from 'react';
import './SlidingImagePuzzle.css';
import puzzleImage from './puzzleImage.png';

const Puzzle = () => {
  // Image for the puzzle (use a 3x3 image, for now, we will use placeholder values)
  const imageUrl = puzzleImage; // Placeholder image

  // Create a 3x3 grid (9 cells) for the puzzle
  const createPuzzle = () => {
    let numbers = Array.from({ length: 9 }, (_, index) => index); // [0, 1, 2, ..., 8]
    numbers = shuffle(numbers); // Shuffle to make it random
    return numbers;
  };

  const shuffle = (array) => {
    // Simple shuffle function to randomize the array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [puzzle, setPuzzle] = useState(createPuzzle());
  const [emptyIndex, setEmptyIndex] = useState(puzzle.indexOf(0)); // The position of the empty space (0)

  const moveTile = (index) => {
    // Check if the tile is adjacent to the empty space
    const adjacentIndices = [
      emptyIndex - 3, // above
      emptyIndex + 3, // below
      emptyIndex - 1, // left
      emptyIndex + 1, // right
    ];

    if (adjacentIndices.includes(index)) {
      const newPuzzle = [...puzzle];
      newPuzzle[emptyIndex] = newPuzzle[index];
      newPuzzle[index] = 0; // Move the tile to the empty space
      setPuzzle(newPuzzle);
      setEmptyIndex(index);
    }
  };

  const checkWin = () => {
    // Check if the puzzle is in the solved state
    return puzzle.every((value, index) => value === index);
  };

  const renderTile = (index) => {
    if (puzzle[index] === 0) {
      return <div className="tile empty"></div>;
    }

    const row = Math.floor(puzzle[index] / 3);
    const col = puzzle[index] % 3;

    return (
      <div
        className="tile"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: `-${col * 100}px -${row * 100}px`,
        }}
        onClick={() => moveTile(index)}
      ></div>
    );
  };

  return (
    <div className="puzzle">
      <div className="grid">
        {puzzle.map((_, index) => renderTile(index))}
      </div>
      {checkWin() && <div className="win-message">You Win!</div>}
    </div>
  );
};

export default Puzzle;
