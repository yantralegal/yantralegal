import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { legalPages, LegalPage } from '../../data/legalContents';

// Define the shape of params based on Next.js 15+ Async params
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

  if (url.startsWith('/immigration-law')) {
    categoryName = 'Immigration Law';
    sidebarPages = legalPages.filter((p) => p.url.startsWith('/immigration-law'));
  } else if (url.startsWith('/divorce')) {
    categoryName = 'Family Law';
    sidebarPages = legalPages.filter((p) => p.url.startsWith('/divorce'));
  } else if (url.startsWith('/appeals-and-reviews')) {
    categoryName = 'Appeals & Reviews';
    sidebarPages = legalPages.filter((p) => p.url.startsWith('/appeals-and-reviews'));
  }

  // Render helper for paragraphs and bullet point lists
  const renderSectionContent = (paragraphs: string[]) => {
    const renderedElements: React.ReactNode[] = [];
    let currentListItems: string[] = [];

    paragraphs.forEach((p, idx) => {
      const trimmed = p.trim();
      if (!trimmed) return;

      // Check if it looks like a bullet item (starts with symbol, or short line without typical sentence ending)
      const isBullet = trimmed.startsWith('•') || 
                       trimmed.startsWith('-') || 
                       trimmed.startsWith('✦') || 
                       trimmed.startsWith('→') ||
                       (trimmed.length < 120 && 
                        !trimmed.endsWith('.') && 
                        !trimmed.endsWith('?') && 
                        !trimmed.endsWith(':'));

      if (isBullet) {
        currentListItems.push(p);
      } else {
        if (currentListItems.length > 0) {
          renderedElements.push(
            <ul key={`list-${idx}`} className="legal-bullet-list">
              {currentListItems.map((item, lIdx) => {
                const cleanText = item.replace(/^[•\-\✦\→\s\*\d\.]+\s*/, '');
                return (
                  <li key={lIdx} className="legal-bullet-item">
                    <span className="legal-bullet-icon">✦</span>
                    <span>{cleanText}</span>
                  </li>
                );
              })}
            </ul>
          );
          currentListItems = [];
        }
        renderedElements.push(
          <p key={idx} className="legal-paragraph">
            {p}
          </p>
        );
      }
    });

    if (currentListItems.length > 0) {
      renderedElements.push(
        <ul key="list-final" className="legal-bullet-list">
          {currentListItems.map((item, lIdx) => {
            const cleanText = item.replace(/^[•\-\✦\→\s\*\d\.]+\s*/, '');
            return (
              <li key={lIdx} className="legal-bullet-item">
                <span className="legal-bullet-icon">✦</span>
                <span>{cleanText}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    return renderedElements;
  };

  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="legal-layout">
          {/* Left Column: Sidebar Menu */}
          <aside className="legal-sidebar">
            <h3 className="legal-sidebar-title">{categoryName}</h3>
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

            {/* Sections */}
            {page.sections.map((section, idx) => (
              <div key={idx} className="legal-section-card">
                <h2 className="legal-section-title">{section.heading}</h2>
                {renderSectionContent(section.paragraphs)}
              </div>
            ))}

            {/* Dynamic Consultation Call to Action */}
            <div className="legal-cta-card">
              <h3 className="legal-cta-title">Ready to Take the Next Step?</h3>
              <p className="legal-cta-desc">
                Book a consultation with Krishna Giri today. We offer fixed-fee initial consultations so you can discuss your {page.title.toLowerCase()} matter without any financial uncertainty.
              </p>
              <Link href="/contact" className="btn btn-yellow">
                <span>Book A Consultation</span>
                <span className="btn-arrow-circle">↗</span>
              </Link>
            </div>
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
