// src/components/ChessGame.jsx
import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';

function ChessGame() {
  const [game, setGame] = useState(() => new Chess());
  const [board, setBoard] = useState(() => game.board());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [status, setStatus] = useState("White's Turn");
  const [isBotActive, setIsBotActive] = useState(false);

  const pieceSymbols = {
    p: { w: '♙', b: '♟' }, r: { w: '♖', b: '♜' }, n: { w: '♘', b: '♞' },
    b: { w: '♗', b: '♝' }, q: { w: '♕', b: '♛' }, k: { w: '♔', b: '♚' }
  };

  const getSquareName = (row, col) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return files[col] + ranks[row];
  };

  const syncState = (engine) => {
    setGame(engine);
    setBoard(engine.board());
    setSelectedSquare(null);

    if (engine.isCheckmate()) setStatus("⚠️ Checkmate! Game Over.");
    else if (engine.isDraw()) setStatus("🤝 Draw Match!");
    else if (engine.inCheck()) setStatus(`💥 Check! (${engine.turn() === 'w' ? 'White' : 'Black'}'s Turn)`);
    else setStatus(`Current Turn: ${engine.turn() === 'w' ? 'White (You)' : 'Black (AI)'}`);
  };

  // 🤖 AI Chess Logic Evaluator Loop
  useEffect(() => {
    if (game.turn() === 'b' && isBotActive && !game.isCheckmate() && !game.isDraw()) {
      const timeout = setTimeout(() => {
        const moves = game.moves({ verbose: true });
        if (moves.length === 0) return;

        // Piece value weights matrix mapping
        const weights = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 1000 };
        let topMove = moves[0];
        let highestScore = -Infinity;

        // Evaluate all legal strategic variations
        for (let move of moves) {
          let score = 0;
          if (move.captured) score += weights[move.captured] * 10;
          
          // Lookahead safety simulation
          const sim = new Chess(game.fen());
          sim.move(move);
          if (sim.isCheckmate()) score += 10000;
          if (sim.inCheck()) score += 5;

          if (score > highestScore) {
            highestScore = score;
            topMove = move;
          }
        }

        // Execute the top calculated move
        const engineCopy = new Chess(game.fen());
        engineCopy.move(topMove);
        syncState(engineCopy);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [game, isBotActive]);

  const handleSquareClick = (row, col) => {
    if (game.isCheckmate() || game.isDraw() || (game.turn() === 'b' && isBotActive)) return;
    const squareName = getSquareName(row, col);

    if (selectedSquare === null) {
      const piece = board[row][col];
      if (piece && piece.color === game.turn()) setSelectedSquare(squareName);
    } else {
      if (selectedSquare === squareName) {
        setSelectedSquare(null);
        return;
      }
      try {
        const engineCopy = new Chess(game.fen());
        const moveSuccess = engineCopy.move({ from: selectedSquare, to: squareName, promotion: 'q' });
        if (moveSuccess) syncState(engineCopy);
      } catch (error) {
        const targetPiece = board[row][col];
        if (targetPiece && targetPiece.color === game.turn()) setSelectedSquare(squareName);
        else setSelectedSquare(null);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h3 style={{ color: '#00bcd4', margin: '0 0 5px 0' }}>♟️ Click-to-Move Chess</h3>
      <p style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '0.95rem' }}>{status}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', maxWidth: '340px', margin: '0 auto 20px auto', border: '3px solid #333' }}>
        {board.map((rowArr, rowIndex) => rowArr.map((piece, colIndex) => {
          const squareName = getSquareName(rowIndex, colIndex);
          const isLight = (rowIndex + colIndex) % 2 === 0;
          const isSelected = selectedSquare === squareName;
          return (
            <button key={squareName} onClick={() => handleSquareClick(rowIndex, colIndex)} style={{
              aspectRatio: '1', backgroundColor: isSelected ? '#25D366' : isLight ? '#f0d9b5' : '#b58863',
              border: 'none', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0,
              color: piece?.color === 'w' ? '#fff' : '#000', textShadow: piece?.color === 'w' ? '1px 1px 2px #000' : 'none'
            }}>
              {piece ? pieceSymbols[piece.type][piece.color] : ''}
            </button>
          );
        }))}
      </div>

      <div>
        <button onClick={() => setIsBotActive(!isBotActive)} style={{ padding: '8px 16px', marginRight: '10px', backgroundColor: isBotActive ? '#ffc107' : '#00bcd4', border: 'none', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', color: '#000' }}>
          {isBotActive ? "Deactivate AI" : "Activate AI Bot"}
        </button>
        <button onClick={() => syncState(new Chess())} style={{ padding: '8px 16px', backgroundColor: '#dc3545', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>Reset</button>
      </div>
    </div>
  );
}

export default ChessGame;