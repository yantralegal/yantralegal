import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import { legalPages, LegalPage, LegalSection } from '../../data/legalContents';

// Define the shape of params based on Next.js 15+ Async params
type Params = Promise<{ slug: string[] }>;

export async function generateStaticParams() {
  // Generate static paths for all 20 pages in our legalContents
  return legalPages.map((page) => {
    // Remove the leading slash and split by '/'
    const slug = page.url.substring(1).split('/');
    return { slug };
  });
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const url = '/' + slug.join('/');
  const page = legalPages.find((p) => p.url === url);

  if (!page) {
    return {
      title: 'Page Not Found | Yantra Legal',
    };
  }

  return {
    title: `${page.title} | Yantra Legal`,
    description: `Professional legal representation for ${page.title} in Sydney, Australia. Straightforward advice and personal attention from Krishna Giri.`,
    alternates: {
      canonical: page.url,
    },
  };
}

// Helper to map icon names to golden SVGs
const getIconSvg = (name: string) => {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  switch (key) {
    case 'wallet':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /><path d="M16 11h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2Z" /></svg>
      );
    case 'home':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
      );
    case 'people':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
      );
    case 'rings':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><circle cx="8" cy="12" r="5" /><circle cx="16" cy="12" r="5" /></svg>
      );
    case 'building':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="22" x2="9" y2="16" /><line x1="15" y1="22" x2="15" y2="16" /><line x1="9" y1="16" x2="15" y2="16" /><path d="M8 6h2v2H8V6zm4 0h2v2h-2V6zm4 0h2v2h-2V6zM8 10h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" /></svg>
      );
    case 'megaphone':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="m3 11 18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
      );
    case 'certificate':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><circle cx="12" cy="8" r="7" /><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" /></svg>
      );
    case 'scales':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="M16 16c0-3.3-2.7-6-6-6s-6 2.7-6 6" /><path d="M12 2v20" /><path d="M2 22h20" /><path d="M21 7H3" /><path d="M5 7v10h6" /><path d="M19 7v10h-6" /></svg>
      );
    case 'graduationcap':
    case 'graduation':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></svg>
      );
    case 'speechbubble':
    case 'chat':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
      );
    case 'briefcase':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
      );
    case 'link':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
      );
    case 'document':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
      );
    case 'fingerprint':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="M12 10a4 4 0 0 0-4 4v3" /><path d="M12 2a10 10 0 0 0-10 10v3" /><path d="M12 6a8 8 0 0 0-8 8v3" /><path d="M22 12A10 10 0 0 0 12 2" /><path d="M18 12a6 6 0 0 0-6-6" /><path d="M12 14v3" /><path d="M16 14v3" /></svg>
      );
    case 'clock':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
      );
    case 'plane':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="M17.8 20.19 15 15.5H8l-5.5 3.3L2 17l4.5-4L2 9l.5-1.8L8 10.5h7l2.8-4.69L20 6.5l-3.5 5.5 3.5 5.5z" /></svg>
      );
    case 'shield':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="legal-icon"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
      );
  }
};

// Helper to parse links in text
const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s\)]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(/^https?:\/\//)) {
      // Clean display name, e.g. show just domain or specific name
      let displayName = part;
      if (part.includes('points-calculator')) {
        displayName = 'Points Calculator';
      }
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--clr-yellow)', textDecoration: 'underline', fontWeight: 600 }}
        >
          {displayName}
        </a>
      );
    }
    return part;
  });
};

// Helper to format paragraphs, bullet items, and nested lists
const renderParagraphWithFormatting = (text: string) => {
  const lines = text.split('\n');
  let currentList: React.ReactNode[] = [];
  const rendered: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Check for bullet indicators
    const isBullet = trimmed.startsWith('•') || trimmed.startsWith('\u2022') || trimmed.startsWith('-') || trimmed.startsWith('✦');
    if (isBullet) {
      const clean = trimmed.replace(/^[•\u2022\-\✦\s]+/, '');
      currentList.push(
        <li key={idx} className="legal-bullet-item">
          <span className="legal-bullet-icon">✦</span>
          <span>{renderTextWithLinks(clean)}</span>
        </li>
      );
    } else {
      if (currentList.length > 0) {
        rendered.push(
          <ul key={`list-${idx}`} className="legal-bullet-list">
            {currentList}
          </ul>
        );
        currentList = [];
      }
      rendered.push(
        <p key={idx} className="legal-paragraph">
          {renderTextWithLinks(trimmed)}
        </p>
      );
    }
  });

  if (currentList.length > 0) {
    rendered.push(
      <ul key="list-final" className="legal-bullet-list">
        {currentList}
      </ul>
    );
  }

  return rendered;
};

