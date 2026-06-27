'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Icon } from '@iconify/react';

// Design system colors & properties
const layoutStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#061912',
  backgroundImage: 'radial-gradient(circle at 50% 30%, #104230 0%, #061e16 60%, #04120d 100%)',
  color: '#ffffff',
};

const mainContentStyle: React.CSSProperties = {
  flex: 1,
};

const headerSectionStyle: React.CSSProperties = {
  padding: '160px 0 40px 0',
  textAlign: 'center',
  position: 'relative',
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

const faqLayoutContainer: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '280px 1fr',
  gap: '40px',
  alignItems: 'start',
  paddingBottom: '100px',
};

const stickySidebarStyle: React.CSSProperties = {
  position: 'sticky',
  top: '100px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  maxHeight: 'calc(100vh - 140px)',
  overflowY: 'auto',
  paddingRight: '10px',
};

const sidebarLinkStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  borderRadius: '12px',
  background: isActive ? 'rgba(223, 173, 62, 0.12)' : 'rgba(255, 255, 255, 0.02)',
  border: isActive ? '1px solid rgba(223, 173, 62, 0.35)' : '1px solid rgba(255, 255, 255, 0.05)',
  color: isActive ? 'var(--clr-yellow)' : 'var(--clr-text-muted)',
  fontSize: '0.88rem',
  fontWeight: isActive ? 600 : 500,
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
});

const searchContainerStyle: React.CSSProperties = {
  position: 'relative',
  marginBottom: '32px',
  width: '100%',
};

const searchInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px 20px 16px 52px',
  borderRadius: '16px',
  background: 'rgba(11, 43, 32, 0.45)',
  border: '1px solid rgba(223, 173, 62, 0.25)',
  color: '#ffffff',
  fontSize: '1.05rem',
  outline: 'none',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
};

const searchIconStyle: React.CSSProperties = {
  position: 'absolute',
  left: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'var(--clr-yellow)',
  fontSize: '1.35rem',
};

const highlightedDisclaimerStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: 'rgba(11, 43, 32, 0.6)',
  border: '2px solid var(--clr-yellow)',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
  marginBottom: '32px',
};

const categoryHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.6rem',
  fontWeight: 500,
  color: 'var(--clr-yellow)',
  marginBottom: '20px',
  marginTop: '40px',
  borderBottom: '1px solid rgba(223, 173, 62, 0.2)',
  paddingBottom: '8px',
  scrollMarginTop: '100px', // Prevents title from being cut off by sticky navbar
};

// Premium glassmorphic FAQ Card styles
const faqCardStyle = (isOpen: boolean): React.CSSProperties => ({
  background: isOpen ? 'rgba(16, 66, 48, 0.35)' : 'rgba(11, 43, 32, 0.25)',
  border: isOpen ? '1px solid rgba(223, 173, 62, 0.45)' : '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  padding: '24px 28px',
  marginBottom: '16px',
  cursor: 'pointer',
  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
  boxShadow: isOpen ? '0 8px 32px rgba(0, 0, 0, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
});

const faqQuestionStyle = (isOpen: boolean): React.CSSProperties => ({
  fontSize: '1.08rem',
  fontWeight: 600,
  color: isOpen ? 'var(--clr-yellow)' : '#ffffff',
  margin: 0,
  transition: 'color 0.3s ease',
  lineHeight: 1.4,
});

const faqChevronBtnStyle = (isOpen: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  background: isOpen ? 'var(--clr-yellow)' : 'rgba(255, 255, 255, 0.03)',
  border: isOpen ? '1px solid var(--clr-yellow)' : '1px solid rgba(255, 255, 255, 0.12)',
  color: isOpen ? '#061912' : 'var(--clr-yellow)',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  flexShrink: 0,
});

const faqAnswerStyle: React.CSSProperties = {
  fontSize: '0.92rem',
  lineHeight: '1.75',
  color: 'var(--clr-text-muted)',
  paddingTop: '16px',
  margin: 0,
};

const warningNoticeStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '0.82rem',
  lineHeight: '1.5',
  color: '#f8d7da',
  backgroundColor: 'rgba(120, 20, 30, 0.25)',
  border: '1px solid rgba(245, 198, 203, 0.3)',
  borderRadius: '8px',
};

const infoNoticeStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '0.82rem',
  lineHeight: '1.5',
  color: '#dfad3e',
  backgroundColor: 'rgba(223, 173, 62, 0.08)',
  border: '1px solid rgba(223, 173, 62, 0.2)',
  borderRadius: '8px',
};

