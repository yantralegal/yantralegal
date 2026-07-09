'use client';

import React, { useState } from 'react';

interface RevealingPhoneProps {
  style?: React.CSSProperties;
  className?: string;
  goldText?: boolean;
}

export default function RevealingPhone({ style, className, goldText }: RevealingPhoneProps) {
  const [revealed, setRevealed] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setRevealed(true);
  };

  const defaultStyle: React.CSSProperties = {
    cursor: revealed ? 'text' : 'pointer',
    color: goldText || !revealed ? 'var(--clr-yellow)' : 'inherit',
    textDecoration: revealed ? 'none' : 'underline',
    fontWeight: 'bold',
    ...style,
  };

  if (revealed) {
    return (
      <a href="tel:0272643267" style={defaultStyle} className={className}>
        02 7264 3267
      </a>
    );
  }

  return (
    <span
      onClick={handleClick}
      style={defaultStyle}
      className={className}
      title="Click to reveal phone number"
    >
      02 7264 XXXX (click to reveal)
    </span>
  );
}
