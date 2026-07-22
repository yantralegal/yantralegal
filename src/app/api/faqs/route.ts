import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

const DEFAULT_FAQS = [
  {
    id: 'migration-general',
    category: 'CATEGORY 1 — MIGRATION: GENERAL',
    shortName: 'Migration: General',
    items: [
      {
        q: 'Do I need a lawyer to apply for a visa?',
        a: 'You are not legally required to use a lawyer or registered migration agent to lodge a visa application. However, migration law is complex and the consequences of errors can be serious — including refusal, cancellation, or bars on future applications. Many clients who come to us have already made an application on their own and received a refusal. Professional advice at the outset is nearly always more cost-effective than remedial assistance later.'
      },
      {
        q: 'What is the difference between a registered migration agent and a solicitor?',
        a: `**Notice:** Krishna Giri is an Australian legal practitioner only. He is not a registered migration agent and does not hold MARA registration.

A registered migration agent (RMA) is registered with the Migration Agents Registration Authority (MARA) and is authorised to give migration advice. A solicitor is admitted to the legal profession and, as an Australian legal practitioner, can provide migration legal advice and assistance under the exemption that applies under section 280 of the Migration Act 1958 — without needing to hold MARA registration.

Krishna Giri is an admitted solicitor in New South Wales (Practitioner Number 5514004) and provides migration advice as part of his legal practice. He is not a registered migration agent. As a solicitor, he can advise on visa applications, represent clients before the Administrative Review Tribunal (ART), and appear in judicial review proceedings — matters that fall outside the scope of what a migration agent is authorised to do.`
      },
      {
        q: 'How long does it take to process a visa?',
        a: 'Processing times vary significantly by visa subclass, caseload, and individual circumstances. They can range from a few weeks for some visitor visas to several years for some parent visas. We can advise you on current processing times for the visa you are applying for at the time of your consultation.'
      },
      {
        q: 'Can I work in Australia while my visa is being processed?',
        a: 'It depends on which visa you applied for and which bridging visa you currently hold. Some bridging visas carry work rights equivalent to the substantive visa applied for; others do not. We can advise you on your specific situation.'
      },
      {
        q: 'What is the Administrative Review Tribunal (ART)? I have heard of the AAT — are they the same?',
        a: 'The Administrative Review Tribunal (ART) replaced the Administrative Appeals Tribunal (AAT) on 14 October 2024. It performs the same core function — independent merits review of migration decisions made by the Department of Home Affairs — but operates under a new legislative framework with updated procedures. If you received a visa refusal or cancellation after 14 October 2024, your review application will be lodged with the ART. If your matter was already before the AAT before that date, it was transferred to the ART. Read our detailed guide: [ART Appeals Explained](/blog/art-appeals-explained).'
      },
      {
        q: 'Can you assist clients outside Sydney?',
        a: 'Yes. We assist clients across Australia. Consultations are available by phone or video call, and most matters can be managed remotely. Where attendance is required — for example, at a court or tribunal hearing — we will advise you on the arrangements. [Contact us](/contact) to discuss your situation.'
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
        a: 'No. De facto couples must generally have been in the relationship for at least 12 months before lodging a partner visa application. There are exceptions where the de facto relationship is registered under a relevant Australian state or territory law. If you are approaching the 12-month mark, it may be worth beginning to gather evidence of your relationship now so you are ready to apply.'
      },
      {
        q: 'My partner visa has been refused. What can I do?',
        a: 'In most cases, if your partner visa was refused by a delegate of the Minister, you have the right to apply for merits review at the Administrative Review Tribunal (ART). Strict time limits apply — act promptly. Contact us as soon as you receive the refusal decision.'
      },
      {
        q: 'What is the difference between the temporary and permanent partner visa?',
        a: 'The partner visa is a two-stage process. Stage one is the temporary visa — subclass 820 (onshore) or subclass 309 (offshore) — which is granted once your application has been assessed and you meet the initial criteria. Stage two is the permanent visa — subclass 801 (onshore) or subclass 100 (offshore) — which is generally granted after you and your sponsor have been in a genuine relationship for at least two years from the date the application was lodged. Both stages are applied for at the same time using a single application.'
      },
      {
        q: 'What evidence do I need to support a partner visa application?',
        a: 'The Department of Home Affairs assesses partner visa applications across four categories of evidence: financial aspects of the relationship (joint accounts, shared expenses); the nature of the household (living arrangements, shared responsibilities); social aspects (recognition of the relationship by family and friends, social activities together); and commitment (knowledge of each other, future plans). There is no fixed minimum — the Department considers the overall picture. Strong, consistent evidence across all four categories significantly reduces the risk of a refusal or request for further information. We can advise you on what is appropriate for your specific situation.'
      },
      {
        q: 'Can I apply for a partner visa if I am currently overseas?',
        a: 'Yes, but the visa subclass differs depending on where you are when you lodge the application. If you are in Australia on a valid visa, you apply for the onshore temporary partner visa (subclass 820). If you are outside Australia, you apply for the offshore temporary partner visa (subclass 309). It is important to lodge in the correct subclass — you cannot switch pathways after lodgement. If you are in Australia on a bridging visa at the time you wish to apply, your options may be more limited and you should seek legal advice before lodging.'
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
        a: 'SkillSelect is the online system managed by the Department of Home Affairs through which prospective skilled migrants submit an Expression of Interest (EOI). If an applicant\'s EOI score meets the invitation threshold in a particular invitation round, they receive an invitation to apply for the visa. Only invited applicants can then lodge a formal visa application.'
      },
      {
        q: 'What points score do I need for a skilled visa?',
        a: 'The minimum pass mark is 65 points. However, in practice, the scores required to receive an invitation are often significantly higher — particularly for the subclass 189 (Skilled Independent) visa. The actual cutoff score varies with each invitation round, depending on the volume and quality of EOIs in the pool.'
      },
      {
        q: 'What is a skills assessment and do I need one?',
        a: 'A skills assessment is a formal evaluation of your qualifications and work experience conducted by a designated assessing authority for your nominated occupation. For most skilled visa subclasses, a positive skills assessment from the relevant authority is a mandatory requirement before you can submit an Expression of Interest or lodge a visa application. The assessing authority, assessment criteria, and processing times vary by occupation. We can advise you on which authority applies to your occupation and what evidence you will need to prepare.'
      },
      {
        q: 'What is the difference between a subclass 189, 190, and 491 visa?',
        a: 'All three are points-tested skilled visas, but they differ in how you are invited and what conditions apply. The subclass 189 (Skilled Independent) visa does not require state or territory nomination or employer sponsorship — it is the most competitive and typically requires the highest points score to receive an invitation. The subclass 190 (Skilled Nominated) visa requires nomination by an Australian state or territory government, which adds points to your score and often makes an invitation more attainable. The subclass 491 (Skilled Work Regional) visa requires nomination by a state or territory government or sponsorship by an eligible family member, and requires you to live and work in a designated regional area for at least three years before you can apply for permanent residence through the subclass 191 visa.'
      },
      {
        q: 'How does state nomination work and how does it affect my application?',
        a: 'State and territory governments can nominate skilled migrants for the subclass 190 and 491 visas. Receiving state nomination adds 5 points (for subclass 190) or 15 points (for subclass 491) to your points score, which can make a significant difference to your chances of receiving an invitation. Each state and territory manages its own nomination program with its own occupation lists, eligibility criteria, and conditions. Some states require you to have a job offer, or to commit to living and working in that state for a period after the visa is granted. We can advise you on which state nomination programs may be relevant to your occupation and circumstances.'
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
        a: 'The subclass 482 (Temporary Skill Shortage) visa is a temporary employer-sponsored visa that allows an approved sponsor to employ a skilled overseas worker for up to two or four years, depending on the stream. The subclass 186 (Employer Nomination Scheme) visa is a permanent employer-sponsored visa. To be nominated for a subclass 186 visa, most applicants must have worked for their sponsoring employer in the nominated occupation for at least two years (under the Temporary Residence Transition stream) or obtain a positive skills assessment (under the Direct Entry stream). The subclass 482 is often used as a pathway to permanent residence through the subclass 186.'
      },
      {
        q: 'Can a small business sponsor an overseas worker?',
        a: 'Yes, provided the business meets the sponsorship requirements set by the Department of Home Affairs. To become an approved sponsor, a business must demonstrate that it is lawfully operating, has a genuine need for the nominated position, and can meet its obligations as a sponsor — including paying the market salary rate and not recovering certain costs from the sponsored worker. Business size alone does not disqualify an employer from sponsoring, but the Department will scrutinise whether the business has a legitimate and sustained need for the role.'
      },
      {
        q: 'What are the obligations of an approved sponsor?',
        a: 'Approved sponsors have a range of legal obligations, including: paying the sponsored worker at least the market salary rate for their occupation and location; not recovering certain costs (such as the Skilling Australians Fund levy) from the worker; cooperating with any Department inspection; and notifying the Department of certain events, such as if the sponsored worker ceases employment. Failure to meet sponsor obligations can result in sanctions, cancellation of approval, and bars on future sponsorship. We advise both employers and sponsored workers on these obligations.'
      },
      {
        q: 'Can I change employers if I am on a subclass 482 visa?',
        a: 'Generally, yes — but your visa is tied to your sponsoring employer, so you cannot simply begin working for a new employer without first arranging a new sponsorship. To change employers, your new employer must become an approved sponsor, nominate you for the position, and you will need to lodge a new subclass 482 visa application. You may be able to commence working for the new employer once the nomination and visa application have been lodged, depending on your circumstances. Bridging visa conditions will apply in the interim. We can advise you on the steps involved.'
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
        a: 'A Notice of Intention to Cancel (NOIC) — sometimes called a natural justice letter — is a formal notice from the Department of Home Affairs advising you that it is considering cancelling your visa and giving you the opportunity to respond before a decision is made. You must take this notice seriously. The Department is required to give you an opportunity to respond before cancelling in most circumstances, but the timeframes are often short — sometimes as little as a few days. You should seek legal advice as soon as you receive a NOIC. The response you provide can significantly affect whether your visa is cancelled.'
      },
      {
        q: 'My visa has been cancelled. What are my options?',
        a: 'If your visa has been cancelled, your options depend on how and why the cancellation occurred. In many cases, you have the right to seek merits review at the Administrative Review Tribunal (ART) — but strict time limits apply, sometimes as short as nine days if you are held in immigration detention. Other options may include applying for a new visa, seeking ministerial intervention, or in appropriate cases, applying for judicial review in the Federal Court. It is critical to seek legal advice immediately after a visa cancellation, as missing a review deadline can leave you with no pathway to challenge the decision.'
      },
      {
        q: 'How long do I have to appeal a visa refusal or cancellation?',
        a: 'Time limits vary depending on the type of decision, the visa subclass, and your individual circumstances. Some review applications must be lodged within as little as nine days (for persons in immigration detention) or 21 days. Others allow up to 70 days. Missing the deadline means you lose the right to seek merits review at the ART. Contact us as soon as you receive a refusal or cancellation decision — do not wait.'
      },
      {
        q: 'What is the difference between merits review and judicial review?',
        a: 'Merits review is a fresh hearing of your case before an independent tribunal — the Administrative Review Tribunal (ART) — which can substitute its own decision for the original Department decision. The ART can consider all the facts and circumstances, including new evidence, and is not limited to reviewing whether the original decision was legally correct. Judicial review is a review by the Federal Circuit and Family Court or the Federal Court of Australia, which examines whether the decision-maker made a legal error — it does not reconsider the merits of the case. Judicial review is generally a last resort after merits review has been exhausted, and the legal test is more technical and difficult to meet. We advise on both pathways.'
      },
      {
        q: 'Can I remain in Australia while my ART appeal is being considered?',
        a: 'In most cases, lodging a valid review application with the ART before the visa expires will result in the grant of a Bridging Visa A (BVA), which allows you to remain lawfully in Australia while the review is pending. The work and travel conditions on a bridging visa depend on your circumstances. Note that bridging visa conditions may restrict your ability to travel outside Australia — departing without the right to return can result in the bridging visa ceasing. We can advise you on your specific bridging visa conditions.'
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
        a: 'Once a divorce application has been filed, the court generally takes around four months to process the matter and make the divorce order. The divorce takes effect one month and one day after the order is made, at which point both parties are free to remarry.'
      },
      {
        q: 'Does my spouse have to consent to the divorce?',
        a: 'No. Australia\'s divorce system is based on no-fault irretrievable breakdown. If the parties have been separated for 12 months, either party can apply for a divorce without the other\'s consent. The other party will need to be served with the application and has the right to respond, but they cannot prevent the divorce from being granted if the separation period has been established.'
      },
      {
        q: 'What is the difference between divorce and property settlement?',
        a: 'Divorce is the legal dissolution of the marriage. It does not deal with property, finances, or parenting arrangements — those are dealt with in separate proceedings under the Family Law Act 1975. Importantly, applying for property orders must generally be done within 12 months of the divorce order being made. Missing this deadline can result in losing the right to seek property orders.'
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
        a: 'If both parties agree to the separation and file for a divorce by mutual consent, the process in Nepal is highly efficient and can typically be finalized within 2 to 3 weeks, depending on court availability and personal circumstances. However, if the divorce is contested (one-sided), Nepalese law generally mandates a one-year reconciliation period before the court will grant a final decree. Please contact us to discuss your specific situation so we can provide tailored advice based on your circumstances.'
      },
      {
        q: 'I am considering getting married. What are the advantages of getting married in Nepal?',
        a: `Getting married in Nepal offers several practical advantages for couples with connections to Nepal or South Asia. Importantly, a marriage registered in Nepal is recognized in Australia as a legally valid marriage under the Marriage Act 1961, provided it was valid under Nepali law at the time it was celebrated. In most cases, a certified English translation of the Nepali marriage certificate is sufficient for Australian legal purposes, including visa and immigration applications.

**Important Procedural Note:** If you are an Australian citizen, Permanent Resident, or foreign national, Nepali law requires you to establish at least 15 days of continuous physical residence in Nepal before you can file a Court Marriage application at the District Court. Because processing takes additional time after filing, you should plan for a total stay of approximately 3 weeks (20 to 22 days) in Nepal to complete the legal process.`
      },
      {
        q: 'Can Yantra Legal assist with divorce proceedings in Nepal?',
        a: 'Yes. Krishna Giri is an admitted Advocate before the Nepal Bar Council in addition to being an Australian solicitor. We can provide advice on divorce matters involving Nepal — including where the marriage took place in Nepal, where one or both parties have connections to Nepal, or where Nepali law is relevant to the proceedings. Contact us to discuss your specific circumstances.'
      },
      {
        q: 'I was married in Nepal but I live in Australia. Where do I get divorced?',
        a: 'You can apply for divorce in Australia regardless of where your marriage took place. Under the Family Law Act 1975, the Australian court has jurisdiction if either party is an Australian citizen, is domiciled in Australia, or has been ordinarily resident in Australia for at least 12 months immediately before filing the application. Being married in Nepal does not prevent you from divorcing in Australia, provided you meet one of these requirements.'
      },
      {
        q: 'Will an Australian divorce be recognised in Nepal?',
        a: 'Nepal generally recognises foreign divorces, but recognition is not automatic and may depend on the circumstances in which the divorce was obtained. In some cases, formal steps may be required in Nepal to give effect to an Australian divorce order — for example, for the purposes of updating civil records or remarrying in Nepal. We can advise you on what steps may be required for your specific situation.'
      },
      {
        q: 'Will a Nepali divorce be recognised in Australia?',
        a: 'Under Australian law, a divorce granted in a foreign country is generally recognised in Australia if it was validly obtained under the laws of that country and at least one party was habitually resident in, domiciled in, or a national of that country at the time. A divorce properly granted in Nepal would therefore generally be recognised in Australia. However, if there are concerns about how the divorce was obtained — for example, if proper procedures were not followed or one party was not given proper notice — recognition may be at issue. We can advise you on your specific circumstances.'
      },
      {
        q: 'My spouse is in Nepal and I am in Australia. Can I still apply for divorce?',
        a: 'Yes, provided you meet the jurisdictional requirements under the Family Law Act 1975. Where your spouse is overseas, the application will need to be served on them in Nepal in accordance with international service procedures, which typically involves serving through diplomatic or official channels and can take additional time. We can assist with the procedural steps involved in serving overseas respondents.'
      },
      {
        q: 'What documents do I need from Nepal to proceed with a divorce matter in Australia?',
        a: 'You will generally need your original marriage certificate or a certified copy. If the certificate is in Nepali, a certified English translation will be required. If your marriage was registered with the relevant government authority in Nepal, obtaining an official certified copy through the appropriate Nepali government office is recommended. Additional documents may be required depending on your circumstances. We can advise you on what is needed for your specific situation.'
      },
      {
        q: 'Can I remarry in Australia after a divorce granted in Nepal?',
        a: 'Yes, provided the divorce granted in Nepal is legally recognized in Australia. Under Australian family law, a foreign divorce is generally recognized if it was validly obtained under the laws of that country, and at least one party had a real connection to that country (such as citizenship, domicile, or habitual residence) at the time. Once the Nepali divorce is officially recognized, you are legally free to remarry in Australia. You will need to provide your finalized Nepali divorce decree (along with a certified English translation) to your marriage celebrant when lodging your Notice of Intended Marriage (NOIM).'
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
        a: 'We offer fixed-fee initial consultations. Contact us to confirm the current fee. There are no hidden charges — we will provide a clear written estimate of costs before commencing any substantive work.'
      },
      {
        q: 'Do you offer interpreting services?',
        a: `We advise clients in English, Nepali, and Hindi. If you require an interpreter for another language, we can arrange a professional interpreter for your consultation — please let us know in advance so we can make the necessary arrangements.

**Note:** There may be an additional cost for interpreter services, which we will confirm with you beforehand.`
      }
    ]
  }
];

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const count = await db.collection('faqs').countDocuments();
    
    if (count === 0) {
      // Seed default faqs
      await db.collection('faqs').insertMany(DEFAULT_FAQS);
    }
    
    const faqs = await db.collection('faqs').find({}).toArray();
    const cleanFaqs = faqs.map((faq: any) => {
      const { _id, ...rest } = faq;
      return rest;
    });

    return Response.json({ faqs: cleanFaqs });
  } catch (error: any) {
    console.error('Public faqs GET error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
