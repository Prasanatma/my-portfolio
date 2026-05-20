// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import TicTacToe from './components/TicTacToe';
import ChessGame from './components/ChessGame';
import { careerData } from './careerData'; 

function App() {
  const [activeGame, setActiveGame] = useState('none');

  const appStyle = {
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#ffffff',
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    backgroundColor: '#06060f', 
  };

  const animatedBgStyle = {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1,
    backgroundImage: `linear-gradient(rgba(0, 188, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 188, 212, 0.05) 1px, transparent 1px)`,
    backgroundSize: '40px 40px', backgroundPosition: 'center',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.3))',
  };

  const tabButtonStyle = (gameType) => ({
    padding: '12px 24px',
    backgroundColor: activeGame === gameType ? '#00bcd4' : 'rgba(255,255,255,0.05)',
    color: activeGame === gameType ? '#000' : '#fff',
    border: '1px solid #00bcd4',
    borderRadius: '4px',
    margin: '0 10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '1rem'
  });

  // 📺 ⚡ THE IMMERSIVE THEATER MODE OVERLAY STYLING
  const fullScreenOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(6, 6, 15, 0.98)', // Dark frosted background masking the portfolio
    zIndex: 9999, // Layering priority sits over everything on screen
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto', // Allows scrolling inside the game if a screen is tiny
    padding: '20px',
    boxSizing: 'border-box',
    animation: 'fadeIn 0.3s ease-in-out'
  };

  return (
    <div style={appStyle}>
      <div style={animatedBgStyle}></div>

      {/* Injecting a quick keyframe style block directly for a smooth screen transition */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div style={{ padding: '80px 20px', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Header />
        
        <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '40px 0' }} />
        
        {/* 🕹️ The Main Arcade Section Menu */}
        <section style={{ 
          textAlign: 'center', 
          marginBottom: '50px', 
          backgroundColor: 'rgba(255,255,255,0.02)', 
          padding: '30px', 
          borderRadius: '12px', 
          border: '1px solid rgba(0, 188, 212, 0.1)' 
        }}>
          <h2 style={{ color: '#fff', marginBottom: '20px' }}>🕹️ Developer Playground</h2>
          <p style={{ color: '#aaa', marginBottom: '25px', fontSize: '0.95rem' }}>
            Select a game to launch into an immersive full-screen experience.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => setActiveGame('tictactoe')} style={tabButtonStyle('tictactoe')}>Play Tic-Tac-Toe</button>
            <button onClick={() => setActiveGame('chess')} style={tabButtonStyle('chess')}>Play Chess</button>
          </div>
        </section>

        {/* Dynamic Conditional Theater Layer Injection */}
        {activeGame !== 'none' && (
          <div style={fullScreenOverlayStyle}>
            {/* Immersive Floating Close Header */}
            <div style={{ marginBottom: '20px', width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setActiveGame('none')} 
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(220, 53, 69, 0.3)'
                }}
              >
                ✕ Close Game
              </button>
            </div>

            {/* Active Core Game Mounting Space */}
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.02)', 
              padding: '25px', 
              borderRadius: '12px', 
              border: '1px solid rgba(0, 188, 212, 0.2)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
              width: '100%',
              maxWidth: '450px'
            }}>
              {activeGame === 'tictactoe' && <TicTacToe />}
              {activeGame === 'chess' && <ChessGame />}
            </div>
          </div>
        )}

        <Timeline data={careerData} />
      </div>
    </div>
  );
}

export default App;