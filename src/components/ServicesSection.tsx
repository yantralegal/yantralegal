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
  url: string;
  subtypes: SubtypeItem[];
}

const services: ServiceItem[] = [
  {
    id: 'immigration',
    badge: 'MIGRATION LAW',
    title: 'Migration Law',
    description: "Australia's migration system can be complex and constantly changing. Whether you are applying for a visa, seeking Australian citizenship, responding to a visa refusal, or pursuing a review application, we provide practical legal advice and strategic representation.",
    image: '/visa_appeals.png',
    isActive: true, // Dark card with emerald and gold theme
    url: '/immigration-law',
    subtypes: [
      { title: 'Visa Pathways', desc: 'Partner, Skilled, Employer Sponsored, Parent & Family, Visitor, Bridging Visas' },
      { title: 'Citizenship', desc: 'Eligibility, documentation & applications' }
    ]
  },
  {
    id: 'appeals',
    badge: 'APPEALS & REVIEWS',
    title: 'Appeals and Reviews',
    description: 'A visa refusal or cancellation does not always mean the end of your migration pathway. We assess your options and advise on the most appropriate legal response.',
    image: '/lawyer_portrait_clean.png', // Fallback or standard image path
    isActive: false, // Light card
    url: '/appeals-and-reviews',
    subtypes: [
      { title: 'ART Appeals', desc: 'Merits review of visa decisions' },
      { title: 'Judicial Review', desc: 'Court appeals for jurisdictional error' }
    ]
  },
  {
    id: 'family-law',
    badge: 'FAMILY LAW',
    title: 'Family Law - DIVORCE',
    description: 'The breakdown of a marriage can be one of the most challenging experiences a person faces. We provide clear legal guidance and practical support to help clients navigate the divorce process with confidence.',
    image: '/family_migration.png',
    isActive: false, // Light card
    url: '/divorce',
    subtypes: [
      { title: 'Divorce in Australia', desc: 'Sole and joint applications under no-fault system' },
      { title: 'Divorce in Nepal', desc: 'Cross-border Nepali family law & dual qualification' }
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
          <span className="services-badge">Our Services</span>
          <h2 className="services-title">
            Legal Services <span className="text-gradient-gold">Tailored to Your Situation</span>
          </h2>
          <p className="services-desc">
            We deliver dedicated legal representation with a results-driven focus on migration law, family law, and complex appeal reviews.
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
                  <a href={service.url} className="card-arrow-btn" aria-label={`Read more about ${service.title}`}>
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



