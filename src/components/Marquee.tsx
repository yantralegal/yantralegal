'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface MarqueeUpdate {
  id: string;
  heading: string;
  createdAt: string;
}

export default function Marquee() {
  const [updates, setUpdates] = useState<MarqueeUpdate[]>([]);

  useEffect(() => {
    fetch('/api/marquee')
      .then((res) => res.json())
      .then((data) => {
        if (data.updates) {
          setUpdates(data.updates);
        }
      })
      .catch((err) => console.error('Error fetching marquee:', err));
  }, []);

  if (updates.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#061912',
        borderBottom: '1px solid rgba(223, 173, 62, 0.3)',
        borderTop: '1px solid rgba(223, 173, 62, 0.1)',
        padding: '10px 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(100vw, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .marquee-wrapper {
          display: flex;
          overflow: hidden;
          width: 100%;
        }
        .marquee-track {
          display: flex;
          flex-shrink: 0;
          white-space: nowrap;
          animation: marquee 25s linear infinite;
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          color: #ffffff;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          margin-right: 48px;
          transition: color 0.2s ease;
        }
        .marquee-item:hover {
          color: #dfad3e;
        }
        .marquee-badge {
          background-color: #dfad3e;
          color: #061912;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 4px;
          margin-right: 12px;
          letter-spacing: 0.5px;
        }
      `}</style>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {/* Render updates multiple times to form a long continuous track */}
          {updates.map((update, idx) => (
            <Link key={update.id + idx} href={`/updates/${update.id}`} className="marquee-item">
              <span className="marquee-badge">Update</span>
              <span>{update.heading}</span>
              <span style={{ marginLeft: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
                ({new Date(update.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })})
              </span>
              <span style={{ marginLeft: '24px', color: '#dfad3e' }}>•</span>
            </Link>
          ))}
          {updates.map((update, idx) => (
            <Link key={update.id + '-dup1-' + idx} href={`/updates/${update.id}`} className="marquee-item">
              <span className="marquee-badge">Update</span>
              <span>{update.heading}</span>
              <span style={{ marginLeft: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
                ({new Date(update.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })})
              </span>
              <span style={{ marginLeft: '24px', color: '#dfad3e' }}>•</span>
            </Link>
          ))}
          {updates.map((update, idx) => (
            <Link key={update.id + '-dup2-' + idx} href={`/updates/${update.id}`} className="marquee-item">
              <span className="marquee-badge">Update</span>
              <span>{update.heading}</span>
              <span style={{ marginLeft: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
                ({new Date(update.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })})
              </span>
              <span style={{ marginLeft: '24px', color: '#dfad3e' }}>•</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
