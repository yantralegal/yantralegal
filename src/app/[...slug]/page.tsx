import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CollapsibleSections from '../../components/CollapsibleSections';
import { legalPages, LegalPage } from '../../data/legalContents';

type Params = Promise<{ slug: string[] }>;

export async function generateStaticParams() {
  // Generate static paths for all 20 pages in our legalContents
  return legalPages.map((page) => {
    // Remove the leading slash and split by '/'
    const slug = page.url.substring(1).split('/');
    return { slug };
  });
}

const metaDescriptions: Record<string, string> = {
  '/migration-law': 'Consult with a trusted Sydney migration solicitor. Practical legal advice on partner visas, skilled migration, sponsor compliance, and complex appeals.',
  '/migration-law/partner-visas': 'Apply for onshore (820/801) and offshore (309/100) partner visas or subclass 300 prospective marriage visas. Experienced legal help to prove a genuine relationship.',
  '/migration-law/employer-sponsored-visas': 'Expert legal guidance for standard business sponsorships, nominations, standard employer compliance, and subclass 482 Skills in Demand visa streams.',
  '/migration-law/skilled-visas': 'Navigate GSM subclasses 189, 190, and 491 with strategic advice on skills assessments, EOI preparation, and state/territory nomination pathways.',
  '/migration-law/protection-visas': 'Confidential legal representation for onshore protection visa (subclass 866) applications, statement of claims preparation, and ART review appeals.',
  '/migration-law/child-visas': 'Reunite your family in Australia. Experienced assistance with subclass 101 (offshore) and subclass 802 (onshore) child visa applications.',
  '/migration-law/parent-visas': 'Understand contributory (143/864) and non-contributory (103/804) parent visa queues, the balance of family test, and temporary subclass 870 options.',
  '/migration-law/visitor-visas': 'Get assistance for subclass 600 visitor visa applications, sponsor declarations, genuine temporary entrant requirements, and condition 8503 waivers.',
  '/migration-law/resident-return-visas': 'Maintain your entry rights to Australia. Help with subclass 155/157 resident return visas, demonstrating substantial ties, and compelling reasons.',
  '/migration-law/bridging-visas': 'Maintain lawful status in Australia. Practical advice on bridging visa A, B, C, or E conditions, work rights, and travel permissions.',
  '/migration-law/ministerial-intervention': 'Request the Minister to exercise personal discretionary powers. High-stakes strategic representations for compelling and compassionate cases.',
  '/family-law': 'Comprehensive advice on international family law and divorce applications in Australia and Nepal. Straightforward legal help from Advocate Krishna Giri.',
  '/family-law/divorce-in-australia': 'Navigate the Australian no-fault divorce system. Assistance with single or joint divorce applications, service issues, and court requirements.',
  '/family-law/divorce-in-nepal': 'Legal guidance on Nepalese divorce processes, power of attorney (अधिकृत वारेसनामा), registration, and recognition of overseas divorces.',
  '/appeals-and-reviews': 'If your visa has been refused or cancelled, explore your merits review options at the ART, judicial reviews in federal court, or ministerial requests.',
  '/appeals-and-reviews/visa-refusals': 'Act quickly after a visa refusal. Professional assessment of your refusal notice, review options, time limits, and merits appeal strategies.',
  '/appeals-and-reviews/visa-cancellations': 'Respond to Notices of Intention to Cancel (NOIC) or challenge active cancellations. Fast-turnaround legal support to protect your visa status.',
  '/appeals-and-reviews/art-appeals': 'Independent merits review at the Administrative Review Tribunal (ART). Strategic preparation and representation for visa refusal and cancellation appeals.',
  '/appeals-and-reviews/judicial-review': 'Assess if your visa decision involved a jurisdictional error. Professional legal representation for judicial review before the Federal Court of Australia.',
  '/appeals-and-reviews/sponsorship-nomination-refusals': 'Challenge refused employer sponsorships or nomination applications. Strategic guidance for standard business sponsors and nominated workers.',
};

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const url = '/' + slug.join('/');
  const page = legalPages.find((p) => p.url === url);

  if (!page) {
    return {
      title: 'Page Not Found | Yantra Legal',
    };
  }

  const customDesc = metaDescriptions[page.url] || `Professional legal representation for ${page.title} in Sydney, Australia. Straightforward advice and personal attention from Krishna Giri.`;

  return {
    title: `${page.title} | Yantra Legal`,
    description: customDesc,
    alternates: {
      canonical: page.url,
    },
  };
}

export default async function LegalDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const url = '/' + slug.join('/');
  const page = legalPages.find((p) => p.url === url);

  if (!page) {
    notFound();
  }

  // Determine category and sidebar pages
  let categoryName = 'Services';
  let sidebarPages: LegalPage[] = [];

  if (url.startsWith('/migration-law')) {
    categoryName = 'Migration Law';
    sidebarPages = legalPages.filter((p) => p.url.startsWith('/migration-law'));
  } else if (url.startsWith('/family-law')) {
    categoryName = 'Family Law';
    sidebarPages = legalPages.filter((p) => p.url.startsWith('/family-law'));
  } else if (url.startsWith('/appeals-and-reviews')) {
    categoryName = 'Appeals & Reviews';
    sidebarPages = legalPages.filter((p) => p.url.startsWith('/appeals-and-reviews'));
  }

  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="legal-layout">
          {/* Left Column: Sidebar Menu */}
          <aside className="legal-sidebar">
            <h3 className="legal-sidebar-title" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <span>{categoryName}</span>
              <span className="legal-swipe-hint">(Swipe &larr; for more)</span>
            </h3>
            <ul className="legal-sidebar-links">
              {sidebarPages.map((sPage) => (
                <li key={sPage.url}>
                  <Link
                    href={sPage.url}
                    className={`legal-sidebar-link ${sPage.url === page.url ? 'active' : ''}`}
                  >
                    {sPage.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Right Column: Main Content */}
          <article className="legal-main">
            {/* Breadcrumbs */}
            <div className="legal-breadcrumbs">
              <Link href="/">Home</Link>
              <span className="legal-breadcrumbs-separator">/</span>
              <span>{categoryName}</span>
              {page.url !== `/${slug[0]}` && (
                <>
                  <span className="legal-breadcrumbs-separator">/</span>
                  <span style={{ color: 'var(--clr-yellow)' }}>{page.title}</span>
                </>
              )}
            </div>

            {/* Page Main Title */}
            <h1 className="legal-content-title">{page.title}</h1>

            {/* Collapsible Sections Component */}
            <CollapsibleSections sections={page.sections} pageTitle={page.title} />
          </article>
        </div>
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
