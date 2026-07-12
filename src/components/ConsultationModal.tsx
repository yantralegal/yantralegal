'use client';

import React, { useState, useEffect } from 'react';

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Details & Duration, Step 2: Date & Time
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    matterType: '',
    method: '',
    duration: 30, // Default 30 min (Paid)
    description: '',
    isConfirmed: false,
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState<{ status?: string } | null>(null);

  // Set min date to today
  const [minDate, setMinDate] = useState('');
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Official Cal.com embed loader snippet
      (function (C, A, L) {
        var p = function (a: any, ar: any) { a.q.push(ar); };
        var d = C.document;
        (C as any).Cal = (C as any).Cal || function () {
          var cal = (C as any).Cal;
          var ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head!.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            var api: any = function () { p(api, arguments); };
            var namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      // Initialize Cal
      const cal = (window as any).Cal;
      if (cal) {
        cal("init", { origin: "https://cal.com" });
        cal("ui", { styles: { branding: { brandColor: "#0b2b20" } }, hideEventTypeDetails: false, layout: "month_view" });
      }
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      if (typeof window !== 'undefined' && (window as any).Cal) {
        (window as any).Cal("modal", {
          calLink: "krishna-giri-m4dgkw",
          config: { layout: "month_view" }
        });
      } else {
        window.open("https://cal.com/krishna-giri-m4dgkw", "_blank");
      }
    };
    window.addEventListener('open-consultation-modal', handleOpen);
    return () => {
      window.removeEventListener('open-consultation-modal', handleOpen);
    };
  }, []);

  // Fetch available slots when date changes
  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([]);
      return;
    }

    async function fetchSlots() {
      setIsLoadingSlots(true);
      setSelectedTime('');
      setErrorMessage('');
      try {
        const res = await fetch(`/api/available-slots?date=${selectedDate}`);
        const data = await res.json();
        if (res.ok && data.availableSlots) {
          setAvailableSlots(data.availableSlots);
        } else {
          setAvailableSlots([]);
          setErrorMessage(data.error || 'Failed to load available slots.');
        }
      } catch (err) {
        console.error('Error fetching slots:', err);
        setAvailableSlots([]);
        setErrorMessage('Failed to connect to availability service.');
      } finally {
        setIsLoadingSlots(false);
      }
    }

    fetchSlots();
  }, [selectedDate]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'duration') {
      setForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setErrorMessage('Please select both a date and a time slot.');
      return;
    }
    if (!form.isConfirmed) {
      alert('Please confirm that the information provided is accurate.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          matterType: form.matterType,
          method: form.method,
          description: form.description,
          duration: form.duration,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setSubmitStatus('success');
        setSuccessInfo(result);
        // Clear form
        setForm({
          name: '',
          email: '',
          phone: '',
          matterType: '',
          method: '',
          duration: 30,
          description: '',
          isConfirmed: false,
        });
        setSelectedDate('');
        setSelectedTime('');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Booking request failed. Please try a different slot.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
      setErrorMessage('Failed to connect to the booking service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return null;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '90%' }}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          &times;
        </button>

        {submitStatus === 'success' ? (
          <div className="form-success-state" style={{ padding: '30px 10px', textAlign: 'center' }}>
            <div className="success-icon-wrapper" style={{ margin: '0 auto 20px', background: 'var(--clr-yellow)', color: '#000', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>✓</div>
            <h4 className="success-heading" style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
              {successInfo?.status === 'CONFIRMED' ? 'Consultation Confirmed!' : 'Consultation Requested'}
            </h4>
            <p className="success-text" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
              {successInfo?.status === 'CONFIRMED' 
                ? 'Your free consultation has been booked successfully! A calendar invitation with video/meeting details has been sent to your email.'
                : 'Thank you for your request. Since this consultation is over 5 minutes, it requires a fee. We have saved your request as pending, and we will confirm it as soon as payment is collected.'}
            </p>
            <button className="btn btn-yellow" onClick={handleClose} style={{ border: 'none', cursor: 'pointer' }}>
              Done
            </button>
          </div>
        ) : (
          <div className="legal-contact-form">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 className="modal-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#ffffff', margin: 0 }}>
                Book a Consultation
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--clr-yellow)', fontWeight: 'bold', border: '1px solid var(--clr-yellow)', padding: '3px 8px', borderRadius: '4px' }}>
                Step {step} of 2
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
              {step === 1 ? 'Provide details about yourself and the consultation format.' : 'Select a date and available time slot.'}
            </p>

            {errorMessage && (
              <div style={{ background: 'rgba(255,107,107,0.15)', borderLeft: '3px solid #ff6b6b', padding: '10px 15px', color: '#ff6b6b', fontSize: '0.88rem', borderRadius: '4px', marginBottom: '20px' }}>
                {errorMessage}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleNextStep}>
                {/* Name */}
                <div className="form-group floating-group full-width" style={{ marginBottom: '18px' }}>
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
                <div className="form-row-2col" style={{ marginBottom: '18px' }}>
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

                {/* Matter Type & Format */}
                <div className="form-row-2col" style={{ marginBottom: '18px' }}>
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
                      <option value="Family">Family Law</option>
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
                      <option value="Video">Video Call (Teams/Google Meet)</option>
                    </select>
                    <label htmlFor="modal-method" className="floating-label">Preferred Format</label>
                    <div className="select-chevron-container">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="select-chevron-svg">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Duration Picker */}
                <div className="form-group select-wrapper" style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor="modal-duration" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>Consultation Duration</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      id="modal-duration"
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                      required
                      className="form-select has-value"
                      style={{ paddingLeft: '12px' }}
                    >
                      <option value="5">Quick Chat (5 Minutes - Free)</option>
                      <option value="30">Standard Session (30 Minutes - Requires Fee)</option>
                      <option value="60">Extended Session (60 Minutes - Requires Fee)</option>
                    </select>
                    <div className="select-chevron-container">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="select-chevron-svg">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                <button type="submit" className="contact-submit-btn">
                  <span>Continue to Date & Time</span>
                  <span className="contact-submit-icon-wrapper">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="contact-arrow-svg">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Date Picker */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="booking-date" style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Select Date</label>
                  <input
                    type="date"
                    id="booking-date"
                    min={minDate}
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      color: '#ffffff',
                      padding: '12px 16px',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Available Slots Grid */}
                {selectedDate && (
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                      Available Time Slots {isLoadingSlots && '(Loading...)'}
                    </label>

                    {isLoadingSlots ? (
                      <div style={{ display: 'flex', gap: '8px', padding: '10px 0' }}>
                        <span className="slots-loading-indicator" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Fetching available slots...</span>
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                        No slots available on this day. Please choose another date.
                      </p>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                        {availableSlots.map((timeSlot) => (
                          <button
                            type="button"
                            key={timeSlot}
                            onClick={() => setSelectedTime(timeSlot)}
                            style={{
                              padding: '10px 5px',
                              background: selectedTime === timeSlot ? 'var(--clr-yellow)' : 'rgba(255, 255, 255, 0.04)',
                              color: selectedTime === timeSlot ? '#000000' : '#ffffff',
                              border: selectedTime === timeSlot ? '1px solid var(--clr-yellow)' : '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.88rem',
                              fontWeight: selectedTime === timeSlot ? 'bold' : 'normal',
                              textAlign: 'center',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {timeSlot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <div className="form-group floating-group floating-textarea-group full-width" style={{ marginBottom: '20px' }}>
                  <textarea
                    id="modal-description"
                    name="description"
                    placeholder=" "
                    required
                    rows={3}
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

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: '1',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      borderRadius: '6px',
                      padding: '14px',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={isSubmitting || !selectedTime}
                    style={{ flex: '2' }}
                  >
                    <span>{isSubmitting ? 'Booking...' : 'Confirm & Request'}</span>
                    <span className="contact-submit-icon-wrapper">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="contact-arrow-svg">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
