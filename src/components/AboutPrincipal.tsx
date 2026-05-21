'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutPrincipal() {
  return (
    <section className="about-principal-section" id="about">
      <div className="container">
        {/* About Badge */}
        <div className="about-badge reveal-on-scroll reveal-fade-up">
          AboutYantra
        </div>

        {/* Dynamic Heading with Inline Image Elements */}
        <h2 className="about-heading reveal-on-scroll reveal-fade-up delay-100">
          Yantra{' '}
          <span className="about-inline-img" style={{ display: 'inline-block', position: 'relative', width: '72px', height: '44px', overflow: 'hidden' }}>
            <Image
              src="/lawyer_portrait_clean.png"
              alt="Robert Portrait"
              fill
              sizes="72px"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
            />
          </span>{' '}
          is a dedicated migration counsel focused on protecting his clients&apos; residency rights{' '}
          <span className="about-inline-img" style={{ display: 'inline-block', position: 'relative', width: '72px', height: '44px', overflow: 'hidden' }}>
            <Image
              src="/gavel_inline.png"
              alt="Legal Gavel"
              fill
              sizes="72px"
              style={{ objectFit: 'cover' }}
            />
          </span>{' '}
          with clear results-driven{' '}
          <span className="about-inline-img" style={{ display: 'inline-block', position: 'relative', width: '72px', height: '44px', overflow: 'hidden' }}>
            <Image
              src="/target_inline.png"
              alt="Results target"
              fill
              sizes="72px"
              style={{ objectFit: 'cover' }}
            />
          </span>{' '}
          guidance
        </h2>

        {/* Paragraph Description */}
        <p className="about-desc reveal-on-scroll reveal-fade-up delay-200">
          Every case is handled with care, attention, and a strong sense of responsibility.Yantra believes informed clients make better decisions, which is why clarity and honesty guide his work.
        </p>

        {/* Action Button Triggers */}
        <div className="about-btn-group reveal-on-scroll reveal-fade-up delay-300">
          <a href="#contact" className="btn-premium-gold">
            <span>Start Your Case</span>
            <div className="arrow-circle">↗</div>
          </a>
          <a href="#contact" className="btn-premium-outline">
            <span>Get A Free Quote</span>
            <div className="arrow-circle">↗</div>
          </a>
        </div>
      </div>
    </section>
  );
}
