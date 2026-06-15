import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Terms of Use | Yantra Legal',
  description: 'Website Terms of Use for Yantra Legal.',
};

export default function TermsOfUsePage() {
  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '160px 24px 100px 24px', color: '#cbdad3', lineHeight: '1.7' }}>
          <span className="sec-pill" style={{ marginBottom: '16px' }}>Legal Document</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#ffffff', marginBottom: '8px', lineHeight: 1.2 }}>
            Website Terms of Use
          </h1>
          <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem', marginBottom: '40px' }}>
            Yantra Legal Pty Ltd trading as Yantra Legal &nbsp;•&nbsp; www.yantralegal.com.au &nbsp;•&nbsp; Last updated: 12 June 2026
          </p>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>1. About These Terms</h2>
            <p style={{ marginBottom: '12px' }}>
              These Website Terms of Use (Terms) govern your access to and use of the Yantra Legal website located at www.yantralegal.com.au (Website). The Website is operated by Yantra Legal Pty Ltd (ABN 33 698 723 858) trading as Yantra Legal (Yantra Legal, we, us, our), an incorporated legal practice in New South Wales.
            </p>
            <p style={{ marginBottom: '12px' }}>
              By accessing or using the Website in any way — including by browsing, reading, submitting an enquiry, or using any feature of the Website — you agree to be bound by these Terms. If you do not agree with these Terms, you should stop using the Website immediately.
            </p>
            <p>
              We may update these Terms at any time by publishing a revised version on the Website. The revised Terms take effect from the date they are published. We encourage you to check this page periodically.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>2. The Information on This Website Is General in Nature</h2>
            <p style={{ marginBottom: '12px' }}>
              The content published on this Website, including articles, guides, service descriptions, and any other material (Content), is provided for general informational purposes only. It is not intended to constitute legal advice and should not be relied upon as such.
            </p>
            <p style={{ marginBottom: '12px' }}>
              The Content is prepared to provide general information about legal topics and processes. It does not take into account your specific circumstances, objectives, financial situation, or legal needs. Before taking any action based on anything you read on this Website, you should obtain independent legal advice tailored to your situation.
            </p>
            <p>
              Although we take reasonable care to ensure that the Content is accurate and up to date at the time of publication, we do not warrant that it will remain accurate or complete over time. Laws change, and individual circumstances vary. We accept no responsibility for any loss, damage, or inconvenience arising from your reliance on the Content.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>3. Using This Website Does Not Create a Solicitor-Client Relationship</h2>
            <p style={{ marginBottom: '12px' }}>
              Your use of this Website, including reading its Content, submitting an enquiry through our contact form, or receiving any general information from us as a result, does not establish a solicitor-client relationship between you and Yantra Legal.
            </p>
            <p>
              A solicitor-client relationship is only created when you formally engage our services and we confirm that engagement in writing. Until that point, any communication between us — whether through this Website or otherwise — should not be understood as legal advice specific to your matter.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>4. Privacy</h2>
            <p>
              We collect and handle personal information through this Website — including information you provide through our enquiry form and information collected through cookies and analytics — in accordance with our Privacy Policy, which is available on this Website. By using the Website, you acknowledge that you have had the opportunity to read our Privacy Policy. The Privacy Policy forms part of, and should be read together with, these Terms.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>5. Your Licence to Use This Website</h2>
            <p style={{ marginBottom: '12px' }}>
              We grant you a limited, personal, non-exclusive, non-transferable, revocable licence to access and use this Website for your own personal, non-commercial purposes in accordance with these Terms.
            </p>
            <p style={{ marginBottom: '12px' }}>This licence does not permit you to:</p>
            <ul style={listStyle}>
              <li>copy, reproduce, or republish any part of the Website or its Content without our prior written consent;</li>
              <li>modify, adapt, translate, or create derivative works based on the Content;</li>
              <li>use the Website or Content for any commercial purpose, including on-selling, sublicensing, or incorporating it into commercial products or services;</li>
              <li>use the Website in any manner that could damage, disable, overload, or impair its functionality or security;</li>
              <li>use automated tools, bots, or scrapers to extract data from the Website.</li>
            </ul>
            <p>All other uses of the Website are prohibited unless you obtain our express written permission.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>6. Conduct We Do Not Permit</h2>
            <p style={{ marginBottom: '12px' }}>When using this Website, you must not:</p>
            <ul style={listStyle}>
              <li>engage in any conduct that is unlawful, fraudulent, harmful, or likely to cause offence;</li>
              <li>upload, transmit, or publish any content that infringes the intellectual property rights, privacy rights, or other legal rights of any person;</li>
              <li>harass, threaten, abuse, or defame any person through or in connection with your use of the Website;</li>
              <li>attempt to gain unauthorised access to any part of the Website, our servers, or any system or network connected to the Website;</li>
              <li>introduce any virus, malware, ransomware, spyware, or other malicious or disruptive code to the Website or our systems;</li>
              <li>use the Website to send unsolicited commercial communications (spam);</li>
              <li>use the Website or its Content in any way that competes with our business;</li>
              <li>facilitate or assist another person to engage in any of the conduct listed above.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>7. Intellectual Property</h2>
            <p style={{ marginBottom: '12px' }}>
              Unless otherwise stated, all intellectual property rights in this Website and its Content — including copyright in text, images, graphics, layout, and design — are owned by or licensed to Yantra Legal. All rights are reserved.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Nothing in these Terms transfers any intellectual property rights to you. Your use of the Website does not grant you any right, title, or interest in any Content beyond the limited licence described in clause 5.
            </p>
            <p>
              The Yantra Legal name, logo, and any associated trade marks or service marks are the property of Yantra Legal. You must not use them without our prior written consent.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>8. Links to Third-Party Websites</h2>
            <p style={{ marginBottom: '12px' }}>
              This Website may contain hyperlinks to websites operated by third parties. These links are provided for your convenience only. We do not control, endorse, or accept responsibility for the content, accuracy, or availability of any third-party website.
            </p>
            <p>
              Visiting a third-party website through a link on our Website is done entirely at your own risk. We recommend that you review the terms of use and privacy policies of any third-party website you visit.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>9. Disclaimer and Limitation of Warranties</h2>
            <p style={{ marginBottom: '12px' }}>To the maximum extent permitted by applicable law, we make no representation or warranty that:</p>
            <ul style={listStyle}>
              <li>the Website will be available at all times or free from errors, interruptions, or technical issues;</li>
              <li>the Website or any content accessed through it is free from viruses or other harmful components;</li>
              <li>the Content is accurate, complete, current, or suitable for any particular purpose.</li>
            </ul>
            <p>
              Your use of the Website and reliance on any Content is entirely at your own risk. Nothing in these Terms is intended to exclude any guarantee, warranty, right, or remedy that cannot be excluded under the Australian Consumer Law.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>10. Limitation of Liability</h2>
            <p style={{ marginBottom: '12px' }}>
              To the maximum extent permitted by applicable law, Yantra Legal, its principals, employees, contractors, and agents exclude all liability for any loss or damage — whether direct, indirect, incidental, special, or consequential — arising out of or in connection with:
            </p>
            <ul style={listStyle}>
              <li>your access to, use of, or inability to access or use this Website;</li>
              <li>any reliance you place on the Content;</li>
              <li>any interruption, suspension, or termination of the Website;</li>
              <li>any loss or corruption of data;</li>
              <li>any unauthorised access to or alteration of your transmissions or data.</li>
            </ul>
            <p>Where our liability cannot be excluded by law, it is limited to the greatest extent permitted.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>11. Your Obligation to Indemnify Us</h2>
            <p>
              You agree to indemnify and hold harmless Yantra Legal, its principals, employees, contractors, and agents against any claim, loss, liability, cost, or expense (including reasonable legal costs) arising out of or in connection with your use of the Website or any breach by you of these Terms or any applicable law. This indemnity survives the termination of your use of the Website and these Terms.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>12. Suspension and Termination of Access</h2>
            <p style={{ marginBottom: '12px' }}>
              We reserve the right, at our sole discretion and without notice, to suspend or terminate your access to all or any part of the Website at any time. We may do so where we believe you have breached these Terms, where required by law, or for any other reason we consider appropriate.
            </p>
            <p>
              We also reserve the right to discontinue the Website — temporarily or permanently — without notice. We are not liable to you for any loss arising from such suspension, termination, or discontinuation.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>13. Governing Law and Jurisdiction</h2>
            <p style={{ marginBottom: '12px' }}>
              These Terms are governed by the laws of New South Wales, Australia. You irrevocably submit to the non-exclusive jurisdiction of the courts of New South Wales and any courts competent to hear appeals from those courts in relation to any dispute arising out of or in connection with these Terms or your use of the Website.
            </p>
            <p>
              If you access this Website from outside Australia, you do so at your own initiative and are responsible for complying with the laws of the jurisdiction from which you access it. We make no representation that the Website or its Content complies with the laws of any jurisdiction other than Australia.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>14. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid, unenforceable, or illegal under applicable law, that provision will be severed from the Terms to the minimum extent necessary, and the remaining provisions will continue in full force and effect.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>15. Contact Details</h2>
            <p style={{ marginBottom: '12px' }}>
              If you have any questions about these Terms or your use of the Website, please contact us at:
            </p>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <p style={{ fontWeight: 600, color: '#ffffff', margin: '0 0 8px 0' }}>Yantra Legal Pty Ltd trading as Yantra Legal</p>
              <p style={{ margin: '4px 0' }}>ABN: 33 698 723 858</p>
              <p style={{ margin: '4px 0' }}>GPO Box 1230, Sydney NSW 2001</p>
              <p style={{ margin: '4px 0' }}>Email: <a href="mailto:contact@yantralegal.com.au" style={{ color: 'var(--clr-yellow)' }}>contact@yantralegal.com.au</a></p>
              <p style={{ margin: '4px 0 0 0' }}>Phone: <a href="https://wa.me/61402402120" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr-yellow)' }}>0402 402 120 (WhatsApp)</a></p>
            </div>
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

const listStyle: React.CSSProperties = {
  paddingLeft: '20px',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};
