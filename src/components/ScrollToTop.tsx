'use client';

import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={buttonStyle}
      className="scroll-to-top-btn"
      aria-label="Back to top"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    </button>
  );
}

const buttonStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  backgroundColor: 'rgba(6, 25, 18, 0.85)',
  border: '1px solid rgba(223, 173, 62, 0.3)',
  color: 'var(--clr-yellow)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 999,
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
};
