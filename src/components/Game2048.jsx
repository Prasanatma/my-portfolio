// src/components/Game2048.jsx
import React, { useState, useEffect } from 'react';

function Game2048() {
  const [board, setBoard] = useState([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  const [score, setScore] = useState(0);
  const [isBot, setIsBot] = useState(false);

  const initBoard = () => {
    let fresh = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    fresh = addTile(addTile(fresh));
    setBoard(fresh);
    setScore(0);
  };

  useEffect(() => { initBoard(); }, []);

  const addTile = (grid) => {
    let cells = [];
    for(let r=0; r<4; r++) for(let c=0; c<4; c++) if(grid[r][c] === 0) cells.push({r, c});
    if (cells.length === 0) return grid;
    const {r, c} = cells[Math.floor(Math.random() * cells.length)];
    const clone = grid.map(row => [...row]);
    clone[r][c] = Math.random() < 0.9 ? 2 : 4;
    return clone;
  };

  // Matrix manipulation logic routines
  const slideRowLeft = (row) => {
    let filtered = row.filter(val => val !== 0);
    let missing = 4 - filtered.length;
    return filtered.concat(Array(missing).fill(0));
  };

  const mergeRowLeft = (row, scoreAdder) => {
    let updated = [...row];
    for (let i = 0; i < 3; i++) {
      if (updated[i] !== 0 && updated[i] === updated[i+1]) {
        updated[i] *= 2;
        if(scoreAdder) scoreAdder(updated[i]);
        updated[i+1] = 0;
      }
    }
    return updated;
  };

  const rotateMatrixClockwise = (grid) => {
    let result = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        result[c][3 - r] = grid[r][c];
      }
    }
    return result;
  };

  const executeMoveAction = (grid, direction, scoreAdder) => {
    let current = grid.map(row => [...row]);
    let rotations = direction === 'left' ? 0 : direction === 'down' ? 1 : direction === 'right' ? 2 : 3;
    
    for (let i = 0; i < rotations; i++) current = rotateMatrixClockwise(current);
    
    for (let r = 0; r < 4; r++) {
      let step1 = slideRowLeft(current[r]);
      let step2 = mergeRowLeft(step1, scoreAdder);
      current[r] = slideRowLeft(step2);
    }
    
    let unRotations = (4 - rotations) % 4;
    for (let i = 0; i < unRotations; i++) current = rotateMatrixClockwise(current);
    return current;
  };

  const handlePlayerMove = (dir) => {
    if (isBot) return;
    let localScore = 0;
    const nextGrid = executeMoveAction(board, dir, (amt) => { localScore += amt; });
    if (JSON.stringify(board) !== JSON.stringify(nextGrid)) {
      setBoard(addTile(nextGrid));
      setScore(s => s + localScore);
    }
  };

  // 🤖 AI Evaluator: High-Score heuristic weight calculator
  const calculateHeuristicWeight = (grid) => {
    let scoreMultiplier = 0;
    const weightGrid = [
      [2048, 1024, 512, 256],
      [16,   32,   64,  128],
      [8,    4,    2,   1  ],
      [0,    0,    0,   0  ]
    ];
    for(let r=0; r<4; r++) {
      for(let c=0; c<4; c++) {
        scoreMultiplier += grid[r][c] * weightGrid[r][c];
      }
    }
    return scoreMultiplier;
  };

  // Run AI bot clock interval loop
  useEffect(() => {
    if (!isBot) return;
    const interval = setInterval(() => {
      const moves = ['left', 'up', 'right', 'down'];
      let topMove = 'left';
      let maxScore = -1;

      for (let m of moves) {
        const sim = executeMoveAction(board, m, null);
        if (JSON.stringify(board) !== JSON.stringify(sim)) {
          const rating = calculateHeuristicWeight(sim);
          if (rating > maxScore) {
            maxScore = rating;
            topMove = m;
          }
        }
      }

      if (maxScore !== -1) {
        let points = 0;
        const target = executeMoveAction(board, topMove, (p) => points += p);
        setBoard(addTile(target));
        setScore(s => s + points);
      } else {
        setIsBot(false); // No moves remain, halt bot
      }
    }, 150);

    return () => clearInterval(interval);
  }, [board, isBot]);

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h3 style={{ color: '#00bcd4', margin: '0 0 5px 0' }}>🔢 2048 Corner Heuristic Engine</h3>
      <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '15px' }}>
        Score: <b style={{ color: '#ffc107' }}>{score}</b>
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', maxWidth: '280px', margin: '0 auto', padding: '10px', backgroundColor: '#222', borderRadius: '6px' }}>
        {board.map((row, r) => row.map((val, c) => (
          <div key={`${r}-${c}`} style={{
            aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: val === 0 ? '#333' : val === 2 ? '#eee4da' : val === 4 ? '#ede0c8' : val === 8 ? '#f2b179' : val === 16 ? '#f59563' : '#f67c5f',
            color: val === 0 ? 'transparent' : '#000', fontWeight: 'bold', fontSize: '1.2rem', borderRadius: '4px'
          }}>{val}</div>
        )))}
      </div>

      <div style={{ marginTop: '15px' }}>
        <button onClick={() => setIsBot(!isBot)} style={{ padding: '8px 16px', marginRight: '10px', backgroundColor: isBot ? '#ffc107' : '#00bcd4', border: 'none', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          {isBot ? "Stop AI" : "Run AI Bot Solver"}
        </button>
        <button onClick={initBoard} style={{ padding: '8px 16px', backgroundColor: '#dc3545', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>Reset</button>
      </div>

      {!isBot && (
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '5px' }}>
          <button onClick={() => handlePlayerMove('up')} style={{ padding: '4px 10px' }}>▲</button>
          <button onClick={() => handlePlayerMove('left')} style={{ padding: '4px 10px' }}>◀</button>
          <button onClick={() => handlePlayerMove('down')} style={{ padding: '4px 10px' }}>▼</button>
          <button onClick={() => handlePlayerMove('right')} style={{ padding: '4px 10px' }}>▶</button>
        </div>
      )}
    </div>
  );
}

export default Game2048;