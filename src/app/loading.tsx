import React from 'react';

export default function Loading() {
  return (
    <div className="global-loader-container">
      <div className="global-loader-logo-wrapper">
        <div className="global-loader-pulse"></div>
        <div className="global-loader-spinner"></div>
        <span className="global-loader-text">
          <span style={{ color: '#ffffff', fontWeight: 300 }}>Yantra</span>
          <span style={{ color: 'var(--clr-yellow)', fontWeight: 600, marginLeft: '4px' }}>Legal</span>
        </span>
      </div>
    </div>
  );
}
