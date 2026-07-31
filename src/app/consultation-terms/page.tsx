import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealingPhone from '../../components/RevealingPhone';

export const metadata = {
  title: 'Initial Consultation Terms and Conditions | Yantra Legal',
  description: 'Initial Consultation Terms and Conditions for Yantra Legal.',
  alternates: {
    canonical: '/consultation-terms',
  },
};

export default function ConsultationTermsPage() {
  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '160px 24px 100px 24px', color: '#cbdad3', lineHeight: '1.7' }}>
          <span className="sec-pill" style={{ marginBottom: '16px' }}>Legal Document</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#ffffff', marginBottom: '8px', lineHeight: 1.2 }}>
            Initial Consultation Terms and Conditions
          </h1>
          <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem', marginBottom: '40px' }}>
            Yantra Legal Pty Ltd trading as Yantra Legal &nbsp;•&nbsp; www.yantralegal.com.au &nbsp;•&nbsp; Last updated: 20 July 2026
          </p>

          <p style={{ marginBottom: '24px' }}>
            By booking an appointment with Yantra Legal, you acknowledge that you have read, understood and agree to the following Terms and Conditions.
          </p>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Scope of the Initial Consultation</h2>
            <p style={{ marginBottom: '12px' }}>
              Our initial consultation is up to 30 minutes in duration.
            </p>
            <p style={{ marginBottom: '12px' }}>
              During the consultation, one of our solicitors will:
            </p>
            <ul style={listStyle}>
              <li>Listen to your legal concerns and objectives;</li>
              <li>Conduct a preliminary assessment of your matter;</li>
              <li>Discuss potential legal options and available pathways;</li>
              <li>Explain the legal process relevant to your circumstances; and</li>
              <li>Outline the next steps should you wish to formally engage our firm.</li>
            </ul>
            <p>
              Our areas of practice include Immigration Law, Family Law, Divorce, Appeals & Reviews, and related legal matters.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Nature of the Consultation</h2>
            <p style={{ marginBottom: '12px' }}>
              The initial consultation is intended to provide a preliminary legal assessment based on the information and documents available at the time of the consultation.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Any comments, opinions or recommendations provided during the consultation are based solely on the information available at that time and may change if additional information, documents or instructions become available.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Comprehensive legal advice can only be provided after:
            </p>
            <ul style={listStyle}>
              <li>we have completed all necessary conflict checks;</li>
              <li>we have received all relevant information and supporting documents; and</li>
              <li>both parties have entered into a signed Costs Agreement.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>No Solicitor–Client Relationship</h2>
            <p style={{ marginBottom: '12px' }}>
              Booking or attending an initial consultation does not create a solicitor-client relationship.
            </p>
            <p>
              Yantra Legal is not retained to act on your behalf, prepare documents, lodge applications, commence proceedings, negotiate with third parties or provide ongoing legal services unless a formal Costs Agreement has been signed by both parties.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Information Provided by You</h2>
            <p style={{ marginBottom: '12px' }}>
              Our preliminary assessment is based entirely on the information and documents you provide.
            </p>
            <p style={{ marginBottom: '12px' }}>
              You warrant that the information you provide is true, accurate and complete to the best of your knowledge.
            </p>
            <p>
              If any information is incomplete, inaccurate or misleading, our assessment or subsequent legal advice may change.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Consultation Time</h2>
            <p style={{ marginBottom: '12px' }}>
              The consultation fee covers one consultation of up to 30 minutes only, unless alternate arrangements have been agreed upon.
            </p>
            <p style={{ marginBottom: '12px' }}>
              If additional time or further legal assistance is required, a further consultation or formal engagement may be arranged under a separate fixed fee or formal Cost Agreement.
            </p>
            <p style={{ marginBottom: '12px' }}>
              If you arrive or join late, the consultation will still conclude at the scheduled finish time.
            </p>
            <p>
              If you arrive more than 15 minutes late, we reserve the right to treat the appointment as a cancellation or no-show.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Fees, Payments, Cancellations and Refunds</h2>
            <h3 style={subHeadingStyle}>Consultation Fee</h3>
            <p style={{ marginBottom: '12px' }}>
              The consultation fee must be paid in full at the time of booking to secure your appointment.
            </p>
            <p style={{ marginBottom: '16px' }}>
              A tax invoice or receipt will be issued upon successful payment.
            </p>

            <h3 style={subHeadingStyle}>Rescheduling</h3>
            <p style={{ marginBottom: '12px' }}>
              Appointments may be rescheduled by providing at least 24 hours&apos; notice, subject to availability.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Requests received less than 24 hours before the appointment may be treated as a cancellation.
            </p>

            <h3 style={subHeadingStyle}>Cancellation and No-Shows</h3>
            <p style={{ marginBottom: '12px' }}>
              If you cancel within 24 hours of your appointment or fail to attend without notice, a cancellation fee of $100 will apply.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Where applicable, any approved refund will be returned to the original payment method.
            </p>

            <h3 style={subHeadingStyle}>Payment Processing Fees</h3>
            <p style={{ marginBottom: '16px' }}>
              Any third-party payment processing fees charged by payment providers are non-refundable.
            </p>

            <h3 style={subHeadingStyle}>Firm Rescheduling</h3>
            <p>
              If Yantra Legal needs to reschedule your appointment due to unforeseen circumstances, we will offer the earliest reasonably available alternative or provide a full refund if a suitable alternative cannot be agreed.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Confidentiality and Conflict of Interest</h2>
            <p style={{ marginBottom: '12px' }}>
              Information you provide during the booking process and consultation will be treated confidentially in accordance with our professional and ethical obligations.
            </p>
            <p style={{ marginBottom: '12px' }}>
              We reserve the right to conduct a conflict-of-interest check at any stage before accepting instructions.
            </p>
            <p>
              If we identify an actual or potential conflict that prevents us from acting for you, we may decline to act and any consultation fee paid will be refunded in full.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Privacy</h2>
            <p style={{ marginBottom: '12px' }}>
              By proceeding with your booking, you consent to Yantra Legal collecting, using and storing your personal information for the purpose of providing legal services.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Your personal information will be handled in accordance with the Privacy Act 1988 (Cth), the Australian Privacy Principles and our Privacy Policy.
            </p>
            <p>
              We may retain your information as required by law and in accordance with our professional record-keeping obligations.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>No Guarantee of Outcome</h2>
            <p style={{ marginBottom: '12px' }}>
              Legal matters involve uncertainty.
            </p>
            <p>
              Yantra Legal does not guarantee the success of any visa application, appeal, court proceeding, negotiation or other legal matter.
            </p>
            <p style={{ marginTop: '12px' }}>
              Any preliminary assessment provided during the consultation represents our professional opinion based on the information available at that time and should not be interpreted as a promise or guarantee of any particular outcome.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Post-Consultation Communication</h2>
            <p style={{ marginBottom: '12px' }}>
              Unless otherwise agreed in writing, the consultation fee covers the consultation only.
            </p>
            <p style={{ marginBottom: '12px' }}>
              It does not include:
            </p>
            <ul style={listStyle}>
              <li>reviewing additional documents;</li>
              <li>preparing written legal advice;</li>
              <li>responding to follow-up emails or telephone enquiries;</li>
              <li>drafting applications or submissions;</li>
              <li>communicating with government departments, tribunals, courts or third parties; or</li>
              <li>undertaking any ongoing legal work.</li>
            </ul>
            <p style={{ marginBottom: '12px' }}>
              Any further work will only be undertaken after a formal engagement has been agreed.
            </p>
            <p>
              Yantra Legal is under no obligation to provide further advice or respond to additional enquiries unless we have been formally retained.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Recording of the Consultation</h2>
            <p>
              Audio or video recording of the consultation is not permitted without the prior consent of all parties.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Interpreters</h2>
            <p style={{ marginBottom: '12px' }}>
              If you require an interpreter, please notify us at the time of booking or before your appointment.
            </p>
            <p>
              Unless otherwise agreed, the cost of arranging an interpreter is the client&apos;s responsibility.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Electronic Communications</h2>
            <p style={{ marginBottom: '12px' }}>
              By providing your email address and telephone number, you consent to Yantra Legal communicating with you electronically regarding your booking, invoices, appointments and, where applicable, legal services.
            </p>
            <p>
              While we take reasonable steps to protect electronic communications, no electronic transmission can be guaranteed to be completely secure.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Identity Verification</h2>
            <p>
              Where required by law or professional obligations, Yantra Legal may request proof of identity before accepting instructions or providing legal services.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Independent Decision</h2>
            <p style={{ marginBottom: '12px' }}>
              Any decision to commence legal proceedings, lodge an application, file an appeal or engage Yantra Legal remains entirely your decision.
            </p>
            <p>
              Nothing discussed during the consultation obliges either party to proceed with a formal legal engagement.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Zero-Tolerance Policy</h2>
            <p style={{ marginBottom: '12px' }}>
              Yantra Legal is committed to maintaining a respectful and safe workplace.
            </p>
            <p style={{ marginBottom: '12px' }}>
              We have zero tolerance for:
            </p>
            <ul style={listStyle}>
              <li>abusive or offensive language;</li>
              <li>harassment;</li>
              <li>intimidation;</li>
              <li>discrimination;</li>
              <li>threatening behaviour; or</li>
              <li>violence towards our staff.</li>
            </ul>
            <p style={{ marginBottom: '12px' }}>
              If such behaviour occurs before or during the consultation, we reserve the right to immediately terminate the consultation, refuse future services and, where appropriate, notify relevant authorities.
            </p>
            <p>
              No refund will be provided in these circumstances.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Limitation of Liability</h2>
            <p style={{ marginBottom: '12px' }}>
              To the extent permitted by law, Yantra Legal excludes all liability for any loss or damage arising from reliance on any preliminary assessment, comments or opinions provided during the initial consultation where we have not been formally retained to act.
            </p>
            <p>
              Nothing in these Terms excludes, restricts or modifies any rights or remedies that cannot lawfully be excluded under applicable Australian law.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>Acknowledgement</h2>
            <p style={{ marginBottom: '12px' }}>
              By ticking the checkbox and proceeding with your booking, you confirm that:
            </p>
            <ul style={listStyle}>
              <li>You have read and understood these Initial Consultation Terms and Conditions.</li>
              <li>You agree to be bound by these Terms and Conditions.</li>
              <li>The information you provide is true, accurate and complete to the best of your knowledge.</li>
              <li>You understand that booking or attending an initial consultation does not create a solicitor-client relationship or formally engage Yantra Legal.</li>
              <li>You understand that Yantra Legal will only be formally retained after both parties have entered into a signed Costs Agreement.</li>
            </ul>
          </div>
        </article>
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

const sectionStyle: React.CSSProperties = {
  marginBottom: '40px',
};

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.5rem',
  color: 'var(--clr-yellow)',
  marginBottom: '16px',
};

const subHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.2rem',
  color: '#ffffff',
  marginTop: '20px',
  marginBottom: '10px',
};

const listStyle: React.CSSProperties = {
  paddingLeft: '20px',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};
