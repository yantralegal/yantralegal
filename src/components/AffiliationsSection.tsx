'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface LogoCredential {
  logoSrc: string;
  title: string;
  role: string;
  desc: string;
  url: string;
}

export default function AffiliationsSection() {
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [targetTitle, setTargetTitle] = useState<string>('');

  const credentials: LogoCredential[] = [
    {
      logoSrc: '/associatedlogos/logos/membweofthelawsocietyofnewsouthwales.png',
      title: 'Law Society of NSW',
      role: 'Member',
      desc: 'Admitted Practitioner, Supreme Court of NSW',
      url: 'https://www.lawsociety.com.au/'
    },
    {
      logoSrc: '/associatedlogos/logos/migrationinstituteofaustralia.png',
      title: 'Migration Institute of Australia',
      role: 'Member',
      desc: 'Representing High Standards in Migration Services',
      url: 'https://www.mia.org.au/'
    },
    {
      logoSrc: '/associatedlogos/logos/lawcouncilofaustralia.png',
      title: 'Law Council of Australia',
      role: 'Member',
      desc: 'Peak National Body of the Legal Profession',
      url: 'https://lawcouncil.au/'
    },
    {
      logoSrc: '/associatedlogos/logos/nepalbarcouncil.png',
      title: 'Nepal Bar Council',
      role: 'Overseas-Qualified Lawyer',
      desc: 'Registered & Admitted Advocate',
      url: 'https://nepalbarcouncil.org.np/'
    }
  ];

  // Double the list for infinite scrolling marquee effect
  const marqueeItems = [...credentials, ...credentials, ...credentials, ...credentials];

  const handleCardClick = (url: string, title: string) => {
    setTargetUrl(url);
    setTargetTitle(title);
  };

  const handleConfirm = () => {
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      setTargetUrl(null);
    }
  };

  const handleCancel = () => {
    setTargetUrl(null);
  };

  return (
    <section className="affiliations-section">
      {/* Golden lighting background glow */}
      <div className="affiliations-glow" />

      <div className="container affiliations-container">
        {/* <span className="sec-pill">Credentials</span> */}
        <h2 className="affiliations-heading">
          Trusted <span className="text-gradient-gold">Legal Guidance</span>
        </h2>
        <p className="affiliations-intro">
          Yantra Legal is backed by formal admissions, registrations, and active professional memberships in leading legal bodies.
        </p>

        {/* Outer marquee wrapper with side fade masks */}
        <div className="affiliations-marquee-wrapper">
          <div className="affiliations-marquee-track">
            {marqueeItems.map((item, idx) => (
              <div 
                key={idx} 
                className={`affiliations-logo-card glass ${item.logoSrc.includes('lawsociety') ? 'law-society-card' : ''}`}
                onClick={() => handleCardClick(item.url, item.title)}
              >
                <div className="logo-card-glow" />
                <div className="logo-image-container">
                  <Image
                    src={item.logoSrc}
                    alt={item.title}
                    width={180}
                    height={72}
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                    priority={idx < 4}
                  />
                </div>
                <div className="logo-card-content">
                  <span className="logo-card-role">{item.role}</span>
                  <h4 className="logo-card-title">{item.title}</h4>
                  <p className="logo-card-desc">
                    {item.title === 'Law Society of NSW' ? (
                      <>
                        Admitted Practitioner,{' '}
                        <span 
                          style={{ color: 'var(--clr-yellow)', textDecoration: 'underline', cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick('https://supremecourt.nsw.gov.au/', 'Supreme Court of NSW');
                          }}
                        >
                          Supreme Court of NSW
                        </span>
                      </>
                    ) : (
                      item.desc
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Confirm Modal Dialog */}
      {targetUrl && (
        <div className="external-link-modal-overlay">
          <div className="external-link-modal glass">
            <h3 className="modal-title">Leaving Yantra Legal</h3>
            <p className="modal-desc">
              You are about to leave Yantra Legal to visit the official portal of <strong>{targetTitle}</strong>:
            </p>
            <div className="modal-url-box">{targetUrl}</div>
            <p className="modal-warning-text">
              We are not responsible for the privacy practices or content of external websites.
            </p>
            <div className="modal-actions">
              <button onClick={handleCancel} className="btn btn-outline modal-btn">
                <span>Go Back</span>
              </button>
              <button onClick={handleConfirm} className="btn btn-yellow modal-btn">
                <span>Proceed</span>
                <span className="btn-arrow-circle">↗</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
