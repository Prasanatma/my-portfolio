// src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header style={{ marginBottom: '40px', textAlign: 'center', zIndex: 1, position: 'relative' }}>
      <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '10px' }}>
        My Career Journey Portfolio
      </h1>
      <p style={{ color: '#ffc107', fontSize: '1.2rem' }}>
        Welcome! Here is a breakdown of my professional timeline, powered by React.
      </p>
    </header>
  );
}

export default Header;