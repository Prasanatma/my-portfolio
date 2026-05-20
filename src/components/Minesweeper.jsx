// src/components/Minesweeper.jsx
import React, { useState, useEffect } from 'react';

const SIZE = 8;
const MINES_COUNT = 10;

function Minesweeper() {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  const initGame = () => {
    // Build empty matrix array map
    let cells = Array(SIZE).fill(null).map(() => Array(SIZE).fill(null).map(() => ({
      isMine: false, count: 0, isRevealed: false, isFlagged: false
    })));

    // Deploy mines randomly
    let placed = 0;
    while (placed < MINES_COUNT) {
      const r = Math.floor(Math.random() * SIZE);
      const c = Math.floor(Math.random() * SIZE);
      if (!cells[r][c].isMine) {
        cells[r][c].isMine = true;
        placed++;
      }
    }

    // Pre-calculate proximity counts
    for(let r=0; r<SIZE; r++) {
      for(let c=0; c<SIZE; c++) {
        if(cells[r][c].isMine) continue;
        let count = 0;
        for(let i=-1; i<=1; i++) {
          for(let j=-1; j<=1; j++) {
            if(cells[r+i]?.[c+j]?.isMine) count++;
          }
        }
        cells[r][c].count = count;
      }
    }
    setGrid(cells);
    setGameOver(false);
    setVictory(false);
  };

  useEffect(() => { initGame(); }, []);

  // Recursive Flood-Fill Algorithm
  const revealCell = (gridSnapshot, r, c) => {
    if (!gridSnapshot[r]?.[c] || gridSnapshot[r][c].isRevealed || gridSnapshot[r][c].isFlagged) return;
    gridSnapshot[r][c].isRevealed = true;

    if (gridSnapshot[r][c].count === 0 && !gridSnapshot[r][c].isMine) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          revealCell(gridSnapshot, r + i, c + j);
        }
      }
    }
  };

  const handleLeftClick = (r, c) => {
    if (gameOver || victory || grid[r][c].isFlagged) return;
    let clone = grid.map(row => row.map(cell => ({...cell})));

    if (clone[r][c].isMine) {
      setGameOver(true);
      return;
    }

    revealCell(clone, r, c);
    checkMatchStatus(clone);
    setGrid(clone);
  };

  const handleRightClick = (e, r, c) => {
    e.preventDefault();
    if (gameOver || victory || grid[r][c].isRevealed) return;
    let clone = grid.map(row => row.map(cell => ({...cell})));
    clone[r][c].isFlagged = !clone[r][c].isFlagged;
    setGrid(clone);
  };

  const checkMatchStatus = (currentGrid) => {
    let unrevealedSafeCells = 0;
    for(let r=0; r<SIZE; r++) {
      for(let c=0; c<SIZE; c++) {
        if(!currentGrid[r][c].isMine && !currentGrid[r][c].isRevealed) unrevealedSafeCells++;
      }
    }
    if (unrevealedSafeCells === 0) setVictory(true);
  };

  // 🤖 AI Probability Constraint Engine Execution Layer
  const runAiAnalysisStep = () => {
    if (gameOver || victory) return;
    let clone = grid.map(row => row.map(cell => ({...cell})));
    let actionExecuted = false;

    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (!clone[r][c].isRevealed || clone[r][c].count === 0) continue;

        let neighbors = [];
        let hidden = [];
        let flags = 0;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const nr = r + i, nc = c + j;
            if (clone[nr]?.[nc]) {
              neighbors.push({ r: nr, c: nc });
              if (clone[nr][nc].isFlagged) flags++;
              else if (!clone[nr][nc].isRevealed) hidden.push({ r: nr, c: nc });
            }
          }
        }

        // Rule A: If remaining hidden cells match the mine count, they must be mines -> Flag them
        if (clone[r][c].count === hidden.length + flags && hidden.length > 0) {
          hidden.forEach(cell => { clone[cell.r][cell.c].isFlagged = true; });
          actionExecuted = true;
        }
        // Rule B: If flagged matches mine count, remaining hidden cells are safe -> Reveal them
        else if (clone[r][c].count === flags && hidden.length > 0) {
          hidden.forEach(cell => { revealCell(clone, cell.r, cell.c); });
          actionExecuted = true;
        }

        if (actionExecuted) break;
      }
      if (actionExecuted) break;
    }

    // Fallback Guessing Logic
    if (!actionExecuted) {
      let blindCells = [];
      for(let r=0; r<SIZE; r++) for(let c=0; c<SIZE; c++) if(!clone[r][c].isRevealed && !clone[r][c].isFlagged) blindCells.push({r,c});
      if(blindCells.length > 0) {
        const target = blindCells[Math.floor(Math.random() * blindCells.length)];
        if(clone[target.r][target.c].isMine) setGameOver(true);
        else { revealCell(clone, target.r, target.c); checkMatchStatus(clone); }
      }
    }
    setGrid(clone);
  };

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h3 style={{ color: '#00bcd4', margin: '0 0 5px 0' }}>💣 Minesweeper (Recursive Sweeper)</h3>
      <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
        {gameOver ? <span style={{color: '#dc3545'}}>💥 Detonated! Game Over.</span> : victory ? <span style={{color: '#25D366'}}>🏆 Secure Clear!</span> : "Right Click to Flag 🚩"}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${SIZE}, 35px)`, gap: '4px', justifyContent: 'center' }}>
        {grid.map((row, r) => row.map((cell, c) => (
          <button key={`${r}-${c}`} onClick={() => handleLeftClick(r, c)} onContextMenu={(e) => handleRightClick(e, r, c)} style={{
            width: '35px', height: '35px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', border: 'none', borderRadius: '4px',
            backgroundColor: cell.isRevealed ? '#444' : '#222', color: cell.isMine && cell.isRevealed ? '#dc3545' : '#00bcd4'
          }}>
            {cell.isFlagged ? '🚩' : cell.isRevealed ? (cell.isMine ? '💣' : cell.count || '') : ''}
          </button>
        )))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={runAiAnalysisStep} style={{ padding: '8px 16px', marginRight: '10px', backgroundColor: '#ffc107', border: 'none', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          Trigger AI Move
        </button>
        <button onClick={initGame} style={{ padding: '8px 16px', backgroundColor: '#dc3545', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Minesweeper;