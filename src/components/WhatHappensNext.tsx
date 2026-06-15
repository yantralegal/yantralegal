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
          <h2 style={titleStyle}>
            Our <span className="text-gradient-gold">Approach</span>
          </h2>
          <p style={subtitleStyle}>
            At Yantra Legal, we understand that legal matters are not simply legal problems—they are often significant life events. That is why our approach is centred on three principles:
          </p>
        </div>

        <div className="approach-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="glass approach-card reveal-on-scroll reveal-fade-up">
              <div className="approach-card-num">{step.num}</div>
              <h3 className="approach-card-title">{step.title}</h3>
              <p className="approach-card-desc">{step.desc}</p>
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


