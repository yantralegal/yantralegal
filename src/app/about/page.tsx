'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LawyerPortrait from '../../components/LawyerPortrait';
import SupportingDiverseCommunities from '../../components/SupportingDiverseCommunities';

export default function AboutPage() {
  return (
    <div style={layoutStyle}>
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
              Clarity, Honesty & <span className="text-gradient-gold">Commitment</span>
            </h1>
            <p style={subtitleStyle}>
              Yantra Legal is a dedicated migration and family law practice committed to protecting client rights with clear, honest legal guidance.
            </p>
          </div>
        </section>

        {/* 3. Full-Width Intro blocks (Overview & "Why Yantra?") */}
        <section style={overviewSectionStyle}>
          <div className="container" style={gridStyle}>
            <div className="glass" style={cardStyle}>
              <h2 style={sectionHeaderStyle}>Firm Overview</h2>
              <p style={bodyStyle}>
                Yantra Legal was founded with a simple belief: legal advice should be clear, practical, and tailored to the individual.
              </p>
              <p style={bodyStyle}>
                We understand that clients do not seek legal assistance because they enjoy dealing with legal problems. They come to us because they are facing important life decisions, uncertainty about their future, or situations that require professional guidance.
              </p>
              <p style={bodyStyle}>
                Whether it is a visa application, a migration appeal, or a family law matter, our role is to provide clarity, confidence, and support throughout the process.
              </p>
              <p style={bodyStyle}>
                Founded by Krishna Giri, an Australian solicitor and overseas-qualified lawyer, Yantra Legal brings together legal expertise and lived experience. Having studied, worked, and settled in different countries, Krishna understands many of the challenges migrants and families face when navigating unfamiliar systems and important life transitions. This perspective shapes the way we practise law.
              </p>
              <p style={bodyStyle}>
                We take the time to listen. We explain legal issues in straightforward language. We provide honest advice, realistic expectations, and practical solutions designed around your circumstances and goals.
              </p>
              <p style={bodyStyle}>
                As a boutique law practice, we intentionally maintain a personalised approach. When you engage Yantra Legal, you work directly with your solicitor. You are not passed between departments, call centres, or large teams.
              </p>
              <p style={bodyStyle}>
                Our commitment is simple: to provide professional legal services with integrity, respect, and genuine care for every client we represent.
              </p>
            </div>

            <div className="glass" style={{ ...cardStyle, alignSelf: 'start' }}>
              <h2 style={sectionHeaderStyle}>Why Yantra?</h2>
              <p style={bodyStyle}>
                The name Yantra Legal is drawn from the ancient concept of the yantra — a geometric instrument used across South Asian traditions as a tool for focus, order, and purposeful action.
              </p>
              <p style={bodyStyle}>
                Inspired by this idea, Yantra Legal approaches every matter with structure and intention: no shortcuts, no unnecessary complexity — just clear thinking applied to the right outcome.
              </p>
              <p style={bodyStyle}>
                We believe true results come when strategy, clarity, and care work in balance. Inspired by the Shri Yantra, we strive to achieve a perfect alignment of legal strategy, compassion, and precision for every client we represent.
              </p>
            </div>
          </div>
        </section>

        {/* 4. "How We Work" section as three cards */}
        <section style={{ padding: '60px 0', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="sec-pill" style={{ marginBottom: '12px', display: 'inline-block' }}>Our Method</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#ffffff', fontWeight: 400, margin: 0 }}>
                How We <span className="text-gradient-gold">Work</span>
              </h2>
            </div>
            <div style={threeColGridStyle}>
              <div className="glass" style={workflowCardStyle}>
                <span className="card-badge" style={workflowBadgeStyle}>Step 01</span>
                <h3 style={workflowTitleStyle}>Listen</h3>
                <p style={workflowDescStyle}>
                  Understanding your circumstances is the foundation of effective legal advice.
                </p>
              </div>
              <div className="glass" style={workflowCardStyle}>
                <span className="card-badge" style={workflowBadgeStyle}>Step 02</span>
                <h3 style={workflowTitleStyle}>Advise</h3>
                <p style={workflowDescStyle}>
                  We explain your legal options clearly so you can make informed decisions with confidence.
                </p>
              </div>
              <div className="glass" style={workflowCardStyle}>
                <span className="card-badge" style={workflowBadgeStyle}>Step 03</span>
                <h3 style={workflowTitleStyle}>Support</h3>
                <p style={workflowDescStyle}>
                  We guide and represent you throughout the process while keeping you informed at every stage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Meet Krishna Giri section */}
        <section className="yl-section">
          <div className="yl-pill">Meet Krishna Giri</div>
          <div className="yl-layout">
            <div className="yl-left">
              <div className="yl-portrait-wrap">
                <LawyerPortrait />
              </div>
              <h3 className="yl-name">Krishna Giri</h3>
              <p className="yl-title">Principal Solicitor & Founder</p>
              <p style={{ fontSize: '12px', color: 'rgba(245,240,232,0.45)', fontFamily: 'var(--font-sans)', margin: 0 }}>
                Dual-qualified · AU & Nepal
              </p>
            </div>

            <div className="yl-right">
              <p className="yl-body">
                Krishna Giri is an Australian solicitor and overseas-qualified lawyer (Nepal) with academic and professional experience across Nepal, Germany and Australia. He holds a Master’s degree in Public Policy from Germany and worked in legal, policy and community-focused environments before practising law in Australia.
              </p>
              <p className="yl-body">
                Having personally experienced the challenges of studying, working and settling in different countries, Krishna understands many of the issues faced by migrants and families navigating unfamiliar legal systems. This perspective allows him to combine legal expertise with a genuine understanding of the personal circumstances that often sit behind legal matters.
              </p>

              <div className="yl-highlight" style={{ fontSize: '1.2rem', fontStyle: 'italic', borderLeft: '3px solid var(--clr-yellow)', paddingLeft: '20px', margin: '30px 0', color: '#ffffff', lineHeight: 1.6 }}>
                &ldquo;What matters most to me is that you never feel like just another file.&rdquo; — Krishna Giri
              </div>

              <p className="yl-body">
                Krishna is committed to providing clear legal advice, practical solutions and dedicated representation tailored to each client’s individual situation.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Qualifications credentials strip */}
        <section style={credentialsSectionStyle}>
          <div className="container">
            <div style={credentialsGridStyle}>
              <div>
                <span style={credentialsBulletStyle}>✦</span>
                <h4 style={credentialsTitleStyle}>Admitted Solicitor</h4>
                <p style={credentialsSubStyle}>Supreme Court of New South Wales</p>
              </div>
              <div>
                <span style={credentialsBulletStyle}>✦</span>
                <h4 style={credentialsTitleStyle}>Registered Practitioner</h4>
                <p style={credentialsSubStyle}>The Law Society of New South Wales</p>
              </div>
              <div>
                <span style={credentialsBulletStyle}>✦</span>
                <h4 style={credentialsTitleStyle}>Admitted Advocate</h4>
                <p style={credentialsSubStyle}>Nepal Bar Council</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Language capacities pill component */}
        <section style={languagesSectionStyle}>
          <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <span className="sec-pill" style={{ marginBottom: '16px', display: 'inline-block' }}>Communication</span>
            <h2 style={languagesHeaderStyle}>
              Language <span className="text-gradient-gold">Capacities</span>
            </h2>
            <p style={languagesDescStyle}>
              We prioritise clear communication above all else, and Krishna works with you in the language you are most comfortable using.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center' }}>
              <div>
                <h4 style={badgeHeaderStyle}>Fluent Legal Representation:</h4>
                <div style={badgeGroupStyle}>
                  <span style={badgeStyle2}>English</span>
                  <span style={badgeStyle2}>Nepali</span>
                  <span style={badgeStyle2}>Hindi</span>
                </div>
              </div>
              <div>
                <h4 style={{ ...badgeHeaderStyle, color: 'rgba(255, 255, 255, 0.6)' }}>Functional Working Knowledge:</h4>
                <div style={badgeGroupStyle}>
                  <span style={badgeStyle3}>German</span>
                  <span style={badgeStyle3}>Spanish</span>
                </div>
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
              <p style={commitmentIntroStyle}>
                At Yantra Legal, we are committed to:
              </p>
              <ul style={commitmentListStyle}>
                <li style={commitmentItemStyle}>
                  <span style={{ color: 'var(--clr-yellow)', fontWeight: 'bold' }}>✦</span>
                  <span>providing clear and practical legal advice;</span>
                </li>
                <li style={commitmentItemStyle}>
                  <span style={{ color: 'var(--clr-yellow)', fontWeight: 'bold' }}>✦</span>
                  <span>acting with professionalism and integrity;</span>
                </li>
                <li style={commitmentItemStyle}>
                  <span style={{ color: 'var(--clr-yellow)', fontWeight: 'bold' }}>✦</span>
                  <span>maintaining open and honest communication;</span>
                </li>
                <li style={commitmentItemStyle}>
                  <span style={{ color: 'var(--clr-yellow)', fontWeight: 'bold' }}>✦</span>
                  <span>delivering personalised legal services; and</span>
                </li>
                <li style={commitmentItemStyle}>
                  <span style={{ color: 'var(--clr-yellow)', fontWeight: 'bold' }}>✦</span>
                  <span>supporting clients through important life decisions.</span>
                </li>
              </ul>
              <p style={commitmentOutroStyle}>
                We believe every client deserves to be heard, understood and represented with care and professionalism.
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
