// src/components/SnakeGame.jsx
import React, { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 20;

function SnakeGame() {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([5, 5]);
  const [dir, setDir] = useState([0, -1]); // Starting up
  const [isBot, setIsBot] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gameLoopRef = useRef(null);

  // Generate random food coordinates
  const generateFood = (currentSnake) => {
    while (true) {
      const newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ];
      if (!currentSnake.some(s => s[0] === newFood[0] && s[1] === newFood[1])) {
        return newFood;
      }
    }
  };

  // Keyboard controls for manual mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isBot) return;
      switch (e.key) {
        case 'ArrowUp': if (dir[1] !== 1) setDir([0, -1]); break;
        case 'ArrowDown': if (dir[1] !== -1) setDir([0, 1]); break;
        case 'ArrowLeft': if (dir[0] !== 1) setDir([-1, 0]); break;
        case 'ArrowRight': if (dir[0] !== -1) setDir([1, 0]); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dir, isBot]);

  // 🤖 AI BFS Engine: Find the shortest safe vector sequence to food
  const getBotDirection = (head, target, body) => {
    const queue = [[head, []]];
    const visited = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));
    body.forEach(b => { visited[b[1]][b[0]] = true; });

    const moves = [[0, -1], [0, 1], [-1, 0], [1, 0]]; // Up, Down, Left, Right

    while (queue.length > 0) {
      const [[cx, cy], path] = queue.shift();

      if (cx === target[0] && cy === target[1]) {
        return path[0] || dir;
      }

      for (let [mx, my] of moves) {
        const nx = cx + mx;
        const ny = cy + my;

        if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
          if (!visited[ny][nx]) {
            visited[ny][nx] = true;
            queue.push([[nx, ny], [...path, [mx, my]]]);
          }
        }
      }
    }

    // Fallback: If trapped, try any open space adjacent to head
    for (let [mx, my] of moves) {
      const nx = head[0] + mx;
      const ny = head[1] + my;
      if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
        if (!body.some(b => b[0] === nx && b[1] === ny)) return [mx, my];
      }
    }
    return dir;
  };

  useEffect(() => {
    if (gameOver) return;

    gameLoopRef.current = setInterval(() => {
      setSnake(prevSnake => {
        let currentDir = dir;
        const head = prevSnake[0];

        if (isBot) {
          currentDir = getBotDirection(head, food, prevSnake);
          setDir(currentDir);
        }

        const newHead = [head[0] + currentDir[0], head[1] + currentDir[1]];

        // Wall collisions
        if (newHead[0] < 0 || newHead[0] >= GRID_SIZE || newHead[1] < 0 || newHead[1] >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }
        // Self collisions
        if (prevSnake.some(b => b[0] === newHead[0] && b[1] === newHead[1])) {
          setGameOver(true);
          return prevSnake;
        }

        const updatedSnake = [newHead, ...prevSnake];

        // Eat food hook
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(s => s + 1);
          setFood(generateFood(updatedSnake));
        } else {
          updatedSnake.pop();
        }

        return updatedSnake;
      });
    }, isBot ? 60 : 120); // Bots run at higher calculation speeds

    return () => clearInterval(gameLoopRef.current);
  }, [food, dir, isBot, gameOver]);

  const resetGame = () => {
    setSnake([[10, 10]]);
    setFood([5, 5]);
    setDir([0, -1]);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h3 style={{ color: '#00bcd4', margin: '0 0 10px 0' }}>🐍 Snake (BFS Pathfinding Engine)</h3>
      <p style={{ fontSize: '0.9rem', color: '#aaa', margin: '0 0 15px 0' }}>
        Score: <b style={{ color: '#ffc107' }}>{score}</b> | Mode: {isBot ? '🤖 AI Auto-Pilot' : '🎮 Keyboard Arrows'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 15px)`, width: `${GRID_SIZE * 15}px`, margin: '0 auto', border: '2px solid #333', backgroundColor: '#111' }}>
        {Array(GRID_SIZE).fill(null).map((_, y) => 
          Array(GRID_SIZE).fill(null).map((_, x) => {
            const isSnake = snake.some(s => s[0] === x && s[1] === y);
            const isHead = snake[0][0] === x && snake[0][1] === y;
            const isFood = food[0] === x && food[1] === y;

            return (
              <div key={`${x}-${y}`} style={{
                width: '15px', height: '15px',
                backgroundColor: isHead ? '#ffc107' : isSnake ? '#25D366' : isFood ? '#dc3545' : 'transparent',
                borderRadius: isFood ? '50%' : '0'
              }} />
            );
          })
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setIsBot(!isBot)} style={{ padding: '8px 16px', marginRight: '10px', backgroundColor: isBot ? '#ffc107' : '#00bcd4', border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          {isBot ? "Deactivate AI" : "Activate AI Bot"}
        </button>
        <button onClick={resetGame} style={{ padding: '8px 16px', backgroundColor: '#dc3545', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default SnakeGame;