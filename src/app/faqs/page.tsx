'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface FAQ {
  q: string;
  a: string;
}

interface FAQCategory {
  category: string;
  items: FAQ[];
}

const faqsData: FAQCategory[] = [
  {
    category: 'Migration — General',
    items: [
      {
        q: 'Do I need a lawyer to apply for a visa?',
        a: 'You are not legally required to use a lawyer or registered migration agent to lodge a visa application. However, migration law is complex and the consequences of errors can be serious — including refusal, cancellation, or bars on future applications. Many clients who come to us have already made an application on their own and received a refusal. Professional advice at the outset is nearly always more cost-effective than remedial assistance later.'
      },
      {
        q: 'What is the difference between a registered migration agent and a solicitor?',
        a: 'A registered migration agent (RMA) is registered with the Migration Agents Registration Authority (MARA) and is authorised to give migration advice. A solicitor is admitted to the legal profession and may also hold MARA registration. Krishna Giri is both — admitted as a solicitor in NSW and registered with MARA. This dual qualification means he can provide both migration advice and broader legal advice (including about review and court proceedings) in a single engagement.'
      },
      {
        q: 'How long does it take to process a visa?',
        a: 'Processing times vary significantly by visa subclass, caseload, and individual circumstances. They can range from a few weeks for some visitor visas to several years for some parent visas. We can advise you on current processing times for the visa you are applying for at the time of your consultation.'
      },
      {
        q: 'Can I work in Australia while my visa is being processed?',
        a: 'It depends on which visa you applied for and which bridging visa you currently hold. Some bridging visas carry work rights equivalent to the substantive visa applied for; others do not. We can advise you on your specific situation.'
      }
    ]
  },
  {
    category: 'Partner Visas',
    items: [
      {
        q: 'We have been in a de facto relationship for eight months. Can we apply for a partner visa?',
        a: 'No. De facto couples must generally have been in the relationship for at least 12 months before lodging a partner visa application. There are exceptions where the de facto relationship is registered under a relevant Australian state or territory law. If you are approaching the 12-month mark, it may be worth beginning to gather evidence of your relationship now so you are ready to apply.'
      },
      {
        q: 'My partner visa has been refused. What can I do?',
        a: 'In most cases, if your partner visa was refused by a delegate of the Minister, you have the right to apply for merits review at the Administrative Review Tribunal (ART). Strict time limits apply — act promptly. Contact us as soon as you receive the refusal decision.'
      }
    ]
  },
  {
    category: 'Skilled Migration',
    items: [
      {
        q: 'What is SkillSelect?',
        a: 'SkillSelect is the online system managed by the Department of Home Affairs through which prospective skilled migrants submit an Expression of Interest (EOI). If an applicant\'s EOI score meets the invitation threshold in a particular invitation round, they receive an invitation to apply for the visa. Only invited applicants can then lodge a formal visa application.'
      },
      {
        q: 'What score do I need for a skilled visa?',
        a: 'The minimum pass mark is 65 points. However, in practice, the scores required to receive an invitation are often significantly higher — particularly for the subclass 189 (Skilled Independent) visa. The actual cutoff score varies with each invitation round, depending on the volume and quality of EOIs in the pool.'
      }
    ]
  },
  {
    category: 'Divorce',
    items: [
      {
        q: 'How long does it take to get a divorce in Australia?',
        a: 'Once a divorce application has been filed, the court generally takes around four months to process the matter and make the divorce order. The divorce takes effect one month and one day after the order is made, at which point both parties are free to remarry.'
      },
      {
        q: 'Does my spouse have to consent to the divorce?',
        a: 'No. Australia\'s divorce system is based on no-fault irretrievable breakdown. If the parties have been separated for 12 months, either party can apply for a divorce without the other\'s consent. The other party will need to be served with the application and has the right to respond, but they cannot prevent the divorce from being granted if the separation period has been established.'
      },
      {
        q: 'What is the difference between divorce and property settlement?',
        a: 'Divorce is the legal dissolution of the marriage. It does not deal with property, finances, or parenting arrangements — those are dealt with in separate proceedings under the Family Law Act 1975. Importantly, applying for property orders must generally be done within 12 months of the divorce order being made. Missing this deadline can result in losing the right to seek property orders.'
      }
    ]
  },
  {
    category: 'Fees & Process',
    items: [
      {
        q: 'What does an initial consultation cost?',
        a: 'We offer fixed-fee initial consultations. Contact us to confirm the current fee. There are no hidden charges — we will provide a clear written estimate of costs before commencing any substantive work.'
      },
      {
        q: 'Do you offer interpreting services?',
        a: 'We advise clients in English, Nepali, and Hindi. If you require an interpreter for another language, we can arrange this — please let us know in advance.'
      }
    ]
  }
];

