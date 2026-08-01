'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function FamilyLawIntakePage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  
  // File upload state
  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');

  // Form State
  const [form, setForm] = useState({
    // Client Info
    clientFirst: '',
    clientMiddle: '',
    clientLast: '',
    clientOther: '',
    clientDob: '',
    clientGender: '',
    clientStreet: '',
    clientStreet2: '',
    clientSuburb: '',
    clientState: '',
    clientPostcode: '',
    clientPhone: '',
    clientEmail: '',
    clientLivingInAustraliaSince: '',
    clientOccupation: '',

    // Other Party Info
    otherPartyFirst: '',
    otherPartyMiddle: '',
    otherPartyLast: '',
    otherPartyOther: '',
    otherPartyDob: '',
    otherPartyGender: '',
    otherPartyStreet: '',
    otherPartyStreet2: '',
    otherPartySuburb: '',
    otherPartyState: '',
    otherPartyPostcode: '',
    otherPartyPhone: '',
    otherPartyEmail: '',
    otherPartyLivingInAustraliaSince: '',
    otherPartyOccupation: '',

    // Children
    child1_name: '',
    child1_dob: '',
    child2_name: '',
    child2_dob: '',
    child3_name: '',
    child3_dob: '',
    child4_name: '',
    child4_dob: '',

    // Relationship
    applicationType: '',
    relationshipCommencement: '',
    dateOfMarriage: '',
    isSeparated: '',
    dateOfSeparation: '',
    dateOfDivorce: '',

    // Advice & Referral
    legalAdviceSought: [] as string[],
    referralSource: '',
    additionalInfo: '',
    agreedToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValidationError('');
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValidationError('');
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAdviceCheckboxChange = (value: string) => {
    setValidationError('');
    setForm((prev) => {
      const current = [...prev.legalAdviceSought];
      if (current.includes(value)) {
        return { ...prev, legalAdviceSought: current.filter((v) => v !== value) };
      } else {
        return { ...prev, legalAdviceSought: [...current, value] };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');
    setValidationError('');
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFileError('File size exceeds the 10 MB limit.');
        setIdentityFile(null);
      } else {
        setIdentityFile(file);
      }
    }
  };

  // Basic Validations per step
  const validateStep = () => {
    setValidationError('');
    if (step === 1) {
      if (!form.clientFirst.trim() || !form.clientLast.trim()) {
        setValidationError('Please enter Client First Name and Last Name.');
        return false;
      }
      if (!form.clientDob) {
        setValidationError('Please enter Client Date of Birth.');
        return false;
      }
      if (!form.clientStreet.trim() || !form.clientSuburb.trim() || !form.clientState.trim() || !form.clientPostcode.trim()) {
        setValidationError('Please enter full Client Address (Street, Suburb, State, and Postcode).');
        return false;
      }
      if (!form.clientPhone.trim()) {
        setValidationError('Please enter Client Mobile Number.');
        return false;
      }
      if (!form.clientEmail.trim()) {
        setValidationError('Please enter Client Email Address.');
        return false;
      }
      if (!form.clientLivingInAustraliaSince) {
        setValidationError('Please enter the date you have been living in Australia since.');
        return false;
      }
      if (!form.clientOccupation.trim()) {
        setValidationError('Please enter Client Occupation.');
        return false;
      }
    }
    if (step === 2) {
      if (!form.otherPartyFirst.trim() || !form.otherPartyLast.trim()) {
        setValidationError("Please enter Other Party's First Name and Last Name.");
        return false;
      }
      if (!form.otherPartyDob) {
        setValidationError("Please enter Other Party's Date of Birth.");
        return false;
      }
      if (!form.otherPartyStreet.trim() || !form.otherPartySuburb.trim() || !form.otherPartyState.trim() || !form.otherPartyPostcode.trim()) {
        setValidationError("Please enter full Other Party's Address (Street, Suburb, State, and Postcode).");
        return false;
      }
      if (!form.otherPartyLivingInAustraliaSince) {
        setValidationError("Please enter the date the Other Party has been living in Australia since.");
        return false;
      }
      if (!form.otherPartyOccupation.trim()) {
        setValidationError("Please enter Other Party's Occupation.");
        return false;
      }
    }
    if (step === 4) {
      if (!form.relationshipCommencement) {
        setValidationError('Relationship Commencement Date is required.');
        return false;
      }
      if (!form.isSeparated) {
        setValidationError('Please select whether you are separated.');
        return false;
      }
      if (!form.applicationType) {
        setValidationError('Please select an Application Type (Sole or Joint).');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }
    setValidationError('');
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setValidationError('');
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateAllSteps = () => {
    setValidationError('');
    // Client Info
    if (!form.clientFirst.trim() || !form.clientLast.trim()) {
      setValidationError('Please enter Client First Name and Last Name.');
      return false;
    }
    if (!form.clientDob) {
      setValidationError('Please enter Client Date of Birth.');
      return false;
    }
    if (!form.clientStreet.trim() || !form.clientSuburb.trim() || !form.clientState.trim() || !form.clientPostcode.trim()) {
      setValidationError('Please enter full Client Address (Street, Suburb, State, and Postcode).');
      return false;
    }
    if (!form.clientPhone.trim()) {
      setValidationError('Please enter Client Mobile Number.');
      return false;
    }
    if (!form.clientEmail.trim()) {
      setValidationError('Please enter Client Email Address.');
      return false;
    }
    if (!form.clientLivingInAustraliaSince) {
      setValidationError('Please enter the date you have been living in Australia since.');
      return false;
    }
    if (!form.clientOccupation.trim()) {
      setValidationError('Please enter Client Occupation.');
      return false;
    }
    // Other Party Info
    if (!form.otherPartyFirst.trim() || !form.otherPartyLast.trim()) {
      setValidationError("Please enter Other Party's First Name and Last Name.");
      return false;
    }
    if (!form.otherPartyDob) {
      setValidationError("Please enter Other Party's Date of Birth.");
      return false;
    }
    if (!form.otherPartyStreet.trim() || !form.otherPartySuburb.trim() || !form.otherPartyState.trim() || !form.otherPartyPostcode.trim()) {
      setValidationError("Please enter full Other Party's Address (Street, Suburb, State, and Postcode).");
      return false;
    }
    if (!form.otherPartyLivingInAustraliaSince) {
      setValidationError("Please enter the date the Other Party has been living in Australia since.");
      return false;
    }
    if (!form.otherPartyOccupation.trim()) {
      setValidationError("Please enter Other Party's Occupation.");
      return false;
    }
    // Relationship
    if (!form.relationshipCommencement) {
      setValidationError('Relationship Commencement Date is required.');
      return false;
    }
    if (!form.isSeparated) {
      setValidationError('Please select whether you are separated.');
      return false;
    }
    if (!form.applicationType) {
      setValidationError('Please select an Application Type (Sole or Joint).');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!validateAllSteps()) {
      return;
    }

    if (!form.agreedToTerms) {
      setValidationError('You must agree to the Terms & Conditions before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      
      // Append files
      if (identityFile) {
        formData.append('identityFile', identityFile);
      }

      // Client Info
      formData.append('clientName_first', form.clientFirst);
      formData.append('clientName_middle', form.clientMiddle);
      formData.append('clientName_last', form.clientLast);
      formData.append('clientName_other', form.clientOther);
      if (form.clientDob) {
        const [year, monthNum, day] = form.clientDob.split('-');
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthIdx = parseInt(monthNum, 10) - 1;
        formData.append('clientDob_day', parseInt(day, 10).toString());
        formData.append('clientDob_month', monthNames[monthIdx] || '');
        formData.append('clientDob_year', year);
      } else {
        formData.append('clientDob_day', '');
        formData.append('clientDob_month', '');
        formData.append('clientDob_year', '');
      }
      formData.append('clientGender', form.clientGender);
      formData.append('clientAddress_street', form.clientStreet);
      formData.append('clientAddress_street2', form.clientStreet2);
      formData.append('clientAddress_suburb', form.clientSuburb);
      formData.append('clientAddress_state', form.clientState);
      formData.append('clientAddress_postcode', form.clientPostcode);
      formData.append('clientPhone', form.clientPhone);
      formData.append('clientEmail', form.clientEmail);
      formData.append('clientLivingInAustraliaSince', form.clientLivingInAustraliaSince);
      formData.append('clientOccupation', form.clientOccupation);

      // Other Party Info
      formData.append('otherPartyName_first', form.otherPartyFirst);
      formData.append('otherPartyName_middle', form.otherPartyMiddle);
      formData.append('otherPartyName_last', form.otherPartyLast);
      formData.append('otherPartyName_other', form.otherPartyOther);
      if (form.otherPartyDob) {
        const [year, monthNum, day] = form.otherPartyDob.split('-');
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthIdx = parseInt(monthNum, 10) - 1;
        formData.append('otherPartyDob_day', parseInt(day, 10).toString());
        formData.append('otherPartyDob_month', monthNames[monthIdx] || '');
        formData.append('otherPartyDob_year', year);
      } else {
        formData.append('otherPartyDob_day', '');
        formData.append('otherPartyDob_month', '');
        formData.append('otherPartyDob_year', '');
      }
      formData.append('otherPartyGender', form.otherPartyGender);
      formData.append('otherPartyAddress_street', form.otherPartyStreet);
      formData.append('otherPartyAddress_street2', form.otherPartyStreet2);
      formData.append('otherPartyAddress_suburb', form.otherPartySuburb);
      formData.append('otherPartyAddress_state', form.otherPartyState);
      formData.append('otherPartyAddress_postcode', form.otherPartyPostcode);
      formData.append('otherPartyPhone', form.otherPartyPhone);
      formData.append('otherPartyEmail', form.otherPartyEmail);
      formData.append('otherPartyLivingInAustraliaSince', form.otherPartyLivingInAustraliaSince);
      formData.append('otherPartyOccupation', form.otherPartyOccupation);

      // Children
      formData.append('child1_name', form.child1_name);
      formData.append('child1_dob', form.child1_dob);
      formData.append('child2_name', form.child2_name);
      formData.append('child2_dob', form.child2_dob);
      formData.append('child3_name', form.child3_name);
      formData.append('child3_dob', form.child3_dob);
      formData.append('child4_name', form.child4_name);
      formData.append('child4_dob', form.child4_dob);

      // Relationship
      formData.append('applicationType', form.applicationType);
      formData.append('relationshipCommencement', form.relationshipCommencement);
      formData.append('dateOfMarriage', form.dateOfMarriage);
      formData.append('isSeparated', form.isSeparated);
      formData.append('dateOfSeparation', form.dateOfSeparation);
      formData.append('dateOfDivorce', form.dateOfDivorce);

      // Advice & Referral
      form.legalAdviceSought.forEach((val) => {
        formData.append('legalAdviceSought', val);
      });
      formData.append('referralSource', form.referralSource);
      formData.append('additionalInfo', form.additionalInfo);
      formData.append('agreedToTerms', String(form.agreedToTerms));

      const res = await fetch('/api/family-law-intake', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong during submission.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Server connection failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#061912' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '140px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          {/* Breadcrumbs */}
          <div className="legal-breadcrumbs" style={{ marginBottom: '24px' }}>
            <Link href="/">Home</Link>
            <span className="legal-breadcrumbs-separator">/</span>
            <Link href="/family-law">Family Law</Link>
            <span className="legal-breadcrumbs-separator">/</span>
            <span style={{ color: 'var(--clr-yellow)' }}>Client Intake Form</span>
          </div>

          {/* Page Title */}
          <div style={{ marginBottom: '40px' }}>
            <span className="sec-pill" style={{ display: 'inline-block', marginBottom: '12px' }}>Intake Portal</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff', fontWeight: 400, margin: 0 }}>
              Client Intake Form
            </h1>
            <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.98rem', marginTop: '12px', lineHeight: 1.6 }}>
              Please complete this form to help us gather the necessary details for your family law matter. This ensures we can provide strategic advice during your consultation.
            </p>
          </div>

          {submitStatus === 'success' ? (
            <div style={{ background: 'rgba(11, 43, 32, 0.4)', border: '1px solid var(--clr-yellow)', padding: '48px', borderRadius: '16px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(223,173,62,0.1)', color: 'var(--clr-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', fontSize: '2rem' }}>
                ✓
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: '#ffffff', fontSize: '1.75rem', marginBottom: '16px' }}>Intake Form Submitted</h2>
              <p style={{ color: 'var(--clr-text-muted)', lineHeight: '1.6', fontSize: '0.98rem', maxWidth: '540px', margin: '0 auto 24px auto' }}>
                Thank you for providing your information. We have received your client intake details. Our legal team will review the information and contact you to confirm your initial consultation.
              </p>
              <Link href="/family-law" className="btn btn-yellow" style={{ display: 'inline-flex', padding: '12px 28px', textDecoration: 'none' }}>
                Return to Family Law Page
              </Link>
            </div>
          ) : (
            <div style={{ background: 'rgba(11, 43, 32, 0.25)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '32px' }}>
              
              {/* Progress Tracker */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px' }}>
                {[
                  { num: 1, label: 'Client Info' },
                  { num: 2, label: 'Other Party' },
                  { num: 3, label: 'Children' },
                  { num: 4, label: 'Relationship' },
                  { num: 5, label: 'Legal & ID' }
                ].map((s) => (
                  <div
                    key={s.num}
                    onClick={() => {
                      setValidationError('');
                      setStep(s.num);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, opacity: step === s.num ? 1 : 0.4, cursor: 'pointer' }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: step >= s.num ? 'var(--clr-yellow)' : 'rgba(255, 255, 255, 0.1)',
                      color: step >= s.num ? '#061912' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      marginBottom: '8px',
                      transition: 'all 0.3s ease'
                    }}>
                      {s.num}
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: step === s.num ? 'var(--clr-yellow)' : '#ffffff', textAlign: 'center' }}>{s.label}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="intake-form">
                
                {validationError && (
                  <div style={{
                    padding: '16px 20px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid #ef4444',
                    borderRadius: '10px',
                    color: '#f87171',
                    fontSize: '0.9rem',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: 500
                  }}>
                    <span>⚠️</span>
                    <span>{validationError}</span>
                  </div>
                )}

                {/* STEP 1: CLIENT INFORMATION */}
                {step === 1 && (
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--clr-yellow)', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '8px' }}>
                      Client Information
                    </h3>

                    {/* Name Block */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label-static">First Name <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="clientFirst" value={form.clientFirst} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Middle Name</label>
                        <input type="text" name="clientMiddle" value={form.clientMiddle} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Last Name <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="clientLast" value={form.clientLast} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label className="form-label-static">Other Name (Maiden, previous marriage etc.)</label>
                      <input type="text" name="clientOther" value={form.clientOther} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} />
                    </div>

                    {/* DOB & Gender */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label-static">Date of Birth <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="date" name="clientDob" value={form.clientDob} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Gender</label>
                        <select name="clientGender" value={form.clientGender} onChange={handleInputChange} className="form-select">
                          <option value=""></option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>

                     <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '12px', marginTop: '24px' }}>Address <span style={{ color: '#ef4444' }}>*</span></h4>
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label-static">Street Address <span style={{ color: '#ef4444' }}>*</span></label>
                      <input type="text" name="clientStreet" value={form.clientStreet} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label-static">Address Line 2</label>
                      <input type="text" name="clientStreet2" value={form.clientStreet2} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                      <div className="form-group">
                        <label className="form-label-static">Suburb <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="clientSuburb" value={form.clientSuburb} onChange={handleInputChange} className="form-input" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">State <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="clientState" value={form.clientState} onChange={handleInputChange} className="form-input" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Post Code <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="clientPostcode" value={form.clientPostcode} onChange={handleInputChange} className="form-input" required />
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label-static">Mobile Number <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="tel" name="clientPhone" value={form.clientPhone} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Email <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="email" name="clientEmail" value={form.clientEmail} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label-static">Living in Australia Since <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="date" name="clientLivingInAustraliaSince" value={form.clientLivingInAustraliaSince} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Occupation <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="clientOccupation" value={form.clientOccupation} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: OTHER PARTY INFORMATION */}
                {step === 2 && (
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--clr-yellow)', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '8px' }}>
                      Other Party's Information
                    </h3>

                    {/* Name Block */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label-static">First Name <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="otherPartyFirst" value={form.otherPartyFirst} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Middle Name</label>
                        <input type="text" name="otherPartyMiddle" value={form.otherPartyMiddle} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Last Name <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="otherPartyLast" value={form.otherPartyLast} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label className="form-label-static">Other Name (Maiden, previous marriage etc.)</label>
                      <input type="text" name="otherPartyOther" value={form.otherPartyOther} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} />
                    </div>

                    {/* DOB & Gender */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label-static">Date of Birth <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="date" name="otherPartyDob" value={form.otherPartyDob} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Gender</label>
                        <select name="otherPartyGender" value={form.otherPartyGender} onChange={handleInputChange} className="form-select">
                          <option value=""></option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>

                     <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '12px', marginTop: '24px' }}>Address <span style={{ color: '#ef4444' }}>*</span></h4>
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label-static">Street Address <span style={{ color: '#ef4444' }}>*</span></label>
                      <input type="text" name="otherPartyStreet" value={form.otherPartyStreet} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label-static">Address Line 2</label>
                      <input type="text" name="otherPartyStreet2" value={form.otherPartyStreet2} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                      <div className="form-group">
                        <label className="form-label-static">Suburb <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="otherPartySuburb" value={form.otherPartySuburb} onChange={handleInputChange} className="form-input" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">State <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="otherPartyState" value={form.otherPartyState} onChange={handleInputChange} className="form-input" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Post Code <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="otherPartyPostcode" value={form.otherPartyPostcode} onChange={handleInputChange} className="form-input" required />
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label-static">Mobile Number</label>
                        <input type="tel" name="otherPartyPhone" value={form.otherPartyPhone} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Email</label>
                        <input type="email" name="otherPartyEmail" value={form.otherPartyEmail} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label-static">Living in Australia Since <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="date" name="otherPartyLivingInAustraliaSince" value={form.otherPartyLivingInAustraliaSince} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Occupation <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" name="otherPartyOccupation" value={form.otherPartyOccupation} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: CHILDREN'S INFORMATION */}
                {step === 3 && (
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--clr-yellow)', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '8px' }}>
                      Children's Information
                    </h3>

                    {/* Child One */}
                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '0.92rem', color: 'var(--clr-yellow)', marginTop: 0, marginBottom: '12px' }}>Child One</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                          <label className="form-label-static">Full Name</label>
                          <input type="text" name="child1_name" value={form.child1_name} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div className="form-group">
                          <label className="form-label-static">Date of Birth</label>
                          <input type="date" name="child1_dob" value={form.child1_dob} onChange={handleInputChange} className="form-input" />
                        </div>
                      </div>
                    </div>

                    {/* Child Two */}
                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '0.92rem', color: 'var(--clr-yellow)', marginTop: 0, marginBottom: '12px' }}>Child Two</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                          <label className="form-label-static">Full Name</label>
                          <input type="text" name="child2_name" value={form.child2_name} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div className="form-group">
                          <label className="form-label-static">Date of Birth</label>
                          <input type="date" name="child2_dob" value={form.child2_dob} onChange={handleInputChange} className="form-input" />
                        </div>
                      </div>
                    </div>

                    {/* Child Three */}
                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '0.92rem', color: 'var(--clr-yellow)', marginTop: 0, marginBottom: '12px' }}>Child Three</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                          <label className="form-label-static">Full Name</label>
                          <input type="text" name="child3_name" value={form.child3_name} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div className="form-group">
                          <label className="form-label-static">Date of Birth</label>
                          <input type="date" name="child3_dob" value={form.child3_dob} onChange={handleInputChange} className="form-input" />
                        </div>
                      </div>
                    </div>

                    {/* Child Four */}
                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '0.92rem', color: 'var(--clr-yellow)', marginTop: 0, marginBottom: '12px' }}>Child Four</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                          <label className="form-label-static">Full Name</label>
                          <input type="text" name="child4_name" value={form.child4_name} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div className="form-group">
                          <label className="form-label-static">Date of Birth</label>
                          <input type="date" name="child4_dob" value={form.child4_dob} onChange={handleInputChange} className="form-input" />
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* STEP 4: RELATIONSHIP INFORMATION */}
                {step === 4 && (
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--clr-yellow)', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '8px' }}>
                      Relationship Information
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label-static">Application Type <span style={{ color: '#ef4444' }}>*</span></label>
                        <select name="applicationType" value={form.applicationType} onChange={handleInputChange} className="form-select" required>
                          <option value=""></option>
                          <option value="Sole">Sole</option>
                          <option value="Joint">Joint</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label-static">Commencement of Relationship <span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="date" name="relationshipCommencement" value={form.relationshipCommencement} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Date of Marriage</label>
                        <input type="date" name="dateOfMarriage" value={form.dateOfMarriage} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label-static">Are you separated? <span style={{ color: '#ef4444' }}>*</span></label>
                        <select name="isSeparated" value={form.isSeparated} onChange={handleInputChange} className="form-select" required>
                          <option value=""></option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="N/A">N/A</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label-static">Date of Separation</label>
                        <input type="date" name="dateOfSeparation" value={form.dateOfSeparation} onChange={handleInputChange} className="form-input" style={{ width: '100%' }} />
                      </div>
                    </div>

                    {/* Warning callout */}
                    <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#f87171', fontSize: '0.85rem', lineHeight: '1.5' }}>
                      <strong>⚠️ PROPERTY SETTLEMENT TIME LIMIT:</strong>
                      <p style={{ margin: '8px 0 0 0' }}>
                        THE TIME LIMIT TO APPLY FOR A PROPERTY SETTLEMENT IS WITHIN 2 YEARS AFTER THE DATE OF SEPARATION (DE FACTO) AND WITHIN 12 MONTHS AFTER THE DATE OF DIVORCE. IT IS YOUR RESPONSIBILITY TO ENSURE THAT YOUR APPLICATION IS FILED WITH THE FAMILY LAW COURTS BEFORE THIS TIME LIMIT EXPIRES.
                      </p>
                    </div>

                  </div>
                )}

                {/* STEP 5: DETAILS, REFERRAL, FILE UPLOAD & AGREEMENT */}
                {step === 5 && (
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--clr-yellow)', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '8px' }}>
                      Details & ID Verification
                    </h3>

                    {/* Legal Advice Sought Checkboxes */}
                    <div className="form-group" style={{ marginBottom: '24px' }}>
                      <label className="form-label-static" style={{ marginBottom: '12px', display: 'block' }}>What kind of legal advice are you seeking?</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                        {[
                          'Parenting',
                          'Property',
                          'Financial Agreement',
                          'Divorce',
                          'Domestic Violence',
                          'Others'
                        ].map((item) => (
                          <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={form.legalAdviceSought.includes(item)}
                              onChange={() => handleAdviceCheckboxChange(item)}
                              className="form-checkbox"
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Referral Source select */}
                    <div className="form-group" style={{ marginBottom: '24px', maxWidth: '400px' }}>
                      <label className="form-label-static">How did you hear about Yantra Legal?</label>
                      <select name="referralSource" value={form.referralSource} onChange={handleInputChange} className="form-select">
                        <option value=""></option>
                        <option value="Billboard">Billboard</option>
                        <option value="Yellow Pages">Yellow Pages</option>
                        <option value="Google">Google</option>
                        <option value="Friend">Friend</option>
                        <option value="Family Relationships Australia">Family Relationships Australia</option>
                        <option value="Qld Law Society">Qld Law Society</option>
                        <option value="Legal Aid">Legal Aid</option>
                        <option value="Solicitor">Solicitor</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '24px' }}>
                      <label className="form-label-static">Additional Information</label>
                      <textarea name="additionalInfo" value={form.additionalInfo} onChange={handleInputChange} rows={4} className="form-textarea" style={{ width: '100%' }}></textarea>
                    </div>

                    {/* Verification of Identity (File Upload) */}
                    <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginTop: 0, marginBottom: '6px' }}>Verification of Identity</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--clr-text-muted)', margin: '0 0 16px 0' }}>
                        Please upload a photo/PDF of your driver's licence, proof of age card or passport. (Max size: 10 MB)
                      </p>
                      
                      <div style={{ position: 'relative' }}>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleFileChange}
                          style={{
                            width: '100%',
                            padding: '12px',
                            background: 'rgba(6, 25, 18, 0.3)',
                            border: '1px dashed rgba(223, 173, 62, 0.3)',
                            borderRadius: '6px',
                            color: '#ffffff',
                            cursor: 'pointer'
                          }}
                        />
                        {fileError && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px', margin: 0 }}>{fileError}</p>}
                        {identityFile && <p style={{ color: 'var(--clr-yellow)', fontSize: '0.8rem', marginTop: '6px', margin: 0 }}>Selected: {identityFile.name}</p>}
                      </div>
                    </div>

                    {/* Conflict statement warning */}
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: '1.5', marginBottom: '24px', fontStyle: 'italic' }}>
                      ** By engaging in this initial consultation you agree that this does not constitute a conflict of interest prohibiting us from representing the other party unless you engage us to represent you by entering into a Client/Cost Agreement after your initial consultation **
                    </div>

                    {/* Agreement checkbox */}
                    <div className="form-checkbox-group" style={{ marginBottom: '24px' }}>
                      <input
                        type="checkbox"
                        id="agreeTermsIntake"
                        name="agreedToTerms"
                        checked={form.agreedToTerms}
                        onChange={handleCheckboxChange}
                        className="form-checkbox"
                        required
                      />
                      <label htmlFor="agreeTermsIntake" className="checkbox-label" style={{ fontSize: '0.85rem', color: '#ffffff' }}>
                        I agree to <Link href="/consultation-terms" target="_blank" style={{ color: 'var(--clr-yellow)', textDecoration: 'underline' }}>terms & conditions</Link>. <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                    </div>

                    {submitStatus === 'error' && (
                      <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '6px', color: '#f87171', fontSize: '0.85rem', marginBottom: '20px' }}>
                        {errorMessage}
                      </div>
                    )}
                  </div>
                )}

                {/* Form Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
                  {step > 1 ? (
                    <button type="button" onClick={handleBack} className="btn" style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#ffffff', cursor: 'pointer', padding: '12px 24px' }} disabled={isSubmitting}>
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 5 ? (
                    <button type="button" onClick={handleNext} className="btn btn-yellow" style={{ border: 'none', cursor: 'pointer', padding: '12px 28px' }}>
                      Next Step
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-yellow" style={{ border: 'none', cursor: 'pointer', padding: '12px 28px' }} disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting Form...' : 'Submit Intake Form'}
                    </button>
                  )}
                </div>

              </form>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
