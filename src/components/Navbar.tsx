'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={headerStyle(scrolled)}>
      <div className="container" style={innerStyle}>
        {/* Logo */}
        <Link href="/" className="logo-hover">
          <Image
            src="/yantralegallogoweb.png"
            alt="Yantra Legal Logo"
            width={300}
            height={78}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Glassmorphic Nav Menu */}
        <nav className="nav-pill">
          <ul style={menuStyle}>
            {['About', 'Services', 'Projects', 'Process', 'Testimonials', 'FAQs'].map((item) => {
              if (item === 'Services') {
                return (
                  <li key={item} className="nav-item-dropdown">
                    <a href="#services" className="nav-link dropdown-toggle">
                      <span>Services</span>
                      <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>

                    {/* Megamenu / Dropdown Menu */}
                    <div className="dropdown-menu">
                      <div className="dropdown-grid">
                        {/* Immigration Column */}
                        <div className="dropdown-column">
                          <h4 className="dropdown-column-title">Immigration Law</h4>
                          <ul className="dropdown-links">
                            <li>
                              <a href="#services" className="dropdown-link-item">
                                <span className="link-bullet"></span>
                                <div className="link-text-wrapper">
                                  <span className="link-title">Visa Pathways</span>
                                  <span className="link-desc">Work, skilled, partner & family visas</span>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#services" className="dropdown-link-item">
                                <span className="link-bullet"></span>
                                <div className="link-text-wrapper">
                                  <span className="link-title">AAT & Appeal Reviews</span>
                                  <span className="link-desc">Visa cancellations & tribunal reviews</span>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>

                        {/* Family Law Column */}
                        <div className="dropdown-column">
                          <h4 className="dropdown-column-title">Family Law & Divorce</h4>
                          <ul className="dropdown-links">
                            <li>
                              <a href="#services" className="dropdown-link-item">
                                <span className="link-bullet"></span>
                                <div className="link-text-wrapper">
                                  <span className="link-title">Divorce Matters</span>
                                  <span className="link-desc">Dissolution & legal filings representation</span>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#services" className="dropdown-link-item">
                                <span className="link-bullet"></span>
                                <div className="link-text-wrapper">
                                  <span className="link-title">Property & Custody</span>
                                  <span className="link-desc">Asset division & parenting arrangements</span>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="nav-link">
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA Button */}
        <div>
          <a href="#contact" className="btn btn-yellow">
            <span>Book A Consultation</span>
            <span className="btn-arrow-circle">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}

const headerStyle = (scrolled: boolean): React.CSSProperties => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  padding: scrolled ? '14px 0' : '24px 0',
  background: scrolled ? 'rgba(6, 25, 18, 0.85)' : 'transparent',
  // Removed scrolled borderBottom completely, replaced with subtle shadow glow
  boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.25)' : 'none',
  backdropFilter: scrolled ? 'blur(20px)' : 'none',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
});

const innerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const menuStyle: React.CSSProperties = {
  display: 'flex',
  listStyle: 'none',
  gap: '4px',
  alignItems: 'center',
};
