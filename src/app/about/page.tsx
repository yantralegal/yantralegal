'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LawyerPortrait from '../../components/LawyerPortrait';
import SupportingDiverseCommunities from '../../components/SupportingDiverseCommunities';
import Timeline from '../../components/Timeline';
import WhyChooseValues from '../../components/WhyChooseValues';
import WhatHappensNext from '../../components/WhatHappensNext';
import ScrollObserver from '../../components/ScrollObserver';

export default function AboutPage() {
  return (
    <div style={layoutStyle}>
      <ScrollObserver />
      <Navbar />

      <main style={mainContentStyle}>
        {/* 1. Breadcrumbs */}
        <div className="container" style={breadcrumbsContainerStyle}>
          <div className="legal-breadcrumbs" style={{ marginBottom: 0 }}>
            <Link href="/">Home</Link>
            <span className="legal-breadcrumbs-separator">/</span>
            <span style={{ color: 'var(--clr-yellow)' }}>About</span>
          </div>
        </div>

        {/* 2. Eyebrow & Hero */}
        <section style={headerSectionStyle}>
          <div className="container">
            <span className="sec-pill" style={{ marginBottom: '16px', display: 'inline-block' }}>About Our Practice</span>
            <h1 style={titleStyle}>
              A Practice Built Around <span className="text-gradient-gold">People</span>, Not Files
            </h1>
            <p style={subtitleStyle}>
              Yantra Legal is a dedicated migration and family law practice committed to protecting client rights with clear, honest legal guidance.
            </p>
          </div>
        </section>

        {/* 3. Our Story Section & Timeline Layout */}
        <section style={storySectionStyle}>
          <div className="container" style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '40px' }}>
            <span className="sec-pill" style={{ marginBottom: '16px', display: 'inline-block' }}>Our Story</span>
            <h2 style={storyTitleStyle}>The Journey Behind Yantra Legal</h2>
            <p style={storyBodyStyle}>
              Yantra Legal was established after a professional and personal journey that has spanned multiple countries, cultures and legal systems.
            </p>
            <p style={storyBodyStyle}>
              Having lived, studied and worked across Nepal, Europe and Australia, Krishna Giri developed a deep appreciation for the challenges people face when navigating unfamiliar systems and major life transitions.
            </p>
            <p style={storyBodyStyle}>
              This experience continues to shape the way Yantra Legal serves clients today: with empathy, clarity and practical legal guidance.
            </p>
          </div>

          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--clr-yellow)', fontWeight: 400 }}>
                The Journey Behind Yantra Legal
              </h3>
            </div>
            <Timeline />
          </div>
        </section>

        {/* 4. Core Values & Why Choose Us */}
        <WhyChooseValues />

        {/* 5. Our Approach */}
        <WhatHappensNext />

        {/* 5. Meet Krishna Giri - Visual Editorial Layout */}
        <section className="yl-section" style={{ padding: '80px 40px', background: 'rgba(6, 25, 18, 0.55)', border: '1px solid rgba(223, 173, 62, 0.15)' }}>
          <style dangerouslySetInnerHTML={{ __html: profileMediaStyles }} />
          <div className="yl-pill">Meet Krishna Giri</div>

          <div className="profile-grid">
            {/* Left Side Column */}
            <div className="profile-left">
              {/* Professional portrait */}
              <div className="yl-portrait-wrap" style={{ margin: '0 auto 24px auto', width: '280px', height: '340px' }}>
                <LawyerPortrait />
              </div>

              {/* Signature / Styled Name */}
              <div style={sigContainerStyle}>
                <p style={sigNameStyle}>Krishna Giri</p>
                <p style={sigTitleStyle}>Principal Solicitor & Founder</p>
              </div>

              {/* Krishna's Journey (Visual timeline) */}
              <div style={journeyBlockStyle}>
                <h4 style={subBlockHeadingStyle}>KRISHNA'S JOURNEY</h4>
                <div className="journey-list">
                  {/* Nepal */}
                  <div className="journey-node">
                    <div className="journey-title">🇳🇵 Nepal</div>
                    <p className="journey-desc">Legal Education & Practice</p>
                  </div>

                  {/* Germany */}
                  <div className="journey-node">
                    <div className="journey-title">🇩🇪 Germany</div>
                    <p className="journey-desc">Master of Public Policy & International Experience</p>
                  </div>

                  {/* Australia */}
                  <div className="journey-node">
                    <div className="journey-title">🇦🇺 Australia</div>
                    <p className="journey-desc">Qualified Solicitor & Practice</p>
                  </div>

                  {/* Yantra Legal */}
                  <div className="journey-node">
                    <div className="journey-title">⚖️ Yantra Legal</div>
                    <p className="journey-desc">Migration & Family Law Practice</p>
                  </div>
                </div>
              </div>

              {/* Qualifications & Admissions */}
              <div style={{ width: '100%', marginTop: '24px' }}>
                <h4 style={subBlockHeadingStyle}>Qualifications & Admissions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="qual-card">
                    <span className="qual-icon">✦</span>
                    <span>Admitted to the Supreme Court of NSW</span>
                  </div>
                  <div className="qual-card">
                    <span className="qual-icon">✦</span>
                    <span>Member of Law Society of NSW</span>
                  </div>
                  <div className="qual-card">
                    <span className="qual-icon">✦</span>
                    <span>Admitted to the Nepal Bar Council</span>
                  </div>
                  <div className="qual-card">
                    <span className="qual-icon">✦</span>
                    <span>Member of Migration Institute of Australia</span>
                  </div>
                  <div className="qual-card">
                    <span className="qual-icon">✦</span>
                    <span>Member of Law Council of Australia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Column */}
            <div className="profile-right">
              {/* Profile Intro / Role info */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--clr-yellow)', fontWeight: 400, margin: '0 0 12px 0' }}>
                  Krishna Giri
                </h3>
                <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600, margin: '0 0 20px 0' }}>
                  Principal Solicitor & Founder
                </p>
                <div style={taglineWrapperStyle}>
                  Legal expertise shaped by international experience, cultural understanding, and a personal commitment to helping people navigate major life transitions.
                </div>
              </div>

              {/* Personal Introduction */}
              <div style={{ marginBottom: '40px' }}>
                <h4 className="right-section-title">Introduction</h4>
                <p style={paragraphStyle}>
                  Many legal matters arise during significant moments in life — building a future in a new country, reuniting with family, responding to an unexpected visa refusal, or navigating the breakdown of a relationship.
                </p>
                <p style={paragraphStyle}>
                  Having lived, studied, and worked across Nepal, Europe, and Australia, Krishna Giri understands many of these transitions firsthand. This perspective allows him to combine legal expertise with genuine insight into the personal challenges that often accompany migration and family law matters.
                </p>
                <p style={paragraphStyle}>
                  As the founder of Yantra Legal, Krishna is committed to providing practical legal advice that is clear, accessible, and tailored to the individual circumstances of each client.
                </p>
              </div>

              {/* Languages */}
              <div style={{ marginBottom: '40px' }}>
                <h4 className="right-section-title">Language Capacities</h4>
                <div style={{ marginBottom: '20px' }}>
                  <div style={langLabelStyle}>Fluent Legal Representation</div>
                  <div className="lang-group">
                    <span className="lang-badge">
                      <span style={{ color: 'var(--clr-yellow)', fontSize: '10px' }}>●</span> English
                    </span>
                    <span className="lang-badge">
                      <span style={{ color: 'var(--clr-yellow)', fontSize: '10px' }}>●</span> Nepali
                    </span>
                    <span className="lang-badge">
                      <span style={{ color: 'var(--clr-yellow)', fontSize: '10px' }}>●</span> Hindi
                    </span>
                  </div>
                </div>
                <div>
                  <div style={langLabelStyle}>Conversational Working Knowledge</div>
                  <div className="lang-group">
                    <span className="lang-badge muted">German</span>
                    <span className="lang-badge muted">Spanish</span>
                  </div>
                </div>
              </div>

              {/* Philosophy */}
              <div style={{ marginBottom: '40px' }}>
                <h4 className="right-section-title">Professional Philosophy</h4>
                <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#ffffff', fontWeight: 400, margin: '0 0 16px 0', fontStyle: 'italic' }}>
                  More Than Legal Advice
                </h5>
                <p style={paragraphStyle}>
                  At Yantra Legal, legal representation is about more than forms, procedures, and technical rules. Effective legal advice begins with understanding the person behind the matter.
                </p>

                {/* 3 Principles cards */}
                <div className="principles-row">
                  <div className="principle-card">
                    <span className="principle-check">✓</span>
                    <span className="principle-text">Listen carefully</span>
                  </div>
                  <div className="principle-card">
                    <span className="principle-check">✓</span>
                    <span className="principle-text">Explain clearly</span>
                  </div>
                  <div className="principle-card">
                    <span className="principle-check">✓</span>
                    <span className="principle-text">Act strategically</span>
                  </div>
                </div>

                <p style={paragraphStyle}>
                  Whether assisting with a migration matter or a family law issue, the focus remains the same: helping clients make informed decisions with confidence.
                </p>
              </div>

              {/* Featured Quote */}
              <div className="quote-block">
                <div className="quote-icon-large">❝</div>
                <blockquote className="quote-text">
                  What matters most to me is that you never feel like just another file.<br />
                  Every client deserves to be heard, understood and supported.
                </blockquote>
                <div className="quote-divider" />
                <cite className="quote-author">
                  — Krishna Giri
                </cite>
              </div>

              {/* Beyond the Law */}
              <div className="beyond-card">
                <h4 className="right-section-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '12px' }}>Beyond the Law</h4>
                <p style={{ ...paragraphStyle, marginBottom: 0, fontSize: '0.95rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.75)' }}>
                  Outside legal practice, Krishna enjoys travelling, exploring different cultures, writing, and spending time with family. His experiences living across multiple countries continue to shape his appreciation for diverse communities and the challenges people face when building a new life in unfamiliar environments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Supporting Diverse Communities block */}
        <SupportingDiverseCommunities />

        {/* 9. Closing values block ("Our Commitment") */}
        <section style={{ padding: '80px 0 60px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="glass" style={commitmentContainerStyle}>
              <h2 style={commitmentHeaderStyle}>
                Our <span className="text-gradient-gold">Commitment</span>
              </h2>
              <p style={commitmentProseStyle}>
                At Yantra Legal, we are committed to providing legal services with professionalism, integrity and genuine care.
              </p>
              <p style={commitmentProseStyle}>
                We understand that legal matters can be stressful and emotionally challenging. That is why we focus on maintaining honest communication, delivering personalised advice and ensuring every client feels heard, respected and supported.
              </p>
              <p style={{ ...commitmentProseStyle, marginBottom: 0 }}>
                Our goal is not simply to provide legal representation. Our goal is to help people make informed decisions and move forward with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* 10. Contact CTA banner */}
        <section style={ctaSectionStyle}>
          <div className="container" style={{ maxWidth: '720px' }}>
            <h2 style={ctaTitleStyle}>
              Ready to take the <span className="text-gradient-gold">next step?</span>
            </h2>
            <p style={ctaDescStyle}>
              Book a Consultation with Krishna Giri today. We offer fixed-fee initial consultations so you can discuss your matter with complete privacy and cost certainty.
            </p>
            <p style={{ ...ctaDescStyle, marginTop: '-16px', marginBottom: '32px', color: 'rgba(245, 240, 232, 0.7)' }}>
              We understand that contacting a lawyer is often the first step in resolving an important issue. Our goal is to make that step as straightforward and comfortable as possible.
            </p>
            <Link href="/contact" className="btn btn-yellow">
              <span>Book a Consultation</span>
              <span className="btn-arrow-circle">↗</span>
            </Link>
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

const breadcrumbsContainerStyle: React.CSSProperties = {
  paddingTop: '140px',
  paddingBottom: '10px',
};

const headerSectionStyle: React.CSSProperties = {
  padding: '30px 0 50px 0',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2.4rem, 5vw, 4rem)',
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
  borderRadius: '16px',
};

const sectionHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.8rem',
  fontWeight: 400,
  color: 'var(--clr-yellow)',
  marginBottom: '20px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  paddingBottom: '10px',
};

const bodyStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  lineHeight: 1.75,
  color: 'var(--clr-text-muted)',
  marginBottom: '16px',
};

const threeColGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '30px',
};

const workflowCardStyle: React.CSSProperties = {
  padding: '32px',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  background: 'rgba(11, 43, 32, 0.25)',
  borderRadius: '16px',
  position: 'relative',
};

const workflowBadgeStyle: React.CSSProperties = {
  background: 'rgba(223, 173, 62, 0.08)',
  border: '1px solid rgba(223, 173, 62, 0.2)',
  color: 'var(--clr-yellow)',
  padding: '4px 12px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  display: 'inline-block',
  marginBottom: '16px',
  letterSpacing: '0.5px',
};

const workflowTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.45rem',
  fontWeight: 400,
  color: '#ffffff',
  marginBottom: '12px',
};

const workflowDescStyle: React.CSSProperties = {
  fontSize: '0.92rem',
  lineHeight: 1.6,
  color: 'var(--clr-text-muted)',
  margin: 0,
};

const credentialsSectionStyle: React.CSSProperties = {
  background: 'rgba(11, 43, 32, 0.4)',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  padding: '48px 0',
  margin: '40px 0',
};

const credentialsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '40px',
  textAlign: 'center',
};

const credentialsBulletStyle: React.CSSProperties = {
  color: 'var(--clr-yellow)',
  fontSize: '1.5rem',
  display: 'block',
  marginBottom: '10px',
};

const credentialsTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.15rem',
  fontWeight: 400,
  color: '#ffffff',
  margin: 0,
};

const credentialsSubStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: 'var(--clr-text-muted)',
  margin: '6px 0 0',
  letterSpacing: '0.2px',
};

const languagesSectionStyle: React.CSSProperties = {
  padding: '60px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
};

const languagesHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '2.4rem',
  fontWeight: 400,
  color: '#ffffff',
  marginBottom: '16px',
};

const languagesDescStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.6,
  color: 'var(--clr-text-muted)',
  marginBottom: '36px',
};

const badgeHeaderStyle: React.CSSProperties = {
  color: 'var(--clr-yellow)',
  fontSize: '0.85rem',
  marginBottom: '14px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontWeight: 600,
};

const badgeGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const badgeStyle2: React.CSSProperties = {
  background: 'rgba(223, 173, 62, 0.1)',
  color: 'var(--clr-yellow)',
  border: '1px solid rgba(223, 173, 62, 0.3)',
  padding: '6px 16px',
  borderRadius: '100px',
  fontSize: '0.88rem',
  fontWeight: 600,
};

