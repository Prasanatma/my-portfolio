// src/components/ConnectFour.jsx
import React, { useState, useEffect } from 'react';

const ROWS = 6;
const COLS = 7;

function ConnectFour() {
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
  const [isYellowTurn, setIsYellowTurn] = useState(true); // True = Player (Yellow), False = AI (Red)
  const [winner, setWinner] = useState(null);
  const [isBotActive, setIsBotActive] = useState(false);

  const checkLine = (a, b, c, d) => (a && a === b && a === c && a === d);

  const evaluateWinner = (grid) => {
    // Horizontal Check
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS - 3; c++) if (checkLine(grid[r][c], grid[r][c+1], grid[r][c+2], grid[r][c+3])) return grid[r][c];
    // Vertical Check
    for (let r = 0; r < ROWS - 3; r++) for (let c = 0; c < COLS; c++) if (checkLine(grid[r][c], grid[r+1][c], grid[r+2][c], grid[r+3][c])) return grid[r][c];
    // Diagonal down-right
    for (let r = 0; r < ROWS - 3; r++) for (let c = 0; c < COLS - 3; c++) if (checkLine(grid[r][c], grid[r+1][c+1], grid[r+2][c+2], grid[r+3][c+3])) return grid[r][c];
    // Diagonal up-right
    for (let r = 3; r < ROWS; r++) for (let c = 0; c < COLS - 3; c++) if (checkLine(grid[r][c], grid[r-1][c+1], grid[r-2][c+2], grid[r-3][c+3])) return grid[r][c];
    
    return null;
  };

  const executeGravityDrop = (grid, colIndex, discColor) => {
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!grid[r][colIndex]) {
        grid[r][colIndex] = discColor;
        return true;
      }
    }
    return false;
  };

  const handleColumnClick = (c) => {
    if (winner || (!isYellowTurn && isBotActive)) return;
    let clone = board.map(row => [...row]);
    if (executeGravityDrop(clone, c, '💛')) {
      const matchWinner = evaluateWinner(clone);
      setBoard(clone);
      if (matchWinner) setWinner(matchWinner);
      else setIsYellowTurn(false);
    }
  };

  // 🤖 AI Defensive/Offensive Strategy Loop
  useEffect(() => {
    if (isYellowTurn || winner || !isBotActive) return;

    const timeout = setTimeout(() => {
      let clone = board.map(row => [...row]);
      let targetColumn = -1;

      // Rule 1: Check if AI can win on this move
      for (let c = 0; c < COLS; c++) {
        let sim = board.map(row => [...row]);
        if (executeGravityDrop(sim, c, '❤️') && evaluateWinner(sim) === '❤️') {
          targetColumn = c; break;
        }
      }

      // Rule 2: Check if Human can win on next turn -> Block them
      if (targetColumn === -1) {
        for (let c = 0; c < COLS; c++) {
          let sim = board.map(row => [...row]);
          if (executeGravityDrop(sim, c, '💛') && evaluateWinner(sim) === '💛') {
            targetColumn = c; break;
          }
        }
      }

      // Fallback: Pick first available column
      if (targetColumn === -1) {
        let validCols = [];
        for (let c = 0; c < COLS; c++) if (!board[0][c]) validCols.push(c);
        targetColumn = validCols[Math.floor(Math.random() * validCols.length)];
      }

      if (targetColumn !== undefined && executeGravityDrop(clone, targetColumn, '❤️')) {
        const matchWinner = evaluateWinner(clone);
        setBoard(clone);
        if (matchWinner) setWinner(matchWinner);
        else setIsYellowTurn(true);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [isYellowTurn, board, winner, isBotActive]);

  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    setIsYellowTurn(true);
    setWinner(null);
  };

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h3 style={{ color: '#00bcd4', margin: '0 0 5px 0' }}>🔵 Connect Four (Gravity Engine)</h3>
      <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
        {winner ? <b style={{color: '#25D366'}}>Winner: {winner === '💛' ? 'You!' : 'AI Bot'}</b> : `Current Turn: ${isYellowTurn ? '💛 Yellow (You)' : '❤️ Red (AI Engine)'}`}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', maxWidth: '320px', margin: '0 auto', padding: '10px', backgroundColor: '#0055ff', borderRadius: '8px' }}>
        {board.map((row, r) => row.map((cell, c) => (
          <div key={`${r}-${c}`} onClick={() => handleColumnClick(c)} style={{
            aspectRatio: '1', backgroundColor: cell ? 'transparent' : '#06060f', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', cursor: 'pointer'
          }}>{cell}</div>
        )))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setIsBotActive(!isBotActive)} style={{ padding: '8px 16px', marginRight: '10px', backgroundColor: isBotActive ? '#ffc107' : '#00bcd4', border: 'none', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          {isBotActive ? "Disable Bot AI" : "Enable Bot AI Mode"}
        </button>
        <button onClick={resetGame} style={{ padding: '8px 16px', backgroundColor: '#dc3545', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default ConnectFour;