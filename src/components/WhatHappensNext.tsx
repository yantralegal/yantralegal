'use client';

import React from 'react';

export default function WhatHappensNext() {
  const steps = [
    {
      num: '01',
      title: 'Initial Consultation',
      desc: 'We listen. We understand your situation and legal needs.'
    },
    {
      num: '02',
      title: 'Case Assessment',
      desc: 'We review documents and identify your options.'
    },
    {
      num: '03',
      title: 'Strategy and Advice',
      desc: 'We provide practical legal advice and next steps in clear language so you can make informed decisions.'
    },
    {
      num: '04',
      title: 'Representation and Support',
      desc: 'We guide and represent you throughout the process, keeping you informed and supported every step of the way.'
    }
  ];

  return (
    <section style={sectionStyle} className="section-padding">
      <div className="container">
        <div style={headerStyle}>
          <span className="sec-pill">Our Approach</span>
          <h2 style={titleStyle}>
            Our <span className="text-gradient-gold">Approach</span>
          </h2>
          <p style={subtitleStyle}>
            At Yantra Legal, we understand that legal matters are not simply legal problems—they are often significant life events. That is why our approach is centred on three principles:
          </p>
        </div>

        <div style={gridStyle}>
          {steps.map((step, idx) => (
            <div key={idx} className="glass reveal-on-scroll reveal-fade-up" style={cardStyle}>
              <div style={numStyle}>{step.num}</div>
              <h3 style={cardTitleStyle}>{step.title}</h3>
              <p style={cardDescStyle}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  backgroundColor: '#061912',
  position: 'relative',
  overflow: 'hidden',
  padding: '100px 0',
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '720px',
  margin: '0 auto 60px auto',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
  color: '#ffffff',
  marginTop: '12px',
  marginBottom: '16px',
  fontWeight: 400,
};

const subtitleStyle: React.CSSProperties = {
  color: 'var(--clr-text-muted)',
  fontSize: '1.05rem',
  lineHeight: 1.6,
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '24px',
  position: 'relative',
  zIndex: 2,
};

const cardStyle: React.CSSProperties = {
  padding: '40px 30px',
  borderRadius: '16px',
  background: 'rgba(11, 43, 32, 0.25)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  position: 'relative',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const numStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '2.5rem',
  fontWeight: '700',
  color: 'var(--clr-yellow)',
  opacity: 0.8,
  lineHeight: 1,
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  fontWeight: '600',
  color: '#ffffff',
  margin: 0,
};

const cardDescStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  lineHeight: 1.6,
  color: 'var(--clr-text-muted)',
  margin: 0,
};
