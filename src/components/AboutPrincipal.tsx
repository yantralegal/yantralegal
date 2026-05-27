'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPrincipal() {
  return (
    <section className="about-principal-section" id="about">
      <div className="container">
        {/* About Badge */}
        <div className="about-badge reveal-on-scroll reveal-fade-up">
          About Yantra
        </div>

        {/* Dynamic Heading with Inline styled badges */}
        <h2 className="about-heading reveal-on-scroll reveal-fade-up delay-100">
          Yantra Legal{' '}
          <span className="inline-img-badge img-badge-portrait">
            KG
          </span>{' '}
          is a dedicated migration and family law practice{' '}
          <span className="inline-img-badge img-badge-office">
            ⚖
          </span>{' '}
          committed to protecting client rights with clear,{' '}
          <span className="inline-img-badge img-badge-scale">
            ✦
          </span>{' '}
          honest legal guidance
        </h2>

        {/* Paragraph Description */}
        <p className="about-desc reveal-on-scroll reveal-fade-up delay-200">
          Every matter is handled with personal attention, thoroughness, and a genuine sense of responsibility to each client&apos;s outcome. At Yantra Legal, we believe informed clients make better decisions — which is why clarity and honesty sit at the heart of everything we do.
        </p>

        {/* Action Button Triggers */}
        <div className="about-btn-group reveal-on-scroll reveal-fade-up delay-300">
          <Link href="/contact" className="btn-premium-gold">
            <span>Start Your Case</span>
            <div className="arrow-circle">↗</div>
          </Link>
          <Link href="/contact" className="btn-premium-outline">
            <span>Get A Free Quote</span>
            <div className="arrow-circle">↗</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
