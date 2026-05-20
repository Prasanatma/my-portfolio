// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import { careerData } from './careerData'; 

function App() {
  // Pointing directly to public/coding-bg.mp4
  const backgroundVideoUrl = '/coding-bg.mp4'; 

  const appStyle = {
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#ffffff',
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    backgroundColor: '#0a0a16', // Deep background fallback
  };

  const videoBackgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(30%) contrast(120%) saturate(90%)', 
    zIndex: -1,
  };

  const contentContainerStyle = {
    padding: '80px 20px',
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative', 
    zIndex: 1, 
  };

  return (
    <div style={appStyle}>
      {/* Optimized Video element to bypass strict browser playback locks */}
      <video 
        style={videoBackgroundStyle} 
        autoPlay 
        loop 
        muted 
        className="video-bg"
      >
        <source src={backgroundVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={contentContainerStyle}>
        <Header />
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />
        <Timeline data={careerData} />
      </div>
    </div>
  );
}

export default App;