export default function FAQsPage() {
  const [activeIndices, setActiveIndices] = useState<{ [key: string]: boolean }>({
    'Migration — General-0': true, // Open first FAQ by default
  });

  const toggleFAQ = (categoryKey: string, idx: number) => {
    const key = `${categoryKey}-${idx}`;
    setActiveIndices((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        {/* Hero Header */}
        <section style={headerSectionStyle}>
          <div className="container">
            <span className="sec-pill">Common Questions</span>
            <h1 style={titleStyle}>
              Honest Answers, <span className="text-gradient-gold">Clear Guidance</span>
            </h1>
            <p style={subtitleStyle}>
              We believe informed clients make better decisions. Find straightforward answers to frequently asked questions below.
            </p>
          </div>
        </section>

        {/* FAQs List */}
        <section style={faqSectionStyle}>
          <div className="container" style={{ maxWidth: '840px' }}>
            {faqsData.map((cat) => (
              <div key={cat.category} style={categoryGroupStyle}>
                <h2 style={categoryHeaderStyle}>{cat.category}</h2>

                <div className="faq-list">
                  {cat.items.map((item, idx) => {
                    const key = `${cat.category}-${idx}`;
                    const isOpen = !!activeIndices[key];

                    return (
                      <div
                        key={idx}
                        className={`faq-card ${isOpen ? 'active' : ''}`}
                        style={faqCardOverrideStyle}
                        onClick={() => toggleFAQ(cat.category, idx)}
                      >
                        <div className="faq-card-header" style={{ cursor: 'pointer' }}>
                          <h3 className="faq-card-question" style={questionStyle}>{item.q}</h3>
                          <button
                            className="faq-chevron-btn"
                            aria-expanded={isOpen}
                            aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                            style={btnOverrideStyle}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                              }}
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </button>
                        </div>
                        <div
                          style={{
                            maxHeight: isOpen ? '300px' : '0px',
                            overflow: 'hidden',
                            transition: 'max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        >
                          <p className="faq-card-answer" style={answerStyle}>{item.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const layoutStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#061912',
};

const mainContentStyle: React.CSSProperties = {
  flex: 1,
};

const headerSectionStyle: React.CSSProperties = {
  padding: '160px 0 60px 0',
  textAlign: 'center',
  background: 'linear-gradient(180deg, #04120d 0%, #061912 100%)',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 400,
  color: '#ffffff',
  marginBottom: '20px',
  lineHeight: 1.2,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  color: 'var(--clr-text-muted)',
  maxWidth: '720px',
  margin: '0 auto',
  lineHeight: 1.6,
};

const faqSectionStyle: React.CSSProperties = {
  padding: '40px 0 100px 0',
};

const categoryGroupStyle: React.CSSProperties = {
  marginBottom: '50px',
};

const categoryHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.6rem',
  fontWeight: 500,
  color: 'var(--clr-yellow)',
  marginBottom: '20px',
  borderBottom: '1px solid rgba(223, 173, 62, 0.2)',
  paddingBottom: '8px',
};

const faqCardOverrideStyle: React.CSSProperties = {
  cursor: 'pointer',
  marginBottom: '12px',
};

const questionStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 600,
};

const answerStyle: React.CSSProperties = {
  fontSize: '0.88rem',
  lineHeight: '1.7',
  paddingTop: '8px',
  color: 'rgba(255, 255, 255, 0.75)',
};

const btnOverrideStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
