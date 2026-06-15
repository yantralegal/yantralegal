'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { legalPages } from '../data/legalContents';
import { blogPosts } from '../data/blogContents';

export default function Navbar() {
  const pathname = usePathname() || '';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    const results: { title: string; url: string; category: string; snippet: string }[] = [];

    // Search legal pages
    legalPages.forEach((page) => {
      const titleMatch = page.title.toLowerCase().includes(query);
      let snippet = '';
      let textMatch = false;

      for (const sec of page.sections) {
        if (sec.heading.toLowerCase().includes(query)) {
          textMatch = true;
          snippet = `${sec.heading} - ${sec.paragraphs[0]?.substring(0, 100) || ''}...`;
          break;
        }
        for (const p of sec.paragraphs) {
          if (p.toLowerCase().includes(query)) {
            textMatch = true;
            const idx = p.toLowerCase().indexOf(query);
            const start = Math.max(0, idx - 40);
            const end = Math.min(p.length, idx + query.length + 60);
            snippet = `...${p.substring(start, end)}...`;
            break;
          }
        }
        if (textMatch) break;
      }

      if (titleMatch || textMatch) {
        if (!snippet && page.sections.length > 0) {
          snippet = page.sections[0].paragraphs[0]?.substring(0, 100) + '...';
        }
        results.push({
          title: page.title,
          url: page.url,
          category: page.url.startsWith('/immigration-law') ? 'Immigration Law' : page.url.startsWith('/family-law') ? 'Family Law' : 'Appeals & Reviews',
          snippet: snippet || 'Legal Service Page',
        });
      }
    });

    // Search blog posts
    blogPosts.forEach((post) => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      let contentMatch = false;
      let snippet = '';

      for (const p of post.content) {
        if (p.toLowerCase().includes(query)) {
          contentMatch = true;
          const idx = p.toLowerCase().indexOf(query);
          const start = Math.max(0, idx - 40);
          const end = Math.min(p.length, idx + query.length + 60);
          snippet = `...${p.substring(start, end)}...`;
          break;
        }
      }

      if (titleMatch || excerptMatch || contentMatch) {
        results.push({
          title: post.title,
          url: `/blog/${post.slug}`,
          category: 'Blog Post',
          snippet: snippet || post.excerpt,
        });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={headerStyle(scrolled)}>
      <div className="container" style={innerStyle(scrolled)}>
        <Link href="/" className="logo-hover" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '66px', height: '62px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Image
              src="/yantralegallogoweb.png"
              alt="Yantra Legal Logo"
              width={240}
              height={62}
              priority
              style={{ objectFit: 'cover', objectPosition: 'left center', maxWidth: 'none' }}
            />
          </div>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            letterSpacing: '0.8px',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
          }}>
            <span style={{ fontWeight: 600, color: 'var(--clr-white)' }}>Yantra</span>
            <span className="text-gradient-gold" style={{ fontWeight: 600, marginLeft: '6px' }}>Legal</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav nav-pill" style={desktopNavStyle}>
          <ul style={menuStyle}>
            <li>
              <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
                About
              </Link>
            </li>

            {/* Services Mega Menu */}
            <li className="nav-item-dropdown">
              <Link href="/immigration-law" className={`nav-link dropdown-toggle ${pathname.startsWith('/immigration-law') || pathname.startsWith('/family-law') || pathname.startsWith('/appeals-and-reviews') ? 'active' : ''}`}>
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
                          <Link href="/family-law/divorce-in-australia" className="dropdown-link-item-simple">
                            Divorce in Australia
                          </Link>
                        </li>
                        <li>
                          <Link href="/family-law/divorce-in-nepal" className="dropdown-link-item-simple">
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
              <Link href="/blog" className={`nav-link ${pathname.startsWith('/blog') ? 'active' : ''}`}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/faqs" className={`nav-link ${pathname === '/faqs' ? 'active' : ''}`}>
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* CTA Button & Search */}
        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setSearchOpen(true)}
            style={searchButtonStyle}
            aria-label="Search website"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Link href="/contact" className="btn btn-yellow">
            <span>Book a Consultation</span>
            <span className="btn-arrow-circle">↗</span>
          </Link>
        </div>

        {/* Mobile Search Button & Toggle */}
        <div className="mobile-only-flex" style={{ alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setSearchOpen(true)}
            style={mobileSearchButtonStyle}
            aria-label="Search website"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
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
      </div>

      {/* Mobile Nav Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(4, 18, 13, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 998,
          }}
        />
      )}

      {/* Mobile Navigation Drawer (Off-Canvas) */}
      <div
        className={`mobile-drawer-container ${mobileMenuOpen ? 'mobile-drawer-open' : ''}`}
        style={{
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
          opacity: mobileMenuOpen ? 1 : 0,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, visibility 0.4s ease',
        }}
      >
        {/* Drawer Header */}
        <div className="drawer-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px', transitionDelay: '50ms' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, letterSpacing: '0.5px' }}>
            <span style={{ color: '#ffffff' }}>Yantra</span>
            <span style={{ color: 'var(--clr-yellow)', marginLeft: '4px' }}>Legal</span>
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="drawer-close-btn"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Drawer Search Shortcut */}
        <div
          className="drawer-item drawer-search-box"
          style={{ transitionDelay: '100ms' }}
          onClick={() => {
            setSearchOpen(true);
            setMobileMenuOpen(false);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--clr-yellow)', flexShrink: 0 }}>
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Search legal services...</span>
        </div>

        {/* Section 1: Navigation */}
        <div style={{ marginBottom: '28px' }}>
          <div className="drawer-item drawer-section-title" style={{ transitionDelay: '150ms' }}>Menu</div>
          <ul style={{ ...mobileMenuListStyle, gap: '10px' }}>
            <li className="drawer-item" style={{ transitionDelay: '200ms' }}>
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-link-card ${pathname === '/' ? 'active' : ''}`}>
                <span>Home</span>
                <span className="arrow-icon">→</span>
              </Link>
            </li>
            <li className="drawer-item" style={{ transitionDelay: '250ms' }}>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-link-card ${pathname === '/about' ? 'active' : ''}`}>
                <span>About Us</span>
                <span className="arrow-icon">→</span>
              </Link>
            </li>
            <li className="drawer-item" style={{ transitionDelay: '300ms' }}>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-link-card ${pathname.startsWith('/blog') ? 'active' : ''}`}>
                <span>Blog & Insights</span>
                <span className="arrow-icon">→</span>
              </Link>
            </li>
            <li className="drawer-item" style={{ transitionDelay: '350ms' }}>
              <Link href="/faqs" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-link-card ${pathname === '/faqs' ? 'active' : ''}`}>
                <span>FAQs</span>
                <span className="arrow-icon">→</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 2: Services */}
        <div style={{ marginBottom: '28px' }}>
          <div className="drawer-item drawer-section-title" style={{ transitionDelay: '400ms' }}>Legal Services</div>
          <ul style={{ ...mobileMenuListStyle, gap: '10px' }}>
            <li className="drawer-item" style={{ transitionDelay: '450ms' }}>
              <Link href="/immigration-law" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-link-card ${pathname.startsWith('/immigration-law') ? 'active' : ''}`}>
                <span>Immigration & Visas</span>
                <span className="arrow-icon">→</span>
              </Link>
            </li>
            <li className="drawer-item" style={{ transitionDelay: '500ms' }}>
              <Link href="/family-law" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-link-card ${pathname.startsWith('/family-law') ? 'active' : ''}`}>
                <span>Family & Divorce Law</span>
                <span className="arrow-icon">→</span>
              </Link>
            </li>
            <li className="drawer-item" style={{ transitionDelay: '550ms' }}>
              <Link href="/appeals-and-reviews" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-link-card ${pathname.startsWith('/appeals-and-reviews') ? 'active' : ''}`}>
                <span>Appeals & Reviews</span>
                <span className="arrow-icon">→</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact Info & CTA */}
        <div className="drawer-item" style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px', transitionDelay: '600ms' }}>
          <div className="drawer-section-title" style={{ marginBottom: '16px' }}>Get In Touch</div>
          <div style={{ color: 'var(--clr-text-muted)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', paddingLeft: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--clr-yellow)' }}>📍</span> Sydney Office & Across Australia
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--clr-yellow)' }}>💬</span> WhatsApp Chat Available
            </span>
          </div>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="btn btn-yellow" style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '14px 20px' }}>
            <span>Book Consultation</span>
            <span className="btn-arrow-circle">↗</span>
          </Link>
        </div>
      </div>
      {/* Search Modal */}
      {searchOpen && (
        <div style={searchOverlayStyle} onClick={() => setSearchOpen(false)}>
          <div style={searchContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={searchHeaderStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--clr-yellow)', marginRight: '12px' }}>
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="text"
                placeholder="Search subclass (e.g. 491), service, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchInputStyle}
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)} style={closeSearchButtonStyle}>
                ✕
              </button>
            </div>

            <div style={searchResultsContainerStyle}>
              {searchResults.length > 0 ? (
                <div style={resultsListStyle}>
                  {searchResults.map((result, idx) => (
                    <Link
                      key={idx}
                      href={result.url}
                      onClick={() => {
                        setSearchOpen(false);
                        setMobileMenuOpen(false);
                        setSearchQuery('');
                      }}
                      style={resultItemStyle}
                      className="search-result-item"
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={resultTitleStyle}>{result.title}</span>
                        <span style={resultCategoryStyle}>{result.category}</span>
                      </div>
                      <p style={resultSnippetStyle}>{result.snippet}</p>
                    </Link>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div style={noResultsStyle}>No results found for &quot;{searchQuery}&quot;</div>
              ) : (
                <div style={searchHelpStyle}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#cbdad3', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Popular Searches</h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['Partner Visa', '491', 'Divorce', 'ART Appeals', 'Sponsorship'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        style={tagButtonStyle}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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

const innerStyle = (scrolled: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  maxWidth: scrolled ? '1280px' : '1440px',
  transition: 'max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
});

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
  top: 0,
  right: 0,
  width: '320px',
  maxWidth: '85vw',
  height: '100vh',
  backgroundColor: 'rgba(6, 25, 18, 0.98)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderLeft: '1px solid rgba(223, 173, 62, 0.2)',
  boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.3)',
  padding: '80px 24px 30px 24px',
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
  fontSize: '1.05rem',
  fontWeight: '500',
  color: '#cbdad3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 0',
  transition: 'all 0.2s ease',
};

const searchButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const mobileSearchButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#ffffff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px',
};

const searchOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(4, 18, 13, 0.9)',
  backdropFilter: 'blur(10px)',
  zIndex: 2000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  padding: '120px 24px 24px 24px',
};

const searchContentStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '720px',
  backgroundColor: '#0a291e',
  border: '1px solid rgba(223, 173, 62, 0.25)',
  borderRadius: '16px',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
  overflow: 'hidden',
};

const searchHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
};

const searchInputStyle: React.CSSProperties = {
  flex: 1,
  background: 'transparent',
  border: 'none',
  color: '#ffffff',
  fontSize: '1.1rem',
  outline: 'none',
};

const closeSearchButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '1.2rem',
  cursor: 'pointer',
  padding: '4px',
  marginLeft: '12px',
};

const searchResultsContainerStyle: React.CSSProperties = {
  maxHeight: '400px',
  overflowY: 'auto',
  padding: '16px 24px 24px 24px',
};

const resultsListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const resultItemStyle: React.CSSProperties = {
  display: 'block',
  padding: '16px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid transparent',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
};

const resultTitleStyle: React.CSSProperties = {
  fontWeight: '600',
  color: '#ffffff',
  fontSize: '1rem',
};

const resultCategoryStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: 'var(--clr-yellow)',
  backgroundColor: 'rgba(223, 173, 62, 0.1)',
  padding: '4px 8px',
  borderRadius: '4px',
};

const resultSnippetStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: 'rgba(255, 255, 255, 0.6)',
  margin: '8px 0 0 0',
  lineHeight: '1.5',
};

const noResultsStyle: React.CSSProperties = {
  padding: '24px 0',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '0.95rem',
};

const searchHelpStyle: React.CSSProperties = {
  padding: '12px 0',
};

const tagButtonStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  padding: '6px 16px',
  color: '#cbdad3',
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};
