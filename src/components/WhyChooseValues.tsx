'use client';

import React from 'react';

export default function WhyChooseValues() {
  const reasons = [
    {
      num: '01',
      title: 'Dual Qualification : Australia & Nepal',
      desc: 'Krishna is a qualified lawyer in both Australia and Nepal — one of very few practitioners in Sydney who can advise across both jurisdictions, particularly for clients with cross-border legal matters.',
    },
    {
      num: '02',
      title: 'Multilingual Practice',
      desc: 'We communicate in English, Nepali, Hindi, German, and Spanish. Legal advice is only useful when fully understood — and we make sure it is, in the language you are most comfortable in.',
    },
    {
      num: '03',
      title: 'Lived Cross-Cultural Experience',
      desc: 'Krishna has personally navigated building a life in a new country. That experience shapes how we approach every migration matter — with genuine understanding, not just technical knowledge.',
    },
    {
      num: '04',
      title: 'Personal Attention, Every Time',
      desc: 'Yantra Legal is not a large firm where your matter is passed between staff. Krishna handles every case personally — consistent advice, clear communication, and full accountability.',
    },
    {
      num: '05',
      title: 'Fixed-Fee Transparency',
      desc: 'We operate on a fixed-fee basis for most matters. You know the full cost before we begin — no hidden charges, no billing surprises at the end of your matter.',
    },
    {
      num: '06',
      title: 'Specialist Scope',
      desc: 'We focus on migration law and divorce. A focused practice means deeper expertise — your matter is handled by someone who works in this area every single day.',
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
              Six Reasons to <br />
              <span>Choose Us</span>
            </h2>
            <p className="wcu-sticky-sub">
              Yantra Legal brings a combination of qualifications, lived experience, and personal commitment that few practices in Sydney can match.
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
              Everything we do at Yantra Legal is guided by four principles — drawn from the firm&apos;s name and the way we believe legal practice should work.
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
