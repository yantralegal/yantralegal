import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/db';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>;

async function getMarqueeUpdate(id: string) {
  try {
    if (!ObjectId.isValid(id)) return null;
    const { db } = await connectToDatabase();
    return await db.collection('marquee_updates').findOne({ _id: new ObjectId(id) });
  } catch (err) {
    console.error('Error fetching marquee update:', err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const update = await getMarqueeUpdate(id);

  if (!update) {
    return {
      title: 'Update Not Found | Yantra Legal',
    };
  }

  return {
    title: `${update.heading} | Yantra Legal Updates`,
    description: update.content.substring(0, 150),
  };
}

export default async function MarqueeUpdatePage({ params }: { params: Params }) {
  const { id } = await params;
  const update = await getMarqueeUpdate(id);

  if (!update) {
    notFound();
  }

  // Split content by paragraphs
  const paragraphs = update.content.split('\n').filter((p: string) => p.trim() !== '');

  return (
    <div style={layoutStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '160px 24px 100px 24px' }}>
          {/* Back link */}
          <div style={{ marginBottom: '32px' }}>
            <Link href="/" style={backLinkStyle}>
              ← Back to Home
            </Link>
          </div>

          {/* Header */}
          <header style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
              <span style={categoryStyle}>News & Updates</span>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.45)' }}>
                {new Date(update.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h1 style={titleStyle}>{update.heading}</h1>
          </header>

          {/* Banner Image */}
          {update.imageUrl && (
            <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Image
                src={update.imageUrl}
                alt={update.heading}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}

          {/* Content */}
          <div style={contentStyle}>
            {paragraphs.map((p: string, idx: number) => (
              <p key={idx} style={paragraphStyle}>
                {p}
              </p>
            ))}
          </div>

          {/* Consultation CTA */}
          <div style={ctaStyle}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#061912', marginBottom: '8px' }}>
              Need Legal Guidance?
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'rgba(6, 25, 18, 0.8)', marginBottom: '20px', lineHeight: 1.5 }}>
              Arrange a confidential initial consultation with Krishna Giri to discuss your family or immigration matter.
            </p>
            <Link href="/contact" className="btn btn-yellow" style={{ display: 'inline-flex', padding: '12px 24px', borderRadius: '8px', fontWeight: 700 }}>
              Book Initial Consultation
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
  fontSize: '0.88rem',
  color: '#dfad3e',
  textDecoration: 'none',
  fontWeight: 600,
  transition: 'opacity 0.2s',
};

const categoryStyle: React.CSSProperties = {
  backgroundColor: 'rgba(223, 173, 62, 0.1)',
  border: '1px solid rgba(223, 173, 62, 0.2)',
  color: '#dfad3e',
  fontSize: '0.72rem',
  fontWeight: 800,
  padding: '4px 10px',
  borderRadius: '4px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontFamily: 'var(--font-serif)',
  color: '#ffffff',
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  margin: 0,
};

const contentStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.7,
  color: 'rgba(255, 255, 255, 0.85)',
};

const paragraphStyle: React.CSSProperties = {
  marginBottom: '24px',
};

const ctaStyle: React.CSSProperties = {
  marginTop: '56px',
  padding: '36px',
  borderRadius: '16px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
};
