import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { blogPosts } from '../../data/blogContents';

export const metadata: Metadata = {
  title: 'Blog & Insights | Yantra Legal',
  description: 'Stay updated with legal guides, visa application tips, and commentary on Australian migration and family law changes from Yantra Legal.',
};

export default function BlogPage() {
  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        <section style={headerSectionStyle}>
          <div className="container">
            <span className="sec-pill">Legal Insights</span>
            <h1 style={titleStyle}>
              Yantra Legal <span className="text-gradient-gold">Blog</span>
            </h1>
            <p style={subtitleStyle}>
              Stay informed with our latest articles, guides, and legal updates regarding Australian migration law and family law procedures.
            </p>
          </div>
        </section>

        <section style={contentSectionStyle}>
          <div className="container">
            <div style={blogGridStyle}>
              {blogPosts.map((post) => (
                <div key={post.slug} className="glass" style={blogCardStyle}>
                  <div style={cardMetaStyle}>
                    <span style={cardCategoryStyle}>{post.category}</span>
                    <span style={cardDateStyle}>{post.date}</span>
                  </div>
                  <h2 style={postTitleStyle}>
                    <Link href={`/blog/${post.slug}`} style={postTitleLinkStyle}>
                      {post.title}
                    </Link>
                  </h2>
                  <p style={postExcerptStyle}>{post.excerpt}</p>
                  <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <span style={readTimeStyle}>{post.readTime}</span>
                    <Link href={`/blog/${post.slug}`} style={readMoreBtnStyle} className="btn-hover-gold">
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>Read Article</span>
                      <span className="btn-arrow-circle" style={{ width: '28px', height: '28px', fontSize: '0.9rem', marginLeft: '8px' }}>↗</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const blogGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '32px',
};

const blogCardStyle: React.CSSProperties = {
  padding: '36px 30px',
  borderRadius: '16px',
  background: 'rgba(11, 43, 32, 0.25)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s ease',
};

const cardMetaStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const cardCategoryStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: 'var(--clr-yellow)',
  backgroundColor: 'rgba(223, 173, 62, 0.1)',
  padding: '4px 10px',
  borderRadius: '4px',
};

const cardDateStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--clr-text-muted)',
};

const postTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.45rem',
  color: '#ffffff',
  margin: '0 0 12px 0',
  lineHeight: 1.3,
};

const postTitleLinkStyle: React.CSSProperties = {
  color: '#ffffff',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
};

const postExcerptStyle: React.CSSProperties = {
  fontSize: '0.92rem',
  lineHeight: 1.6,
  color: 'var(--clr-text-muted)',
  margin: '0 0 24px 0',
};

const readTimeStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--clr-text-muted)',
};

const readMoreBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
};


const layoutStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#061912',
};

const mainContentStyle: React.CSSProperties = {
  flex: 1,
};

const headerSectionStyle: React.CSSProperties = {
  padding: '160px 0 60px 0',
  textAlign: 'center',
  background: 'linear-gradient(180deg, #04120d 0%, #061912 100%)',
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

const contentSectionStyle: React.CSSProperties = {
  padding: '40px 0 100px 0',
};

const cardStyle: React.CSSProperties = {
  padding: '60px 40px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  background: 'rgba(11, 43, 32, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
};

const iconStyle: React.CSSProperties = {
  fontSize: '3rem',
  marginBottom: '10px',
};

const cardTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.8rem',
  color: 'var(--clr-yellow)',
  margin: 0,
};

const bodyStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: 'var(--clr-text-muted)',
  margin: 0,
};
