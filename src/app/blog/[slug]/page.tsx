import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { blogPosts } from '../../../data/blogContents';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found | Yantra Legal Blog',
    };
  }

  return {
    title: `${post.title} | Yantra Legal Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '160px 24px 100px 24px' }}>
          {/* Back link */}
          <div style={{ marginBottom: '32px' }}>
            <Link href="/blog" style={backLinkStyle}>
              ← Back to Blog
            </Link>
          </div>

          {/* Article Header */}
          <header style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
              <span style={categoryStyle}>{post.category}</span>
              <span style={dateStyle}>{post.date}</span>
              <span style={dateStyle}>•</span>
              <span style={dateStyle}>{post.readTime}</span>
            </div>
            <h1 style={titleStyle}>{post.title}</h1>
          </header>

          {/* Article Content */}
          <div style={contentStyle}>
            {post.content.map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                const cleanText = trimmed.replace(/^[•\-\s]+/, '');
                return (
                  <ul key={idx} style={listStyle}>
                    <li style={listItemStyle}>
                      <span style={{ color: 'var(--clr-yellow)', marginRight: '8px' }}>✦</span>
                      {cleanText}
                    </li>
                  </ul>
                );
              }
              
              if (trimmed.startsWith('Option ') || trimmed.startsWith('Step ') || /^\d+\./.test(trimmed)) {
                return (
                  <h3 key={idx} style={subheadingStyle}>
                    {paragraph}
                  </h3>
                );
              }

              return (
                <p key={idx} style={paragraphStyle}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Author/CTA card */}
          <div className="glass" style={ctaCardStyle}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--clr-yellow)', margin: '0 0 8px 0' }}>
              Need Professional Advice?
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--clr-text-muted)', margin: '0 0 20px 0' }}>
              If you are facing a similar legal situation or require personalized assistance with your migration or family law matter, book a confidential consultation with Krishna Giri today.
            </p>
            <Link href="/contact" className="btn btn-yellow">
              <span>Book a Confidential Consultation</span>
              <span className="btn-arrow-circle">↗</span>
            </Link>
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

const backLinkStyle: React.CSSProperties = {
  color: 'var(--clr-yellow)',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: 600,
};

const categoryStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: 'var(--clr-yellow)',
  backgroundColor: 'rgba(223, 173, 62, 0.1)',
  padding: '4px 10px',
  borderRadius: '4px',
};

const dateStyle: React.CSSProperties = {
  fontSize: '0.88rem',
  color: 'var(--clr-text-muted)',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
  color: '#ffffff',
  margin: 0,
  lineHeight: 1.25,
};

const contentStyle: React.CSSProperties = {
  color: '#cbdad3',
  lineHeight: '1.8',
  fontSize: '1.05rem',
};

const paragraphStyle: React.CSSProperties = {
  marginBottom: '24px',
};

const subheadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.45rem',
  color: '#ffffff',
  marginTop: '40px',
  marginBottom: '16px',
};

const listStyle: React.CSSProperties = {
  paddingLeft: 0,
  listStyle: 'none',
  margin: '0 0 24px 0',
};

const listItemStyle: React.CSSProperties = {
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'start',
};

const ctaCardStyle: React.CSSProperties = {
  marginTop: '60px',
  padding: '40px 30px',
  border: '1px solid rgba(223, 173, 62, 0.25)',
  background: 'rgba(11, 43, 32, 0.3)',
};
