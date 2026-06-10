'use client';

import React from 'react';
import Link from 'next/link';

export default function SupportingDiverseCommunities() {
  const listItems = [
    'Facing visa refusals?',
    'Dealing with visa cancellations?',
    'Reuniting with family in Australia?',
    'Navigating separation or divorce?',
    'Unsure about your visa options?',
  ];


  return (
    <section style={sectionStyle} className="section-padding">
      <div className="container" style={containerStyle}>
        <div style={gridStyle}>
          {/* Left Column: Heading and Description */}
          <div style={leftColStyle}>
            <span className="sec-pill">Supporting Diverse Communities</span>
            <h2 style={titleStyle}>
              We Understand <span className="text-gradient-gold">More Than Just the Law</span>
            </h2>
            <p style={descStyle}>
              Visa delays, refusals, and family breakdowns can be stressful and uncertain. You may feel confused about your options or unsure what to do next.
            </p>
            <p style={descStyle}>
              We are here to help you move forward with clarity and confidence. We provide culturally aware, responsive legal support tailored to your unique circumstances.
            </p>
            <div style={btnWrapStyle}>
              <Link href="/contact" className="btn btn-yellow">
                <span>Speak with a Solicitor Today</span>
                <span className="btn-arrow-circle">↗</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Checklist */}
          <div style={rightColStyle}>
            <div className="glass" style={listCardStyle}>
              <h3 style={listHeaderStyle}>How We Can Assist You</h3>
              <div style={itemsContainerStyle}>
                {listItems.map((item, idx) => (
                  <div key={idx} style={itemStyle}>
                    <span style={checkCircleStyle}>
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4L4.5 7.5L11 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={itemTextStyle}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  backgroundColor: '#0b2b20', // Rich emerald container base
  position: 'relative',
  overflow: 'hidden',
  padding: '100px 0',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
};

const containerStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '48px',
  alignItems: 'center',
};

const leftColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '20px',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
  color: '#ffffff',
  margin: 0,
  lineHeight: 1.2,
};

const descStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.65,
  color: 'var(--clr-text-muted)',
  margin: 0,
};

const btnWrapStyle: React.CSSProperties = {
  marginTop: '12px',
};

const rightColStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

const listCardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '480px',
  padding: '40px',
  background: 'rgba(6, 25, 18, 0.65)',
  border: '1px solid rgba(223, 173, 62, 0.2)',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
};

const listHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.5rem',
  color: '#ffffff',
  marginBottom: '28px',
  fontWeight: 500,
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  paddingBottom: '12px',
};

const itemsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const checkCircleStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: 'rgba(223, 173, 62, 0.15)',
  border: '1px solid var(--clr-yellow)',
  color: 'var(--clr-yellow)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const itemTextStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  fontWeight: 500,
  color: '#ffffff',
};
