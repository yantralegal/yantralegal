'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Icon } from '@iconify/react';

// Design system colors & properties
const layoutStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#061912',
  backgroundImage: 'radial-gradient(circle at 50% 30%, #104230 0%, #061e16 60%, #04120d 100%)',
  color: '#ffffff',
};

const mainContentStyle: React.CSSProperties = {
  flex: 1,
};

const headerSectionStyle: React.CSSProperties = {
  padding: '160px 0 40px 0',
  textAlign: 'center',
  position: 'relative',
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

const faqLayoutContainer: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '280px 1fr',
  gap: '40px',
  alignItems: 'start',
  paddingBottom: '100px',
};

const stickySidebarStyle: React.CSSProperties = {
  position: 'sticky',
  top: '100px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  maxHeight: 'calc(100vh - 140px)',
  overflowY: 'auto',
  paddingRight: '10px',
};

const sidebarLinkStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  borderRadius: '12px',
  background: isActive ? 'rgba(223, 173, 62, 0.12)' : 'rgba(255, 255, 255, 0.02)',
  border: isActive ? '1px solid rgba(223, 173, 62, 0.35)' : '1px solid rgba(255, 255, 255, 0.05)',
  color: isActive ? 'var(--clr-yellow)' : 'var(--clr-text-muted)',
  fontSize: '0.88rem',
  fontWeight: isActive ? 600 : 500,
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
});

const searchContainerStyle: React.CSSProperties = {
  position: 'relative',
  marginBottom: '32px',
  width: '100%',
};

const searchInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px 20px 16px 52px',
  borderRadius: '16px',
  background: 'rgba(11, 43, 32, 0.45)',
  border: '1px solid rgba(223, 173, 62, 0.25)',
  color: '#ffffff',
  fontSize: '1.05rem',
  outline: 'none',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
};

const searchIconStyle: React.CSSProperties = {
  position: 'absolute',
  left: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'var(--clr-yellow)',
  fontSize: '1.35rem',
};

const highlightedDisclaimerStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: 'rgba(11, 43, 32, 0.6)',
  border: '2px solid var(--clr-yellow)',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
  marginBottom: '32px',
};

const categoryHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.6rem',
  fontWeight: 500,
  color: 'var(--clr-yellow)',
  marginBottom: '20px',
  marginTop: '40px',
  borderBottom: '1px solid rgba(223, 173, 62, 0.2)',
  paddingBottom: '8px',
  scrollMarginTop: '100px', // Prevents title from being cut off by sticky navbar
};

// Premium glassmorphic FAQ Card styles
const faqCardStyle = (isOpen: boolean): React.CSSProperties => ({
  background: isOpen ? 'rgba(16, 66, 48, 0.35)' : 'rgba(11, 43, 32, 0.25)',
  border: isOpen ? '1px solid rgba(223, 173, 62, 0.45)' : '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  padding: '24px 28px',
  marginBottom: '16px',
  cursor: 'pointer',
  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
  boxShadow: isOpen ? '0 8px 32px rgba(0, 0, 0, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
});

const faqQuestionStyle = (isOpen: boolean): React.CSSProperties => ({
  fontSize: '1.08rem',
  fontWeight: 600,
  color: isOpen ? 'var(--clr-yellow)' : '#ffffff',
  margin: 0,
  transition: 'color 0.3s ease',
  lineHeight: 1.4,
});

const faqChevronBtnStyle = (isOpen: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  background: isOpen ? 'var(--clr-yellow)' : 'rgba(255, 255, 255, 0.03)',
  border: isOpen ? '1px solid var(--clr-yellow)' : '1px solid rgba(255, 255, 255, 0.12)',
  color: isOpen ? '#061912' : 'var(--clr-yellow)',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  flexShrink: 0,
});

const faqAnswerStyle: React.CSSProperties = {
  fontSize: '0.92rem',
  lineHeight: '1.75',
  color: 'var(--clr-text-muted)',
  paddingTop: '16px',
  margin: 0,
};

const warningNoticeStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '0.82rem',
  lineHeight: '1.5',
  color: '#f8d7da',
  backgroundColor: 'rgba(120, 20, 30, 0.25)',
  border: '1px solid rgba(245, 198, 203, 0.3)',
  borderRadius: '8px',
};

const infoNoticeStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '0.82rem',
  lineHeight: '1.5',
  color: '#dfad3e',
  backgroundColor: 'rgba(223, 173, 62, 0.08)',
  border: '1px solid rgba(223, 173, 62, 0.2)',
  borderRadius: '8px',
};

const faqLinkStyle: React.CSSProperties = {
  color: 'var(--clr-yellow)',
  textDecoration: 'underline',
  fontWeight: 600,
};

const categoryGroupStyle: React.CSSProperties = {
  marginBottom: '40px',
};

const ctaSectionStyle: React.CSSProperties = {
  padding: '80px 0 100px 0',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  background: 'linear-gradient(180deg, #061912 0%, #04120d 100%)',
};

const ctaTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
  fontWeight: 400,
  color: '#ffffff',
  marginBottom: '16px',
};

const ctaDescStyle: React.CSSProperties = {
  fontSize: '1rem',
  lineHeight: '1.65',
  color: 'var(--clr-text-muted)',
  marginBottom: '32px',
  maxWidth: '620px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const ctaButtonGroupStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
};

// Data Structures
interface FAQItem {
  q: string;
  a: React.ReactNode;
}

interface FAQCategory {
  id: string;
  category: string;
  shortName: string;
  items: FAQItem[];
}

const renderTextWithLinks = (text: string) => {
  const mdLinkRegex = /(\[[^\]]+\]\([^\)]+\))/g;
  const parts = text.split(mdLinkRegex);
  
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
    if (match) {
      const [, label, url] = match;
      const isExternal = url.startsWith('http://') || url.startsWith('https://');
      if (isExternal) {
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--clr-yellow)', textDecoration: 'underline', fontWeight: 600 }}
          >
            {label}
          </a>
        );
      } else {
        return (
          <Link
            key={i}
            href={url}
            style={{ color: 'var(--clr-yellow)', textDecoration: 'underline', fontWeight: 600 }}
          >
            {label}
          </Link>
        );
      }
    }
    return part;
  });
};

