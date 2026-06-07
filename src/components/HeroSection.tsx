'use client';

import React from 'react';
import Navbar from './Navbar';
import HeroHeading from './HeroHeading';
import LawyerPortrait from './LawyerPortrait';

export default function HeroSection() {
  return (
    <section style={heroSectionStyle}>
      {/* Navbar Navigation */}
      <Navbar />

      {/* Atmospheric Background Orbs */}
      <div className="orb orb-left" />
      <div className="orb orb-right" />

      {/* Main Grid Content */}
      <div className="container" style={gridContainerStyle}>
        <div className="hero-grid-2col">
          {/* Left Column: Heading, Description, Buttons, Social Proof */}
          <div style={leftColStyle}>
            <HeroHeading />

            <div style={subheadingStyle} className="reveal-on-scroll reveal-fade-up delay-50">
              Migration Law &nbsp;•&nbsp; Family Law &nbsp;•&nbsp; ART &nbsp;•&nbsp; Judicial Review
            </div>

            <p style={descStyle} className="reveal-on-scroll reveal-fade-up delay-100">
              Whether you are planning your future in Australia, seeking to reunite with your family, responding to a visa refusal, or navigating a family law dispute, Yantra Legal provides practical legal advice and personalised representation tailored to your circumstances.
            </p>
            <p style={descStyle} className="reveal-on-scroll reveal-fade-up delay-150">
              We understand that legal matters often involve important life decisions. Our role is to guide you through the process with clarity, confidence, and genuine care.
            </p>

            <div style={btnGroupStyle} className="reveal-on-scroll reveal-fade-up delay-200">
              <a href="/contact" className="btn btn-yellow">
                <span>Book a Confidential Consultation</span>
                <span className="btn-arrow-circle">↗</span>
              </a>
              <a href="#services" className="btn btn-outline">
                <span>View Services</span>
              </a>
            </div>

            <div style={ratingRowStyle} className="reveal-on-scroll reveal-fade-up delay-300">
              <div style={starsStyle}>
                {Array(5).fill(0).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span style={ratingTextStyle}>
                <strong>Highly Trusted Legal Representation</strong> in Sydney & Across Australia
              </span>
            </div>
          </div>

          {/* Right Column: Framed Portrait */}
          <div style={rightColStyle}>
            <div className="glass reveal-on-scroll reveal-scale-up delay-100" style={portraitFrameStyle}>
              <LawyerPortrait />
              <div style={portraitBadgeStyle}>
                <span style={portraitBadgeTitleStyle}>Krishna Giri</span>
                <span style={portraitBadgeSubtitleStyle}>Australian Solicitor & Overseas Lawyer (Nepal)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Homepage Trust Banner */}
      <div style={trustBannerContainerStyle} className="reveal-on-scroll reveal-fade-up delay-350">
        <div className="container" style={trustBannerInnerStyle}>
          <span style={trustBannerItemStyle}>Australian Solicitor</span>
          <span style={trustBannerSeparatorStyle}>|</span>
          <span style={trustBannerItemStyle}>Overseas Qualified Lawyer - Nepal</span>
          <span style={trustBannerSeparatorStyle}>|</span>
          <span style={trustBannerItemStyle}>Multilingual Support</span>
          <span style={trustBannerSeparatorStyle}>|</span>
          <span style={trustBannerItemStyle}>Migration & Family Law Focus</span>
          <span style={trustBannerSeparatorStyle}>|</span>
          <span style={trustBannerItemStyle}>Serving Clients Across Australia</span>
        </div>
      </div>
    </section>
  );
}

const heroSectionStyle: React.CSSProperties = {
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
  paddingTop: '90px',
};

const gridContainerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flex: '1',
  alignItems: 'center',
  width: '100%',
  zIndex: 5,
};

const leftColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  zIndex: 4,
  maxWidth: '820px',
};

const descStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'clamp(1rem, 1.1vw, 1.2rem)',
  lineHeight: 1.6,
  color: 'var(--clr-text-muted)',
  margin: 0,
};

const btnGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginTop: '8px',
  flexWrap: 'wrap',
};

const ratingRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginTop: '12px',
  paddingTop: '20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  width: '100%',
  maxWidth: '440px',
};

const starsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2px',
  color: 'var(--clr-yellow)',
  fontSize: '0.95rem',
};

const ratingTextStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: 'var(--clr-text-muted)',
};

const rightColStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 4,
  position: 'relative',
  width: '100%',
};

const portraitFrameStyle: React.CSSProperties = {
  position: 'relative',
  borderRadius: '24px',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '440px',
  aspectRatio: '550/640',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  background: 'rgba(11, 43, 32, 0.3)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexDirection: 'column',
};

const portraitBadgeStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '24px',
  left: '24px',
  right: '24px',
  padding: '12px 20px',
  background: 'rgba(8, 29, 21, 0.85)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  zIndex: 10,
};

const portraitBadgeTitleStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: 600,
  color: 'var(--clr-white)',
};

const portraitBadgeSubtitleStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--clr-yellow)',
  fontWeight: 500,
};

const subheadingStyle: React.CSSProperties = {
  fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
  fontWeight: 600,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: 'var(--clr-yellow)',
  opacity: 0.9,
  margin: '8px 0',
};

const trustBannerContainerStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(4, 18, 13, 0.7)',
  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  padding: '16px 0',
  marginTop: '40px',
  zIndex: 10,
};

const trustBannerInnerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px 24px',
  textAlign: 'center',
};

const trustBannerItemStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 500,
  color: '#cbdad3',
  letterSpacing: '0.5px',
};

const trustBannerSeparatorStyle: React.CSSProperties = {
  color: 'rgba(223, 173, 62, 0.4)',
  fontWeight: 'bold',
};

