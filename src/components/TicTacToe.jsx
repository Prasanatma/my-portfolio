import React, { useState } from 'react';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
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

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div style={{ textAlign: 'center', color: '#fff', padding: '20px' }}>
      <h3 style={{ color: '#00bcd4', marginBottom: '15px' }}>❌ Tic-Tac-Toe ⭕</h3>
      
      <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
        {winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 80px)',
        gap: '8px',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'rgba(0, 188, 212, 0.1)',
              border: '2px solid #00bcd4',
              borderRadius: '8px',
              fontSize: '2rem',
              color: value === 'X' ? '#ffc107' : '#fff',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <button 
        onClick={resetGame}
        style={{
          padding: '8px 20px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Restart Match
      </button>
    </div>
  );
}

export default TicTacToe;