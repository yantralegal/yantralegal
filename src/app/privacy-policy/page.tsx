import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Privacy Policy | Yantra Legal',
  description: 'Privacy Policy for Yantra Legal.',
};

export default function PrivacyPolicyPage() {
  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '160px 24px 100px 24px', color: '#cbdad3', lineHeight: '1.7' }}>
          <span className="sec-pill" style={{ marginBottom: '16px' }}>Legal Document</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#ffffff', marginBottom: '8px', lineHeight: 1.2 }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem', marginBottom: '40px' }}>
            Yantra Legal &nbsp;•&nbsp; www.yantralegal.com.au &nbsp;•&nbsp; Last updated: 31 May 2026
          </p>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>1. Our Commitment to Your Privacy</h2>
            <p>Yantra Legal (ABN 36 810 705 966) (Yantra Legal, we, us, our) is committed to handling personal information responsibly and in accordance with the Australian Privacy Principles (APPs) set out in the Privacy Act 1988 (Cth) (Privacy Act).</p>
            <p>This Privacy Policy explains what personal information we collect, why we collect it, how we use and disclose it, how we protect it, and what rights you have in relation to it. It applies to personal information we collect through our website at www.yantralegal.com.au (Website), through our contact form and enquiry processes, and in the course of providing legal services.</p>
            <p>By using our Website or providing your personal information to us, you acknowledge that you have read and understood this Privacy Policy.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>2. What Personal Information We Collect</h2>
            <p>The types of personal information we may collect include:</p>
            <p><strong>Identity and Contact Information:</strong></p>
            <ul style={listStyle}>
              <li>Your full name, title, date of birth, and gender;</li>
              <li>Your postal address, email address, and telephone number;</li>
              <li>Details of your relationship to other parties in a matter (e.g. spouse, sponsor, employer).</li>
            </ul>
            <p><strong>Matter-Related Information:</strong></p>
            <ul style={listStyle}>
              <li>Information about your visa history, migration status, or migration intentions;</li>
              <li>Information about your marital status and family circumstances, where relevant to a family law matter;</li>
              <li>Documents you provide to us in connection with a legal matter, including passports, statutory declarations, financial records, and correspondence;</li>
              <li>Country of origin, nationality, and immigration history (where relevant to your matter).</li>
            </ul>
            <p><strong>Financial Information:</strong></p>
            <ul style={listStyle}>
              <li>Payment details, including billing information and transaction records, processed through our secure third-party payment providers. We do not store your payment card details on our systems.</li>
            </ul>
            <p><strong>Technical and Usage Information:</strong></p>
            <ul style={listStyle}>
              <li>Your IP address, browser type and version, device type, and operating system;</li>
              <li>Pages you visit on our Website, time spent on those pages, and referring URLs;</li>
              <li>Information collected through cookies and similar technologies (see section 9).</li>
            </ul>
            <p><strong>Sensitive Information:</strong></p>
            <p>In the course of providing legal services — particularly in migration and family law matters — we may collect sensitive information about you as defined in the Privacy Act. This includes information about your racial or ethnic origin, religion, health, family circumstances, and criminal history. We collect sensitive information only where it is necessary for the provision of our legal services and, where required by law, with your consent.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>3. How We Collect Personal Information</h2>
            <p>We collect personal information in the following ways:</p>
            <ul style={listStyle}>
              <li>Directly from you — when you contact us through our Website enquiry form, email, telephone, or in person; when you engage our legal services; when you attend a consultation; or when you provide documents or information in connection with your matter;</li>
              <li>Through your use of our Website — when you browse our Website, we may collect technical and usage data automatically through cookies and analytics tools;</li>
              <li>From third parties — where relevant to your matter, we may receive information about you from third parties such as the Department of Home Affairs, courts and tribunals, other legal practitioners, interpreters, or other professionals involved in your matter. We may also receive information from referral sources;</li>
              <li>From publicly available sources — we may collect information that is publicly available, such as court records, tribunal decisions, or professional registers, where relevant to your matter or to conduct required conflict checks.</li>
            </ul>
            <p>Where you provide us with personal information about another person (for example, a spouse, child, or employer), we ask that you inform that person that you are sharing their information with us and direct them to this Privacy Policy.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>4. Why We Collect, Hold, Use, and Disclose Personal Information</h2>
            <p>We collect and use personal information for the following purposes:</p>
            <ul style={listStyle}>
              <li>To respond to your enquiries and assess your legal needs;</li>
              <li>To provide legal services to you, including advice, representation, and document preparation;</li>
              <li>To comply with our professional obligations as a law practice, including conflict checks and identity verification;</li>
              <li>To manage our client relationship with you, including maintaining accurate records and communicating with you about your matter;</li>
              <li>To process payments and manage our billing and invoicing obligations;</li>
              <li>To comply with our legal and regulatory obligations, including obligations under the Legal Profession Uniform Law, migration legislation, family law legislation, and anti-money laundering laws;</li>
              <li>To operate and improve our Website, including analysing usage patterns and resolving technical issues;</li>
              <li>To send you information about our services, legal updates, or other communications that may be of interest to you — where you have consented to receive such communications or where we are otherwise permitted to do so;</li>
              <li>To refer you to other professionals or services where appropriate to your matter.</li>
            </ul>
            <p>We will not use your personal information for a purpose that is materially different from the purposes listed above without your consent, unless we are required or permitted to do so by law.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>5. Disclosure of Personal Information to Third Parties</h2>
            <p>In the course of providing legal services and operating our business, we may disclose your personal information to the following categories of third parties:</p>
            <ul style={listStyle}>
              <li>Government bodies and regulators — including the Department of Home Affairs, the Administrative Review Tribunal (ART), courts and tribunals, and other government agencies — where disclosure is required in connection with your legal matter or compelled by law;</li>
              <li>Other legal professionals — including barristers, interpreters, migration agents, and other solicitors — where we engage them to assist with your matter or as part of our professional obligations;</li>
              <li>IT and cloud service providers — including providers of practice management software, document storage, email hosting, and website platforms — who process data on our behalf under confidentiality obligations;</li>
              <li>Payment processors — who handle payment transactions securely on our behalf;</li>
              <li>Analytics providers — including services such as Google Analytics — that help us understand how our Website is used;</li>
              <li>Professional advisors — including our accountants, insurers, and legal advisors — in the ordinary course of managing our practice.</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes. As a law practice, we are bound by strict duties of confidentiality. Any disclosure of your confidential information is made only in accordance with our professional obligations and the purposes described in this Privacy Policy.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>6. Overseas Disclosure</h2>
            <p>Where we engage overseas-based service providers — for example, cloud storage or software platforms with servers located outside Australia — your personal information may be stored or processed in a country other than Australia.</p>
            <p>We take reasonable steps to ensure that any overseas recipients of your personal information handle it in a manner consistent with the Australian Privacy Principles. Where we disclose your personal information overseas, we do so in compliance with Australian Privacy Principle 8 (cross-border disclosure of personal information).</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>7. How We Store and Protect Your Personal Information</h2>
            <p>We implement a range of physical, technical, and administrative safeguards to protect your personal information from unauthorised access, disclosure, modification, loss, or destruction. These measures include:</p>
            <ul style={listStyle}>
              <li>Password-protected and access-controlled systems for storing client files and records;</li>
              <li>Encrypted storage and secure transmission protocols (SSL/TLS) for sensitive information;</li>
              <li>Limiting access to personal information to staff and contractors who need it to perform their duties;</li>
              <li>Maintaining confidentiality obligations with all staff and third-party service providers.</li>
            </ul>
            <p>Despite our efforts, no method of transmission over the internet or method of electronic storage is completely secure. We cannot guarantee the absolute security of information transmitted to us electronically. Any transmission is at your own risk.</p>
            <p>We retain personal information only for as long as it is necessary for the purposes for which it was collected, or as required by law or our professional obligations. In accordance with the Legal Profession Uniform Law and relevant regulatory requirements, client files are generally retained for a minimum of seven years after the conclusion of a matter.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>8. Your Rights in Relation to Your Personal Information</h2>
            <p><strong>Access:</strong> You have the right to request access to the personal information we hold about you. To make an access request, please contact us. We will respond to your request within a reasonable period. We may charge a reasonable administrative fee for providing access in some circumstances.</p>
            <p>In some situations, we may not be able to provide access — for example, where access would reveal confidential communications protected by legal professional privilege, or where disclosure is restricted by law. If we are unable to provide access, we will explain why.</p>
            <p><strong>Correction:</strong> If you believe that the personal information we hold about you is inaccurate, incomplete, out of date, or misleading, you may request that we correct it. We will take reasonable steps to correct the information promptly. Where we are unable to make a correction, we will explain our reasons.</p>
            <p><strong>Complaints:</strong> If you have a concern about the way we have handled your personal information, please contact us in the first instance. We will acknowledge your complaint promptly and aim to investigate and respond within 30 days. If you are not satisfied with our response, you may make a complaint to the Office of the Australian Information Commissioner (OAIC).</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>9. Cookies and Website Analytics</h2>
            <p>We use cookies and similar technologies on our Website. Cookies allow the Website to recognise your device on subsequent visits, remember your preferences, and collect information about how you use the Website.</p>
            <p>You can control or disable cookies through your browser settings. Please note that disabling some cookies may affect the functionality of the Website.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>10. Links to Other Websites</h2>
            <p>Our Website may contain links to websites operated by third parties. We are not responsible for the privacy practices, content, or security of those websites. This Privacy Policy applies only to our Website and our practices.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>11. Children's Privacy</h2>
            <p>Our Website is not directed at children under the age of 18. We do not knowingly collect personal information from children.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>12. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, changes in the law, or for other operational or regulatory reasons. The updated policy will be published on this Website with a revised 'last updated' date.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>13. How to Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, wish to access or correct your personal information, or want to make a privacy complaint, please contact us at:</p>
            <p style={{ fontWeight: 600, color: '#ffffff', margin: '8px 0 0 0' }}>Yantra Legal</p>
            <p style={{ margin: '4px 0' }}>ABN: 36 810 705 966</p>
            <p style={{ margin: '4px 0' }}>Address: Sydney NSW 2000</p>
            <p style={{ margin: '4px 0' }}>Email: info@yantralegal.com.au</p>
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
};
