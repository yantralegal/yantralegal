'use client';

import React, { useState } from 'react';
import { testimonialsData } from '../data/testimonials';

export default function TestimonialsSection() {
  const [filter, setFilter] = useState<'all' | 'immigration' | 'family'>('all');

  const filteredTestimonials = testimonialsData.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        {/* Top Header Grid */}
        <div className="testimonials-header-grid">
          {/* Left: Google Trust Score Badge */}
          <div className="testimonials-trust-card reveal-on-scroll reveal-scale-up">
            <div className="trust-card-inner">
              <div className="google-badge-top">
                <svg viewBox="0 0 24 24" width="24" height="24" className="google-svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span className="google-badge-text">Google Reviews</span>
              </div>

              <div className="rating-row">
                <span className="rating-number">5.0</span>
                <div className="stars-col">
                  <div className="stars-row">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star-gold">★</span>
                    ))}
                  </div>
                  <span className="reviews-count">Based on 48 reviews</span>
                </div>
              </div>

              <a
                href="https://www.google.com/search?q=Yantra+Legal"
                target="_blank"
                rel="noopener noreferrer"
                className="write-review-btn"
              >
                Write a Google Review
              </a>
            </div>
          </div>

          {/* Right: Section Text Description */}
          <div className="testimonials-header-right reveal-on-scroll reveal-fade-up delay-100">
            <span className="testimonials-badge">Testimonials</span>
            <h2 className="testimonials-title">
              What Our <span className="text-gradient-gold">Clients</span> Say
            </h2>
            <p className="testimonials-desc">
              The trust our clients place in us is the foundation of our practice. Here are some of their experiences working with Yantra Legal.
            </p>
          </div>
        </div>

        {/* Dynamic Filter Navigation */}
        <div className="testimonials-filters reveal-on-scroll reveal-fade-up delay-200">
          <button
            onClick={() => setFilter('all')}
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setFilter('immigration')}
            className={`filter-tab ${filter === 'immigration' ? 'active' : ''}`}
          >
            Migration Law
          </button>
          <button
            onClick={() => setFilter('family')}
            className={`filter-tab ${filter === 'family' ? 'active' : ''}`}
          >
            Family Law & Divorce
          </button>
        </div>

        {/* Grid or Infinite Scrolling Marquee of testimonials */}
        {filter === 'all' ? (
          <div className="testimonials-marquee-container reveal-on-scroll reveal-fade-up delay-300">
            <div className="testimonials-marquee-track">
              {/* Double map to create a seamless infinite scroll loop */}
              {[...testimonialsData, ...testimonialsData].map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="testimonial-card marquee-card">
                  {/* Card Header (Avatar, Name, Date, Google Icon) */}
                  <div className="t-card-header">
                    <div className="t-avatar" style={{ backgroundColor: getAvatarColor(item.id) }}>
                      {item.initial}
                    </div>
                    <div className="t-meta">
                      <div className="t-name-row">
                        <span className="t-name">{item.name}</span>
                        <span className="t-verified-tag">
                          <span className="check-icon">✓</span> Verified Client
                        </span>
                      </div>
                      <span className="t-date">{item.time}</span>
                    </div>
                    {/* Google Icon indicator */}
                    <div className="t-google-icon">
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                      </svg>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="t-stars">
                    {[...Array(item.rating)].map((_, i) => (
                      <span key={i} className="star-gold">★</span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="t-text">&ldquo;{item.text}&rdquo;</p>

                  {/* Card Footer (Tag area) */}
                  <div className="t-footer">
                    <span className="t-category-badge">{item.categoryLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="testimonials-grid">
            {filteredTestimonials.map((item, index) => (
              <div key={item.id} className={`testimonial-card reveal-on-scroll reveal-fade-up delay-${(index % 3) * 100 + 100}`}>
                {/* Card Header (Avatar, Name, Date, Google Icon) */}
                <div className="t-card-header">
                  <div className="t-avatar" style={{ backgroundColor: getAvatarColor(item.id) }}>
                    {item.initial}
                  </div>
                  <div className="t-meta">
                    <div className="t-name-row">
                      <span className="t-name">{item.name}</span>
                      <span className="t-verified-tag">
                        <span className="check-icon">✓</span> Verified Client
                      </span>
                    </div>
                    <span className="t-date">{item.time}</span>
                  </div>
                  {/* Google Icon indicator */}
                  <div className="t-google-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="t-stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="star-gold">★</span>
                  ))}
                </div>

                {/* Review Text */}
                <p className="t-text">&ldquo;{item.text}&rdquo;</p>

                {/* Card Footer (Tag area) */}
                <div className="t-footer">
                  <span className="t-category-badge">{item.categoryLabel}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Helper function to generate premium harmonized colors for user avatars
function getAvatarColor(id: number): string {
  const colors = [
    '#104b36', // deep green
    '#4c6a5a', // muted green
    '#5c6e58', // olive tint
    '#806a3d', // warm gold
    '#255e4e', // bright emerald tone
    '#685d45'  // clay bronze
  ];
  return colors[id % colors.length];
}
