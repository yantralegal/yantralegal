'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const DEFAULT_HOMEPAGE_FAQS = [
  {
    id: 'faq-1',
    question: 'How much does an initial consultation cost?',
    answer: 'Our initial consultations are offered at a fixed fee. The cost is shown when you book your appointment, so you\'ll know exactly what to expect before you proceed.'
  },
  {
    id: 'faq-2',
    question: 'What happens after I book a consultation?',
    answer: 'Once you submit your booking request, we\'ll review the information you\'ve provided and contact you to confirm your appointment. We\'ll answer any initial questions, explain the next steps, and confirm your consultation once everything is in place.'
  },
  {
    id: 'faq-3',
    question: 'Do you review documents before the initial consultation?',
    answer: 'Our initial consultation is focused on understanding your situation and discussing your legal options. If you need a detailed review of your documents or application, we offer this as a separate service, which can be discussed during your consultation.'
  },
  {
    id: 'faq-4',
    question: 'Can you help if my visa has been refused?',
    answer: 'Yes. We\'ll explain why your visa was refused, discuss your options, and advise you on the best way forward. Depending on your circumstances, this may include a review, a new application, or another legal pathway.'
  },
  {
    id: 'faq-5',
    question: 'Can you help with divorce or separation?',
    answer: 'Yes. We assist clients with divorce and separation matters by explaining the legal process, protecting their rights, and helping them move forward with confidence.'
  },
  {
    id: 'faq-6',
    question: 'Do you assist clients across Australia and overseas?',
    answer: 'Yes. We work with clients across Australia and around the world. Most consultations can be conducted by phone or video, so your location doesn\'t prevent us from assisting you.'
  }
];

export default function FAQSection() {
  const [faqs] = useState<FAQItem[]>(DEFAULT_HOMEPAGE_FAQS);
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };


  return (
    <section className="faq-section" id="faq">
      <div className="faq-watermark" />
      <div className="container">
        <div className="faq-grid">
          {/* Left Column */}
          <div className="faq-left-col reveal-on-scroll reveal-fade-up">
            <span className="faq-badge">Frequently Asked Questions</span>
            <h2 className="faq-title">
              Common Questions. <br />
              <span className="text-gradient-gold">Clear Answers.</span>
            </h2>
            <p className="faq-desc">
              We understand that legal matters can be complex and often raise many questions. Here are answers to some of the questions we're asked most frequently. If you can't find what you're looking for, we're here to help.
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
              {faqs.map((item, index) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className={`reveal-on-scroll reveal-fade-up delay-${index * 100}`}>
                    <div 
                      className={`faq-card ${isOpen ? 'active' : ''}`}
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
                      <div className="faq-answer-wrapper" style={{ maxHeight: isOpen ? '500px' : '0px' }}>
                        <p className="faq-card-answer">{item.answer}</p>
                      </div>
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
