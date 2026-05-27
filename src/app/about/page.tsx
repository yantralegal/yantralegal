'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        {/* Page Hero Header */}
        <section style={headerSectionStyle}>
          <div className="container">
            <span className="sec-pill">About Our Practice</span>
            <h1 style={titleStyle}>
              Clarity, Honesty & <span className="text-gradient-gold">Commitment</span>
            </h1>
            <p style={subtitleStyle}>
              Yantra Legal is a dedicated migration and divorce practice committed to protecting client rights with clear, honest legal guidance.
            </p>
          </div>
        </section>

        {/* Firm Overview & Why Yantra */}
        <section style={overviewSectionStyle}>
          <div className="container" style={gridStyle}>
            <div className="glass" style={cardStyle}>
              <h2 style={sectionHeaderStyle}>Firm Overview</h2>
              <p style={bodyStyle}>
                Based in Sydney, Yantra Legal serves individuals, families, couples, and employers who need reliable advice across two of life&apos;s most consequential legal processes: migration and divorce.
              </p>
              <p style={bodyStyle}>
                Every matter is handled with personal attention, thoroughness, and a genuine sense of responsibility to each client&apos;s outcome. At Yantra Legal, we believe informed clients make better decisions — which is why clarity and honesty sit at the heart of everything we do.
              </p>
            </div>

            <div className="glass" style={cardStyle}>
              <h2 style={sectionHeaderStyle}>Why Yantra?</h2>
              <p style={bodyStyle}>
                The name Yantra Legal is drawn from the ancient concept of the yantra — a geometric instrument used across South Asian traditions as a tool for focus, order, and purposeful action.
              </p>
              <p style={bodyStyle}>
                Inspired by this idea, Yantra Legal approaches every matter with structure and intention: no shortcuts, no unnecessary complexity — just clear thinking applied to the right outcome. Inspired by the Shri Yantra, we believe true results come when strategy, clarity, and care work in balance.
              </p>
            </div>
          </div>
        </section>

        {/* Principal's Message Section (Styled EXACTLY as yantra_legal_principals_message.html) */}
        <section className="yl-section">
          <div className="yl-pill">Principal&apos;s Message</div>
          <div className="yl-layout">
            <div className="yl-left">
              <div className="yl-portrait-wrap">
                <span className="yl-portrait-initials">KG</span>
              </div>
              <h3 className="yl-name">Krishna Giri</h3>
              <p className="yl-title">Principal Solicitor & Founder</p>
              <p style={{ fontSize: '12px', color: 'rgba(245,240,232,0.45)', fontFamily: 'var(--font-sans)', margin: 0 }}>
                Dual-qualified · AU & Nepal
              </p>
              
              <div className="yl-divider"></div>
              
              <p style={{ fontSize: '11px', color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-sans)', margin: '0 0 10px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Languages
              </p>
              <div className="yl-langs">
                <span className="yl-lang-tag">English</span>
                <span className="yl-lang-tag">Nepali</span>
                <span className="yl-lang-tag">Hindi</span>
                <span className="yl-lang-tag">German</span>
                <span className="yl-lang-tag">Spanish</span>
              </div>
            </div>

            <div className="yl-right">
              <h2 className="yl-heading">Dear Valued Client,</h2>
              <p className="yl-subheading">Welcome to Yantra Legal</p>

              <p className="yl-body">
                My name is Krishna Giri, and I am the Principal Solicitor and Founder of Yantra Legal. I established this Sydney-based firm with a clear vision: to create a legal practice where every client feels heard, protected, and guided with balance and clarity — especially during life&apos;s most significant transitions.
              </p>

              <p className="yl-body">
                Originally from Nepal, I bring more than 13 years of legal experience spanning two countries. I began my legal career in Nepal as a qualified lawyer and later pursued my Master&apos;s degree in Germany, broadening my international perspective on law, justice, and cross-cultural understanding. This global journey eventually led me to Australia, where I am now dual-qualified as a lawyer in both Australia and Nepal.
              </p>

              <p className="yl-body">
                At Yantra Legal, my multilingual background — fluent in English, Nepali, Hindi, German, and Spanish — allows me to connect meaningfully with clients from diverse cultural backgrounds. I understand firsthand the challenges of building a new life in Australia, navigating complex immigration processes, and managing sensitive family matters.
              </p>

              <div className="yl-highlight">
                &ldquo;Yantra&rdquo; is deeply meaningful to me. In ancient sacred geometry, the Shri Yantra symbolises harmony, protection, and the perfect balance of forces — the same principle I apply to every matter we handle.
              </div>

              <p className="yl-body">
                Whether guiding a family through a partner visa application or supporting a client through a difficult property settlement or parenting dispute, my team and I work to align strategy, compassion, and precision so that you can move forward with confidence and security.
              </p>

              <p className="yl-body">
                What matters most to me is that you never feel like just another file. At Yantra Legal, your story, your goals, and your future are at the centre of everything we do. We listen first, explain clearly, and fight strategically — always with your long-term wellbeing in mind.
              </p>

              <p className="yl-body">
                Thank you for considering Yantra Legal. I personally welcome you to reach out and experience the difference a balanced, client-centred approach can make.
              </p>

              <div className="yl-signature">
                <p className="yl-sig-regards">With warm regards,</p>
                <p className="yl-sig-name">Krishna Giri</p>
                <p className="yl-sig-role">
                  Principal Solicitor & Founder · Yantra Legal<br />
                  Sydney, New South Wales
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials, Qualifications & Languages lists */}
        <section style={credentialsSectionStyle}>
          <div className="container" style={gridStyle}>
            <div className="glass" style={cardStyle}>
              <h2 style={sectionHeaderStyle}>Qualifications & Admissions</h2>
              <ul style={listStyle}>
                <li style={listItemStyle}>
                  <span style={bulletStyle}>✦</span>
                  <span>Admitted as a Solicitor — Supreme Court of New South Wales, Australia</span>
                </li>
                <li style={listItemStyle}>
                  <span style={bulletStyle}>✦</span>
                  <span>Admitted as an Advocate — Nepal Bar Council</span>
                </li>
                <li style={listItemStyle}>
                  <span style={bulletStyle}>✦</span>
                  <span>Member — Law Society of New South Wales</span>
                </li>
              </ul>
            </div>

            <div className="glass" style={cardStyle}>
              <h2 style={sectionHeaderStyle}>Language Capacities</h2>
              <p style={bodyStyle}>
                We prioritize clear communication above all else. Krishna and his team represent you in the language you are most comfortable using.
              </p>
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ color: 'var(--clr-yellow)', fontSize: '0.9rem', marginBottom: '8px' }}>Fluent Legal Representation:</h4>
                <div style={badgeGroupStyle}>
                  <span style={badgeStyle2}>English</span>
                  <span style={badgeStyle2}>Nepali</span>
                  <span style={badgeStyle2}>Hindi</span>
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <h4 style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '8px' }}>Functional Working Knowledge:</h4>
                <div style={badgeGroupStyle}>
                  <span style={badgeStyle3}>German</span>
                  <span style={badgeStyle3}>Spanish</span>
                </div>
              </div>
            </div>
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

