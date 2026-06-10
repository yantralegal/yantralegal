'use client';

import React from 'react';

export default function WhyChooseValues() {
  const reasons = [
    {
      num: '01',
      title: 'Direct Access to Your Solicitor',
      desc: 'You communicate directly with the lawyer handling your matter.',
    },
    {
      num: '02',
      title: 'Legal Expertise Backed by Lived Experience',
      desc: 'We understand migration journeys because we have experienced them personally.',
    },
    {
      num: '03',
      title: 'Clear and Practical Advice',
      desc: 'No unnecessary legal jargon. Just clear explanations and realistic options.',
    },
    {
      num: '04',
      title: 'Focused Legal Practice',
      desc: 'We specialise in migration law and divorce matters – not general legal services.',
    },
    {
      num: '05',
      title: 'Transparent Communication',
      desc: 'We keep you informed at every stage of your matter.',
    },
  ];


  const values = [
    {
      num: 'I',
      title: 'Clarity',
      desc: 'The law should never feel like a barrier. Every client leaves every conversation with a clear understanding of their situation, their options, and the next step — no jargon, no ambiguity.',
    },
    {
      num: 'II',
      title: 'Honesty',
      desc: 'We give straightforward advice — even when it is not what a client hoped to hear. Informed decisions lead to better outcomes, and we never oversell what we can deliver.',
    },
    {
      num: 'III',
      title: 'Balance',
      desc: 'The name Yantra is drawn from ancient sacred geometry — a symbol of the perfect balance between opposing forces. That same principle guides our work: strategy and empathy, precision and care, always in proportion.',
    },
    {
      num: 'IV',
      title: 'Commitment',
      desc: 'Every matter we take on receives our full attention from the first consultation to the final outcome. We do not take on more than we can handle well — because quality matters more than volume.',
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
              Yantra Legal brings a unique combination of dual qualifications, lived cross-cultural experience, and personal commitment to every matter.
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


          <div className="cv-row-grid">
            {values.map((val) => (
              <div key={val.num} className="cv-minimal-card reveal-on-scroll reveal-fade-up">
                <span className="cv-num-accent">{val.num}</span>
                <h3 className="cv-minimal-title">{val.title}</h3>
                <p className="cv-minimal-body">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
