'use client';

import React, { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    subject: '',
    message: '',
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

  const handleScrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('contact-form-anchor');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.isConfirmed) {
      alert('Please confirm that the information provided is accurate.');
      return;
    }

    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        service: '',
        subject: '',
        message: '',
        isConfirmed: false,
      });
    }, 1500);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        {/* Top Header Row (2 Columns) */}
        <div className="contact-header-grid">
          <div className="contact-header-left reveal-on-scroll reveal-fade-up">
            <span className="contact-badge">CONTACT</span>
            <h2 className="contact-title">
              Let&apos;s Discuss Your <br />
              <span className="text-gradient-gold">Matter</span>
            </h2>
          </div>
          <div className="contact-header-right reveal-on-scroll reveal-fade-up delay-100" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#contact-form-anchor" className="btn btn-yellow" onClick={handleScrollToForm}>
              <span>Book a Consultation</span>
            </a>
            <a href="https://wa.me/61292345678" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <span>Speak with a Solicitor</span>
            </a>
          </div>
        </div>

        {/* Separator Line */}
        <div className="contact-divider" id="contact-form-anchor" />

        {/* Form & Info Row (2 Columns) */}
        <div className="contact-form-grid">
          {/* Details (Left) */}
          <div className="contact-info-col reveal-on-scroll reveal-fade-up">
            <h3 className="contact-info-title">Contact</h3>
            <p className="contact-info-desc" style={{ marginBottom: '16px' }}>
              Whether you need assistance with a migration application, visa refusal, family law dispute, or legal advice regarding your rights and options, we are here to help.
            </p>
            <p className="contact-info-desc">
              Contact Yantra Legal today to arrange a confidential consultation and discuss how we can assist you.
            </p>
            <div className="contact-whatsapp-box" style={{ marginTop: '24px' }}>
              <span className="whatsapp-label">Chat On Whatsapp</span>
              <a href="https://wa.me/61292345678" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                +61 2 0000 0000
              </a>
            </div>
          </div>


          {/* Form Card (Right) */}
          <div className="contact-form-container reveal-on-scroll reveal-fade-up delay-200">
            <div className="contact-form-card">
              {submitStatus === 'success' ? (
                <div className="form-success-state">
                  <div className="success-icon-wrapper">✓</div>
                  <h4 className="success-heading">Consultation Requested</h4>
                  <p className="success-text">
                    Thank you for reaching out. We have received your inquiry and our legal team will contact you shortly to confirm details.
                  </p>
                  <button className="btn-success-reset" onClick={() => setSubmitStatus('idle')}>
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="legal-contact-form">
                  <div className="form-row-2col">
                    <div className="form-group floating-group">
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
                  </div>

                  <div className="form-row-2col">
                    <div className="form-group floating-group">
                      <input
                        type="tel"
                        id="form-phone"
                        name="phone"
                        placeholder=" "
                        value={form.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                      <label htmlFor="form-phone" className="floating-label">Phone Number</label>
                    </div>
                    <div className="form-group floating-group select-wrapper">
                      <select
                        id="form-service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className={`form-select ${form.service ? 'has-value' : ''}`}
                      >
                        <option value="" disabled hidden></option>
                        <option value="Immigration Appeals">Immigration & AAT Appeals</option>
                        <option value="Visa Pathways">Visa Pathways (Partner/Skilled/Work)</option>
                        <option value="Divorce Matters">Divorce & Separation</option>
                        <option value="Property Division">Property & Asset Settlement</option>
                        <option value="Custody Matters">Parenting & Custody Arrangements</option>
                        <option value="General Query">General Legal Guidance</option>
                      </select>
                      <label htmlFor="form-service" className="floating-label">Legal Services</label>
                      <div className="select-chevron-container">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="select-chevron-svg">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="form-group floating-group full-width">
                    <input
                      type="text"
                      id="form-subject"
                      name="subject"
                      placeholder=" "
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="form-input"
                    />
                    <label htmlFor="form-subject" className="floating-label">Subject</label>
                  </div>

                  <div className="form-group floating-group floating-textarea-group">
                    <textarea
                      id="form-message"
                      name="message"
                      placeholder=" "
                      required
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      className="form-textarea"
                    />
                    <label htmlFor="form-message" className="floating-label">Your Message</label>
                  </div>

                  <div className="form-checkbox-group">
                    <input
                      type="checkbox"
                      id="form-confirm"
                      name="isConfirmed"
                      checked={form.isConfirmed}
                      onChange={handleChange}
                      required
                      className="form-checkbox"
                    />
                    <label htmlFor="form-confirm" className="checkbox-label">
                      I confirm the information provided is accurate.
                    </label>
                  </div>

                  <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                    <span>{isSubmitting ? 'Requesting...' : 'Request Consultation'}</span>
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
      </div>
    </section>
  );
}
