'use client';

import React from 'react';
import Image from 'next/image';
import { FollowerPointerCard } from './FollowingPointer';

interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  url: string;
  tagLine: string;
  buttonText: string;
}

const services: ServiceItem[] = [
  {
    id: 'immigration',
    badge: 'MIGRATION LAW',
    title: 'Migration Law',
    description: "Australia's migration system can be complex and constantly changing. Whether you are applying for a visa, seeking Australian citizenship, responding to a visa refusal, or pursuing a review application, we provide practical legal advice and strategic representation throughout the process.",
    image: '/visa_appeals.png',
    isActive: true, // Dark card with emerald and gold theme
    url: '/immigration-law',
    tagLine: "Partner Visas · Skilled Visas · Employer Sponsored Visas · Parent & Family Visas · Visitor Visas · Bridging Visas",
    buttonText: "Explore Migration Law →"
  },
  {
    id: 'appeals',
    badge: 'APPEALS & REVIEWS',
    title: 'Appeals and Reviews',
    description: 'A visa refusal or cancellation does not always mean the end of your migration pathway. We assess your options and advise on the most appropriate legal response.',
    image: '/lawyer_portrait_clean.png',
    isActive: false,
    url: '/appeals-and-reviews',
    tagLine: "Visa Refusals · Visa Cancellations · Sponsorship & Nominations · ART Appeals · Judicial Review",
    buttonText: "View Appeals Services →"
  },
  {
    id: 'family-law',
    badge: 'FAMILY LAW',
    title: 'Family Law - DIVORCE',
    description: 'The breakdown of a marriage can be one of the most challenging experiences a person faces. We provide clear legal guidance and practical support to help clients navigate the divorce process with confidence.',
    image: '/family_migration.png',
    isActive: false,
    url: '/divorce',
    tagLine: "Divorce in Australia · Divorce in Nepal",
    buttonText: "Family Law Services →"
  },
];


export default function ServicesSection() {
  return (
    <section className="services-section" id="services">
      {/* Watermark portrait background */}
      <div className="services-watermark" />

      <div className="container">
        {/* Section Header */}
        <div className="services-header-stacked reveal-on-scroll reveal-fade-up">
          <span className="services-badge">Our Services</span>
          <h2 className="services-title">
            Legal Services <span className="text-gradient-gold">Tailored to Your Situation</span>
          </h2>
          <p className="services-desc">
            We assist 1. individuals and families, 2. skilled workers and professionals, 3. visa refusal and appeal clients 4. business owners and employers and 5. Family law matters across Australia.
          </p>
        </div>

        {/* Three-Column Grid of Services */}
        <div className="services-grid-container">
          <div className="services-grid-3col">
            {services.map((service, index) => (
              <FollowerPointerCard
                key={service.id}
                title={service.title}
                className={`service-card ${service.isActive ? 'active' : ''} reveal-on-scroll reveal-fade-up ${index === 0 ? 'delay-100' : index === 1 ? 'delay-200' : 'delay-300'}`}
              >
                {/* Card Top Category Badge */}
                <div className="card-badge-container">
                  <span className="card-badge">{service.badge}</span>
                </div>

                {/* Card Title */}
                <h3 className="card-title">{service.title}</h3>

                {/* Card Image */}
                <div className="service-card-image-wrapper">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    style={{ objectFit: 'cover' }}
                    priority={service.isActive}
                  />
                </div>

                {/* Card Content: Description, TagLine, Text Link */}
                <div className="card-footer" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '16px', marginTop: '16px' }}>
                  <p className="card-desc" style={{ fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                    {service.description}
                  </p>
                  
                  <div style={getTagListStyle(service.isActive)}>
                    {service.tagLine}
                  </div>
                  
                  <div style={actionLinkStyle}>
                    <a href={service.url} style={{
                      color: service.isActive ? 'var(--clr-yellow)' : 'var(--clr-bg-primary)',
                      fontWeight: '700',
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.3s ease'
                    }} className="service-text-link">
                      <span>{service.buttonText}</span>
                    </a>
                  </div>
                </div>
              </FollowerPointerCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const getTagListStyle = (isActive: boolean): React.CSSProperties => ({
  fontSize: '0.85rem',
  lineHeight: '1.6',
  color: isActive ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 25, 18, 0.65)',
  borderTop: isActive ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(6, 25, 18, 0.08)',
  paddingTop: '16px',
  marginTop: '4px',
  fontWeight: 500,
  letterSpacing: '0.2px',
});

const actionLinkStyle: React.CSSProperties = {
  marginTop: '8px',
  display: 'flex',
  alignItems: 'center',
};




