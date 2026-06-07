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
    question: 'How much does an initial consultation cost?',
    answer: 'Please contact us to confirm the current consultation fee. We offer fixed-fee initial consultations so you know the cost upfront, and we provide a clear written estimate before commencing any substantive work.'
  },
  {
    id: 2,
    question: 'Do I need a lawyer for a visa application?',
    answer: 'Not every visa application requires legal representation. However, obtaining legal advice can help you understand eligibility requirements, avoid common mistakes, and address complex issues that may affect your application. Many clients who come to us have already lodged an application on their own and received a refusal — professional advice at the outset is nearly always more cost-effective than remedial assistance later.'
  },
  {
    id: 3,
    question: 'Can you help if my visa has been refused?',
    answer: 'Yes. We can assess the reasons for the refusal, explain available review options, and advise whether you may be eligible to seek review before the Administrative Review Tribunal (ART) or pursue alternative pathways. Time limits apply — contact us as soon as you receive the decision.'
  },
  {
    id: 4,
    question: 'How long do I have to appeal a visa refusal?',
    answer: 'Time limits vary depending on the type of decision and your individual circumstances. Some review applications must be lodged within as little as 21 days. It is important to seek legal advice as soon as possible after receiving a decision.'
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
