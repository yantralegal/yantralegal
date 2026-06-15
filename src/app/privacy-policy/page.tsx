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
            Yantra Legal Pty Ltd trading as Yantra Legal &nbsp;•&nbsp; www.yantralegal.com.au &nbsp;•&nbsp; Last updated: 12 June 2026
          </p>

          <p style={{ marginBottom: '24px' }}>
            This is the Privacy Policy of Yantra Legal Pty Ltd (ABN 33 698 723 858) trading as Yantra Legal (&ldquo;we&rdquo;, &ldquo;us&rdquo; and when relating to us, &ldquo;our&rdquo;). We are committed to protecting the privacy of our contacts, customers, suppliers and employees (&ldquo;you&rdquo; and when relating to you, &ldquo;your&rdquo;) and complying with the Australian Privacy Principles set out in the Privacy Act 1988 (Cth) (Privacy Act). In this policy we describe how we manage your personal information.
          </p>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>1. The kinds of personal information we collect</h2>
            <p style={{ marginBottom: '12px' }}>The kinds of personal information that we collect include:</p>
            <ul style={listStyle}>
              <li>contact details such as name, role or position, address, email address, mobile number, landline number and fax number;</li>
              <li>information relating to your circumstances and affairs relevant to the matter/s in which we are instructed;</li>
              <li>information about your legal interests and requirements and the legal services that you may wish to purchase;</li>
              <li>information regarding our communications with you and your attendance at seminars and promotional events held by us;</li>
              <li>if you are an employee or prospective employee, information about your qualifications, skills and work experience;</li>
              <li>if you are a supplier or prospective supplier, information about your business skills, services, products and prices;</li>
              <li>technical and usage information collected when you visit our website, including your IP address, browser type and pages viewed, and information collected through cookies and analytics services (such as Google Analytics).</li>
            </ul>
            <p>
              In the course of providing legal services — particularly in migration and family law matters — we may also collect sensitive information as defined in the Privacy Act. This may include information about your racial or ethnic origin, religion, health, family circumstances, immigration history and criminal history. We collect sensitive information only where it is reasonably necessary for the provision of our legal services and, where required by law, with your consent.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>2. How we collect personal information</h2>
            <p style={{ marginBottom: '12px' }}>We collect personal information by various means including when:</p>
            <ul style={listStyle}>
              <li>you contact us with a question or inquiry;</li>
              <li>you subscribe to our newsletter or legal updates service;</li>
              <li>you attend a seminar or event where we are hosting or presenting;</li>
              <li>you instruct us to act for you and we open a file and conduct a conflict check;</li>
              <li>our clients provide information relating to related and adverse parties relevant to the advice or services we are providing;</li>
              <li>we undertake a search or investigation;</li>
              <li>you visit our website.</li>
            </ul>
            <p style={{ marginBottom: '12px' }}>
              Where practicable we collect personal information about you directly from you. However, we may have collected information about you from a third party such as a client, a third party information provider, the courts or a person responding to our questions or inquiries.
            </p>
            <p style={{ marginBottom: '12px' }}>
              We are required to collect the full name and address of our clients by the Solicitors&rsquo; Conduct Rules made under the Legal Profession Uniform Law (NSW). Accurate name and address information must also be collected in order to comply with the trust account record keeping requirements in the Legal Profession Uniform General Rules 2015 (NSW) and to comply with our duty to the courts.
            </p>
            <p style={{ marginBottom: '12px' }}>
              If you are a client and do not provide us with name and address information we cannot act for you.
            </p>
            <p>
              If you do not provide us with accurate personal information we may not be able to carry out our instructions or achieve the purpose for which the information has been sought.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>3. The purposes for which we collect, hold, use and disclose personal information</h2>
            <p style={{ marginBottom: '12px' }}>We collect, hold, use and disclose personal information in order to:</p>
            <ul style={listStyle}>
              <li>respond to your enquiries;</li>
              <li>provide legal services;</li>
              <li>employ competent and diligent personnel;</li>
              <li>monitor or improve the use of and satisfaction with our legal services; and</li>
              <li>let you know about legal developments, our expertise and legal services that may be of interest to you.</li>
            </ul>
            <p style={{ marginBottom: '12px' }}>We disclose personal information:</p>
            <ul style={listStyle}>
              <li>in order to carry out the instructions of our clients; and</li>
              <li>subject to our confidentiality obligations, when using services in support of our legal practice.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>4. The parties to whom your personal information is disclosed</h2>
            <p style={{ marginBottom: '12px' }}>Subject to our confidentiality obligations, we may share some relevant personal information with:</p>
            <ul style={listStyle}>
              <li>government bodies, courts and tribunals — including the Department of Home Affairs and the Administrative Review Tribunal (ART) — where disclosure is required in connection with your matter or compelled by law;</li>
              <li>barristers, interpreters and other professionals we engage to assist with your matter;</li>
              <li>parties related to a matter you have with us, government authorities and service providers as reasonably required to carry out your instructions;</li>
              <li>our e-mail marketing provider for the purposes of providing you our newsletter, invitations and legal updates; and</li>
              <li>third party service providers who assist us with archival, auditing, accounting, legal, business consulting, website or technology services.</li>
            </ul>
            <p style={{ marginBottom: '12px' }}>
              We also will disclose your information if required by law to do so or in circumstances permitted by the Privacy Act — for example, where we have reasonable grounds to suspect that unlawful activity, or misconduct of a serious nature, that relates to our functions or activities has been, is being or may be engaged in, or in response to a subpoena, discovery request or a court order.
            </p>
            <p>We do not sell, rent or trade your personal information to third parties for marketing purposes.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>5. Disclosure of information outside the jurisdiction of collection</h2>
            <p>
              Some of the third parties described above, including our IT, cloud, email and analytics service providers, may store or process personal information in countries outside Australia, including the United States. Where we disclose personal information to overseas recipients, we take reasonable steps to ensure it is handled in a manner consistent with the Australian Privacy Principles.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>6. Opting out of marketing communications</h2>
            <p>
              We may, from time to time, send you newsletters, invitations and legal updates about our services. You can opt out of receiving further such communications by notifying us using our contact details below or by clicking the &ldquo;unsubscribe&rdquo; option at the bottom of any marketing e-mail received from us.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>7. Security, retention and data breaches</h2>
            <p style={{ marginBottom: '12px' }}>
              We take reasonable physical, technical and administrative safeguards to protect your personal information from misuse, interference, loss, and unauthorised access, modification and disclosure. For example, we maintain our files in secure, access-controlled systems and limit access to personal information to individuals with a need to know.
            </p>
            <p style={{ marginBottom: '12px' }}>
              We retain personal information only for as long as it is necessary for the purposes for which it was collected, or as required by law and our professional obligations. In accordance with our obligations as a law practice, client files are generally retained for a minimum of seven years after the conclusion of a matter.
            </p>
            <p>
              In the event of a data breach involving personal information, we will assess the breach and, where required by the Notifiable Data Breaches scheme in Part IIIC of the Privacy Act, notify affected individuals and the Office of the Australian Information Commissioner.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>8. Access, correction and updating of personal information</h2>
            <p style={{ marginBottom: '12px' }}>
              You can contact us to access, correct or update your personal information. Unless we are subject to a confidentiality obligation or some other restriction on giving access to the information and we are permitted to refuse you access under the Privacy Act, we will endeavour to make your information available to you within 30 days. Examples of circumstances where we may refuse to give you access to your personal information include where:
            </p>
            <ul style={listStyle}>
              <li>giving access would be unlawful;</li>
              <li>we reasonably believe that giving you access would pose a serious threat to the life, health or safety of any individual or to public health or public safety;</li>
              <li>giving access would have an unreasonable impact on the privacy of others;</li>
              <li>the information could reveal the intentions of a party in negotiations;</li>
              <li>giving access could prejudice the taking of appropriate action in relation to unlawful activity;</li>
              <li>giving access could reveal evaluative information in a commercially sensitive decision making process.</li>
            </ul>
            <p style={{ marginBottom: '12px' }}>
              If you request to correct your personal information, we will correct, or, if we consider more appropriate, note your request for amendment of the information on your record.
            </p>
            <p style={{ marginBottom: '12px' }}>
              We will not charge you to make a request to access your record but we may charge you to actually provide access depending on the costs associated with obtaining and providing the material.
            </p>
            <p>
              These actions can usually be taken by contacting us using the contact information in the &ldquo;Complaints / Contact us&rdquo; section below.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>9. Cookies, website analytics and links to other websites</h2>
            <p style={{ marginBottom: '12px' }}>
              Our website uses cookies and similar technologies, including analytics services such as Google Analytics, to recognise your device, remember your preferences and help us understand how the website is used. You can control or disable cookies through your browser settings; please note that disabling some cookies may affect the functionality of the website.
            </p>
            <p>
              Our website may contain links to websites operated by third parties. We are not responsible for the privacy practices, content or security of those websites. This policy applies only to our website and our practices.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>10. Children&rsquo;s information</h2>
            <p>
              Our website is not directed at children. However, in the course of providing legal services — for example, child visa applications or family law matters — we may collect personal information about children where it is relevant to a matter. We handle such information with particular care, in accordance with this policy and our professional obligations.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>11. Notification of changes</h2>
            <p>
              If we decide to change our Privacy Policy, we will post a copy of the revised policy on our website with a revised &ldquo;last updated&rdquo; date.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>12. Complaints / Contact us</h2>
            <p style={{ marginBottom: '12px' }}>
              If a breach of this Privacy Policy occurs, or if you wish to access or correct your personal information, a complaint or request may be made to us by sending it to:
            </p>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <p style={{ fontWeight: 600, color: '#ffffff', margin: '0 0 8px 0' }}>Yantra Legal Pty Ltd trading as Yantra Legal</p>
              <p style={{ margin: '4px 0' }}>GPO Box 1230, Sydney NSW 2001</p>
              <p style={{ margin: '4px 0' }}>Email: <a href="mailto:info@yantralegal.com.au" style={{ color: 'var(--clr-yellow)' }}>info@yantralegal.com.au</a></p>
              <p style={{ margin: '4px 0' }}>Attention: Krishna Giri, Principal Solicitor</p>
              <p style={{ margin: '4px 0 0 0' }}>Phone: <a href="https://wa.me/61402402120" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr-yellow)' }}>0402 402 120 (WhatsApp)</a></p>
            </div>
            <p style={{ marginTop: '16px' }}>
              We will endeavour to respond to any complaint within 30 days. If you are not satisfied with our response to your complaint you may seek a review by contacting the Office of the Australian Information Commissioner using the information available at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr-yellow)', textDecoration: 'underline' }}>www.oaic.gov.au/privacy/privacy-complaints</a>.
            </p>
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
