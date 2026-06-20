'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import HeroHeading from './HeroHeading';
import LawyerPortrait from './LawyerPortrait';
import { TypingAnimation } from './ui/typing-animation';
import { Highlighter } from './ui/highlighter';
import { Icon } from '@iconify/react';

export default function HeroSection() {
  return (
    <section className="hero-section-container">
      {/* Navbar Navigation */}
      <Navbar />

      {/* Atmospheric Background Orbs */}
      <div className="orb orb-left" />
      <div className="orb orb-right" />

      {/* Main Grid Content */}
      <div className="container" style={gridContainerStyle}>
        <div className="hero-grid-2col">
          {/* Left Column: Heading, Description, Buttons, Social Proof */}
          <div className="hero-left-col">
            <div className="hero-top-tag reveal-on-scroll reveal-fade-up">
              <span className="hero-highlight-tag">
                Australian Solicitor <span className="tag-dot">&bull;</span> Migration & Family Law Focus <span className="tag-dot">&bull;</span> Fixed-Fee Initial Consultations
              </span>
            </div>

            <HeroHeading />

            <div className="hero-subheading reveal-on-scroll reveal-fade-up delay-50">
              <span style={{ marginRight: '8px' }}>Expertise in</span>
              <TypingAnimation
                words={["Migration Law", "Family Law", "ART", "Judicial Review"]}
                duration={100}
                pauseDelay={2000}
                loop={true}
              />
            </div>

            {/* Mobile-only portrait positioned between the "Expertise in" subheading and description paragraph */}
            <div className="hero-portrait-frame mobile-only-portrait">
              <LawyerPortrait />
            </div>

            <p className="hero-desc reveal-on-scroll reveal-fade-up delay-100">
              Whether you are building a future in Australia, responding to a visa refusal, or navigating a family law matter, <Highlighter action="underline" color="var(--clr-yellow)" strokeWidth={2} animationDuration={1200} loop={true} isView={true}>Yantra Legal</Highlighter> provides clear advice, practical solutions, and personalised legal support every step of the way.
            </p>

            <div className="hero-btn-group reveal-on-scroll reveal-fade-up delay-200">
              <Link href="/contact" className="btn btn-yellow">
                <span>Book a Legal Consultation</span>
                <span className="btn-arrow-circle">↗</span>
              </Link>
              <a href="#services" className="btn btn-outline">
                <span>View Services</span>
              </a>
            </div>

            <div className="hero-rating-row reveal-on-scroll reveal-fade-up delay-300">
              <span style={ratingTextStyle}>
                <strong>Australian Solicitor</strong> &bull; Fixed-Fee Initial Consultations &bull; English, Nepali & Hindi
              </span>
            </div>
          </div>

          {/* Right Column: Framed Portrait */}
          <div className="hero-right-col">
            <div className="hero-portrait-frame">
              <LawyerPortrait />
            </div>
          </div>
        </div>
      </div>

      {/* Homepage Trust Banner - Sliding Right to Left Marquee */}
      <div className="hero-marquee-container reveal-on-scroll reveal-fade-up delay-350">
        <div className="hero-marquee-track">
          {Array(3).fill([
            "Australian Solicitor",
            "Migration & Family Law Focus",
            "Personalised service",
            "Fixed-fee Consultations",
            "Lived Experience",
            "Serving Clients Across Australia",
            "Multilingual Support (English, Nepali, Hindi)"
          ]).flat().map((item, idx) => (
            <div key={idx} className="hero-marquee-item">
              <span>{item}</span>
              <span style={{ color: 'rgba(223, 173, 62, 0.5)', fontWeight: 'bold' }}>•</span>
            </div>
          ))}
        </div>
      </div>
      {/* Floating Social Media Icons on the Right Edge */}
      <div className="hero-floating-socials">
        <a href="https://www.facebook.com/yantralegal" target="_blank" rel="noopener noreferrer" className="hero-social-float-icon" aria-label="Facebook">
          <Icon icon="ri:facebook-fill" width="22" height="22" />
        </a>
        <a href="https://x.com/YantraLegal" target="_blank" rel="noopener noreferrer" className="hero-social-float-icon" aria-label="X (Twitter)">
          <Icon icon="ri:twitter-x-fill" width="20" height="20" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hero-social-float-icon" aria-label="LinkedIn">
          <Icon icon="ri:linkedin-fill" width="22" height="22" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hero-social-float-icon" aria-label="TikTok">
          <Icon icon="ri:tiktok-fill" width="20" height="20" />
        </a>
        <a href="https://www.instagram.com/yantralegal" target="_blank" rel="noopener noreferrer" className="hero-social-float-icon" aria-label="Instagram">
          <Icon icon="ri:instagram-fill" width="22" height="22" />
        </a>
      </div>
    </section>
  );
}

const gridContainerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flex: '1',
  alignItems: 'center',
  width: '100%',
  zIndex: 5,
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

const topTagStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: 'var(--clr-yellow)',
  opacity: 0.95,
  marginBottom: '-8px',
};