export default async function LegalDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const url = '/' + slug.join('/');
  const page = legalPages.find((p) => p.url === url);

  if (!page) {
    notFound();
  }

  // Determine category and sidebar pages
  let categoryName = 'Services';
  let sidebarPages: LegalPage[] = [];

  if (url.startsWith('/immigration-law')) {
    categoryName = 'Immigration Law';
    sidebarPages = legalPages.filter((p) => p.url.startsWith('/immigration-law'));
  } else if (url.startsWith('/family-law')) {
    categoryName = 'Family Law';
    sidebarPages = legalPages.filter((p) => p.url.startsWith('/family-law'));
  } else if (url.startsWith('/appeals-and-reviews')) {
    categoryName = 'Appeals & Reviews';
    sidebarPages = legalPages.filter((p) => p.url.startsWith('/appeals-and-reviews'));
  }

  // Original fallback renderer for simple paragraph lists
  const renderSectionContent = (paragraphs: string[]) => {
    const renderedElements: React.ReactNode[] = [];
    let currentListItems: string[] = [];

    paragraphs.forEach((p, idx) => {
      const trimmed = p.trim();
      if (!trimmed) return;

      const isBullet = trimmed.startsWith('•') || 
                       trimmed.startsWith('-') || 
                       trimmed.startsWith('✦') || 
                       trimmed.startsWith('→') ||
                       (trimmed.length < 120 && 
                        !trimmed.endsWith('.') && 
                        !trimmed.endsWith('?') && 
                        !trimmed.endsWith(':'));

      if (isBullet) {
        currentListItems.push(p);
      } else {
        if (currentListItems.length > 0) {
          renderedElements.push(
            <ul key={`list-${idx}`} className="legal-bullet-list">
              {currentListItems.map((item, lIdx) => {
                const cleanText = item.replace(/^[•\-\✦\→\s\*\d\.]+\s*/, '');
                return (
                  <li key={lIdx} className="legal-bullet-item">
                    <span className="legal-bullet-icon">✦</span>
                    <span>{renderTextWithLinks(cleanText)}</span>
                  </li>
                );
              })}
            </ul>
          );
          currentListItems = [];
        }
        renderedElements.push(
          <p key={idx} className="legal-paragraph">
            {renderTextWithLinks(p)}
          </p>
        );
      }
    });

    if (currentListItems.length > 0) {
      renderedElements.push(
        <ul key="list-final" className="legal-bullet-list">
          {currentListItems.map((item, lIdx) => {
            const cleanText = item.replace(/^[•\-\✦\→\s\*\d\.]+\s*/, '');
            return (
              <li key={lIdx} className="legal-bullet-item">
                <span className="legal-bullet-icon">✦</span>
                <span>{renderTextWithLinks(cleanText)}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    return renderedElements;
  };

  // Modern conditional block renderer for layout schemas
  const renderSection = (section: LegalSection, idx: number) => {
    // Inline Call to Action
    if (section.layout === 'cta') {
      const title = section.paragraphs[0] || 'Ready to take the next step?';
      const desc = section.paragraphs[1] || 'Book a consultation today.';
      return (
        <div key={idx} className="legal-inline-cta-container">
          <div className="legal-inline-cta">
            <h3 className="legal-inline-cta-title">{title}</h3>
            <p className="legal-inline-cta-desc">{desc}</p>
            <Link href="/contact" className="btn btn-yellow">
              <span>Book a Confidential Consultation</span>
              <span className="btn-arrow-circle">↗</span>
            </Link>
          </div>
        </div>
      );
    }

    // Alerts: warning, notice, callout, highlight
    if (section.layout === 'warning' || section.layout === 'notice' || section.layout === 'callout' || section.layout === 'highlight') {
      const isDuplicateTitle = section.paragraphs[0] === section.heading;
      const alertTitle = section.paragraphs[0];
      const alertBodyParagraphs = isDuplicateTitle ? section.paragraphs.slice(1) : section.paragraphs;

      return (
        <div key={idx} className="legal-alert-box-container">
          {section.heading && !isDuplicateTitle && section.heading !== 'Standard Page CTA' && (
            <h2 className="legal-section-title">{section.heading}</h2>
          )}
          <div className={`legal-alert-box ${section.layout}`}>
            <div className="legal-alert-icon-wrap">
              {section.layout === 'warning' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="legal-icon alert-warning"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              )}
              {section.layout === 'notice' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="legal-icon alert-notice"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
              )}
              {section.layout === 'callout' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="legal-icon alert-callout"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              )}
              {section.layout === 'highlight' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="legal-icon alert-highlight"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              )}
            </div>
            <div className="legal-alert-content">
              {alertTitle && section.layout !== 'highlight' && <h4 className="legal-alert-title">{alertTitle}</h4>}
              {alertBodyParagraphs.map((p, pIdx) => (
                <React.Fragment key={pIdx}>{renderParagraphWithFormatting(p)}</React.Fragment>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Standard structural layouts inside a section card wrapper
    return (
      <div key={idx} className="legal-section-card">
        {section.heading && <h2 className="legal-section-title">{section.heading}</h2>}
        
        {section.layout === 'deck' && (
          <div className="legal-deck-grid">
            {section.paragraphs.map((p, pIdx) => {
              const parts = p.split('|');
              if (parts.length === 3) {
                return (
                  <div key={pIdx} className="legal-deck-card">
                    <h4 className="legal-deck-card-title">{parts[0].trim()}</h4>
                    <div className="legal-deck-card-content">{renderParagraphWithFormatting(parts[2].trim())}</div>
                  </div>
                );
              }
              return <div key={pIdx}>{renderParagraphWithFormatting(p)}</div>;
            })}
          </div>
        )}

        {section.layout === 'vertical-deck' && (
          <div className="legal-vertical-deck">
            {section.paragraphs.map((p, pIdx) => {
              const parts = p.split('|');
              if (parts.length === 3) {
                return (
                  <div key={pIdx} className="legal-deck-card vertical">
                    <h4 className="legal-deck-card-title">{parts[0].trim()}</h4>
                    <div className="legal-deck-card-content">{renderParagraphWithFormatting(parts[2].trim())}</div>
                  </div>
                );
              }
              return <div key={pIdx}>{renderParagraphWithFormatting(p)}</div>;
            })}
          </div>
        )}

        {section.layout === 'grid' && (
          <div className="legal-grid">
            {section.paragraphs.map((p, pIdx) => {
              const parts = p.split('|');
              if (parts.length === 3) {
                return (
                  <div key={pIdx} className="legal-grid-card">
                    <div className="legal-grid-card-header">
                      <div className="legal-grid-card-icon">{getIconSvg(parts[1].trim())}</div>
                      <h4 className="legal-grid-card-title">{parts[0].trim()}</h4>
                    </div>
                    <div className="legal-grid-card-content">{renderParagraphWithFormatting(parts[2].trim())}</div>
                  </div>
                );
              }
              return <div key={pIdx} className="legal-grid-intro">{renderParagraphWithFormatting(p)}</div>;
            })}
          </div>
        )}

        {section.layout === 'timeline' && (
          <div className="legal-timeline">
            {section.paragraphs.map((p, pIdx) => {
              const parts = p.split('|');
              if (parts.length === 2) {
                return (
                  <div key={pIdx} className="legal-timeline-item">
                    <div className="legal-timeline-badge">{pIdx + 1}</div>
                    <div className="legal-timeline-content-wrap">
                      <h4 className="legal-timeline-step-title">{parts[0].trim()}</h4>
                      <div className="legal-timeline-desc">{renderParagraphWithFormatting(parts[1].trim())}</div>
                    </div>
                  </div>
                );
              }
              return <div key={pIdx}>{renderParagraphWithFormatting(p)}</div>;
            })}
          </div>
        )}

        {section.layout === 'comparison' && (
          <div className="legal-comparison-grid">
            {section.paragraphs.map((p, pIdx) => {
              const parts = p.split('|');
              if (parts.length === 2) {
                return (
                  <div key={pIdx} className="legal-comparison-card">
                    <h4 className="legal-comparison-card-title">{parts[0].trim()}</h4>
                    <div className="legal-comparison-card-content">{renderParagraphWithFormatting(parts[1].trim())}</div>
                  </div>
                );
              }
              return <div key={pIdx}>{renderParagraphWithFormatting(p)}</div>;
            })}
          </div>
        )}

        {!section.layout && renderSectionContent(section.paragraphs)}
      </div>
    );
  };

  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="legal-layout">
          {/* Left Column: Sidebar Menu */}
          <aside className="legal-sidebar">
            <h3 className="legal-sidebar-title">{categoryName}</h3>
            <ul className="legal-sidebar-links">
              {sidebarPages.map((sPage) => (
                <li key={sPage.url}>
                  <Link
                    href={sPage.url}
                    className={`legal-sidebar-link ${sPage.url === page.url ? 'active' : ''}`}
                  >
                    {sPage.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Right Column: Main Content */}
          <article className="legal-main">
            {/* Breadcrumbs */}
            <div className="legal-breadcrumbs">
              <Link href="/">Home</Link>
              <span className="legal-breadcrumbs-separator">/</span>
              <span>{categoryName}</span>
              {page.url !== `/${slug[0]}` && (
                <>
                  <span className="legal-breadcrumbs-separator">/</span>
                  <span style={{ color: 'var(--clr-yellow)' }}>{page.title}</span>
                </>
              )}
            </div>

            {/* Page Main Title */}
            <h1 className="legal-content-title">{page.title}</h1>

            {/* Sections */}
            {page.sections.map((section, idx) => renderSection(section, idx))}

            {/* Dynamic Consultation Call to Action */}
            {page.sections.filter(s => s.layout === 'cta').length === 0 && (
              <div className="legal-cta-card">
                <h3 className="legal-cta-title">Ready to Take the Next Step?</h3>
                <p className="legal-cta-desc">
                  Book a confidential consultation with Krishna Giri today. We offer fixed-fee initial consultations so you can discuss your {page.title.toLowerCase()} matter with complete privacy and certainty.
                </p>
                <Link href="/contact" className="btn btn-yellow">
                  <span>Book a Confidential Consultation</span>
                  <span className="btn-arrow-circle">↗</span>
                </Link>
              </div>
            )}
          </article>
        </div>
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

