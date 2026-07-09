'use client';

import React from 'react';

export default function Timeline() {
  const items = [
    {
      country: 'Nepal',
      flag: '🇳🇵',
      description: 'Krishna began his legal and academic journey in Nepal, developing a strong foundation in law and public service.',
    },
    {
      country: 'Germany',
      flag: '🇩🇪',
      description: "He completed a Master's Degree in Public Policy in Germany, gaining international experience in policy, governance, and multicultural communities.",
    },
    {
      country: 'Australia',
      flag: '🇦🇺',
      description: 'After migrating to Australia, Krishna completed his legal qualifications and was admitted as a solicitor in New South Wales.',
    },
    {
      country: 'Yantra Legal',
      flag: '⚖️',
      description: 'Today, Yantra Legal brings together legal expertise, international experience, and a client-focused approach to migration & family law across Australia.',
    },
  ];

  return (
    <div style={containerStyle} className="timeline-container">
      <style dangerouslySetInnerHTML={{ __html: mediaStyles }} />
      <div className="timeline-horizontal-scroll">
        <div style={timelineWrapperStyle} className="timeline-horizontal-wrapper">
          {/* Horizontal Connecting Line */}
          <div style={lineStyle} className="timeline-horizontal-line" />

          {items.map((item, idx) => (
            <div key={idx} style={itemStyle} className="timeline-horizontal-item">
              {/* Flag / Icon */}
              <div style={flagWrapperStyle} className="timeline-flag-wrapper">
                <span style={flagStyle}>{item.flag}</span>
              </div>

              {/* Central Node Dot */}
              <div style={dotStyle} className="timeline-horizontal-dot">
                <span style={{ color: 'var(--clr-yellow)', fontSize: '10px', fontWeight: 'bold' }}>✦</span>
              </div>

              {/* Content Card */}
              <div className="glass timeline-horizontal-card" style={cardStyle}>
                <span style={badgeStyle}>{item.country}</span>
                <p style={descStyle}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  padding: '40px 0 20px 0',
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
};

const timelineWrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '40px 20px',
  gap: '30px',
};

const lineStyle: React.CSSProperties = {
  position: 'absolute',
  top: '96px', // Align with the center dots (flag wrapper height 60px + dot size 24px/2 + padding 20px gap)
  left: '120px',
  right: '120px',
  height: '2px',
  background: 'linear-gradient(90deg, rgba(223, 173, 62, 0.1) 0%, var(--clr-yellow) 15%, var(--clr-yellow) 85%, rgba(223, 173, 62, 0.1) 100%)',
  zIndex: 1,
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: '1 1 0%',
  position: 'relative',
  zIndex: 2,
};

const flagWrapperStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'rgba(11, 43, 32, 0.5)',
  border: '1px solid rgba(223, 173, 62, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
};

const flagStyle: React.CSSProperties = {
  fontSize: '2rem',
};

const dotStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#061912',
  border: '2px solid var(--clr-yellow)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '24px',
  boxShadow: '0 0 10px rgba(223, 173, 62, 0.4)',
};

const cardStyle: React.CSSProperties = {
  padding: '24px 20px',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  background: 'rgba(11, 43, 32, 0.25)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  width: '100%',
  minHeight: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
};

const badgeStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.25rem',
  color: 'var(--clr-yellow)',
  fontWeight: 400,
  display: 'inline-block',
  marginBottom: '10px',
};

const descStyle: React.CSSProperties = {
  fontSize: '0.88rem',
  lineHeight: 1.6,
  color: 'var(--clr-text-muted)',
  margin: 0,
};

// CSS mobile & tablet adjustments
const mediaStyles = `
  .timeline-horizontal-scroll {
    overflow-x: auto;
    width: 100%;
    scrollbar-width: none; /* Firefox */
  }
  .timeline-horizontal-scroll::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  @media (max-width: 900px) {
    .timeline-horizontal-wrapper {
      min-width: 850px; /* Force scrollable timeline on smaller viewports */
      padding-bottom: 20px;
    }
    .timeline-horizontal-line {
      left: 100px !important;
      right: 100px !important;
    }
  }
`;
