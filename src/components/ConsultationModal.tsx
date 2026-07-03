'use client';

import React, { useState, useEffect } from 'react';

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    matterType: '',
    method: '',
    description: '',
    isConfirmed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setSubmitStatus('idle');
    };
    window.addEventListener('open-consultation-modal', handleOpen);
    return () => {
      window.removeEventListener('open-consultation-modal', handleOpen);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.isConfirmed) {
      alert('Please confirm that the information provided is accurate.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '00ff7f6e-1316-43e5-bc22-8cc93fa5a64a',
          name: form.name,
          email: form.email,
          phone: form.phone,
          matter_type: form.matterType,
          preferred_format: form.method,
          description: form.description,
          subject: 'New Consultation Booking - Yantra Legal',
        }),
      });

      const result = await response.json();
      if (response.status === 200 || result.success) {
        setSubmitStatus('success');
        setForm({
          name: '',
          email: '',
          phone: '',
          matterType: '',
          method: '',
          description: '',
          isConfirmed: false,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          &times;
        </button>

        {submitStatus === 'success' ? (
          <div className="form-success-state" style={{ padding: '30px 10px', textAlign: 'center' }}>
            <div className="success-icon-wrapper" style={{ margin: '0 auto 20px' }}>✓</div>
            <h4 className="success-heading" style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '12px' }}>
              Consultation Requested
            </h4>
            <p className="success-text" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Thank you for reaching out. We have received your booking request. Our team will contact you shortly to confirm the consultation.
            </p>
            <button className="btn btn-yellow" onClick={handleClose}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="legal-contact-form">
            <h3 className="modal-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#ffffff', marginBottom: '8px' }}>
              Book a Consultation
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
              Provide details about your matter to schedule a confidential legal session.
            </p>

            {submitStatus === 'error' && (
              <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginBottom: '16px' }}>
                Something went wrong. Please try again or call us directly.
              </p>
            )}

            {/* Name */}
            <div className="form-group floating-group full-width" style={{ marginBottom: '20px' }}>
              <input
                type="text"
                id="modal-name"
                name="name"
                placeholder=" "
                required
                value={form.name}
                onChange={handleChange}
                className="form-input"
              />
              <label htmlFor="modal-name" className="floating-label">Full Name</label>
            </div>

            {/* Email & Phone */}
            <div className="form-row-2col" style={{ marginBottom: '20px' }}>
              <div className="form-group floating-group">
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  placeholder=" "
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                />
                <label htmlFor="modal-email" className="floating-label">Email Address</label>
              </div>
              <div className="form-group floating-group">
                <input
                  type="tel"
                  id="modal-phone"
                  name="phone"
                  placeholder=" "
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="form-input"
                />
                <label htmlFor="modal-phone" className="floating-label">Phone Number</label>
              </div>
            </div>

            {/* Matter Type & Consultation Format */}
            <div className="form-row-2col" style={{ marginBottom: '20px' }}>
              <div className="form-group floating-group select-wrapper">
                <select
                  id="modal-matterType"
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
                <label htmlFor="modal-matterType" className="floating-label">Matter Type</label>
                <div className="select-chevron-container">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="select-chevron-svg">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <div className="form-group floating-group select-wrapper">
                <select
                  id="modal-method"
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
                <label htmlFor="modal-method" className="floating-label">Preferred Format</label>
                <div className="select-chevron-container">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="select-chevron-svg">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="form-group floating-group floating-textarea-group full-width" style={{ marginBottom: '24px' }}>
              <textarea
                id="modal-description"
                name="description"
                placeholder=" "
                required
                rows={4}
                value={form.description}
                onChange={handleChange}
                className="form-textarea"
                style={{ height: 'auto' }}
              />
              <label htmlFor="modal-description" className="floating-label">Brief Description of Your Matter</label>
            </div>

            {/* Confirmation Checkbox */}
            <div className="form-checkbox-group" style={{ marginBottom: '24px' }}>
              <input
                type="checkbox"
                id="modal-confirm"
                name="isConfirmed"
                checked={form.isConfirmed}
                onChange={handleChange}
                required
                className="form-checkbox"
              />
              <label htmlFor="modal-confirm" className="checkbox-label" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.82rem' }}>
                I confirm the information provided is accurate and I request a consultation.
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Submitting...' : 'Request Consultation'}</span>
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
  );
}
