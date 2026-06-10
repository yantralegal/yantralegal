'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-section">
      {/* Decorative Watermark Backgrounds */}
      <div className="footer-watermark footer-watermark-justice" />
      <div className="footer-watermark footer-watermark-lawyer" />
      <div className="footer-orb" />

      <div className="container footer-container">
        {/* Footer Top Grid */}
        <div className="footer-grid">
          {/* Column 1: CTA */}
          <div className="footer-col footer-col-cta">
            <h3 className="footer-cta-title">
              Legal Expertise Backed by<br />
              <span className="text-gradient-gold">Lived Experience</span>
            </h3>
            <p className="footer-cta-desc">
              At Yantra Legal, we are committed to providing practical legal solutions, personalised representation, and clear advice that empowers our clients to make informed decisions. We believe every client deserves to be heard, understood, and supported throughout their legal journey.
            </p>
            <Link href="/contact" className="footer-cta-link">
              <span>Let&apos;s work together</span>
              <svg className="footer-cta-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/immigration-law">Services</Link>
              </li>
              <li>
                <Link href="/#testimonials">Testimonials</Link>
              </li>
              <li>
                <Link href="/faqs">FAQs</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-use">Terms of Use</Link>
              </li>
            </ul>
          </div>


          {/* Column 4: Connect Me */}
          <div className="footer-col footer-col-connect">
            <h4 className="footer-col-title">Connect Us</h4>
            <ul className="footer-contact-list">
              <li className="contact-item">
                <span className="contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <a href="mailto:contact@yantralegal.com.au" className="contact-value">contact@yantralegal.com.au</a>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <a href="tel:+61200000000" className="contact-value">+61 2 0000 0000</a>
              </li>
              <li className="contact-item align-top">
                <span className="contact-icon mt-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span className="contact-value address-text">
                  Level 35, 1 Martin Place,<br />
                  Sydney NSW 2000
                </span>
              </li>
            </ul>

            {/* Social Icons row */}
            <div className="footer-social-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-badge" aria-label="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-badge" aria-label="Instagram">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-badge" aria-label="LinkedIn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-badge" aria-label="Twitter">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Giant Text & Copyright */}
        <div className="footer-bottom">
          {/* Giant Watermark Text */}
          <div className="footer-giant-text">Yantra Legal</div>

          {/* Disclaimer text */}
          <div style={disclaimerStyle}>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              <strong>Disclaimer:</strong> The content on this website is provided for general informational purposes only and does not constitute formal legal or migration advice. Accessing this site or contacting us via web forms does not establish a lawyer-client relationship. Immigration law changes rapidly; you should not act, or refrain from acting, based on any material on this website without first seeking professional legal advice tailored to your specific circumstances. View our <Link href="/terms-of-use" style={disclaimerLinkStyle}>Terms of Use</Link> and <Link href="/privacy-policy" style={disclaimerLinkStyle}>Privacy Policy</Link>.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <div className="footer-copyright">
              <span>&copy; Yantra Legal 2026</span>
            </div>
            <div className="footer-legal-tag">
              <span>All Rights Reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const disclaimerStyle: React.CSSProperties = {
  fontSize: '0.76rem',
  color: 'rgba(255, 255, 255, 0.4)',
  textAlign: 'center',
  maxWidth: '960px',
  margin: '0 auto 28px auto',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  paddingTop: '20px',
};

const disclaimerLinkStyle: React.CSSProperties = {
  color: 'var(--clr-yellow)',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};