const FAQAnswerRenderer = ({ answer }: { answer: any }) => {
  if (typeof answer !== 'string') {
    return <>{answer}</>;
  }

  const blocks = answer.split('\n\n');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('**Notice:**') || trimmed.startsWith('**Warning:**')) {
          const cleanText = trimmed.replace(/^\*\*(Notice|Warning):\*\*\s*/, '');
          return (
            <div key={idx} style={warningNoticeStyle}>
              <strong>{trimmed.startsWith('**Notice:**') ? 'Notice: ' : 'Warning: '}</strong>
              {renderTextWithLinks(cleanText)}
            </div>
          );
        }

        if (
          trimmed.startsWith('**Important Procedural Note:**') || 
          trimmed.startsWith('**Note:**') || 
          trimmed.startsWith('**Important Note:**') || 
          trimmed.startsWith('**Info:**')
        ) {
          let label = 'Note: ';
          let cleanText = trimmed;
          if (trimmed.startsWith('**Important Procedural Note:**')) {
            label = 'Important Procedural Note: ';
            cleanText = trimmed.replace(/^\*\*Important Procedural Note:\*\*\s*/, '');
          } else if (trimmed.startsWith('**Note:**')) {
            label = 'Note: ';
            cleanText = trimmed.replace(/^\*\*Note:\*\*\s*/, '');
          } else if (trimmed.startsWith('**Important Note:**')) {
            label = 'Important Note: ';
            cleanText = trimmed.replace(/^\*\*Important Note:\*\*\s*/, '');
          } else if (trimmed.startsWith('**Info:**')) {
            label = 'Info: ';
            cleanText = trimmed.replace(/^\*\*Info:\*\*\s*/, '');
          }
          
          return (
            <div key={idx} style={infoNoticeStyle}>
              <strong>{label}</strong>
              {renderTextWithLinks(cleanText)}
            </div>
          );
        }

        return (
          <p key={idx} style={{ margin: 0 }}>
            {renderTextWithLinks(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

export default function FAQsClient() {
  const [faqsData, setFaqsData] = useState<FAQCategory[]>([]);
  const [activeIndices, setActiveIndices] = useState<{ [key: string]: boolean }>({
    'migration-general-0': true, // Open first FAQ by default
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => {
        if (data.faqs) setFaqsData(data.faqs);
      })
      .catch(console.error);
  }, []);

  // Monitor screen size for mobile navigation responsive shifts
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFAQ = (categoryKey: string, idx: number) => {
    const key = `${categoryKey}-${idx}`;
    setActiveIndices((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter FAQs based on active category selection and search query text
  const filteredData = useMemo(() => {
    return faqsData
      .map((cat) => {
        // First filter by category tab selector
        if (activeCategory !== 'all' && cat.id !== activeCategory) {
          return null;
        }

        // Then filter items by matching text queries (both in question and answer text values)
        const matchedItems = cat.items.filter((item) => {
          if (!searchQuery) return true;
          const query = searchQuery.toLowerCase();
          const qMatch = item.q.toLowerCase().includes(query);
          
          let aText = '';
          if (typeof item.a === 'string') {
            aText = item.a;
          } else {
            const recursiveExtract = (node: any): string => {
              if (!node) return '';
              if (typeof node === 'string' || typeof node === 'number') return String(node);
              if (Array.isArray(node)) return node.map(recursiveExtract).join(' ');
              if (node.props && node.props.children) return recursiveExtract(node.props.children);
              return '';
            };
            aText = recursiveExtract(item.a);
          }
          const aMatch = aText.toLowerCase().includes(query);
          return qMatch || aMatch;
        });

        if (matchedItems.length === 0) return null;

        return {
          ...cat,
          items: matchedItems,
        };
      })
      .filter((cat): cat is FAQCategory => cat !== null);
  }, [activeCategory, searchQuery, faqsData]);

  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        {/* Hero Header */}
        <section style={headerSectionStyle}>
          <div className="container">
            <span className="sec-pill">Common Questions</span>
            <h1 style={titleStyle}>
              Honest Answers, <span className="text-gradient-gold">Clear Guidance</span>
            </h1>
            <p style={subtitleStyle}>
              We believe informed clients make better decisions. Find straightforward answers to frequently asked questions below.
            </p>
          </div>
        </section>

        {/* Search input section */}
        <section style={{ padding: '20px 0 0 0' }}>
          <div className="container" style={{ maxWidth: '1200px' }}>
            <div style={searchContainerStyle}>
              <Icon icon="ri:search-line" style={searchIconStyle} />
              <input
                type="text"
                placeholder="Search for answers (e.g. partner visa, ART, fees, or divorce...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchInputStyle}
              />
            </div>
          </div>
        </section>

        {/* Dynamic Split Sidebar & Content layout */}
        <section style={{ padding: '10px 0 60px 0' }}>
          <div className="container" style={{ maxWidth: '1200px' }}>
            <div className="faq-main-wrapper" style={isMobile ? {} : faqLayoutContainer}>
              {/* Category Sticky Sidebar Navigation */}
              {!isMobile ? (
                <aside style={stickySidebarStyle}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '8px' }}>
                    Browse Categories
                  </div>
                  <button
                    onClick={() => setActiveCategory('all')}
                    style={sidebarLinkStyle(activeCategory === 'all')}
                  >
                    <span>All Categories</span>
                    <Icon icon="ri:arrow-right-s-line" />
                  </button>
                  {faqsData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      style={sidebarLinkStyle(activeCategory === cat.id)}
                    >
                      <span>{cat.shortName}</span>
                      <Icon icon="ri:arrow-right-s-line" />
                    </button>
                  ))}
                </aside>
              ) : (
                // Horizontal category filter bar on mobile
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px', whiteSpace: 'nowrap', maskImage: 'linear-gradient(to right, #000 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, #000 85%, transparent 100%)' }}>
                  <button
                    onClick={() => setActiveCategory('all')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.82rem',
                      background: activeCategory === 'all' ? 'var(--clr-yellow)' : 'rgba(255, 255, 255, 0.05)',
                      border: 'none',
                      color: activeCategory === 'all' ? '#061912' : '#ffffff',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    All
                  </button>
                  {faqsData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.82rem',
                        background: activeCategory === cat.id ? 'var(--clr-yellow)' : 'rgba(255, 255, 255, 0.05)',
                        border: 'none',
                        color: activeCategory === cat.id ? '#061912' : '#ffffff',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {cat.shortName}
                    </button>
                  ))}
                </div>
              )}

              {/* FAQs Listing Content */}
              <div style={{ width: '100%' }}>
                {/* Highlighted General Legal Disclaimer Section */}
                <div style={highlightedDisclaimerStyle}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <Icon icon="ri:alert-fill" style={{ fontSize: '1.8rem', color: 'var(--clr-yellow)', flexShrink: 0 }} />
                    <div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 'bold', color: 'var(--clr-yellow)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        IMPORTANT LEGAL DISCLAIMER
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.65', color: 'var(--clr-text-muted)' }}>
                        The answers provided on this page are for general informational purposes only and do not constitute formal legal or migration advice. Laws, visa regulations, and tribunal rules change rapidly. Domicile, health, or character variables can significantly affect your options. You should not act, or refrain from acting, based on any information here without first seeking professional legal advice tailored to your specific circumstances.
                      </p>
                    </div>
                  </div>
                </div>

                {filteredData.length > 0 ? (
                  filteredData.map((cat) => (
                    <div key={cat.id} id={cat.id} style={categoryGroupStyle}>
                      <h2 style={categoryHeaderStyle}>{cat.category}</h2>

                      <div className="faq-list">
                        {cat.items.map((item, idx) => {
                          const key = `${cat.id}-${idx}`;
                          const isOpen = !!activeIndices[key];

                          return (
                            <div
                              key={idx}
                              style={faqCardStyle(isOpen)}
                              onClick={() => toggleFAQ(cat.id, idx)}
                            >
                              <div className="faq-card-header" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                                <h3 style={faqQuestionStyle(isOpen)}>{item.q}</h3>
                                <button
                                  className="faq-chevron-btn"
                                  aria-expanded={isOpen}
                                  aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                                  style={faqChevronBtnStyle(isOpen)}
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                      transition: 'transform 0.3s ease',
                                    }}
                                  >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                  </svg>
                                </button>
                              </div>
                              <div
                                style={{
                                  maxHeight: isOpen ? '1200px' : '0px',
                                  overflow: 'hidden',
                                  transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                              >
                                <div style={faqAnswerStyle}>
                                  <FAQAnswerRenderer answer={item.a} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '60px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    <Icon icon="ri:information-line" style={{ fontSize: '2.5rem', color: 'rgba(255,255,255,0.25)', marginBottom: '12px' }} />
                    <p style={{ margin: 0, color: 'var(--clr-text-muted)' }}>No FAQs match your search query &quot;{searchQuery}&quot;</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Still Have Questions CTA Section */}
        <section style={ctaSectionStyle}>
          <div className="container" style={{ maxWidth: '720px', textAlign: 'center' }}>
            <span className="sec-pill" style={{ marginBottom: '16px' }}>Need More Help?</span>
            <h3 style={ctaTitleStyle}>Still have questions? Book a consultation.</h3>
            <p style={ctaDescStyle}>
              Discuss your case privately with an Australian solicitor. We provide fixed-fee initial consultations with absolute privacy, cost transparency, and strategic options.
            </p>
            <div style={ctaButtonGroupStyle}>
              <Link href="/contact" className="btn btn-yellow">
                <span>Book a Consultation</span>
                <span className="btn-arrow-circle">↗</span>
              </Link>
              <a href="https://wa.me/61402402120" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ borderColor: 'rgba(255, 255, 255, 0.25)', color: '#ffffff' }}>
                <span style={{ marginRight: '6px', color: '#25D366' }}>💬</span>
                <span>Speak with a Solicitor (WhatsApp)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
