// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import TicTacToe from './components/TicTacToe';
import ChessGame from './components/ChessGame';
import SnakeGame from './components/SnakeGame';
import Game2048 from './components/Game2048';
import Minesweeper from './components/Minesweeper';
import ConnectFour from './components/ConnectFour';
import { careerData } from './careerData'; 

function App() {
  const [activeGame, setActiveGame] = useState('none');

  const appStyle = {
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#ffffff', minHeight: '100vh', width: '100vw', position: 'relative', margin: 0, padding: 0, overflowX: 'hidden', backgroundColor: '#06060f', 
  };

  const animatedBgStyle = {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1,
    backgroundImage: `linear-gradient(rgba(0, 188, 212, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 188, 212, 0.04) 1px, transparent 1px)`,
    backgroundSize: '40px 40px', backgroundPosition: 'center', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.3))',
  };

  const tabButtonStyle = (gameType) => ({
    padding: '10px 16px',
    backgroundColor: activeGame === gameType ? '#00bcd4' : 'rgba(255,255,255,0.03)',
    color: activeGame === gameType ? '#000' : '#fff',
    border: '1px solid #00bcd4', borderRadius: '4px', margin: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem'
  });

  return (
    <div style={appStyle}>
      <div style={animatedBgStyle}></div>

      <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Header />
        <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '40px 0' }} />
        
        {/* 🕹️ The Extended Arcade Dashboard Center Room */}
        <section style={{ textAlign: 'center', marginBottom: '50px', backgroundColor: 'rgba(255,255,255,0.01)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(0, 188, 212, 0.08)' }}>
          <h2 style={{ color: '#fff', marginBottom: '15px' }}>🕹️ Immersive AI Playground</h2>
          <p style={{ color: '#aaa', marginBottom: '20px', fontSize: '0.9rem' }}>Select a simulation build below to mount its dedicated full-screen engine.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '650px', margin: '0 auto' }}>
            <button onClick={() => setActiveGame('tictactoe')} style={tabButtonStyle('tictactoe')}>❌ Tic-Tac-Toe</button>
            <button onClick={() => setActiveGame('chess')} style={tabButtonStyle('chess')}>♟️ Chess</button>
            <button onClick={() => setActiveGame('snake')} style={tabButtonStyle('snake')}>🐍 Snake (BFS)</button>
            <button onClick={() => setActiveGame('2048')} style={tabButtonStyle('2048')}>🔢 2048 Matrix</button>
            <button onClick={() => setActiveGame('minesweeper')} style={tabButtonStyle('minesweeper')}>💣 Minesweeper</button>
            <button onClick={() => setActiveGame('connectfour')} style={tabButtonStyle('connectfour')}>🔵 Connect 4</button>
          </div>
        </section>

        {/* Immersive Theater Layer Screen Portal */}
        {activeGame !== 'none' && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(5, 5, 12, 0.98)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', padding: '20px', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '15px', width: '100%', maxWidth: '450px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setActiveGame('none')} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>✕ Close Simulation</button>
            </div>
            <div style={{ backgroundColor: '#0c0c1a', padding: '25px', borderRadius: '12px', border: '1px solid rgba(0, 188, 212, 0.15)', boxShadow: '0 10px 40px rgba(0,0,0,0.8)', width: '100%', maxWidth: '450px' }}>
              {activeGame === 'tictactoe' && <TicTacToe />}
              {activeGame === 'chess' && <ChessGame />}
              {activeGame === 'snake' && <SnakeGame />}
              {activeGame === '2048' && <Game2048 />}
              {activeGame === 'minesweeper' && <Minesweeper />}
              {activeGame === 'connectfour' && <ConnectFour />}
            </div>
          </div>
        )}

        <Timeline data={careerData} />
      </div>
    </div>
  );
}

export default App;