const overviewSectionStyle: React.CSSProperties = {
  padding: '40px 0',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '30px',
};

const cardStyle: React.CSSProperties = {
  padding: '40px 32px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  background: 'rgba(11, 43, 32, 0.3)',
};

const sectionHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.8rem',
  fontWeight: 500,
  color: 'var(--clr-yellow)',
  marginBottom: '20px',
};

const bodyStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: 'var(--clr-text-muted)',
  marginBottom: '16px',
};

const credentialsSectionStyle: React.CSSProperties = {
  padding: '40px 0 100px 0',
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const listItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  fontSize: '0.95rem',
  color: 'var(--clr-text-muted)',
  lineHeight: 1.5,
};

const bulletStyle: React.CSSProperties = {
  color: 'var(--clr-yellow)',
  fontWeight: 'bold',
  flexShrink: 0,
};

const badgeGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};

const badgeStyle2: React.CSSProperties = {
  background: 'rgba(223, 173, 62, 0.12)',
  color: 'var(--clr-yellow)',
  border: '1px solid rgba(223, 173, 62, 0.3)',
  padding: '6px 14px',
  borderRadius: '100px',
  fontSize: '0.85rem',
  fontWeight: 600,
};

const badgeStyle3: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.03)',
  color: 'rgba(255, 255, 255, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '6px 14px',
  borderRadius: '100px',
  fontSize: '0.85rem',
  fontWeight: 500,
};
