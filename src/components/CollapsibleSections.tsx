'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LegalSection } from '../data/legalContents';

interface CollapsibleSectionsProps {
  sections: LegalSection[];
  pageTitle: string;
}

function WhyChooseYantraLegal() {
  return (
    <div className="yantra-why-choose">
      <h3 className="yantra-why-choose-title">Why Choose Yantra Legal?</h3>
      
      {/* Desktop (Full Version) */}
      <div className="yantra-desktop-only">
        <p className="yantra-why-choose-desc">
          Yantra Legal is a boutique Australian law practice focused on providing clear, practical, and compassionate legal support in migration and family law matters.
          We understand that legal issues are often closely tied to important life decisions, relationships, and future plans. Our approach is grounded in clarity, strategy, and genuine care for each client's situation.
        </p>
        <div className="yantra-why-choose-grid">
          <div className="yantra-why-choose-item">
            <h4 className="yantra-why-choose-item-title">Australian legal expertise</h4>
            <p className="yantra-why-choose-item-desc">We provide advice grounded in Australian law, practice, and procedure.</p>
          </div>
          <div className="yantra-why-choose-item">
            <h4 className="yantra-why-choose-item-title">Personal migration understanding</h4>
            <p className="yantra-why-choose-item-desc">Our approach is informed by both professional experience and a lived understanding of migration journeys.</p>
          </div>
          <div className="yantra-why-choose-item">
            <h4 className="yantra-why-choose-item-title">Practical and strategic advice</h4>
            <p className="yantra-why-choose-item-desc">We focus on realistic pathways and clear next steps rather than unnecessary complexity.</p>
          </div>
          <div className="yantra-why-choose-item">
            <h4 className="yantra-why-choose-item-title">Clear and honest communication</h4>
            <p className="yantra-why-choose-item-desc">We explain legal processes in a straightforward way so you always understand where you stand.</p>
          </div>
          <div className="yantra-why-choose-item" style={{ gridColumn: 'span 2' }}>
            <h4 className="yantra-why-choose-item-title">Compassionate and client-focused approach</h4>
            <p className="yantra-why-choose-item-desc">We recognise that every matter is personal and treat each case with care, respect, and attention to detail.</p>
          </div>
        </div>
      </div>

      {/* Mobile (Shorter Version) */}
      <div className="yantra-mobile-only">
        <p className="yantra-why-choose-desc" style={{ margin: 0 }}>
          Yantra Legal is a boutique Australian law practice providing practical and compassionate legal support in migration and family law matters.
          We combine legal expertise with a clear, honest, and client-focused approach to help you make informed decisions at every stage.
        </p>
        <div className="yantra-tags-container">
          <span className="yantra-tag-pill">Lived Experience</span>
          <span className="yantra-tag-pill">Australian Solicitor</span>
          <span className="yantra-tag-pill">Practical Advice</span>
          <span className="yantra-tag-pill">Clear Communication</span>
          <span className="yantra-tag-pill">Compassionate Guidance</span>
        </div>
      </div>
    </div>
  );
}

function WhySeekAdviceEarly() {
  return (
    <div className="yantra-early-advice">
      <h4 className="yantra-early-advice-title">
        <span>⚠️</span> Why Seek Advice Early?
      </h4>
      
      {/* Desktop (Full Version) */}
      <p className="yantra-early-advice-desc yantra-desktop-only">
        Time limits apply to most appeals, review applications, and judicial review matters. In many cases, strict deadlines begin from the date of the decision.
        Seeking legal advice early can significantly improve your understanding of available options and help ensure that important rights are not missed.
      </p>

      {/* Mobile (Shorter Version) */}
      <p className="yantra-early-advice-desc yantra-mobile-only">
        Strict time limits apply to most appeals and review processes. Early advice can help protect your legal options and improve your chances of a positive outcome.
      </p>
    </div>
  );
}

