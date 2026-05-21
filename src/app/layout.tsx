import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

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
  title: 'Yantra Legal | Elite Australian Visa & Immigration Lawyers',
  description: 'Yantra Legal is a premier Australian law firm delivering strategic immigration solutions, visa approvals, and appeal representation across corporate and family migration.',
  metadataBase: new URL('https://www.yantralegal.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Yantra Legal | Elite Australian Visa & Immigration Lawyers',
    description: 'Premier Australian law firm delivering strategic, results-driven legal counsel for visas, citizenship, and migration appeals.',
    url: 'https://www.yantralegal.com.au',
    siteName: 'Yantra Legal',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yantra Legal | Elite Australian Visa & Immigration Lawyers',
    description: 'Premier Australian law firm delivering strategic, results-driven legal counsel for visas, citizenship, and migration appeals.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema Structured Data for Australia Legal Services SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    'name': 'Yantra Legal',
    'image': 'https://www.yantralegal.com.au/assets/logo.png',
    'description': 'Yantra Legal is a premier immigration law firm in Sydney, Australia providing strategic visa approvals, citizenship advice, and migration appeal representation.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Level 35, 1 Martin Place',
      'addressLocality': 'Sydney',
      'addressRegion': 'NSW',
      'postalCode': '2000',
      'addressCountry': 'AU',
    },
    'telephone': '+61 2 0000 0000',
    'email': 'contact@yantralegal.com.au',
    'url': 'https://www.yantralegal.com.au',
    'priceRange': '$$$',
    'areaServed': 'AU',
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
        {children}
      </body>
    </html>
  );
}
