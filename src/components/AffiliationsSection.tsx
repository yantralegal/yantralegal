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
    <section className="affiliations-section">
      <div className="container affiliations-container">
        <p className="affiliations-intro">
          Yantra Legal maintains professional memberships and regulatory registrations relevant to legal and migration practice in Australia.
        </p>

        <div className="affiliations-grid">
          {affiliations.map((aff, idx) => (
            <div key={idx} className="affiliations-badge glass">
              <span className="affiliations-role">{aff.role}</span>
              <span className="affiliations-org">{aff.organization}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
