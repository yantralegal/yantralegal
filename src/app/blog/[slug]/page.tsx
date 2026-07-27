import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getBlogPosts, getBlogPostBySlug } from '../../../lib/dataFetcher';
import BookConsultationButton from '../../../components/ui/BookConsultationButton';

export const dynamic = 'force-dynamic';

function renderFormattedText(text: string) {
  const tokenRegex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  const parts = [];
  let match;
  let lastIndex = 0;
  
  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    if (match[2]) {
      // Bold text: **text**
      parts.push(<strong key={match.index}>{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      // Link text: [label](url)
      const url = match[4];
      const isExternal = url.startsWith('http') || url.startsWith('www');
      parts.push(
        <Link 
          key={match.index} 
          href={url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          style={{ color: 'var(--clr-yellow)', textDecoration: 'underline' }}
        >
          {match[3]}
        </Link>
      );
    }
    
    lastIndex = tokenRegex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
}


type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

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
  const post = await getBlogPostBySlug(slug);

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
              
              // Handle lists
              if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('→')) {
                const cleanText = trimmed.replace(/^[•\-\s→]+/, '');
                return (
                  <ul key={idx} style={listStyle}>
                    <li style={listItemStyle}>
                      <span style={{ color: 'var(--clr-yellow)', marginRight: '8px' }}>✦</span>
                      <span>{renderFormattedText(cleanText)}</span>
                    </li>
                  </ul>
                );
              }
              
              // Handle Case Law links
              if (trimmed.toLowerCase().startsWith('case law link:') || trimmed.toLowerCase().startsWith('case law:')) {
                const cleanText = trimmed.replace(/^(case law link|case law):\s*/i, '');
                const isUrl = cleanText.startsWith('http') || cleanText.startsWith('https');
                const href = isUrl ? cleanText : trimmed;
                return (
                  <p key={idx} style={{ ...paragraphStyle, marginTop: '24px' }}>
                    <strong>Case Law: </strong>
                    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr-yellow)', textDecoration: 'underline', fontWeight: 600 }}>
                      {cleanText}
                    </a>
                  </p>
                );
              }

              // Handle subheadings
              const knownSubheadings = [
                "Key Takeaways", 
                "Background", 
                "The Issues Before the Federal Court", 
                "What Did the Court Decide?", 
                "Why This Decision Matters", 
                "Practical Lessons for Visa Holders", 
                "Disclaimer"
              ];
              const isNumberedSubheading = /^\d+\./.test(trimmed);
              const isOptionOrStep = trimmed.startsWith('Option ') || trimmed.startsWith('Step ');
              const isKnownSub = knownSubheadings.includes(trimmed) || knownSubheadings.some(sub => trimmed.toLowerCase().startsWith(sub.toLowerCase()));
              
              if (isNumberedSubheading || isOptionOrStep || (isKnownSub && trimmed.length < 80)) {
                return (
                  <h3 key={idx} style={subheadingStyle}>
                    {trimmed}
                  </h3>
                );
              }

              // Default paragraph
              return (
                <p key={idx} style={paragraphStyle}>
                  {renderFormattedText(paragraph)}
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
            <BookConsultationButton className="btn btn-yellow">
              <span>Book a Confidential Consultation</span>
              <span className="btn-arrow-circle">↗</span>
            </BookConsultationButton>
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
