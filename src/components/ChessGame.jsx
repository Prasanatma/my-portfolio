// src/components/ChessGame.jsx
import React, { useState } from 'react';
import { Chess } from 'chess.js';

function ChessGame() {
  // 1. Maintain a standard state for our board grid array and game status
  const [game, setGame] = useState(() => new Chess());
  const [board, setBoard] = useState(() => game.board());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [status, setStatus] = useState("White's Turn");

  // Helper mapping to render standard chess unicode pieces beautifully
  const pieceSymbols = {
    p: { w: '♙', b: '♟' },
    r: { w: '♖', b: '♜' },
    n: { w: '♘', b: '♞' },
    b: { w: '♗', b: '♝' },
    q: { w: '♕', b: '♛' },
    k: { w: '♔', b: '♚' }
  };

  // Convert row/col indices to standard chess algebraic coordinates (e.g., 0,0 -> 'a8')
  const getSquareName = (row, col) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return files[col] + ranks[row];
  };

  const updateEngineState = (activeEngine) => {
    setGame(activeEngine);
    setBoard(activeEngine.board());
    setSelectedSquare(null);

    // Synchronize UI notification banners
    if (activeEngine.isCheckmate()) {
      setStatus("⚠️ Checkmate! Game Over.");
    } else if (activeEngine.isDraw()) {
      setStatus("🤝 Draw Match!");
    } else if (activeEngine.inCheck()) {
      setStatus(`💥 Check! (${activeEngine.turn() === 'w' ? 'White' : 'Black'}'s Turn)`);
    } else {
      setStatus(`Current Turn: ${activeEngine.turn() === 'w' ? 'White' : 'Black'}`);
    }
  };

  const handleSquareClick = (row, col) => {
    const squareName = getSquareName(row, col);

    // Game is over, don't allow interactions
    if (game.isCheckmate() || game.isDraw()) return;

    // Step 1: Selecting a piece
    if (selectedSquare === null) {
      const piece = board[row][col];
      // Only allow selecting a piece that belongs to the active turn player
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(squareName);
      }
    } 
    // Step 2: Attempting a movement
    else {
      // If clicking the same piece twice, unselect it
      if (selectedSquare === squareName) {
        setSelectedSquare(null);
        return;
      }

      try {
        const engineCopy = new Chess(game.fen());
        const moveSuccess = engineCopy.move({
          from: selectedSquare,
          to: squareName,
          promotion: 'q' // Auto-promote to queen
        });

        if (moveSuccess) {
          updateEngineState(engineCopy);
        } else {
          setSelectedSquare(null); // Invalid move targeted, clear selection
        }
      } catch (error) {
        // If engine validation throws a rule error, check if user is trying to switch piece selection
        const targetPiece = board[row][col];
        if (targetPiece && targetPiece.color === game.turn()) {
          setSelectedSquare(squareName); // Smoothly change selection to the new piece
        } else {
          setSelectedSquare(null); // Clear broken selection completely
        }
      }
    }
  };

  const resetGame = () => {
    const freshEngine = new Chess();
    setGame(freshEngine);
    setBoard(freshEngine.board());
    setSelectedSquare(null);
    setStatus("White's Turn");
  };

  return (
    <div style={{ textAlign: 'center', color: '#fff', padding: '10px' }}>
      <h3 style={{ color: '#00bcd4', marginBottom: '5px' }}>♟️ Functional Click-to-Move Chess</h3>
      <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '15px' }}>
        Click a piece to select it (glowing green outline), then click destination square to move!
      </p>

      <p style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '1rem', color: status.includes('⚠️') || status.includes('💥') ? '#ffc107' : '#fff' }}>
        {status} {selectedSquare && <span style={{ color: '#25D366', fontSize: '0.9rem' }}>(Selected: {selectedSquare.toUpperCase()})</span>}
      </p>

      {/* 🏁 Pure Grid Chessboard Canvas Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        maxWidth: '360px',
        width: '100%',
        margin: '0 auto 25px auto',
        border: '3px solid #333',
        boxShadow: '0 0 20px rgba(0, 188, 212, 0.15)',
        backgroundColor: '#000'
      }}>
        {board.map((rowArr, rowIndex) => 
          rowArr.map((piece, colIndex) => {
            const squareName = getSquareName(rowIndex, colIndex);
            const isLightSquare = (rowIndex + colIndex) % 2 === 0;
            const isSelected = selectedSquare === squareName;

            // Background colors mapping out standard checkboards
            const baseBgColor = isLightSquare ? '#f0d9b5' : '#b58863';
            const displayBgColor = isSelected ? '#25D366' : baseBgColor; // Glowing active selection green

            return (
              <button
                key={squareName}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
                style={{
                  aspectRatio: '1', // Perfect responsive squares
                  backgroundColor: displayBgColor,
                  border: isSelected ? '2px solid #fff' : 'none',
                  fontSize: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  outline: 'none',
                  // Pure CSS injection to make piece colors text render perfectly crisp
                  color: piece && piece.color === 'w' ? '#ffffff' : '#000000',
                  textShadow: piece && piece.color === 'w' ? '1px 1px 2px #000' : 'none',
                  transition: 'background-color 0.15s'
                }}
              >
                {piece ? pieceSymbols[piece.type][piece.color] : ''}
              </button>
            );
          })
        )}
      </div>

      <button 
        onClick={resetGame}
        style={{
          padding: '10px 24px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        Reset Board
      </button>
    </div>
  );
}

export default ChessGame;