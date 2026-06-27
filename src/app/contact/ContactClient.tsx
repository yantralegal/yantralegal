'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ContactClient() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    matterType: '',
    description: '',
    method: '',
    isConfirmed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.isConfirmed) {
      alert('Please confirm that the information provided is accurate.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        matterType: '',
        description: '',
        method: '',
        isConfirmed: false,
      });
    }, 1500);
  };

  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        {/* Header Section */}
        <section style={headerSectionStyle}>
          <div className="container">
            <span className="sec-pill">Get in Touch</span>
            <h1 style={titleStyle}>
              Start Your <span className="text-gradient-gold">Consultation</span>
            </h1>
            <p style={subtitleStyle}>
              If you have a migration or divorce matter you need assistance with, we are ready to help. The best first step is to book an initial consultation with Krishna Giri.
            </p>
          </div>
        </section>

        {/* Contact Content Grid */}
        <section style={contentSectionStyle}>
          <div className="container" style={gridStyle}>
            {/* Left Column: Details & Booking */}
            <div style={leftColStyle}>
              {/* Contact Info Card */}
              <div className="glass" style={cardStyle}>
                <h2 style={cardHeaderStyle}>Contact Details</h2>
                <div style={infoListStyle}>
                  <div style={infoItemStyle}>
                    <span style={labelStyle}>Phone:</span>
                    <a href="https://wa.me/61402402120" target="_blank" rel="noopener noreferrer" style={valueStyle}>0402 402 120 (WhatsApp)</a>
                  </div>
                  <div style={infoItemStyle}>
                    <span style={labelStyle}>Email:</span>
                    <a href="mailto:info@yantralegal.com.au" style={valueStyle}>info@yantralegal.com.au</a>
                  </div>
                  <div style={infoItemStyle}>
                    <span style={labelStyle}>Office Address:</span>
                    <span style={{ ...valueStyle, lineHeight: 1.5 }}>
                      Sydney NSW 2000<br />
                      Postal: GPO Box 1230, Sydney NSW 2001
                    </span>
                  </div>
                  <div style={infoItemStyle}>
                    <span style={labelStyle}>Office Hours:</span>
                    <span style={valueStyle}>Monday to Friday, 9:00 am – 5:30 pm AEST</span>
                  </div>
                </div>
              </div>

              {/* Consultation Methods */}
              <div className="glass" style={{ ...cardStyle, marginTop: '24px' }}>
                <h2 style={cardHeaderStyle}>Consultation Formats</h2>
                <p style={bodyStyle}>
                  We offer strategic legal consultations in multiple formats for clients locally, interstate, or overseas:
                </p>
                <ul style={bulletListStyle}>
                  <li>
                    <span style={bulletIconStyle}>✦</span>
                    <span><strong>In Person:</strong> At our CBD Sydney office</span>
                  </li>
                  <li>
                    <span style={bulletIconStyle}>✦</span>
                    <span><strong>Video Call:</strong> Zoom, Microsoft Teams, or Google Meet</span>
                  </li>
                  <li>
                    <span style={bulletIconStyle}>✦</span>
                    <span><strong>Phone:</strong> Strategic call to discuss urgency</span>
                  </li>
                </ul>
                <div style={languagesBoxStyle}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--clr-yellow)', lineHeight: 1.5 }}>
                    📢 <strong>Languages:</strong> We advise in English, Nepali, and Hindi. Please let us know your preference when booking.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Enquiry Form */}
            <div className="contact-form-container">
              <div className="contact-form-card" style={{ padding: '36px', height: '100%' }}>
                {submitStatus === 'success' ? (
                  <div className="form-success-state" style={{ padding: '40px 0' }}>
                    <div className="success-icon-wrapper">✓</div>
                    <h4 className="success-heading">Enquiry Submitted</h4>
                    <p className="success-text">
                      Thank you. We have received your details. Krishna Giri will review your inquiry and get back to you within 24 business hours.
                    </p>
                    <button className="btn-success-reset" onClick={() => setSubmitStatus('idle')}>
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="legal-contact-form">
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#ffffff', marginBottom: '24px' }}>
                      Enquiry Form
                    </h3>

                    {/* Name */}
                    <div className="form-group floating-group full-width" style={{ marginBottom: '20px' }}>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        placeholder=" "
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                      <label htmlFor="form-name" className="floating-label">Your Name</label>
                    </div>

                    {/* Email & Phone */}
                    <div className="form-row-2col" style={{ marginBottom: '20px' }}>
                      <div className="form-group floating-group">
                        <input
                          type="email"
                          id="form-email"
                          name="email"
                          placeholder=" "
                          required
                          value={form.email}
                          onChange={handleChange}
                          className="form-input"
                        />
                        <label htmlFor="form-email" className="floating-label">Email Address</label>
                      </div>
                      <div className="form-group floating-group">
                        <input
                          type="tel"
                          id="form-phone"
                          name="phone"
                          placeholder=" "
                          required
                          value={form.phone}
                          onChange={handleChange}
                          className="form-input"
                        />
                        <label htmlFor="form-phone" className="floating-label">Phone Number</label>
                      </div>
                    </div>

                    {/* Matter Type & Consultation Method */}
                    <div className="form-row-2col" style={{ marginBottom: '20px' }}>
                      <div className="form-group floating-group select-wrapper">
                        <select
                          id="form-matterType"
                          name="matterType"
                          value={form.matterType}
                          onChange={handleChange}
                          required
                          className={`form-select ${form.matterType ? 'has-value' : ''}`}
                        >
                          <option value="" disabled hidden></option>
                          <option value="Migration">Migration Law</option>
                          <option value="Divorce">Divorce</option>
                          <option value="Appeals">Appeals & Reviews</option>
                          <option value="Other">Other Legal Matter</option>
                        </select>
                        <label htmlFor="form-matterType" className="floating-label">Matter Type</label>
                        <div className="select-chevron-container">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="select-chevron-svg">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>

                      <div className="form-group floating-group select-wrapper">
                        <select
                          id="form-method"
                          name="method"
                          value={form.method}
                          onChange={handleChange}
                          required
                          className={`form-select ${form.method ? 'has-value' : ''}`}
                        >
                          <option value="" disabled hidden></option>
                          <option value="In Person">In Person (Sydney CBD)</option>
                          <option value="Video">Video Call (Zoom/Teams)</option>
                          <option value="Phone">Phone Call</option>
                        </select>
                        <label htmlFor="form-method" className="floating-label">Preferred Format</label>
                        <div className="select-chevron-container">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="select-chevron-svg">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="form-group floating-group full-width" style={{ marginBottom: '24px' }}>
                      <textarea
                        id="form-description"
                        name="description"
                        placeholder=" "
                        required
                        rows={4}
                        value={form.description}
                        onChange={handleChange}
                        className="form-textarea"
                        style={{ height: 'auto' }}
                      />
                      <label htmlFor="form-description" className="floating-label">Brief Description of Your Matter</label>
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="form-checkbox-group" style={{ marginBottom: '24px' }}>
                      <input
                        type="checkbox"
                        id="form-confirm"
                        name="isConfirmed"
                        checked={form.isConfirmed}
                        onChange={handleChange}
                        required
                        className="form-checkbox"
                      />
                      <label htmlFor="form-confirm" className="checkbox-label" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.82rem' }}>
                        I confirm the information provided is accurate and I request a consultation.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                      <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                      <span className="contact-submit-icon-wrapper">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="contact-arrow-svg">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section style={disclaimerSectionStyle}>
          <div className="container" style={{ maxWidth: '960px' }}>
            <div style={disclaimerBoxStyle}>
              <h4 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '8px', fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>
                Legal Disclaimer & Scope
              </h4>
              <p style={disclaimerTextStyle}>
                The information on this website is general in nature and does not constitute legal advice. Every migration and family law matter is different. You should seek specific legal advice from a qualified solicitor or registered migration agent for your particular circumstances.
              </p>
              <p style={{ ...disclaimerTextStyle, marginBottom: 0 }}>
                Yantra Legal is an Incorporated Legal Practice in New South Wales specialising in Family Law and Australian Immigration Services.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const layoutStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#061912',
};

const mainContentStyle: React.CSSProperties = {
  flex: 1,
};

const headerSectionStyle: React.CSSProperties = {
  padding: '160px 0 60px 0',
  textAlign: 'center',
  background: 'linear-gradient(180deg, #04120d 0%, #061912 100%)',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 400,
  color: '#ffffff',
  marginBottom: '20px',
  lineHeight: 1.2,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  color: 'var(--clr-text-muted)',
  maxWidth: '720px',
  margin: '0 auto',
  lineHeight: 1.6,
};

const contentSectionStyle: React.CSSProperties = {
  padding: '40px 0',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '40px',
  alignItems: 'start',
};

const leftColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const cardStyle: React.CSSProperties = {
  padding: '36px 30px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  background: 'rgba(11, 43, 32, 0.3)',
};

const cardHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.5rem',
  fontWeight: 500,
  color: 'var(--clr-yellow)',
  marginBottom: '20px',
};

const infoListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const infoItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: 'rgba(255, 255, 255, 0.4)',
  fontWeight: 600,
};

const valueStyle: React.CSSProperties = {
  fontSize: '0.98rem',
  color: '#ffffff',
  fontWeight: 500,
};

const bodyStyle: React.CSSProperties = {
  fontSize: '0.88rem',
  color: 'var(--clr-text-muted)',
  lineHeight: 1.6,
  marginBottom: '16px',
};

const bulletListStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '0 0 20px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const bulletIconStyle: React.CSSProperties = {
  color: 'var(--clr-yellow)',
  marginRight: '8px',
};

const languagesBoxStyle: React.CSSProperties = {
  padding: '12px 16px',
  background: 'rgba(223, 173, 62, 0.05)',
  border: '1px solid rgba(223, 173, 62, 0.15)',
  borderRadius: '8px',
};

const disclaimerSectionStyle: React.CSSProperties = {
  padding: '40px 0 100px 0',
};

const disclaimerBoxStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '12px',
  padding: '24px',
};

const disclaimerTextStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  lineHeight: 1.6,
  color: 'rgba(255, 255, 255, 0.55)',
  marginBottom: '10px',
};
