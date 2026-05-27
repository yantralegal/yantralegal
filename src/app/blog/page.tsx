'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function BlogPage() {
  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        <section style={headerSectionStyle}>
          <div className="container">
            <span className="sec-pill">Legal Insights</span>
            <h1 style={titleStyle}>
              Yantra Legal <span className="text-gradient-gold">Blog</span>
            </h1>
            <p style={subtitleStyle}>
              Stay informed with our latest articles, guides, and legal updates regarding Australian migration law and family law procedures.
            </p>
          </div>
        </section>

        <section style={contentSectionStyle}>
          <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
            <div className="glass" style={cardStyle}>
              <div style={iconStyle}>💡</div>
              <h2 style={cardTitleStyle}>Articles Coming Soon</h2>
              <p style={bodyStyle}>
                We are currently preparing detailed legal articles, updates on visa policy changes, and guides to navigating divorce. Check back shortly for insights from Principal Solicitor Krishna Giri.
              </p>
              <div style={{ marginTop: '24px' }}>
                <a href="/contact" className="btn btn-yellow" style={{ display: 'inline-flex' }}>
                  <span>Subscribe for Updates</span>
                  <span className="btn-arrow-circle">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const layoutStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#061912',
};

const mainContentStyle: React.CSSProperties = {
  flex: 1,
};

const headerSectionStyle: React.CSSProperties = {
  padding: '160px 0 60px 0',
  textAlign: 'center',
  background: 'linear-gradient(180deg, #04120d 0%, #061912 100%)',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 400,
  color: '#ffffff',
  marginBottom: '20px',
  lineHeight: 1.2,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  color: 'var(--clr-text-muted)',
  maxWidth: '720px',
  margin: '0 auto',
  lineHeight: 1.6,
};

const contentSectionStyle: React.CSSProperties = {
  padding: '40px 0 100px 0',
};

const cardStyle: React.CSSProperties = {
  padding: '60px 40px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  background: 'rgba(11, 43, 32, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
};

const iconStyle: React.CSSProperties = {
  fontSize: '3rem',
  marginBottom: '10px',
};

const cardTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.8rem',
  color: 'var(--clr-yellow)',
  margin: 0,
};

const bodyStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: 'var(--clr-text-muted)',
  margin: 0,
};
