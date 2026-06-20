'use client';

import React from 'react';
import Link from 'next/link';

export default function SupportingDiverseCommunities() {
  const listItems = [
    { text: 'Facing visa refusals?', href: '/appeals-and-reviews/visa-refusals' },
    { text: 'Dealing with visa cancellations?', href: '/appeals-and-reviews/visa-cancellations' },
    { text: 'Reuniting with family in Australia?', href: '/migration-law/partner-visas' },
    { text: 'Navigating separation or divorce?', href: '/family-law/divorce-in-australia' },
    { text: 'Unsure about your visa options?', href: '/contact' },
  ];


  const chooseReasons = [
    {
      title: 'Lived Experience',
      desc: 'Having personally experienced migration and settlement across different countries, we understand many of the challenges our clients face.'
    },
    {
      title: 'Direct Access',
      desc: 'You work directly with your solicitor from the first consultation through to the resolution of your matter.'
    },
    {
      title: 'Clear Advice',
      desc: 'We explain legal issues in plain language so you can make informed decisions with confidence.'
    },
    {
      title: 'Personalised Representation',
      desc: 'Every matter receives individual attention and a tailored legal strategy.'
    }
  ];

  return (
    <section style={sectionStyle} className="section-padding">
      <div className="container" style={containerStyle}>
        <div style={gridStyle}>
          {/* Commented Out Left Column: Supporting Diverse Communities for future use
          <div style={leftColStyle}>
            <span className="sec-pill">Supporting Diverse Communities</span>
            <h2 style={titleStyle}>
              We Understand <span className="text-gradient-gold">More Than Just the Law</span>
            </h2>
            <p style={descStyle}>
              Visa delays, refusals, and family breakdowns can be stressful and uncertain. You may feel confused about your options or unsure what to do next.
            </p>
            <p style={descStyle}>
              We are here to help you move forward with clarity and confidence. We provide culturally aware, responsive legal support tailored to your unique circumstances.
            </p>
            <div style={btnWrapStyle}>
              <Link href="/contact" className="btn btn-yellow">
                <span>Speak with a Solicitor Today</span>
                <span className="btn-arrow-circle">↗</span>
              </Link>
            </div>
          </div>
          */}

          {/* New Left Column: Why Clients Choose Yantra Legal */}
          <div style={leftColStyle}>
            <span className="sec-pill">Why Yantra Legal</span>
            <h2 style={titleStyle}>
              Why Clients <span className="text-gradient-gold">Choose Yantra Legal</span>
            </h2>
            
            <div className="why-choose-cards-grid">
              {chooseReasons.map((reason, idx) => (
                <div key={idx} className="glass why-choose-card reveal-on-scroll reveal-fade-up">
                  <h3 className="why-choose-card-title">{reason.title}</h3>
                  <p className="why-choose-card-desc">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Assistance Tiles */}
          <div style={rightColStyle}>
            <div className="assist-wrapper" style={{ width: '100%' }}>
              <h3 className="assist-header">How We Can Assist You</h3>
              <div className="assist-grid">
                {listItems.map((item, idx) => (
                  <Link href={item.href} key={idx} className="glass assist-tile reveal-on-scroll reveal-fade-up" style={{ display: 'flex', textDecoration: 'none' }}>
                    <span className="assist-tile-index">0{idx + 1}</span>
                    <span className="assist-tile-text">{item.text}</span>
                    <span className="assist-tile-arrow">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  backgroundColor: '#0b2b20', // Rich emerald container base
  position: 'relative',
  overflow: 'hidden',
  padding: '100px 0',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
};

const containerStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '48px',
  alignItems: 'center',
};

const leftColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '20px',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
  color: '#ffffff',
  margin: 0,
  lineHeight: 1.2,
};

const descStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.65,
  color: 'var(--clr-text-muted)',
  margin: 0,
};

const btnWrapStyle: React.CSSProperties = {
  marginTop: '12px',
};

const rightColStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

