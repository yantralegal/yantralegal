'use client';

import React from 'react';

export default function WhatHappensNext() {
  const steps = [
    {
      num: '01',
      title: 'We Review Your Enquiry',
      desc: 'We carefully assess the details you share to understand your situation before we connect.'
    },
    {
      num: '02',
      title: 'Initial Advice & Options',
      desc: 'We outline the most viable pathways, explaining the strengths and potential challenges of each.'
    },
    {
      num: '03',
      title: 'Process, Costs & Steps',
      desc: 'You receive a clear breakdown of timelines, fixed fees, and what to expect at every milestone.'
    },
    {
      num: '04',
      title: 'You Decide How to Proceed',
      desc: 'With all options and costs laid out, you make an informed decision on how you wish to move forward.'
    }
  ];

  return (
    <section style={sectionStyle} className="section-padding">
      <div className="container">
        <div style={headerStyle}>
          <span className="sec-pill">Onboarding Flow</span>
          <h2 style={titleStyle}>
            What Happens After <span className="text-gradient-gold">You Contact Us</span>
          </h2>
          <p style={subtitleStyle}>
            We believe in complete transparency and clarity. Here is how we help you transition from uncertainty to a defined legal strategy.
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
