'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPrincipal() {
  return (
    <section className="about-principal-section" id="about">
      <div className="container about-grid">
        {/* Left Column: Bio & Button */}
        <div style={bioContainerStyle}>
          <span className="sec-pill dark">Meet Your Solicitor</span>
          <h2 style={titleStyle}>
            Meet <span className="text-gradient-gold">Krishna Giri</span>
          </h2>
          <p style={descStyle}>
            Krishna Giri is an Australian solicitor and overseas-qualified lawyer with a diverse academic and professional background spanning Nepal, Germany, and Australia.
          </p>
          <p style={descStyle}>
            He holds a Master’s degree in Public Policy from Germany and has worked across legal, policy, and community-focused environments before practising law in Australia. Having personally experienced the challenges of migration and settlement in different countries, Krishna brings a unique understanding of the legal and personal issues many clients face.
          </p>
          <p style={descStyle}>
            His approach is grounded in professionalism, accessibility, and genuine care for the people he represents. He is committed to providing clear legal advice, practical solutions, and dedicated representation for individuals, families, and businesses navigating migration and family law matters.
          </p>
          <div style={{ marginTop: '16px' }}>
            <Link href="/about" className="btn btn-yellow" style={{ display: 'inline-flex' }}>
              <span>About Yantra Legal</span>
              <span className="btn-arrow-circle">↗</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Pull Quote Card */}
        <div style={quoteCardStyle} className="glass reveal-on-scroll reveal-scale-up">
          <span style={quoteMarkStyle}>“</span>
          <blockquote style={blockquoteStyle}>
            Every case is unique. Every client matters. Every step is guided with care and clarity.
          </blockquote>
          <cite style={citeStyle}>
            — Krishna Giri
          </cite>
        </div>
      </div>
    </section>
  );
}

const bioContainerStyle: React.CSSProperties = {
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
  color: '#061912',
  margin: 0,
  lineHeight: 1.25,
};

const descStyle: React.CSSProperties = {
  fontSize: '1.02rem',
  lineHeight: '1.65',
  color: 'rgba(6, 25, 18, 0.82)',
  margin: 0,
};

const quoteCardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '60px 40px',
  background: '#061912',
  border: '1px solid rgba(223, 173, 62, 0.25)',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  position: 'relative',
};

const quoteMarkStyle: React.CSSProperties = {
  fontSize: '5rem',
  color: 'var(--clr-yellow)',
  lineHeight: 1,
  height: '40px',
  fontFamily: 'var(--font-serif)',
  opacity: 0.8,
};

const blockquoteStyle: React.CSSProperties = {
  fontSize: '1.45rem',
  fontFamily: 'var(--font-serif)',
  fontStyle: 'italic',
  color: '#ffffff',
  textAlign: 'center',
  margin: '0 0 24px 0',
  lineHeight: 1.5,
};

const citeStyle: React.CSSProperties = {
  fontSize: '0.88rem',
  fontWeight: 600,
  color: 'var(--clr-yellow)',
  fontStyle: 'normal',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

