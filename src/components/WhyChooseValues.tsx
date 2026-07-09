'use client';

import React from 'react';

export default function WhyChooseValues() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'next' | 'prev') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cards = container.getElementsByClassName('cv-minimal-card');
      if (cards.length > 0) {
        const cardWidth = cards[0].getBoundingClientRect().width + 20; // card width + gap
        const currentScroll = container.scrollLeft;
        const targetScroll = direction === 'next' 
          ? currentScroll + cardWidth 
          : currentScroll - cardWidth;
        
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  };

  const reasons = [
    {
      num: '01',
      title: 'Lived Migration Experience',
      desc: 'Having lived in Nepal, Germany and Australia, we understand what it feels like to build a new life in a different country. We know that migration matters often involve family, work, uncertainty and important life decisions—not just paperwork.',
    },
    {
      num: '02',
      title: 'Direct Access to Your Solicitor',
      desc: 'When you choose Yantra Legal, you work directly with our solicitor, Krishna Giri from your first consultation until your matter is finalised. Your case is not passed between different staff members, so you always know who is handling your matter.',
    },
    {
      num: '03',
      title: 'Clear & Honest Advice',
      desc: 'Legal advice should be clear, not confusing. We explain your options in plain English and, where helpful, in Nepali or Hindi, so you can make informed decisions with confidence.',
    },
    {
      num: '04',
      title: 'Truly Personalised Representation',
      desc: 'No two legal matters are the same. We take the time to understand your circumstances, your goals and what matters most to you. Our advice is tailored to your situation rather than following a one-size-fits-all approach.',
    },
    {
      num: '05',
      title: 'Fixed-Fee Transparency',
      desc: 'We believe you should know what to expect before you proceed. We offer fixed-fee initial consultations and provide clear information about legal costs, so there are no unexpected surprises.',
    },
  ];


  const values = [
    {
      num: 'I',
      title: 'Clarity',
      desc: 'The law should never feel confusing or inaccessible. We explain legal issues in plain language so clients understand their options and can make informed decisions.',
    },
    {
      num: 'II',
      title: 'Honesty',
      desc: 'We provide straightforward advice, even when it may not be what a client hopes to hear. Honest advice creates realistic expectations and better outcomes.',
    },
    {
      num: 'III',
      title: 'Balance',
      desc: 'Inspired by the principles behind the Yantra, we approach every matter with balance — combining strategy with empathy, precision with care, and professionalism with understanding.',
    },
    {
      num: 'IV',
      title: 'Commitment',
      desc: 'Every matter receives our full attention. We focus on quality over volume, ensuring every client receives personalised service and dedicated representation.',
    },
  ];

  return (
    <>
      {/* WHY CHOOSE US (Editorial Split-Screen Layout) */}
      <section className="wcu-section" id="why-choose-us">
        <div className="wcu-split-layout">
          {/* Left Column: Sticky Title & Description */}
          <div className="wcu-left">
            <span className="sec-pill">Why Yantra Legal</span>
            <h2 className="wcu-sticky-heading">
              Why Clients <br />
              <span>Choose Yantra Legal</span>
            </h2>
            <p className="wcu-sticky-sub">
              Choosing a lawyer is about more than legal knowledge. You want someone who will listen, understand your situation, and guide you with honesty and care. {"That's how we work at Yantra Legal."}
            </p>
          </div>

          {/* Right Column: Clean Content List */}
          <div className="wcu-list">
            {reasons.map((reason) => (
              <div key={reason.num} className="wcu-item reveal-on-scroll reveal-fade-up">
                <span className="wcu-item-num">{reason.num}</span>
                <div className="wcu-item-content">
                  <h3 className="wcu-item-title">{reason.title}</h3>
                  <p className="wcu-item-body">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES (Minimal Typography Layout) */}
      <section className="cv-section" id="core-values">
        <div className="container">
          <div className="cv-header">
            <span className="sec-pill dark">What We Stand For</span>
            <h2 className="cv-heading">
              Our Core <span>Values</span>
            </h2>
            <p className="cv-sub">
              Everything we do at Yantra Legal is guided by four core principles – drawn from our name and a belief that legal practice should be built on clarity, integrity, and balance.
            </p>
          </div>


          <div className="cv-row-grid" ref={scrollRef}>
            {values.map((val, idx) => (
              <div key={val.num} className="cv-minimal-card reveal-on-scroll reveal-fade-up">
                <span className="cv-num-accent">{val.num}</span>
                <h3 className="cv-minimal-title">{val.title}</h3>
                
                {/* Visual Swipe Indicator Icon inside the card (Mobile Only) */}
                <div 
                  className="cv-card-swipe-icon"
                  onClick={() => handleScroll(idx === values.length - 1 ? 'prev' : 'next')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
                
                <p className="cv-minimal-body">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