const badgeStyle3: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  color: 'rgba(255, 255, 255, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  padding: '6px 16px',
  borderRadius: '100px',
  fontSize: '0.88rem',
  fontWeight: 500,
};

const commitmentContainerStyle: React.CSSProperties = {
  padding: '48px',
  border: '1px solid rgba(223, 173, 62, 0.2)',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, rgba(11, 43, 32, 0.25) 0%, rgba(6, 25, 18, 0.35) 100%)',
};

const commitmentHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '2rem',
  fontWeight: 400,
  color: '#ffffff',
  marginBottom: '20px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  paddingBottom: '12px',
};

const commitmentIntroStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  color: '#ffffff',
  marginBottom: '24px',
  fontWeight: 500,
};

const commitmentListStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '0 0 28px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const commitmentItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  fontSize: '0.98rem',
  color: 'rgba(255, 255, 255, 0.85)',
  lineHeight: 1.5,
};

const commitmentOutroStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontStyle: 'italic',
  color: 'var(--clr-yellow)',
  margin: 0,
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  paddingTop: '20px',
  lineHeight: 1.5,
};

const ctaSectionStyle: React.CSSProperties = {
  padding: '80px 0',
  background: 'linear-gradient(180deg, #061912 0%, #04120d 100%)',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  textAlign: 'center',
};

const ctaTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '2.5rem',
  fontWeight: 400,
  color: '#ffffff',
  marginBottom: '20px',
  lineHeight: 1.2,
};

const ctaDescStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.65,
  color: 'var(--clr-text-muted)',
  marginBottom: '32px',
};

const storySectionStyle: React.CSSProperties = {
  padding: '60px 0',
  position: 'relative',
};

const storyTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '2.4rem',
  color: '#ffffff',
  fontWeight: 400,
  marginBottom: '24px',
};

const storyBodyStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.75,
  color: 'var(--clr-text-muted)',
  marginBottom: '20px',
};

const commitmentProseStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.75,
  color: 'rgba(255, 255, 255, 0.85)',
  marginBottom: '20px',
};

const sigContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '32px',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  width: '100%',
  paddingBottom: '20px',
};

const sigNameStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '2rem',
  fontStyle: 'italic',
  color: 'var(--clr-yellow)',
  margin: '0 0 4px 0',
};

const sigTitleStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: 'rgba(255,255,255,0.4)',
  margin: 0,
};

const journeyBlockStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(6, 25, 18, 0.3)',
  border: '1px solid rgba(223, 173, 62, 0.1)',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '20px',
};

const subBlockHeadingStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  color: 'var(--clr-yellow)',
  marginBottom: '20px',
  fontWeight: 600,
  textAlign: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  paddingBottom: '8px',
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '1rem',
  lineHeight: 1.75,
  color: 'rgba(255, 255, 255, 0.8)',
  marginBottom: '18px',
};

const taglineWrapperStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  lineHeight: 1.6,
  color: '#ffffff',
  fontStyle: 'italic',
  borderLeft: '3px solid var(--clr-yellow)',
  paddingLeft: '20px',
  margin: '20px 0 0 0',
};

const langLabelStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  textTransform: 'uppercase',
  color: 'rgba(255, 255, 255, 0.45)',
  letterSpacing: '1px',
  marginBottom: '8px',
  fontWeight: 600,
};

