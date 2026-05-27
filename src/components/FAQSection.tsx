'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const homeFaqData: FAQItem[] = [
  {
    id: 1,
    question: 'Do I need a lawyer to apply for a visa?',
    answer: 'You are not legally required to use a lawyer or registered migration agent to lodge a visa application. However, migration law is complex and the consequences of errors can be serious — including refusal, cancellation, or bars on future applications. Professional advice at the outset is nearly always more cost-effective than remedial assistance later.'
  },
  {
    id: 2,
    question: 'What is the difference between a registered migration agent and a solicitor?',
    answer: 'A registered migration agent (RMA) is registered with the Migration Agents Registration Authority (MARA) and is authorised to give migration advice. A solicitor is admitted to the legal profession and may also hold MARA registration. Krishna Giri is both — admitted as a solicitor in NSW and registered with MARA. This dual qualification means he can provide both migration advice and broader legal advice (including about review and court proceedings) in a single engagement.'
  },
  {
    id: 3,
    question: 'How long does it take to get a divorce in Australia?',
    answer: 'Once a divorce application has been filed, the court generally takes around four months to process the matter and make the divorce order. The divorce takes effect one month and one day after the order is made, at which point both parties are free to remarry.'
  },
  {
    id: 4,
    question: 'What does an initial consultation cost?',
    answer: 'We offer fixed-fee initial consultations. Contact us to confirm the current fee. There are no hidden charges — we will provide a clear written estimate of costs before commencing any substantive work.'
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1); // 1 is open by default

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-watermark" />
      <div className="container">
        <div className="faq-grid">
          {/* Left Column */}
          <div className="faq-left-col reveal-on-scroll reveal-fade-up">
            <span className="faq-badge">FAQ</span>
            <h2 className="faq-title">
              Common Questions, <br />
              <span className="text-gradient-gold">Honest Answers.</span>
            </h2>
            <p className="faq-desc">
              We know that legal matters raise a lot of questions. Below are answers to some of the questions we hear most often. If you do not see what you are looking for, get in touch — we are happy to help.
            </p>
            <Link href="/faqs" className="faq-cta-btn">
              <span>View All FAQs</span>
              <span className="faq-cta-icon-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="faq-arrow-svg">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </Link>
          </div>

          {/* Right Column */}
          <div className="faq-right-col">
            <div className="faq-list">
              {homeFaqData.map((item, index) => {
                const isOpen = openId === item.id;
                return (
                  <div 
                    key={item.id} 
                    className={`faq-card ${isOpen ? 'active' : ''} reveal-on-scroll reveal-fade-up delay-${index * 100}`}
                    onClick={() => toggleFAQ(item.id)}
                  >
                    <div className="faq-card-header">
                      <h3 className="faq-card-question">{item.question}</h3>
                      <button 
                        className="faq-chevron-btn" 
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Collapse question" : "Expand question"}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFAQ(item.id);
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="faq-chevron-svg">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </div>
                    <div className="faq-answer-wrapper" style={{ maxHeight: isOpen ? '240px' : '0px' }}>
                      <p className="faq-card-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
