'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealingPhone from '../../components/RevealingPhone';

export default function ContactClient() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    matterType: '',
    description: '',
    method: '',
    isConfirmed: false,
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [settings, setSettings] = useState({
    email: 'info@yantralegal.com.au',
    whatsapp: '61402402120',
    address: 'Sydney NSW 2000',
    postalAddress: 'GPO Box 1230, Sydney NSW 2001',
    phone: '+61 402 402 120',
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'contact_page_view' }),
    }).catch(console.error);

    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings) {
          setSettings((prev) => ({
            ...prev,
            ...data.settings,
          }));
        }
      })
      .catch((err) => console.error('Error fetching settings in contact page:', err));
  }, []);

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
      showToast('Please confirm that the information provided is accurate.', 'error');
      return;
    }
    if (!form.agreeToTerms) {
      showToast('Please agree to the Initial Consultation Terms and Conditions, Privacy Policy and Terms of Use.', 'error');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          matter_type: form.matterType,
          preferred_format: form.method,
          description: form.description,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitStatus('success');
        setForm({
          name: '',
          email: '',
          phone: '',
          matterType: '',
          description: '',
          method: '',
          isConfirmed: false,
          agreeToTerms: false,
        });
        showToast('Enquiry submitted successfully!', 'success');
      } else {
        setSubmitStatus('error');
        showToast(result.error || 'Validation failed. Please ensure all fields are filled correctly.', 'error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
      showToast('Connection error. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
            <p style={{ ...subtitleStyle, textAlign: 'justify', marginBottom: '16px' }}>
              If you require assistance with an Australian immigration or family law matter, we're here to help. Most clients begin with a confidential telephone or video consultation, with in-person meetings available by appointment where appropriate.
            </p>
            <p style={{ ...subtitleStyle, textAlign: 'justify' }}>
              The first step is to book a confidential initial consultation with our solicitor to discuss your circumstances, understand your legal options, and determine the most appropriate pathway forward.
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
                    <span style={valueStyle}><RevealingPhone goldText={true} initialPhone={settings.phone} /></span>
                  </div>
                  <div style={infoItemStyle}>
                    <span style={labelStyle}>WhatsApp:</span>
                    <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" style={valueStyle}>WhatsApp Chat Available</a>
                  </div>
                  <div style={infoItemStyle}>
                    <span style={labelStyle}>Email:</span>
                    <a href={`mailto:${settings.email}`} style={valueStyle}>{settings.email}</a>
                  </div>
                  <div style={infoItemStyle}>
                    <span style={labelStyle}>Office Address:</span>
                    <span style={{ ...valueStyle, lineHeight: 1.5 }}>
                      {settings.address}<br />
                      Postal: {settings.postalAddress}
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
                  We offer confidential legal consultations in a range of formats to accommodate clients across Australia and overseas.
                </p>
                <ul style={bulletListStyle}>
                  <li>
                    <span style={bulletIconStyle}>✦</span>
                    <span><strong>☎️ Telephone Consultation:</strong> Available Australia-wide and internationally.</span>
                  </li>
                  <li>
                    <span style={bulletIconStyle}>✦</span>
                    <span><strong>💻 Video Consultation:</strong> Via Google Meet.</span>
                  </li>
                  <li>
                    <span style={bulletIconStyle}>✦</span>
                    <span><strong>🏢 In-Person Consultation:</strong> Available by appointment only.</span>
                  </li>
                </ul>
                <div style={languagesBoxStyle}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--clr-yellow)', lineHeight: 1.5 }}>
                    📢 <strong>Languages:</strong> We provide legal consultations in English, Nepali, and Hindi. Please let us know your preferred language when booking.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Enquiry Form */}
            <div className="contact-form-container">
              {/* What Happens Next Card */}
              <div className="glass" style={{ ...cardStyle, marginBottom: '24px', padding: '30px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--clr-yellow)', marginBottom: '16px' }}>
                  What Happens Next?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <span style={{ color: 'var(--clr-yellow)', fontWeight: 'bold' }}>&rarr;</span>
                    <span>Submit your enquiry online.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <span style={{ color: 'var(--clr-yellow)', fontWeight: 'bold' }}>&rarr;</span>
                    <span>We will review the information provided.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <span style={{ color: 'var(--clr-yellow)', fontWeight: 'bold' }}>&rarr;</span>
                    <span>We will contact you to discuss your matter and confirm your consultation.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <span style={{ color: 'var(--clr-yellow)', fontWeight: 'bold' }}>&rarr;</span>
                    <span>You will receive confirmation of your appointment and any further instructions, if required.</span>
                  </div>
                </div>
              </div>
              <div className="contact-form-card" style={{ padding: '36px', height: 'auto' }}>
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
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#061912', marginBottom: '8px' }}>
                      Enquiry Form
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(6, 25, 18, 0.7)', marginBottom: '24px' }}>
                      Complete the form below and a member of our team will contact you to discuss your enquiry and arrange an initial consultation.
                    </p>

                    {submitStatus === 'error' && (
                      <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginBottom: '16px' }}>
                        Something went wrong. Please try again or contact us directly.
                      </p>
                    )}

                    {/* Name */}
                    <div className="form-group floating-group full-width" style={{ marginBottom: '20px' }}>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        placeholder=" "
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
                          className={`form-select ${form.method ? 'has-value' : ''}`}
                        >
                          <option value="" disabled hidden></option>
                          <option value="In Person">In Person (Sydney CBD)</option>
                          <option value="Video">Video Call (Google Meet)</option>
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
                    <div className="form-group floating-group floating-textarea-group full-width" style={{ marginBottom: '24px' }}>
                      <textarea
                        id="form-description"
                        name="description"
                        placeholder=" "
                        rows={4}
                        value={form.description}
                        onChange={handleChange}
                        className="form-textarea"
                        style={{ height: 'auto' }}
                      />
                      <label htmlFor="form-description" className="floating-label">Brief Description of Your Matter</label>
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="form-checkbox-group" style={{ marginBottom: '12px' }}>
                      <input
                        type="checkbox"
                        id="form-confirm"
                        name="isConfirmed"
                        checked={form.isConfirmed}
                        onChange={handleChange}
                        className="form-checkbox"
                      />
                      <label htmlFor="form-confirm" className="checkbox-label" style={{ color: 'rgba(6, 25, 18, 0.7)', fontSize: '0.82rem' }}>
                        I confirm that the information I have provided is true and accurate to the best of my knowledge and I request an initial consultation.
                      </label>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="form-checkbox-group" style={{ marginBottom: '24px', alignItems: 'flex-start' }}>
                      <input
                        type="checkbox"
                        id="form-agree-terms"
                        name="agreeToTerms"
                        checked={form.agreeToTerms}
                        onChange={handleChange}
                        className="form-checkbox"
                        style={{ marginTop: '3px' }}
                      />
                      <label htmlFor="form-agree-terms" className="checkbox-label" style={{ color: 'rgba(6, 25, 18, 0.7)', fontSize: '0.82rem', lineHeight: '1.4' }}>
                        I confirm that I have read, understood, and agree to the <Link href="/consultation-terms" style={{ color: 'var(--clr-yellow)', textDecoration: 'underline' }}>Initial Consultation Terms and Conditions</Link>, <Link href="/privacy-policy" style={{ color: 'var(--clr-yellow)', textDecoration: 'underline' }}>Privacy Policy</Link>, and <Link href="/terms-of-use" style={{ color: 'var(--clr-yellow)', textDecoration: 'underline' }}>Terms of Use</Link>.
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
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', marginBottom: '12px', fontFamily: 'var(--font-serif)', letterSpacing: '0.5px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '8px' }}>
                Legal Disclaimer & Scope
              </h4>
              <p style={{ ...disclaimerTextStyle, marginBottom: '12px' }}>
                The information published on this website is provided for general informational purposes only and does not constitute legal advice.
              </p>
              <p style={{ ...disclaimerTextStyle, marginBottom: '12px' }}>
                Every immigration and family law matter depends on its own facts and legal circumstances. You should obtain legal advice tailored to your individual situation before acting or relying on any information contained on this website.
              </p>
              <p style={{ ...disclaimerTextStyle, marginBottom: '12px' }}>
                Contacting Yantra Legal or submitting an enquiry through this website does not create a solicitor–client relationship. A solicitor–client relationship is established only after we have completed any necessary conflict checks and both parties have entered into a formal Costs Agreement and Retainer.
              </p>
              <p style={{ ...disclaimerTextStyle, marginBottom: 0 }}>
                Yantra Legal is an Incorporated Legal Practice in New South Wales providing legal services in Australian Immigration Law and Family Law.
              </p>
            </div>
          </div>
        </section>

        {/* A Boutique Law Firm Focused on Complex Matters Section */}
        <section style={{ padding: '40px 0 80px 0' }}>
          <div className="container" style={{ maxWidth: '960px' }}>
            <div className="glass" style={{ ...cardStyle, padding: '40px', borderRadius: '16px', border: '1px solid rgba(223, 173, 62, 0.25)', background: 'rgba(11, 43, 32, 0.25)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--clr-yellow)', marginBottom: '16px' }}>
                A Boutique Law Firm Focused on Complex Matters
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '12px' }}>
                Yantra Legal is a Sydney-based boutique law firm practising exclusively in Australian Immigration Law and Family Law.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.8)', marginBottom: 0 }}>
                We are committed to providing clear legal advice, careful preparation, and practical representation tailored to each client's individual circumstances. Whether you are facing a complex visa matter or a significant family law issue, we work closely with you to achieve the best possible outcome.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating custom Toast notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            padding: '14px 20px',
            borderRadius: '10px',
            backgroundColor: toast.type === 'success' ? '#ecfdf5' : '#fef2f2',
            border: `1px solid ${toast.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
            color: toast.type === 'success' ? '#065f46' : '#991b1b',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 600,
            fontSize: '0.88rem',
            fontFamily: 'system-ui, sans-serif'
          }}
        >
          <span>{toast.message}</span>
        </div>
      )}
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
