'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';
import HeroHeading from './HeroHeading';
import { TypingAnimation } from './ui/typing-animation';
import { Highlighter } from './ui/highlighter';
import { Icon } from '@iconify/react';

export default function HeroSection2() {
  const handleCalendlyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/yantralegalweb/30min'
      });
    } else {
      window.open('https://calendly.com/yantralegalweb/30min', '_blank');
    }
  };

  return (
    <section className="hero-section-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Image Layer showing full image, positioned lower and right bottom */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        left: 0,
        right: '-35%',
        bottom: 0,
        backgroundImage: "url('/testbg.jpeg')",
        backgroundSize: 'auto 125%',
        backgroundPosition: 'right bottom -50px',
        backgroundRepeat: 'no-repeat',
        opacity: 0.45,
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Background Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to right, var(--clr-bg-primary) 15%, transparent 60%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* Navbar Navigation */}
      <Navbar />

      {/* Atmospheric Background Orbs */}
      <div className="orb orb-left" style={{ zIndex: 3 }} />
      <div className="orb orb-right" style={{ zIndex: 3 }} />

      {/* Main Grid Content */}
      <div className="container" style={{ ...gridContainerStyle, zIndex: 5, paddingTop: '50px' }}>
        <div className="hero-grid-2col" style={{ alignItems: 'center' }}>
          {/* Left Column: Heading, Description, Buttons, Social Proof */}
          <div className="hero-left-col">
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

            {/* Mobile-only image banner positioned between sub-heading and description */}
            <div className="mobile-only-portrait" style={{
              position: 'relative',
              width: '100%',
              maxWidth: '300px',
              aspectRatio: '1/1',
              margin: '20px auto'
            }}>
              <Image
                src="/herosectionbg.png"
                alt="Yantra Legal Hero Background"
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>

            <p className="hero-desc reveal-on-scroll reveal-fade-up delay-100">
              Whether you are building a future in Australia, responding to a visa refusal, or navigating a family law matter, Yantra Legal provides clear advice, practical solutions, and personalised legal support every step of the way.
            </p>

            <div className="hero-btn-group reveal-on-scroll reveal-fade-up delay-200">
              <a href="https://calendly.com/yantralegalweb/30min" onClick={handleCalendlyClick} className="btn btn-yellow">
                <span>Book a Legal Consultation</span>
                <span className="btn-arrow-circle">↗</span>
              </a>
              <a href="#services" className="btn btn-outline">
                <span>View Services</span>
              </a>
            </div>

            <div className="hero-rating-row reveal-on-scroll reveal-fade-up delay-300">
              <span style={ratingTextStyle}>
                <strong>Australian Solicitor</strong> &bull; <Highlighter action="underline" color="var(--clr-yellow)" strokeWidth={2} animationDuration={1200} loop={true} isView={true}>Fixed-Fee Initial Consultations</Highlighter> &bull; English, Nepali & Hindi
              </span>
            </div>
          </div>

          {/* Right Column: Empty spacer to preserve layout flow and let background show through */}
          <div className="hero-right-col" style={{ pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Homepage Trust Banner - Sliding Right to Left Marquee */}
      <div className="hero-marquee-container">
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

const ratingTextStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: 'var(--clr-text-muted)',
};
