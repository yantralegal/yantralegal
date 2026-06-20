'use client';

import React from 'react';

export default function AffiliationsSection() {
  const credentials = [
    { title: 'Australian Solicitor', subtitle: 'Admitted to the Supreme Court of NSW' },
    { title: 'Overseas-Qualified Lawyer', subtitle: 'Admitted in Nepal Bar Council' },
    { title: 'Member of Law Society of NSW', subtitle: '' },
    { title: 'Member of Migration Institute of Australia', subtitle: '' },
    { title: 'Member of Law Council of Australia', subtitle: '' }
  ];

  return (
    <section className="affiliations-section">
      <div className="container affiliations-container">
        <span className="sec-pill">Credentials</span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: '#ffffff', fontWeight: 400, margin: '0 0 8px 0', textAlign: 'center' }}>
          Trusted <span className="text-gradient-gold">Legal Guidance</span>
        </h2>
        <p className="affiliations-intro" style={{ maxWidth: '640px', marginBottom: '16px' }}>
          Yantra Legal is backed by formal admissions, registrations, and active professional memberships in leading legal bodies.
        </p>

        <div className="affiliations-grid">
          {credentials.map((cred, idx) => (
            <div key={idx} className="affiliations-badge glass" style={{ textAlign: 'center', padding: '20px 24px', flex: '1 1 200px' }}>
              <span className="affiliations-role" style={{ display: 'block', marginBottom: cred.subtitle ? '6px' : '0' }}>{cred.title}</span>
              {cred.subtitle && (
                <span className="affiliations-org" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 400 }}>{cred.subtitle}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
