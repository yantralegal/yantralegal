'use client';

import React from 'react';

export default function HeroHeading() {
  return (
    <h1 style={titleStyle} className="reveal-on-scroll reveal-fade-up">
      <span className="text-gradient-gold" style={{ whiteSpace: 'nowrap' }}>Legal Expertise</span><br />
      <span className="text-gradient-silver" style={{ fontStyle: 'italic', fontWeight: 600 }}>Backed by Lived Experience.</span>
    </h1>
  );
}

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2.0rem, 5vw, 4.2rem)',
  fontWeight: 500,
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  margin: 0,
};

