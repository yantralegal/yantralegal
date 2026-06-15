'use client';

import React from 'react';

export default function IntroductionSection() {
  return (
    <section style={sectionStyle} className="section-padding introduction-section">
      <div className="container" style={containerStyle}>
        <span className="sec-pill">Introduction</span>
        <h2 style={titleStyle}>
          Personalised Legal Support for <span className="text-gradient-gold">Individuals, Families and Businesses</span>
        </h2>
        <div style={contentGridStyle}>
          <p style={paragraphStyle} className="introduction-paragraph">
            At Yantra Legal, we believe legal advice should be clear, accessible, and focused on achieving practical outcomes.
          </p>
          <p style={paragraphStyle} className="introduction-paragraph">
            As a boutique Sydney-based law practice, we work closely with our clients to understand their circumstances, explain their options in plain language, and provide legal solutions tailored to their goals.
          </p>
          <p style={paragraphStyle} className="introduction-paragraph">
            Whether you are applying for a visa, facing a visa refusal, managing a family law matter, or seeking advice on your legal rights, we are committed to providing responsive, professional, and personalised service at every stage of the process.
          </p>
        </div>
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  backgroundColor: '#faf7f2', // Warm light background
  color: 'var(--clr-bg-primary)',
  padding: '90px 0',
  position: 'relative',
  borderBottom: '1px solid rgba(6, 25, 18, 0.05)',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '960px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '20px',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
  color: '#061912',
  margin: '8px 0 16px 0',
  lineHeight: 1.3,
  fontWeight: 500,
};

const contentGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  maxWidth: '800px',
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.7,
  color: 'rgba(6, 25, 18, 0.8)',
  margin: 0,
};
