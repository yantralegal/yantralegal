import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConsultationModal from '../components/ConsultationModal';
import ScrollToTop from '../components/ScrollToTop';
import { headers } from 'next/headers';
import { getSiteSettings } from '../lib/dataFetcher';
import { testimonialsData } from '../data/testimonials';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Yantra Legal | Sydney Migration & Family Lawyer',
  description: 'Boutique Sydney law practice providing clear, practical advice on Australian visas, visa refusals and appeals, and family law. Fixed-fee initial consultations.',
  metadataBase: new URL('https://www.yantralegal.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Yantra Legal | Sydney Migration & Family Lawyer',
    description: 'Boutique Sydney law practice providing clear, practical advice on Australian visas, visa refusals and appeals, and family law. Fixed-fee initial consultations.',
    url: 'https://www.yantralegal.com.au',
    siteName: 'Yantra Legal',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yantra Legal | Sydney Migration & Family Lawyer',
    description: 'Boutique Sydney law practice providing clear, practical advice on Australian visas, visa refusals and appeals, and family law. Fixed-fee initial consultations.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/yantralegalfavicon.png?v=2',
    shortcut: '/yantralegalfavicon.png?v=2',
    apple: '/yantralegalfavicon.png?v=2',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if live on production domain
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const pathname = headersList.get('x-pathname') || '';
  const isMainDomain = host.includes('yantralegal.com.au') && !host.includes('dev.yantralegal.com.au');

  let showMaintenance = false;
  let settings = {
    phone: '+61 402 402 120',
    email: 'info@yantralegal.com.au',
    is_live_on_main: 'false'
  };

  if (isMainDomain && !pathname.startsWith('/admin') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    try {
      const dbSettings = await getSiteSettings();
      settings = { ...settings, ...dbSettings };
      if (settings.is_live_on_main !== 'true') {
        showMaintenance = true;
      }
    } catch (err) {
      console.error('Error fetching settings for maintenance check:', err);
    }
  }

  // Schema Structured Data for Australia Legal Services SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': 'https://www.yantralegal.com.au/#legalservice',
    'name': 'Yantra Legal',
    'legalName': 'Yantra Legal Pty Ltd',
    'image': 'https://www.yantralegal.com.au/Yantralegalnewlogo.png',
    'logo': 'https://www.yantralegal.com.au/Yantralegalnewlogo.png',
    'description': 'Boutique Sydney law practice providing clear, practical advice on Australian migration and family law — including visas, visa refusals and appeals, and divorce.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Level 35, 1 Martin Place',
      'addressLocality': 'Sydney',
      'addressRegion': 'NSW',
      'postalCode': '2000',
      'addressCountry': 'AU',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -33.8675,
      'longitude': 151.2094,
    },
    'telephone': settings.phone,
    'email': settings.email,
    'url': 'https://www.yantralegal.com.au',
    'priceRange': '$$',
    'areaServed': [
      { '@type': 'City', 'name': 'Sydney' },
      { '@type': 'State', 'name': 'New South Wales' },
      { '@type': 'Country', 'name': 'Australia' },
    ],
    'knowsLanguage': ['en', 'ne'],
    'founder': {
      '@type': 'Person',
      'name': 'Krishna Giri',
      'jobTitle': 'Principal Solicitor',
    },
    // NOTE: confirm these are your actual consulting hours before go-live.
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '17:00',
      },
    ],
    // Aggregate rating mirrors the Google review score shown on the site.
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '5.0',
      'reviewCount': 48,
      'bestRating': '5',
      'worstRating': '1',
    },
    'review': testimonialsData.map((t) => ({
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': String(t.rating),
        'bestRating': '5',
      },
      'author': {
        '@type': 'Person',
        'name': t.name,
      },
      'reviewBody': t.text,
    })),
  };

  return (
    <html lang="en-AU" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {showMaintenance ? (
          <div style={{
            minHeight: '100vh',
            backgroundColor: '#04120d',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'var(--font-jakarta), sans-serif',
            color: '#ffffff',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background elements */}
            <div style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(223, 173, 62, 0.08) 0%, transparent 70%)',
              top: '10%',
              left: '10%',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(223, 173, 62, 0.05) 0%, transparent 70%)',
              bottom: '5%',
              right: '5%',
              pointerEvents: 'none'
            }} />

            <div style={{
              maxWidth: '640px',
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(223, 173, 62, 0.15)',
              borderRadius: '24px',
              padding: '48px 32px',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              zIndex: 2
            }}>
              {/* Premium scales icon */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(223, 173, 62, 0.1)',
                border: '1px solid rgba(223, 173, 62, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                fontSize: '2rem'
              }}>
                ⚖️
              </div>

              <h1 style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                fontWeight: 400,
                color: '#ffffff',
                marginBottom: '16px',
                lineHeight: 1.2
              }}>
                Launching <span style={{
                  background: 'linear-gradient(135deg, #f0c36d 0%, #c4963f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Soon</span>
              </h1>

              <p style={{
                fontSize: '0.98rem',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '32px',
                maxWidth: '480px',
                margin: '0 auto 32px auto'
              }}>
                We are currently preparing our new digital space. Yantra Legal is a dedicated legal practice providing clear, practical guidance in Australian Immigration Law and Family Law.
              </p>

              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'rgba(223, 173, 62, 0.7)',
                  letterSpacing: '1px'
                }}>
                  Get In Touch
                </span>
                
                <div style={{
                  display: 'flex',
                  gap: '24px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  fontSize: '0.95rem'
                }}>
                  <a href={`tel:${settings.phone}`} style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'color 0.2s ease'
                  }}>
                    <span>📞</span> {settings.phone}
                  </a>
                  <a href={`mailto:${settings.email}`} style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'color 0.2s ease'
                  }}>
                    <span>✉️</span> {settings.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {children}
            <ConsultationModal />
            <ScrollToTop />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
