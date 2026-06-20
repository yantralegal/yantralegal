'use client';

import React from 'react';
import Link from 'next/link';
import { blogPosts } from '../data/blogContents';

export default function BlogSection() {
  // Take first 3 blog posts
  const posts = blogPosts.slice(0, 3);

  return (
    <section style={sectionStyle} id="blog">
      <div className="container">
        {/* Section Header */}
        <div style={headerStyle}>
          <span className="sec-pill">Insights & Updates</span>
          <h2 style={titleStyle}>
            Latest from Our <span className="text-gradient-gold">Blog</span>
          </h2>
          <p style={subtitleStyle}>
            Practical legal information, migration updates and insights to help you understand your rights and options.
          </p>
        </div>

        {/* Blog Grid */}
        <div style={gridStyle}>
          {posts.map((post, index) => (
            <div key={post.slug} className="glass reveal-on-scroll reveal-fade-up" style={cardStyle}>
              {/* Category & Date */}
              <div style={cardMetaStyle}>
                <span style={cardCategoryStyle}>{post.category}</span>
                <span style={cardDateStyle}>{post.date}</span>
              </div>

              {/* Title */}
              <h3 style={postTitleStyle}>
                <Link href={`/blog/${post.slug}`} style={postTitleLinkStyle}>
                  {post.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p style={postExcerptStyle}>{post.excerpt}</p>

              {/* Footer row inside card */}
              <div style={cardFooterStyle}>
                <span style={readTimeStyle}>{post.readTime}</span>
                <Link href={`/blog/${post.slug}`} style={readMoreBtnStyle} className="btn-hover-gold">
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>Read Article</span>
                  <span className="btn-arrow-circle" style={{ width: '28px', height: '28px', fontSize: '0.9rem', marginLeft: '8px' }}>↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={bottomCTAStyle}>
          <Link href="/blog" className="btn btn-outline">
            <span>View All Insights</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  backgroundColor: '#061912',
  position: 'relative',
  overflow: 'hidden',
  padding: '100px 0',
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '720px',
  margin: '0 auto 60px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
  color: '#ffffff',
  margin: 0,
  fontWeight: 400,
};

const subtitleStyle: React.CSSProperties = {
  color: 'var(--clr-text-muted)',
  fontSize: '1.05rem',
  lineHeight: 1.6,
  margin: 0,
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '32px',
};

const cardStyle: React.CSSProperties = {
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
  fontWeight: 500,
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

const cardFooterStyle: React.CSSProperties = {
  marginTop: 'auto',
  paddingTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
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

const bottomCTAStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '48px',
};
