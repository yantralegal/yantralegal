'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            width={240}
            height={62}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav nav-pill" style={desktopNavStyle}>
          <ul style={menuStyle}>
            <li>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="nav-link">
                About
              </Link>
            </li>

            {/* Services Mega Menu */}
            <li className="nav-item-dropdown">
              <Link href="/immigration-law" className="nav-link dropdown-toggle">
                <span>Services</span>
                <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Mega Dropdown Menu */}
              <div className="dropdown-menu mega-menu-width">
                <div className="dropdown-grid services-mega-grid">
                  {/* Immigration Column */}
                  <div className="dropdown-column">
                    <h4 className="dropdown-column-title">Immigration Law</h4>
                    <div style={megaInnerGrid}>
                      <div>
                        <h5 style={subGroupLabelStyle}>Main Visas</h5>
                        <ul className="dropdown-links">
                          <li>
                            <Link href="/immigration-law/partner-visas" className="dropdown-link-item-simple">
                              Partner Visa
                            </Link>
                          </li>
                          <li>
                            <Link href="/immigration-law/employer-sponsored-visas" className="dropdown-link-item-simple">
                              Employer Sponsored
                            </Link>
                          </li>
                          <li>
                            <Link href="/immigration-law/skilled-visas" className="dropdown-link-item-simple">
                              Skilled Visas
                            </Link>
                          </li>
                          <li>
                            <Link href="/immigration-law/protection-visas" className="dropdown-link-item-simple">
                              Protection Visa
                            </Link>
                          </li>
                          <li>
                            <Link href="/immigration-law/ministerial-intervention" className="dropdown-link-item-simple">
                              Ministerial Intervention
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 style={subGroupLabelStyle}>Other Visas</h5>
                        <ul className="dropdown-links">
                          <li>
                            <Link href="/immigration-law/child-visas" className="dropdown-link-item-simple">
                              Child Visas
                            </Link>
                          </li>
                          <li>
                            <Link href="/immigration-law/parent-visas" className="dropdown-link-item-simple">
                              Parent Visas
                            </Link>
                          </li>
                          <li>
                            <Link href="/immigration-law/visitor-visas" className="dropdown-link-item-simple">
                              Visitor Visas
                            </Link>
                          </li>
                          <li>
                            <Link href="/immigration-law/resident-return-visas" className="dropdown-link-item-simple">
                              Resident Return
                            </Link>
                          </li>
                          <li>
                            <Link href="/immigration-law/bridging-visas" className="dropdown-link-item-simple">
                              Bridging Visas
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Family Law Column */}
                  <div className="dropdown-column">
                    <h4 className="dropdown-column-title">Family Law</h4>
                    <div>
                      <h5 style={subGroupLabelStyle}>Divorce</h5>
                      <ul className="dropdown-links" style={{ marginBottom: '16px' }}>
                        <li>
                          <Link href="/divorce/divorce-in-australia" className="dropdown-link-item-simple">
                            Divorce in Australia
                          </Link>
                        </li>
                        <li>
                          <Link href="/divorce/divorce-in-nepal" className="dropdown-link-item-simple">
                            Divorce in Nepal
                          </Link>
                        </li>
                      </ul>
                      <div style={familyNoteStyle}>
                        <p style={noteTextStyle}>💡 Property Settlement, Parenting & Custody arrangements supported as services expand.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Appeals & Reviews Dropdown */}
            <li className="nav-item-dropdown">
              <Link href="/appeals-and-reviews" className="nav-link dropdown-toggle">
                <span>Appeals & Reviews</span>
                <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <div className="dropdown-menu" style={{ width: '480px' }}>
                <div className="dropdown-grid">
                  <div className="dropdown-column">
                    <h4 className="dropdown-column-title">Refusals & Cancellations</h4>
                    <ul className="dropdown-links">
                      <li>
                        <Link href="/appeals-and-reviews/visa-refusals" className="dropdown-link-item-simple">
                          Visa Refusals
                        </Link>
                      </li>
                      <li>
                        <Link href="/appeals-and-reviews/visa-cancellations" className="dropdown-link-item-simple">
                          Visa Cancellations
                        </Link>
                      </li>
                      <li>
                        <Link href="/appeals-and-reviews/sponsorship-nomination-refusals" className="dropdown-link-item-simple">
                          Sponsorship & Nominations
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-column">
                    <h4 className="dropdown-column-title">Review & Appeals</h4>
                    <ul className="dropdown-links">
                      <li>
                        <Link href="/appeals-and-reviews/art-appeals" className="dropdown-link-item-simple">
                          ART Appeals
                        </Link>
                      </li>
                      <li>
                        <Link href="/appeals-and-reviews/judicial-review" className="dropdown-link-item-simple">
                          Judicial Review
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <Link href="/blog" className="nav-link">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="nav-link">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="desktop-cta" style={desktopCtaStyle}>
          <Link href="/contact" className="btn btn-yellow">
            <span>Book A Consultation</span>
            <span className="btn-arrow-circle">↗</span>
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={mobileToggleStyle}
          aria-label="Toggle menu"
        >
          <div style={hamburgerLine(mobileMenuOpen)} />
          <div style={hamburgerLineMiddle(mobileMenuOpen)} />
          <div style={hamburgerLine(mobileMenuOpen, true)} />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div style={mobileDrawerStyle}>
          <ul style={mobileMenuListStyle}>
            <li>
              <Link href="/" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>
                About
              </Link>
            </li>
            <li>
              <Link href="/immigration-law" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>
                Services — Immigration
              </Link>
            </li>
            <li>
              <Link href="/divorce" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>
                Services — Family Law / Divorce
              </Link>
            </li>
            <li>
              <Link href="/appeals-and-reviews" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>
                Appeals & Reviews
              </Link>
            </li>
            <li>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/faqs" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>
                Contact
              </Link>
            </li>
            <li style={{ marginTop: '20px' }}>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="btn btn-yellow" style={{ display: 'flex', justifyContent: 'center' }}>
                <span>Book A Consultation</span>
                <span className="btn-arrow-circle">↗</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
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
  background: scrolled ? 'rgba(6, 25, 18, 0.95)' : 'transparent',
  boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.25)' : 'none',
  backdropFilter: scrolled ? 'blur(20px)' : 'none',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
});

const innerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
};

const menuStyle: React.CSSProperties = {
  display: 'flex',
  listStyle: 'none',
  gap: '4px',
  alignItems: 'center',
};

const desktopNavStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const desktopCtaStyle: React.CSSProperties = {
  display: 'block',
};

const megaInnerGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
};

const subGroupLabelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: 'rgba(223, 173, 62, 0.55)',
  marginBottom: '8px',
  fontWeight: '600',
};

const familyNoteStyle: React.CSSProperties = {
  padding: '12px',
  background: 'rgba(223, 173, 62, 0.06)',
  borderRadius: '8px',
  border: '1px solid rgba(223, 173, 62, 0.15)',
};

const noteTextStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: 'rgba(223, 173, 62, 0.8)',
  lineHeight: '1.4',
  margin: 0,
};

const mobileToggleStyle: React.CSSProperties = {
  display: 'none',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '24px',
  height: '18px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  zIndex: 1001,
};

const hamburgerLine = (open: boolean, bottom = false): React.CSSProperties => ({
  width: '100%',
  height: '2px',
  backgroundColor: '#ffffff',
  transition: 'all 0.3s ease',
  transform: open 
    ? (bottom ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(45deg) translate(5px, 5px)') 
    : 'none',
});

const hamburgerLineMiddle = (open: boolean): React.CSSProperties => ({
  width: '100%',
  height: '2px',
  backgroundColor: '#ffffff',
  transition: 'all 0.3s ease',
  opacity: open ? 0 : 1,
});

const mobileDrawerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '64px',
  left: 0,
  right: 0,
  height: 'calc(100vh - 64px)',
  backgroundColor: '#061912',
  padding: '30px 24px',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 999,
  overflowY: 'auto',
};

const mobileMenuListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const mobileNavLinkStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  fontWeight: '500',
  color: '#cbdad3',
  display: 'block',
  padding: '8px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
};
