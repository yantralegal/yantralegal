'use client';

import React, { useState } from 'react';
import StarBorder from './ui/StarBorder';

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
          <div className="contact-header-right reveal-on-scroll reveal-fade-up delay-100">
            <a href="#contact-form-anchor" className="btn-dark-green" onClick={handleScrollToForm}>
              <span>Book a Consultation</span>
            </a>
            <a href="https://wa.me/61402402120" target="_blank" rel="noopener noreferrer" className="btn-outline-dark">
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
              <StarBorder
                as="a"
                href="https://wa.me/61402402120"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-star-link"
                color="var(--clr-yellow)"
                thickness={2}
                speed="5s"
              >
                <svg className="whatsapp-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.805.001-2.621-1.013-5.085-2.86-6.937C16.32 2.01 13.882 1 12.009 1 6.608 1 2.206 5.406 2.202 10.817c-.001 1.517.402 3.003 1.17 4.303l-.443 1.62-.2 1.055.228-.216 1.69-.909zm11.332-6.837c-.314-.157-1.855-.916-2.144-1.02-.29-.105-.502-.157-.713.157-.21.314-.817 1.02-.998 1.226-.18.204-.362.229-.675.072-1.823-.915-2.92-1.479-4.103-3.509-.313-.538.313-.5.894-1.657.094-.189.047-.354-.024-.511-.07-.156-.502-1.226-.713-1.72-.206-.497-.432-.41-.58-.418l-.513-.008c-.18 0-.472.067-.719.338-.246.27-1.017.994-1.017 2.424 0 1.43 1.042 2.81 1.188 3.002.146.19 2.051 3.132 4.969 4.388.694.3 1.236.479 1.659.613.698.222 1.334.191 1.838.116.561-.083 1.855-.758 2.119-1.488.264-.729.264-1.354.185-1.488-.078-.135-.29-.215-.603-.372z"/>
                </svg>
                <span>0402 402 120</span>
              </StarBorder>
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
                        <option value="Immigration & Visa Services">Immigration & Visa Services</option>
                        <option value="ART Appeals & Reviews">ART Appeals & Reviews</option>
                        <option value="Divorce & Separation">Divorce & Separation</option>
                        <option value="General Legal Guidance">General Legal Guidance</option>
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
