'use client';

import React from 'react';

interface TimelineItemProps {
  country: string;
  description: string;
  isLeft: boolean;
  isLast: boolean;
}

function TimelineItem({ country, description, isLeft, isLast }: TimelineItemProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      margin: '40px 0',
      width: '100%',
    }} className="timeline-item">
      {/* Connector line dot/badge */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#061912',
        border: '2px solid var(--clr-yellow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        boxShadow: '0 0 15px rgba(223, 173, 62, 0.4)',
      }} className="timeline-dot">
        <span style={{ color: 'var(--clr-yellow)', fontSize: '10px', fontWeight: 'bold' }}>✦</span>
      </div>

      {/* Content wrapper */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        width: '100%',
        maxWidth: '1000px',
      }} className="timeline-grid">
        {/* Left side card or spacing placeholder */}
        {isLeft ? (
          <div className="glass timeline-card reveal-fade-up" style={cardStyle}>
            <span style={badgeStyle}>{country}</span>
            <p style={descStyle}>{description}</p>
          </div>
        ) : (
          <div style={{ visibility: 'hidden' }} className="timeline-spacer" />
        )}

        {/* Right side card or spacing placeholder */}
        {!isLeft ? (
          <div className="glass timeline-card reveal-fade-up" style={cardStyle}>
            <span style={badgeStyle}>{country}</span>
            <p style={descStyle}>{description}</p>
          </div>
        ) : (
          <div style={{ visibility: 'hidden' }} className="timeline-spacer" />
        )}
      </div>

      {/* Sequential Down Arrow connector if not the last item */}
      {!isLast && (
        <div style={{
          position: 'absolute',
          bottom: '-55px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: 'rgba(223, 173, 62, 0.5)',
          animation: 'bounceArrow 3s infinite ease-in-out',
        }} className="timeline-connector-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
}

export default function Timeline() {
  const items = [
    {
      country: 'Nepal',
      description: 'Krishna began his legal and academic journey in Nepal, developing a strong foundation in law and public service.',
    },
    {
      country: 'Germany',
      description: "He later completed a Master's Degree in Public Policy in Germany, gaining valuable international experience and a broader understanding of policy, governance and multicultural communities.",
    },
    {
      country: 'Australia',
      description: 'After migrating to Australia, Krishna completed his legal qualifications and was admitted as a solicitor in New South Wales.',
    },
    {
      country: 'Yantra Legal',
      description: 'Today, Yantra Legal brings together legal expertise, international experience and a client-focused approach to migration and family law matters across Australia.',
    },
  ];

  return (
    <div style={containerStyle}>
      <style dangerouslySetInnerHTML={{ __html: mediaStyles }} />
      <div style={timelineWrapperStyle}>
        {/* Central timeline line */}
        <div style={lineStyle} className="timeline-central-line" />

        {items.map((item, idx) => (
          <TimelineItem
            key={idx}
            country={item.country}
            description={item.description}
            isLeft={idx % 2 === 0}
            isLast={idx === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  padding: '60px 0',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
};

const timelineWrapperStyle: React.CSSProperties = {
  position: 'relative',
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px 0',
};

const lineStyle: React.CSSProperties = {
  position: 'absolute',
  top: '40px',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '2px',
  background: 'linear-gradient(180deg, rgba(223, 173, 62, 0.1) 0%, var(--clr-yellow) 15%, var(--clr-yellow) 85%, rgba(223, 173, 62, 0.1) 100%)',
  zIndex: 1,
};

const cardStyle: React.CSSProperties = {
  padding: '30px',
  border: '1px solid rgba(223, 173, 62, 0.15)',
  background: 'rgba(11, 43, 32, 0.35)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  transition: 'transform 0.3s ease, border-color 0.3s ease',
  textAlign: 'left',
};

const badgeStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.4rem',
  color: 'var(--clr-yellow)',
  fontWeight: 400,
  display: 'inline-block',
  marginBottom: '12px',
  fontStyle: 'italic',
};

const descStyle: React.CSSProperties = {
  fontSize: '0.92rem',
  lineHeight: 1.65,
  color: 'var(--clr-text-muted)',
  margin: 0,
};

// CSS animations & responsive layout media queries
const mediaStyles = `
  @keyframes bounceArrow {
    0%, 100% {
      transform: translate(-50%, 0);
    }
    50% {
      transform: translate(-50%, 6px);
    }
  }

  @media (max-width: 768px) {
    .timeline-central-line {
      left: 20px !important;
    }
    .timeline-dot {
      left: 20px !important;
    }
    .timeline-connector-arrow {
      left: 20px !important;
    }
    .timeline-grid {
      grid-template-columns: 1fr !important;
      gap: 0 !important;
      padding-left: 50px !important;
    }
    .timeline-spacer {
      display: none !important;
    }
    .timeline-card {
      margin-bottom: 20px !important;
    }
  }
`;