function FAQSection({ paragraphs, renderTextWithLinks }: { paragraphs: string[]; renderTextWithLinks: (text: string) => React.ReactNode }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  const parsedFAQs = paragraphs.map((p, idx) => {
    const lines = p.split('\n').map(l => l.trim()).filter(Boolean);
    let question = '';
    let answer = '';

    if (lines.length >= 2) {
      question = lines[0].replace(/^\d+\.\s*/, '');
      answer = lines.slice(1).join('\n');
    } else if (p.includes('?')) {
      const qIndex = p.indexOf('?');
      question = p.substring(0, qIndex + 1).replace(/^\d+\.\s*/, '').trim();
      answer = p.substring(qIndex + 1).trim();
    } else {
      question = `Question ${idx + 1}`;
      answer = p;
    }

    return { question, answer };
  });

  return (
    <div className="yantra-faq-list">
      {parsedFAQs.map((faq, fIdx) => {
        const isOpen = openIndex === fIdx;
        return (
          <div key={fIdx} className={`yantra-faq-item ${isOpen ? 'active' : ''}`}>
            <button
              className="yantra-faq-header"
              onClick={() => toggleFAQ(fIdx)}
              aria-expanded={isOpen}
            >
              <h4 className="yantra-faq-question">{faq.question}</h4>
              <span className="yantra-faq-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="9" y1="4" x2="9" y2="14" />
                  <line x1="4" y1="9" x2="14" y2="9" />
                </svg>
              </span>
            </button>
            <div
              className="yantra-faq-content"
              style={{
                maxHeight: isOpen ? '1000px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="yantra-faq-body">
                {faq.answer.split('\n').map((line, lIdx) => (
                  <p key={lIdx} style={{ margin: lIdx > 0 ? '12px 0 0 0' : 0 }}>
                    {renderTextWithLinks(line)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CollapsibleSections({ sections, pageTitle }: CollapsibleSectionsProps) {
  const pathname = usePathname() || '';
  const isAppealsPage = pathname.startsWith('/appeals-and-reviews');

  const isMigrationPage = pathname.startsWith('/migration-law');
  const isSensitiveMigration = 
    pathname === '/migration-law/protection-visas' || 
    pathname === '/migration-law/ministerial-intervention';
  const isConfidential = !isMigrationPage || isSensitiveMigration;

  const ctaButtonText = isConfidential ? 'Book a Confidential Consultation' : 'Book a Consultation';

  // Open the first section by default on mobile
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({
    0: true,
  });

  const toggleSection = (idx: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const [showNepali, setShowNepali] = useState(false);

  const hasNepaliSection = sections.some(s => /[\u0900-\u097F]/.test(s.heading || ''));

  const handleNepaliToggle = () => {
    const nextShowNepali = !showNepali;
    setShowNepali(nextShowNepali);
    if (nextShowNepali) {
      const nepaliIdx = sections.findIndex(s => /[\u0900-\u097F]/.test(s.heading || ''));
      if (nepaliIdx !== -1) {
        setExpandedSections(prev => ({
          ...prev,
          [nepaliIdx]: true
        }));
        // Scroll to the Nepali section smoothly after it renders
        setTimeout(() => {
          const element = document.getElementById(`legal-section-${nepaliIdx}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  };

  const filteredSections = sections.filter(section => {
    const isNepali = /[\u0900-\u097F]/.test(section.heading || '');
    if (isNepali) {
      return showNepali;
    }
    return true;
  });

  // Helper to parse links in text (including markdown [label](url))
  const renderTextWithLinks = (text: string) => {
    // Matches markdown links like [Partner Visas](/migration-law/partner-visas)
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
      
      // Fallback for standard http/https URLs
      const urlRegex = /(https?:\/\/[^\s\)]+)/g;
      const subParts = part.split(urlRegex);
      return subParts.map((subPart, j) => {
        if (subPart.match(/^https?:\/\//)) {
          let displayName = subPart;
          if (subPart.includes('points-calculator')) {
            displayName = 'Points Calculator';
          }
          return (
            <a
              key={`${i}-${j}`}
              href={subPart}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--clr-yellow)', textDecoration: 'underline', fontWeight: 600 }}
            >
              {displayName}
            </a>
          );
        }
        return subPart;
      });
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

  // Modern conditional block renderer for layout schemas
  const renderSection = (section: LegalSection, idx: number) => {
    const originalIdx = sections.indexOf(section);
    const isSectionOpen = !!expandedSections[originalIdx];

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
              <span>{ctaButtonText}</span>
              <span className="btn-arrow-circle">↗</span>
            </Link>
          </div>
        </div>
      );
    }

    // Alerts: warning, notice, callout, highlight
    if (section.layout === 'warning' || section.layout === 'notice' || section.layout === 'callout' || section.layout === 'highlight') {
      const isDuplicateTitle = section.paragraphs[0] === section.heading;
      const alertTitle = section.paragraphs.length > 1 ? section.paragraphs[0] : '';
      const alertBodyParagraphs = isDuplicateTitle 
        ? section.paragraphs.slice(1) 
        : (section.paragraphs.length > 1 ? section.paragraphs.slice(1) : section.paragraphs);

      const alertHeader = section.heading && !isDuplicateTitle && section.heading !== 'Standard Page CTA'
        ? section.heading
        : section.paragraphs[0];

      return (
        <div key={idx} id={`legal-section-${originalIdx}`} style={{ scrollMarginTop: '100px' }} className={`legal-alert-box-container ${isSectionOpen ? 'active' : ''}`}>
          {alertHeader && (
            <h2
              className="legal-section-title collapsible-header"
              onClick={() => toggleSection(originalIdx)}
            >
              <span>{alertHeader}</span>
              <span className="legal-accordion-chevron">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: isSectionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <polyline points="2 2 6 6 10 2" />
                </svg>
              </span>
            </h2>
          )}
          <div
            className="legal-collapsible-content-wrapper"
            style={{
              maxHeight: isSectionOpen ? '2000px' : '0px',
              overflow: 'hidden',
              transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
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
                {alertTitle && alertHeader !== alertTitle && section.layout !== 'highlight' && <h4 className="legal-alert-title">{alertTitle}</h4>}
                {alertBodyParagraphs.map((p, pIdx) => (
                  <React.Fragment key={pIdx}>{renderParagraphWithFormatting(p)}</React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    const isFAQ = section.heading.toLowerCase().includes('frequently asked questions') || section.layout === 'faq';

    return (
      <div key={idx} id={`legal-section-${originalIdx}`} style={{ scrollMarginTop: '100px' }} className={`legal-section-card ${isSectionOpen ? 'active' : ''}`}>
        {section.heading && (
          <h2
            className="legal-section-title collapsible-header"
            onClick={() => toggleSection(originalIdx)}
          >
            <span>{section.heading}</span>
            <span className="legal-accordion-chevron">
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isSectionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <polyline points="2 2 6 6 10 2" />
              </svg>
            </span>
          </h2>
        )}

        <div
          className="legal-collapsible-content-wrapper"
          style={{
            maxHeight: isSectionOpen ? (isFAQ ? '4000px' : '2000px') : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {isFAQ ? (
            <FAQSection paragraphs={section.paragraphs} renderTextWithLinks={renderTextWithLinks} />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    );
  };

  const normalSections = filteredSections.filter(s => s.layout !== 'cta');
  const ctaSections = filteredSections.filter(s => s.layout === 'cta');

  return (
    <>
      {hasNepaliSection && (
        <div className="nepali-toggle-container" style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 500 }}>
            Language / भाषा:
          </span>
          <button
            onClick={handleNepaliToggle}
            className={`btn-nepali-toggle ${showNepali ? 'active' : ''}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '20px',
              border: showNepali ? '1px solid var(--clr-yellow)' : '1px solid rgba(255, 255, 255, 0.15)',
              background: showNepali ? 'rgba(223, 173, 62, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              color: showNepali ? 'var(--clr-yellow)' : 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
              boxShadow: showNepali ? '0 0 10px rgba(223, 173, 62, 0.1)' : 'none'
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 8l6 6" />
              <path d="M4 14l6-6 2-3" />
              <path d="M2 5h12" />
              <path d="M7 2h1" />
              <path d="M22 22l-5-10-5 10" />
              <path d="M14 18h6" />
            </svg>
            <span>{showNepali ? 'नेपाली विवरण लुकाउनुहोस् (Hide Nepali)' : 'नेपालीमा हेर्नुहोस् (Show in Nepali)'}</span>
          </button>
        </div>
      )}

      {normalSections.map((section, idx) => renderSection(section, idx))}

      {/* Reusable Component 1: Why Choose Yantra Legal */}
      <WhyChooseYantraLegal />

      {/* CTA banner: either the one defined in sections or the default fallback */}
      {ctaSections.length > 0 ? (
        ctaSections.map((section, idx) => renderSection(section, normalSections.length + idx))
      ) : (
        <div className="legal-cta-card">
          <h3 className="legal-cta-title">Ready to Take the Next Step?</h3>
          <p className="legal-cta-desc">
            {isConfidential ? (
              `Book a confidential consultation with Krishna Giri today. We offer fixed-fee initial consultations so you can discuss your ${pageTitle.toLowerCase()} matter with complete privacy and certainty.`
            ) : (
              `Book a consultation with Krishna Giri today. We offer fixed-fee initial consultations so you can discuss your ${pageTitle.toLowerCase()} matter with complete certainty.`
            )}
          </p>
          <Link href="/contact" className="btn btn-yellow">
            <span>{ctaButtonText}</span>
            <span className="btn-arrow-circle">↗</span>
          </Link>
        </div>
      )}

      {/* Reusable Component 2: Why Seek Advice Early? (Appeals & Reviews pages only) */}
      {isAppealsPage && <WhySeekAdviceEarly />}
    </>
  );
}
