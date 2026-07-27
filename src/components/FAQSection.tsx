'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => {
        if (data.faqs) {
          // Flatten items from all categories and take first 5
          const allItems: FAQItem[] = data.faqs.flatMap((cat: any, catIdx: number) =>
            cat.items.map((item: any, itemIdx: number) => ({
              id: `${catIdx}-${itemIdx}`,
              question: item.q,
              answer: item.a,
            }))
          );
          if (allItems.length > 0) {
            setFaqs(allItems.slice(0, 5));
            setOpenId(allItems[0].id); // Open first item by default
          }
        }
      })
      .catch((err) => console.error('Error fetching FAQs:', err));
  }, []);

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
