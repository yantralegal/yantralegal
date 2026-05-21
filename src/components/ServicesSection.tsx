'use client';

import React from 'react';
import Image from 'next/image';
import { FollowerPointerCard } from './FollowingPointer';

interface SubtypeItem {
  title: string;
  desc: string;
}

interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  subtypes: SubtypeItem[];
}

const services: ServiceItem[] = [
  {
    id: 'immigration',
    badge: 'IMMIGRATION',
    title: 'Immigration Law',
    description: 'Comprehensive advice and representation for diverse visa pathways, residency applications, sponsor obligations, and AAT or federal court appeals.',
    image: '/visa_appeals.png',
    isActive: true, // Dark card with emerald and gold theme
    subtypes: [
      { title: 'Visa Pathways', desc: 'Work, skilled, partner & family visas' },
      { title: 'AAT & Appeal Reviews', desc: 'Visa cancellations & tribunal reviews' }
    ]
  },
  {
    id: 'family-law',
    badge: 'FAMILY LAW',
    title: 'Family Law & Divorce',
    description: 'Compassionate guidance and resolution for divorce proceedings, property division, parenting and custody arrangements, and family disputes.',
    image: '/family_migration.png',
    isActive: false, // Light card with white theme
    subtypes: [
      { title: 'Divorce Matters', desc: 'Dissolution & legal filings representation' },
      { title: 'Property & Custody', desc: 'Asset division & parenting arrangements' }
    ]
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
          <span className="services-badge">My Services</span>
          <h2 className="services-title">
            Trusted <span className="text-gradient-gold">Expertise</span>
          </h2>
          <p className="services-desc">
            I deliver dedicated legal services with a results-driven focus on strategic Australian immigration pathways and family law or divorce matters.
          </p>
        </div>

        {/* Two-Column Grid of Services */}
        <div className="services-grid-container">
          <div className="services-grid-2col">
            {services.map((service, index) => (
              <FollowerPointerCard
                key={service.id}
                title={service.title}
                className={`service-card ${service.isActive ? 'active' : ''} reveal-on-scroll reveal-fade-up ${index === 0 ? 'delay-100' : 'delay-300'}`}
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

                {/* Card Subtypes List */}
                <div className="card-subtypes-container">
                  <div className="card-subtypes-inner">
                    <h4 className="card-subtypes-header">Key Focus Areas</h4>
                    <div className="card-subtypes-list">
                      {service.subtypes.map((sub, idx) => (
                        <div key={idx} className="card-subtype-item">
                          <span className="card-subtype-bullet"></span>
                          <div className="card-subtype-content">
                            <span className="card-subtype-title">{sub.title}</span>
                            <span className="card-subtype-desc">{sub.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Meta (Description & Action Button) */}
                <div className="card-footer">
                  <p className="card-desc">{service.description}</p>
                  <a href="#contact" className="card-arrow-btn" aria-label={`Read more about ${service.title}`}>
                    <span>↗</span>
                  </a>
                </div>
              </FollowerPointerCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


