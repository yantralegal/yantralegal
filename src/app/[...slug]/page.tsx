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

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const url = '/' + slug.join('/');
  const page = legalPages.find((p) => p.url === url);

  if (!page) {
    return {
      title: 'Page Not Found | Yantra Legal',
    };
  }

  return {
    title: `${page.title} | Yantra Legal`,
    description: `Professional legal representation for ${page.title} in Sydney, Australia. Straightforward advice and personal attention from Krishna Giri.`,
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