const faqLinkStyle: React.CSSProperties = {
  color: 'var(--clr-yellow)',
  textDecoration: 'underline',
  fontWeight: 600,
};

const categoryGroupStyle: React.CSSProperties = {
  marginBottom: '40px',
};

const ctaSectionStyle: React.CSSProperties = {
  padding: '80px 0 100px 0',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  background: 'linear-gradient(180deg, #061912 0%, #04120d 100%)',
};

const ctaTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
  fontWeight: 400,
  color: '#ffffff',
  marginBottom: '16px',
};

const ctaDescStyle: React.CSSProperties = {
  fontSize: '1rem',
  lineHeight: '1.65',
  color: 'var(--clr-text-muted)',
  marginBottom: '32px',
  maxWidth: '620px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const ctaButtonGroupStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
};

// Data Structures
interface FAQItem {
  q: string;
  a: React.ReactNode;
}

interface FAQCategory {
  id: string;
  category: string;
  shortName: string;
  items: FAQItem[];
}

const faqsData: FAQCategory[] = [
  {
    id: 'migration-general',
    category: 'CATEGORY 1 — MIGRATION: GENERAL',
    shortName: 'Migration: General',
    items: [
      {
        q: 'Do I need a lawyer to apply for a visa?',
        a: (
          <span>
            You are not legally required to use a lawyer or registered migration agent to lodge a visa application. However, migration law is complex and the consequences of errors can be serious — including refusal, cancellation, or bars on future applications. Many clients who come to us have already made an application on their own and received a refusal. Professional advice at the outset is nearly always more cost-effective than remedial assistance later.
          </span>
        )
      },
      {
        q: 'What is the difference between a registered migration agent and a solicitor?',
        a: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={warningNoticeStyle}>
              <strong>Notice:</strong> Krishna Giri is an Australian legal practitioner only. He is not a registered migration agent and does not hold MARA registration.
            </div>
            <p style={{ margin: 0 }}>
              A registered migration agent (RMA) is registered with the Migration Agents Registration Authority (MARA) and is authorised to give migration advice. A solicitor is admitted to the legal profession and, as an Australian legal practitioner, can provide migration legal advice and assistance under the exemption that applies under section 280 of the Migration Act 1958 — without needing to hold MARA registration.
            </p>
            <p style={{ margin: 0 }}>
              Krishna Giri is an admitted solicitor in New South Wales (Practitioner Number 5514004) and provides migration advice as part of his legal practice. He is not a registered migration agent. As a solicitor, he can advise on visa applications, represent clients before the Administrative Review Tribunal (ART), and appear in judicial review proceedings — matters that fall outside the scope of what a migration agent is authorised to do.
            </p>
          </div>
        )
      },
      {
        q: 'How long does it take to process a visa?',
        a: (
          <span>
            Processing times vary significantly by visa subclass, caseload, and individual circumstances. They can range from a few weeks for some visitor visas to several years for some parent visas. We can advise you on current processing times for the visa you are applying for at the time of your consultation.
          </span>
        )
      },
      {
        q: 'Can I work in Australia while my visa is being processed?',
        a: (
          <span>
            It depends on which visa you applied for and which bridging visa you currently hold. Some bridging visas carry work rights equivalent to the substantive visa applied for; others do not. We can advise you on your specific situation.
          </span>
        )
      },
      {
        q: 'What is the Administrative Review Tribunal (ART)? I have heard of the AAT — are they the same?',
        a: (
          <span>
            The Administrative Review Tribunal (ART) replaced the Administrative Appeals Tribunal (AAT) on 14 October 2024. It performs the same core function — independent merits review of migration decisions made by the Department of Home Affairs — but operates under a new legislative framework with updated procedures. If you received a visa refusal or cancellation after 14 October 2024, your review application will be lodged with the ART. If your matter was already before the AAT before that date, it was transferred to the ART. Read our detailed guide:{' '}
            <Link href="/blog/art-appeals-explained" style={faqLinkStyle}>
              ART Appeals Explained
            </Link>.
          </span>
        )
      },
      {
        q: 'Can you assist clients outside Sydney?',
        a: (
          <span>
            Yes. We assist clients across Australia. Consultations are available by phone or video call, and most matters can be managed remotely. Where attendance is required — for example, at a court or tribunal hearing — we will advise you on the arrangements. <Link href="/contact" style={faqLinkStyle}>Contact us</Link> to discuss your situation.
          </span>
        )
      }
    ]
  },
  {
    id: 'partner-visas',
    category: 'CATEGORY 2 — PARTNER VISAS',
    shortName: 'Partner Visas',
    items: [
      {
        q: 'We have been in a de facto relationship for eight months. Can we apply for a partner visa?',
        a: (
          <span>
            No. De facto couples must generally have been in the relationship for at least 12 months before lodging a partner visa application. There are exceptions where the de facto relationship is registered under a relevant Australian state or territory law. If you are approaching the 12-month mark, it may be worth beginning to gather evidence of your relationship now so you are ready to apply.
          </span>
        )
      },
      {
        q: 'My partner visa has been refused. What can I do?',
        a: (
          <span>
            In most cases, if your partner visa was refused by a delegate of the Minister, you have the right to apply for merits review at the Administrative Review Tribunal (ART). Strict time limits apply — act promptly. Contact us as soon as you receive the refusal decision.
          </span>
        )
      },
      {
        q: 'What is the difference between the temporary and permanent partner visa?',
        a: (
          <span>
            The partner visa is a two-stage process. Stage one is the temporary visa — subclass 820 (onshore) or subclass 309 (offshore) — which is granted once your application has been assessed and you meet the initial criteria. Stage two is the permanent visa — subclass 801 (onshore) or subclass 100 (offshore) — which is generally granted after you and your sponsor have been in a genuine relationship for at least two years from the date the application was lodged. Both stages are applied for at the same time using a single application.
          </span>
        )
      },
      {
        q: 'What evidence do I need to support a partner visa application?',
        a: (
          <span>
            The Department of Home Affairs assesses partner visa applications across four categories of evidence: financial aspects of the relationship (joint accounts, shared expenses); the nature of the household (living arrangements, shared responsibilities); social aspects (recognition of the relationship by family and friends, social activities together); and commitment (knowledge of each other, future plans). There is no fixed minimum — the Department considers the overall picture. Strong, consistent evidence across all four categories significantly reduces the risk of a refusal or request for further information. We can advise you on what is appropriate for your specific situation.
          </span>
        )
      },
      {
        q: 'Can I apply for a partner visa if I am currently overseas?',
        a: (
          <span>
            Yes, but the visa subclass differs depending on where you are when you lodge the application. If you are in Australia on a valid visa, you apply for the onshore temporary partner visa (subclass 820). If you are outside Australia, you apply for the offshore temporary partner visa (subclass 309). It is important to lodge in the correct subclass — you cannot switch pathways after lodgement. If you are in Australia on a bridging visa at the time you wish to apply, your options may be more limited and you should seek legal advice before lodging.
          </span>
        )
      }
    ]
  },
  {
    id: 'skilled-visas',
    category: 'CATEGORY 3 — SKILLED VISAS',
    shortName: 'Skilled Visas',
    items: [
      {
        q: 'What is SkillSelect?',
        a: (
          <span>
            SkillSelect is the online system managed by the Department of Home Affairs through which prospective skilled migrants submit an Expression of Interest (EOI). If an applicant's EOI score meets the invitation threshold in a particular invitation round, they receive an invitation to apply for the visa. Only invited applicants can then lodge a formal visa application.
          </span>
        )
      },
      {
        q: 'What points score do I need for a skilled visa?',
        a: (
          <span>
            The minimum pass mark is 65 points. However, in practice, the scores required to receive an invitation are often significantly higher — particularly for the subclass 189 (Skilled Independent) visa. The actual cutoff score varies with each invitation round, depending on the volume and quality of EOIs in the pool.
          </span>
        )
      },
      {
        q: 'What is a skills assessment and do I need one?',
        a: (
          <span>
            A skills assessment is a formal evaluation of your qualifications and work experience conducted by a designated assessing authority for your nominated occupation. For most skilled visa subclasses, a positive skills assessment from the relevant authority is a mandatory requirement before you can submit an Expression of Interest or lodge a visa application. The assessing authority, assessment criteria, and processing times vary by occupation. We can advise you on which authority applies to your occupation and what evidence you will need to prepare.
          </span>
        )
      },
      {
        q: 'What is the difference between a subclass 189, 190, and 491 visa?',
        a: (
          <span>
            All three are points-tested skilled visas, but they differ in how you are invited and what conditions apply. The subclass 189 (Skilled Independent) visa does not require state or territory nomination or employer sponsorship — it is the most competitive and typically requires the highest points score to receive an invitation. The subclass 190 (Skilled Nominated) visa requires nomination by an Australian state or territory government, which adds points to your score and often makes an invitation more attainable. The subclass 491 (Skilled Work Regional) visa requires nomination by a state or territory government or sponsorship by an eligible family member, and requires you to live and work in a designated regional area for at least three years before you can apply for permanent residence through the subclass 191 visa.
          </span>
        )
      },
      {
        q: 'How does state nomination work and how does it affect my application?',
        a: (
          <span>
            State and territory governments can nominate skilled migrants for the subclass 190 and 491 visas. Receiving state nomination adds 5 points (for subclass 190) or 15 points (for subclass 491) to your points score, which can make a significant difference to your chances of receiving an invitation. Each state and territory manages its own nomination program with its own occupation lists, eligibility criteria, and conditions. Some states require you to have a job offer, or to commit to living and working in that state for a period after the visa is granted. We can advise you on which state nomination programs may be relevant to your occupation and circumstances.
          </span>
        )
      }
    ]
  },
  {
    id: 'employer-sponsored',
    category: 'CATEGORY 4 — EMPLOYER SPONSORED VISAS',
    shortName: 'Employer Sponsored',
    items: [
      {
        q: 'What is the difference between a subclass 482 and a subclass 186 visa?',
        a: (
          <span>
            The subclass 482 (Temporary Skill Shortage) visa is a temporary employer-sponsored visa that allows an approved sponsor to employ a skilled overseas worker for up to two or four years, depending on the stream. The subclass 186 (Employer Nomination Scheme) visa is a permanent employer-sponsored visa. To be nominated for a subclass 186 visa, most applicants must have worked for their sponsoring employer in the nominated occupation for at least two years (under the Temporary Residence Transition stream) or obtain a positive skills assessment (under the Direct Entry stream). The subclass 482 is often used as a pathway to permanent residence through the subclass 186.
          </span>
        )
      },
      {
        q: 'Can a small business sponsor an overseas worker?',
        a: (
          <span>
            Yes, provided the business meets the sponsorship requirements set by the Department of Home Affairs. To become an approved sponsor, a business must demonstrate that it is lawfully operating, has a genuine need for the nominated position, and can meet its obligations as a sponsor — including paying the market salary rate and not recovering certain costs from the sponsored worker. Business size alone does not disqualify an employer from sponsoring, but the Department will scrutinise whether the business has a legitimate and sustained need for the role.
          </span>
        )
      },
      {
        q: 'What are the obligations of an approved sponsor?',
        a: (
          <span>
            Approved sponsors have a range of legal obligations, including: paying the sponsored worker at least the market salary rate for their occupation and location; not recovering certain costs (such as the Skilling Australians Fund levy) from the worker; cooperating with any Department inspection; and notifying the Department of certain events, such as if the sponsored worker ceases employment. Failure to meet sponsor obligations can result in sanctions, cancellation of approval, and bars on future sponsorship. We advise both employers and sponsored workers on these obligations.
          </span>
        )
      },
      {
        q: 'Can I change employers if I am on a subclass 482 visa?',
        a: (
          <span>
            Generally, yes — but your visa is tied to your sponsoring employer, so you cannot simply begin working for a new employer without first arranging a new sponsorship. To change employers, your new employer must become an approved sponsor, nominate you for the position, and you will need to lodge a new subclass 482 visa application. You may be able to commence working for the new employer once the nomination and visa application have been lodged, depending on your circumstances. Bridging visa conditions will apply in the interim. We can advise you on the steps involved.
          </span>
        )
      }
    ]
  },
  {
    id: 'refusals-cancellations',
    category: 'CATEGORY 5 — VISA REFUSALS & CANCELLATIONS',
    shortName: 'Refusals & Cancellations',
    items: [
      {
        q: 'I have received a Notice of Intention to Cancel my visa. What does this mean?',
        a: (
          <span>
            A Notice of Intention to Cancel (NOIC) — sometimes called a natural justice letter — is a formal notice from the Department of Home Affairs advising you that it is considering cancelling your visa and giving you the opportunity to respond before a decision is made. You must take this notice seriously. The Department is required to give you an opportunity to respond before cancelling in most circumstances, but the timeframes are often short — sometimes as little as a few days. You should seek legal advice as soon as you receive a NOIC. The response you provide can significantly affect whether your visa is cancelled.
          </span>
        )
      },
      {
        q: 'My visa has been cancelled. What are my options?',
        a: (
          <span>
            If your visa has been cancelled, your options depend on how and why the cancellation occurred. In many cases, you have the right to seek merits review at the Administrative Review Tribunal (ART) — but strict time limits apply, sometimes as short as nine days if you are held in immigration detention. Other options may include applying for a new visa, seeking ministerial intervention, or in appropriate cases, applying for judicial review in the Federal Court. It is critical to seek legal advice immediately after a visa cancellation, as missing a review deadline can leave you with no pathway to challenge the decision.
          </span>
        )
      },
      {
        q: 'How long do I have to appeal a visa refusal or cancellation?',
        a: (
          <span>
            Time limits vary depending on the type of decision, the visa subclass, and your individual circumstances. Some review applications must be lodged within as little as nine days (for persons in immigration detention) or 21 days. Others allow up to 70 days. Missing the deadline means you lose the right to seek merits review at the ART. Contact us as soon as you receive a refusal or cancellation decision — do not wait.
          </span>
        )
      },
      {
        q: 'What is the difference between merits review and judicial review?',
        a: (
          <span>
            Merits review is a fresh hearing of your case before an independent tribunal — the Administrative Review Tribunal (ART) — which can substitute its own decision for the original Department decision. The ART can consider all the facts and circumstances, including new evidence, and is not limited to reviewing whether the original decision was legally correct. Judicial review is a review by the Federal Circuit and Family Court or the Federal Court of Australia, which examines whether the decision-maker made a legal error — it does not reconsider the merits of the case. Judicial review is generally a last resort after merits review has been exhausted, and the legal test is more technical and difficult to meet. We advise on both pathways.
          </span>
        )
      },
      {
        q: 'Can I remain in Australia while my ART appeal is being considered?',
        a: (
          <span>
            In most cases, lodging a valid review application with the ART before the visa expires will result in the grant of a Bridging Visa A (BVA), which allows you to remain lawfully in Australia while the review is pending. The work and travel conditions on a bridging visa depend on your circumstances. Note that bridging visa conditions may restrict your ability to travel outside Australia — departing without the right to return can result in the bridging visa ceasing. We can advise you on your specific bridging visa conditions.
          </span>
        )
      }
    ]
  },
  {
    id: 'divorce',
    category: 'CATEGORY 6 — DIVORCE',
    shortName: 'Divorce',
    items: [
      {
        q: 'How long does it take to get a divorce in Australia?',
        a: (
          <span>
            Once a divorce application has been filed, the court generally takes around four months to process the matter and make the divorce order. The divorce takes effect one month and one day after the order is made, at which point both parties are free to remarry.
          </span>
        )
      },
      {
        q: 'Does my spouse have to consent to the divorce?',
        a: (
          <span>
            No. Australia's divorce system is based on no-fault irretrievable breakdown. If the parties have been separated for 12 months, either party can apply for a divorce without the other's consent. The other party will need to be served with the application and has the right to respond, but they cannot prevent the divorce from being granted if the separation period has been established.
          </span>
        )
      },
      {
        q: 'What is the difference between divorce and property settlement?',
        a: (
          <span>
            Divorce is the legal dissolution of the marriage. It does not deal with property, finances, or parenting arrangements — those are dealt with in separate proceedings under the Family Law Act 1975. Importantly, applying for property orders must generally be done within 12 months of the divorce order being made. Missing this deadline can result in losing the right to seek property orders.
          </span>
        )
      }
    ]
  },
  {
    id: 'nepal-family',
    category: 'CATEGORY 7 — MARRIAGE & DIVORCE IN NEPAL',
    shortName: 'Marriage & Divorce in Nepal',
    items: [
      {
        q: 'How long does it take a Nepalese couple living in Australia to get divorced in Nepal?',
        a: (
          <span>
            If both parties agree to the separation and file for a divorce by mutual consent, the process in Nepal is highly efficient and can typically be finalized within 2 to 3 weeks, depending on court availability and personal circumstances. However, if the divorce is contested (one-sided), Nepalese law generally mandates a one-year reconciliation period before the court will grant a final decree. Please contact us to discuss your specific situation so we can provide tailored advice based on your circumstances.
          </span>
        )
      },
      {
        q: 'I am considering getting married. What are the advantages of getting married in Nepal?',
        a: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: 0 }}>
              Getting married in Nepal offers several practical advantages for couples with connections to Nepal or South Asia. Importantly, a marriage registered in Nepal is recognized in Australia as a legally valid marriage under the Marriage Act 1961, provided it was valid under Nepali law at the time it was celebrated. In most cases, a certified English translation of the Nepali marriage certificate is sufficient for Australian legal purposes, including visa and immigration applications.
            </p>
            <div style={infoNoticeStyle}>
              <strong>Important Procedural Note:</strong> If you are an Australian citizen, Permanent Resident, or foreign national, Nepali law requires you to establish at least 15 days of continuous physical residence in Nepal before you can file a Court Marriage application at the District Court. Because processing takes additional time after filing, you should plan for a total stay of approximately 3 weeks (20 to 22 days) in Nepal to complete the legal process.
            </div>
          </div>
        )
      },
      {
        q: 'Can Yantra Legal assist with divorce proceedings in Nepal?',
        a: (
          <span>
            Yes. Krishna Giri is an admitted Advocate before the Nepal Bar Council in addition to being an Australian solicitor. We can provide advice on divorce matters involving Nepal — including where the marriage took place in Nepal, where one or both parties have connections to Nepal, or where Nepali law is relevant to the proceedings. Contact us to discuss your specific circumstances.
          </span>
        )
      },
      {
        q: 'I was married in Nepal but I live in Australia. Where do I get divorced?',
        a: (
          <span>
            You can apply for divorce in Australia regardless of where your marriage took place. Under the Family Law Act 1975, the Australian court has jurisdiction if either party is an Australian citizen, is domiciled in Australia, or has been ordinarily resident in Australia for at least 12 months immediately before filing the application. Being married in Nepal does not prevent you from divorcing in Australia, provided you meet one of these requirements.
          </span>
        )
      },
      {
        q: 'Will an Australian divorce be recognised in Nepal?',
        a: (
          <span>
            Nepal generally recognises foreign divorces, but recognition is not automatic and may depend on the circumstances in which the divorce was obtained. In some cases, formal steps may be required in Nepal to give effect to an Australian divorce order — for example, for the purposes of updating civil records or remarrying in Nepal. We can advise you on what steps may be required for your specific situation.
          </span>
        )
      },
      {
        q: 'Will a Nepali divorce be recognised in Australia?',
        a: (
          <span>
            Under Australian law, a divorce granted in a foreign country is generally recognised in Australia if it was validly obtained under the laws of that country and at least one party was habitually resident in, domiciled in, or a national of that country at the time. A divorce properly granted in Nepal would therefore generally be recognised in Australia. However, if there are concerns about how the divorce was obtained — for example, if proper procedures were not followed or one party was not given proper notice — recognition may be at issue. We can advise you on your specific circumstances.
          </span>
        )
      },
      {
        q: 'My spouse is in Nepal and I am in Australia. Can I still apply for divorce?',
        a: (
          <span>
            Yes, provided you meet the jurisdictional requirements under the Family Law Act 1975. Where your spouse is overseas, the application will need to be served on them in Nepal in accordance with international service procedures, which typically involves serving through diplomatic or official channels and can take additional time. We can assist with the procedural steps involved in serving overseas respondents.
          </span>
        )
      },
      {
        q: 'What documents do I need from Nepal to proceed with a divorce matter in Australia?',
        a: (
          <span>
            You will generally need your original marriage certificate or a certified copy. If the certificate is in Nepali, a certified English translation will be required. If your marriage was registered with the relevant government authority in Nepal, obtaining an official certified copy through the appropriate Nepali government office is recommended. Additional documents may be required depending on your circumstances. We can advise you on what is needed for your specific situation.
          </span>
        )
      },
      {
        q: 'Can I remarry in Australia after a divorce granted in Nepal?',
        a: (
          <span>
            Yes, provided the divorce granted in Nepal is legally recognized in Australia. Under Australian family law, a foreign divorce is generally recognized if it was validly obtained under the laws of that country, and at least one party had a real connection to that country (such as citizenship, domicile, or habitual residence) at the time. Once the Nepali divorce is officially recognized, you are legally free to remarry in Australia. You will need to provide your finalized Nepali divorce decree (along with a certified English translation) to your marriage celebrant when lodging your Notice of Intended Marriage (NOIM).
          </span>
        )
      }
    ]
  },
  {
    id: 'fees-process',
    category: 'CATEGORY 8 — FEES & PROCESS',
    shortName: 'Fees & Process',
    items: [
      {
        q: 'What does an initial consultation cost?',
        a: (
          <span>
            We offer fixed-fee initial consultations. Contact us to confirm the current fee. There are no hidden charges — we will provide a clear written estimate of costs before commencing any substantive work.
          </span>
        )
      },
      {
        q: 'Do you offer interpreting services?',
        a: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: 0 }}>
              We advise clients in English, Nepali, and Hindi. If you require an interpreter for another language, we can arrange a professional interpreter for your consultation — please let us know in advance so we can make the necessary arrangements.
            </p>
            <div style={infoNoticeStyle}>
              <strong>Note:</strong> There may be an additional cost for interpreter services, which we will confirm with you beforehand.
            </div>
          </div>
        )
      }
    ]
  }
];

