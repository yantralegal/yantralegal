'use client';

import React, { useState, useEffect } from 'react';

interface RevealingPhoneProps {
  style?: React.CSSProperties;
  className?: string;
  goldText?: boolean;
  initialPhone?: string;
}

export default function RevealingPhone({ style, className, goldText, initialPhone }: RevealingPhoneProps) {
  const [revealed, setRevealed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(initialPhone || '+61 402 402 120');

  useEffect(() => {
    if (!initialPhone) {
      fetch('/api/settings')
        .then((res) => res.json())
        .then((data) => {
          if (data?.settings?.phone) {
            setPhoneNumber(data.settings.phone);
          }
        })
        .catch((err) => console.error('Error fetching phone setting:', err));
    } else {
      setPhoneNumber(initialPhone);
    }
  }, [initialPhone]);

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

  const getMaskedPhone = (phone: string) => {
    // If the phone number is longer than 4 characters, replace last 4 characters with XXXX
    if (phone.length > 4) {
      return phone.slice(0, -4) + 'XXXX';
    }
    return 'XXXX';
  };

  if (revealed) {
    const cleanTel = phoneNumber.replace(/[^0-9+]/g, '');
    return (
      <a href={`tel:${cleanTel}`} style={defaultStyle} className={className}>
        {phoneNumber}
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
      {getMaskedPhone(phoneNumber)} (click to reveal)
    </span>
  );
}