const profileMediaStyles = `
  .profile-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 60px;
    align-items: start;
    width: 100%;
  }

  .profile-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 120px;
    align-self: start;
  }

  .profile-right {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .right-section-title {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--clr-yellow);
    font-weight: 600;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding-bottom: 8px;
  }

  /* Qualifications Cards */
  .qual-card {
    background: rgba(11, 43, 32, 0.4);
    border: 1px solid rgba(223, 173, 62, 0.15);
    border-left: 3px solid var(--clr-yellow);
    padding: 16px 20px;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: #ffffff;
    font-size: 0.92rem;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: left;
  }
  
  .qual-card:hover {
    transform: translateY(-2px);
    border-color: var(--clr-yellow);
    background: rgba(11, 43, 32, 0.65);
    box-shadow: 0 8px 24px rgba(223, 173, 62, 0.2);
  }

  .qual-icon {
    color: var(--clr-yellow);
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  /* Languages Badges */
  .lang-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 8px;
  }

  .lang-badge {
    background: rgba(223, 173, 62, 0.08);
    color: var(--clr-yellow);
    border: 1px solid rgba(223, 173, 62, 0.25);
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: 0.3px;
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .lang-badge:hover {
    transform: translateY(-1px);
    background: rgba(223, 173, 62, 0.15);
    border-color: var(--clr-yellow);
    box-shadow: 0 4px 12px rgba(223, 173, 62, 0.15);
  }

  .lang-badge.muted {
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.85);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .lang-badge.muted:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: none;
  }

  /* Mini Timeline */
  .journey-list {
    position: relative;
    padding-left: 20px;
    margin-top: 16px;
    text-align: left;
    width: 100%;
  }

  .journey-list::before {
    content: '';
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 4px;
    width: 2px;
    background: linear-gradient(180deg, var(--clr-yellow) 0%, rgba(223, 173, 62, 0.15) 100%);
  }

  .journey-node {
    position: relative;
    margin-bottom: 24px;
    padding-left: 16px;
    transition: all 0.3s ease;
  }

  .journey-node:last-child {
    margin-bottom: 0;
  }

  .journey-node::before {
    content: '↓';
    position: absolute;
    left: -23px;
    top: 4px;
    width: 16px;
    height: 16px;
    background: #061912;
    border: 1px solid var(--clr-yellow);
    border-radius: 50%;
    color: var(--clr-yellow);
    font-size: 8px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 8px rgba(223, 173, 62, 0.3);
    transition: all 0.3s ease;
    z-index: 1;
  }

  .journey-node:last-child::before {
    content: '✦';
    font-size: 9px;
  }

  .journey-node:hover {
    transform: translateX(4px);
  }

  .journey-node:hover::before {
    background: var(--clr-yellow);
    color: #061912;
    box-shadow: 0 0 12px var(--clr-yellow);
  }

  .journey-title {
    font-family: var(--font-serif);
    font-size: 1.1rem;
    color: var(--clr-yellow);
    font-weight: 500;
    margin: 0 0 4px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .journey-desc {
    font-size: 0.85rem;
    color: var(--clr-text-muted);
    line-height: 1.4;
    margin: 0;
  }

  /* Philosophy Principles */
  .principles-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin: 24px 0;
  }

  .principle-card {
    background: rgba(11, 43, 32, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
  }

  .principle-card:hover {
    border-color: var(--clr-yellow);
    background: rgba(11, 43, 32, 0.55);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(223, 173, 62, 0.08);
  }

  .principle-check {
    color: var(--clr-yellow);
    font-size: 1.25rem;
    font-weight: bold;
  }

  .principle-text {
    font-size: 0.95rem;
    font-weight: 600;
    color: #ffffff;
  }

  /* Featured Quote block */
  .quote-block {
    background: linear-gradient(135deg, rgba(11, 43, 32, 0.6) 0%, rgba(4, 20, 14, 0.8) 100%);
    border: 1px solid rgba(223, 173, 62, 0.25);
    border-left: 4px solid var(--clr-yellow);
    padding: 48px 40px;
    border-radius: 16px;
    margin: 40px 0;
    position: relative;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .quote-icon-large {
    font-size: 5rem;
    color: var(--clr-yellow);
    position: absolute;
    top: -10px;
    left: 20px;
    font-family: var(--font-serif);
    opacity: 0.12;
    line-height: 1;
    pointer-events: none;
  }

  .quote-text {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.7rem;
    line-height: 1.45;
    color: #ffffff;
    margin: 0 auto 24px auto;
    max-width: 90%;
    position: relative;
    z-index: 1;
    letter-spacing: -0.01em;
  }

  .quote-divider {
    width: 60px;
    height: 1px;
    background: rgba(223, 173, 62, 0.4);
    margin: 0 auto 20px auto;
  }

  .quote-author {
    display: block;
    text-align: center;
    font-size: 0.95rem;
    color: var(--clr-yellow);
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* Beyond the law */
  .beyond-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 24px;
    margin-top: 40px;
    transition: all 0.3s ease;
  }

  .beyond-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 991px) {
    .profile-grid {
      grid-template-columns: 1fr;
      gap: 48px;
    }
    .profile-left {
      position: static !important;
    }
  }
`;