export default function FAQsClient() {
  const [activeIndices, setActiveIndices] = useState<{ [key: string]: boolean }>({
    'migration-general-0': true, // Open first FAQ by default
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(false);

  // Monitor screen size for mobile navigation responsive shifts
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFAQ = (categoryKey: string, idx: number) => {
    const key = `${categoryKey}-${idx}`;
    setActiveIndices((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter FAQs based on active category selection and search query text
  const filteredData = useMemo(() => {
    return faqsData
      .map((cat) => {
        // First filter by category tab selector
        if (activeCategory !== 'all' && cat.id !== activeCategory) {
          return null;
        }

        // Then filter items by matching text queries (both in question and answer text values)
        const matchedItems = cat.items.filter((item) => {
          if (!searchQuery) return true;
          const query = searchQuery.toLowerCase();
          const qMatch = item.q.toLowerCase().includes(query);
          
          // Stringify ReactNode to support search within JSX answers
          let aText = '';
          if (typeof item.a === 'string') {
            aText = item.a;
          } else {
            // Flatten basic children elements if object
            const recursiveExtract = (node: any): string => {
              if (!node) return '';
              if (typeof node === 'string' || typeof node === 'number') return String(node);
              if (Array.isArray(node)) return node.map(recursiveExtract).join(' ');
              if (node.props && node.props.children) return recursiveExtract(node.props.children);
              return '';
            };
            aText = recursiveExtract(item.a);
          }
          const aMatch = aText.toLowerCase().includes(query);
          return qMatch || aMatch;
        });

        if (matchedItems.length === 0) return null;

        return {
          ...cat,
          items: matchedItems,
        };
      })
      .filter((cat): cat is FAQCategory => cat !== null);
  }, [activeCategory, searchQuery]);

  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        {/* Hero Header */}
        <section style={headerSectionStyle}>
          <div className="container">
            <span className="sec-pill">Common Questions</span>
            <h1 style={titleStyle}>
              Honest Answers, <span className="text-gradient-gold">Clear Guidance</span>
            </h1>
            <p style={subtitleStyle}>
              We believe informed clients make better decisions. Find straightforward answers to frequently asked questions below.
            </p>
          </div>
        </section>

        {/* Search input section */}
        <section style={{ padding: '20px 0 0 0' }}>
          <div className="container" style={{ maxWidth: '1200px' }}>
            <div style={searchContainerStyle}>
              <Icon icon="ri:search-line" style={searchIconStyle} />
              <input
                type="text"
                placeholder="Search for answers (e.g. partner visa, ART, fees, or divorce...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchInputStyle}
              />
            </div>
          </div>
        </section>

        {/* Dynamic Split Sidebar & Content layout */}
        <section style={{ padding: '10px 0 60px 0' }}>
          <div className="container" style={{ maxWidth: '1200px' }}>
            <div className="faq-main-wrapper" style={isMobile ? {} : faqLayoutContainer}>
              {/* Category Sticky Sidebar Navigation */}
              {!isMobile ? (
                <aside style={stickySidebarStyle}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '8px' }}>
                    Browse Categories
                  </div>
                  <button
                    onClick={() => setActiveCategory('all')}
                    style={sidebarLinkStyle(activeCategory === 'all')}
                  >
                    <span>All Categories</span>
                    <Icon icon="ri:arrow-right-s-line" />
                  </button>
                  {faqsData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      style={sidebarLinkStyle(activeCategory === cat.id)}
                    >
                      <span>{cat.shortName}</span>
                      <Icon icon="ri:arrow-right-s-line" />
                    </button>
                  ))}
                </aside>
              ) : (
                // Horizontal category filter bar on mobile
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px', whiteSpace: 'nowrap', maskImage: 'linear-gradient(to right, #000 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, #000 85%, transparent 100%)' }}>
                  <button
                    onClick={() => setActiveCategory('all')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.82rem',
                      background: activeCategory === 'all' ? 'var(--clr-yellow)' : 'rgba(255, 255, 255, 0.05)',
                      border: 'none',
                      color: activeCategory === 'all' ? '#061912' : '#ffffff',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    All
                  </button>
                  {faqsData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.82rem',
                        background: activeCategory === cat.id ? 'var(--clr-yellow)' : 'rgba(255, 255, 255, 0.05)',
                        border: 'none',
                        color: activeCategory === cat.id ? '#061912' : '#ffffff',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {cat.shortName}
                    </button>
                  ))}
                </div>
              )}

              {/* FAQs Listing Content */}
              <div style={{ width: '100%' }}>
                {/* Highlighted General Legal Disclaimer Section */}
                <div style={highlightedDisclaimerStyle}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <Icon icon="ri:alert-fill" style={{ fontSize: '1.8rem', color: 'var(--clr-yellow)', flexShrink: 0 }} />
                    <div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 'bold', color: 'var(--clr-yellow)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        IMPORTANT LEGAL DISCLAIMER
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.65', color: 'var(--clr-text-muted)' }}>
                        The answers provided on this page are for general informational purposes only and do not constitute formal legal or migration advice. Laws, visa regulations, and tribunal rules change rapidly. Domicile, health, or character variables can significantly affect your options. You should not act, or refrain from acting, based on any information here without first seeking professional legal advice tailored to your specific circumstances.
                      </p>
                    </div>
                  </div>
                </div>

                {filteredData.length > 0 ? (
                  filteredData.map((cat) => (
                    <div key={cat.id} id={cat.id} style={categoryGroupStyle}>
                      <h2 style={categoryHeaderStyle}>{cat.category}</h2>

                      <div className="faq-list">
                        {cat.items.map((item, idx) => {
                          const key = `${cat.id}-${idx}`;
                          const isOpen = !!activeIndices[key];

                          return (
                            <div
                              key={idx}
                              style={faqCardStyle(isOpen)}
                              onClick={() => toggleFAQ(cat.id, idx)}
                            >
                              <div className="faq-card-header" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                                <h3 style={faqQuestionStyle(isOpen)}>{item.q}</h3>
                                <button
                                  className="faq-chevron-btn"
                                  aria-expanded={isOpen}
                                  aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                                  style={faqChevronBtnStyle(isOpen)}
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                      transition: 'transform 0.3s ease',
                                    }}
                                  >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                  </svg>
                                </button>
                              </div>
                              <div
                                style={{
                                  maxHeight: isOpen ? '1200px' : '0px',
                                  overflow: 'hidden',
                                  transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                              >
                                <div style={faqAnswerStyle}>
                                  {item.a}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '60px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    <Icon icon="ri:information-line" style={{ fontSize: '2.5rem', color: 'rgba(255,255,255,0.25)', marginBottom: '12px' }} />
                    <p style={{ margin: 0, color: 'var(--clr-text-muted)' }}>No FAQs match your search query &quot;{searchQuery}&quot;</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Still Have Questions CTA Section */}
        <section style={ctaSectionStyle}>
          <div className="container" style={{ maxWidth: '720px', textAlign: 'center' }}>
            <span className="sec-pill" style={{ marginBottom: '16px' }}>Need More Help?</span>
            <h3 style={ctaTitleStyle}>Still have questions? Book a consultation.</h3>
            <p style={ctaDescStyle}>
              Discuss your case privately with an Australian solicitor. We provide fixed-fee initial consultations with absolute privacy, cost transparency, and strategic options.
            </p>
            <div style={ctaButtonGroupStyle}>
              <Link href="/contact" className="btn btn-yellow">
                <span>Book a Consultation</span>
                <span className="btn-arrow-circle">↗</span>
              </Link>
              <a href="https://wa.me/61402402120" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ borderColor: 'rgba(255, 255, 255, 0.25)', color: '#ffffff' }}>
                <span style={{ marginRight: '6px', color: '#25D366' }}>💬</span>
                <span>Speak with a Solicitor (WhatsApp)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
