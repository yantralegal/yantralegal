'use client';

import React, { useState, useEffect } from 'react';

const words = ['Lawyer', 'Counsellor', 'Friend'];

export default function HeroHeading() {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsFlipped(false);
      }, 450); // matches the transition duration in CSS (0.45s)
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 style={titleStyle} className="reveal-on-scroll reveal-fade-up">
      <span className="text-gradient-silver" style={{ whiteSpace: 'nowrap' }}>Your Immigration & family</span><br />
      <span className="flip-word-container">
        <span className={`flip-word ${isFlipped ? 'flipped' : ''}`} style={flipWordStyle}>
          {words[index]}
        </span>
      </span>
    </h1>
  );
}

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(1.7rem, 4.8vw, 4.0rem)',
  fontWeight: 500,
  lineHeight: 1.25,
  letterSpacing: '-0.02em',
  margin: 0,
};

const flipWordStyle: React.CSSProperties = {
  fontStyle: 'italic',
  fontWeight: 600,
  background: 'linear-gradient(180deg, #ffe5a3 0%, #dfad3e 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
  filter: 'drop-shadow(0 2px 8px rgba(223, 173, 62, 0.15))',
};

