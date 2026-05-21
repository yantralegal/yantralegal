'use client';

import React, { useState, useEffect, useRef } from 'react';

interface FollowerPointerCardProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export function FollowerPointerCard({
  children,
  title,
  className = '',
}: FollowerPointerCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on devices with a mouse/pointer (not mobile touch screens)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const timer = setTimeout(() => {
      setHasMouse(mediaQuery.matches);
    }, 0);

    const handleQueryChange = (e: MediaQueryListEvent) => {
      setHasMouse(e.matches);
    };

    mediaQuery.addEventListener('change', handleQueryChange);
    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener('change', handleQueryChange);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Position pointer relative to the card container
    setPosition({ x, y });

    // Set custom CSS variables for tracking mouse within CSS radial spotlights
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const showPointer = isHovered && hasMouse;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={className}
      style={{
        position: 'relative',
        overflow: 'visible',
        cursor: showPointer ? 'none' : 'auto',
      }}
    >
      {showPointer && (
        <div
          className="following-pointer-cursor"
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -4px)', // Center container horizontally on cursor
            pointerEvents: 'none',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            // smooth lag transition for a spring physics feel
            transition: 'left 0.12s cubic-bezier(0.16, 1, 0.3, 1), top 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Custom Gold Pointer SVG */}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="18"
            width="18"
            style={{
              color: 'var(--clr-yellow)',
              transform: 'rotate(-45deg)',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          >
            <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .557.103z" />
          </svg>

          {/* Following Pointer Tag */}
          <div
            className="following-pointer-tag"
            style={{
              background: 'var(--clr-yellow)',
              color: 'var(--clr-white)',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.74rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {title}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
