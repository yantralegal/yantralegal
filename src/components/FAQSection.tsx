'use client';

import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'Do You Offer An Initial Consultation?',
    answer: 'Yes. We offer initial strategic consultations to review your case, analyze visa options or family law matters, and outline a clear action plan. During this session, we assess your eligibility, potential pathways, and estimated timelines.'
  },
  {
    id: 2,
    question: 'How Are Legal Fees Calculated?',
    answer: 'Fees depend on the nature, complexity, and duration of the case. We operate primarily on a transparent fixed-fee basis for standard visa applications, drafting consent orders, and AAT submissions, ensuring no hidden costs. We explain all costs clearly before starting any work.'
  },
  {
    id: 3,
    question: 'Will My Information Remain Confidential?',
    answer: 'Absolutely. Professional confidentiality and legal professional privilege are the cornerstones of our practice. All information, documents, and disclosures shared with Yantra Legal are strictly protected under Australian legal practice regulations.'
  },
  {
    id: 4,
    question: 'How Long Will My Case Take?',
    answer: 'Immigration processing times vary significantly depending on the Department of Home Affairs (DHA) or AAT caseloads. Family law matters can range from a few weeks for uncontested consent orders to several months if court proceedings are necessary.'
  },
  {
    id: 5,
    question: 'Do You Handle Cases Outside Your City?',
    answer: 'Yes, we represent clients across all Australian states and territories, as well as international clients looking to migrate. Since most immigration and federal court filings are processed electronically, and consultations can be held via secure video link.'
  },
  {
    id: 6,
    question: 'How Can I Get Started?',
    answer: 'To begin, you can book an initial consultation online or request a free quote by contacting us. We will send you an intake questionnaire to collect necessary details before our session, allowing us to hit the ground running with tailored, actionable advice.'
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(2); // 2 is open by default, matching screenshot

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
              Answers To <br />
              <span className="text-gradient-gold">Questions.</span>
            </h2>
            <p className="faq-desc">
              Our FAQ section is designed to answer common questions about our legal services, fees, confidentiality, and consultation process. We believe in transparency.
            </p>
            <a href="#contact" className="faq-cta-btn">
              <span>Get a free quote</span>
              <span className="faq-cta-icon-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="faq-arrow-svg">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </a>
          </div>

          {/* Right Column */}
          <div className="faq-right-col">
            <div className="faq-list">
              {faqData.map((item, index) => {
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
                          // Prevent triggering double click if we clicked button directly
                          e.stopPropagation();
                          toggleFAQ(item.id);
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="faq-chevron-svg">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </div>
                    <div className="faq-answer-wrapper" style={{ maxHeight: isOpen ? '160px' : '0px' }}>
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
