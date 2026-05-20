// src/components/TicTacToe.jsx
import React, { useState, useEffect } from 'react';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Player = X, AI = O
  const [isBotMode, setIsBotMode] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  // 🤖 The Unbeatable Minimax Recursive Search Engine
  const minimax = (squares, depth, isMaximizing) => {
    const currentWinner = calculateWinner(squares);
    if (currentWinner === 'O') return 10 - depth; // AI wins
    if (currentWinner === 'X') return depth - 10; // Player wins
    if (squares.every(s => s !== null)) return 0;  // Draw

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          let score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          let score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // Automated trigger loop when it is the AI's turn
  useEffect(() => {
    if (!isXNext && isBotMode && !winner && !isDraw) {
      const timeout = setTimeout(() => {
        let bestScore = -Infinity;
        let bestMove = -1;
        let boardClone = [...board];

        for (let i = 0; i < 9; i++) {
          if (boardClone[i] === null) {
            boardClone[i] = 'O';
            let score = minimax(boardClone, 0, false);
            boardClone[i] = null;
            if (score > bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }

        if (bestMove !== -1) {
          const finalBoard = [...board];
          finalBoard[bestMove] = 'O';
          setBoard(finalBoard);
          setIsXNext(true);
        }
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [isXNext, isBotMode, board, winner, isDraw]);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw || (!isXNext && isBotMode)) return;
    const newBoard = [...board];
    newBoard[index] = 'X'; // Human plays X
    setBoard(newBoard);
    setIsXNext(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h3 style={{ color: '#00bcd4', marginBottom: '10px' }}>❌ Minimax Tic-Tac-Toe ⭕</h3>
      
      <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
        {winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : `Next Player: ${isXNext ? '❌ You' : '⭕ AI Engine'}`}
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: '8px', justifyContent: 'center', marginBottom: '20px'
      }}>
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: '80px', height: '80px', backgroundColor: 'rgba(0, 188, 212, 0.05)',
              border: '2px solid #00bcd4', borderRadius: '8px', fontSize: '2rem',
              color: value === 'X' ? '#25D366' : '#ffc107', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <div>
        <button onClick={() => setIsBotMode(!isBotMode)} style={{ padding: '8px 16px', marginRight: '10px', backgroundColor: isBotMode ? '#ffc107' : '#00bcd4', border: 'none', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', color: '#000' }}>
          {isBotMode ? "Deactivate AI" : "Activate AI Bot"}
        </button>
        <button onClick={resetGame} style={{ padding: '8px 16px', backgroundColor: '#dc3545', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;