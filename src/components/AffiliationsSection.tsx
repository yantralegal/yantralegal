'use client';

import React from 'react';

export default function AffiliationsSection() {
  const affiliations = [
    {
      role: 'Registered Practitioner',
      organization: 'The Law Society of New South Wales',
    },
    {
      role: 'Admitted Solicitor',
      organization: 'Supreme Court of New South Wales',
    },
    {
      role: 'Admitted Advocate',
      organization: 'Nepal Bar Council',
    },
  ];

  return (
    <section style={sectionStyle}>
      <div className="container" style={containerStyle}>
        <p style={introTextStyle}>
          Yantra Legal maintains professional memberships and regulatory registrations relevant to legal and migration practice in Australia.
        </p>

        <div style={gridStyle}>
          {affiliations.map((aff, idx) => (
            <div key={idx} style={badgeStyle} className="glass">
              <span style={roleStyle}>{aff.role}</span>
              <span style={orgStyle}>{aff.organization}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  backgroundColor: '#061912',
  padding: '60px 0 80px 0',
  position: 'relative',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto',
};

const introTextStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: 'var(--clr-text-muted)',
  lineHeight: 1.6,
  margin: 0,
};

const gridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '16px',
  width: '100%',
};

const badgeStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  padding: '16px 28px',
  background: 'rgba(11, 43, 32, 0.35)',
  border: '1px solid rgba(223, 173, 62, 0.2)',
  borderRadius: '16px',
  minWidth: '240px',
  transition: 'transform 0.3s ease, border-color 0.3s ease',
};

const roleStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: 'var(--clr-yellow)',
};

const orgStyle: React.CSSProperties = {
  fontSize: '0.92rem',
  fontWeight: 500,
  color: '#ffffff',
};
