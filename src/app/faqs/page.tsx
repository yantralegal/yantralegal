import React from 'react';
import type { Metadata } from 'next';
import FAQsClient from './FAQsClient';
import { getFaqs } from '../../lib/dataFetcher';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Yantra Legal',
  description: 'Straightforward answers to common questions about Australian partner visas, skilled migration, employer sponsorship, ART appeals, and divorce processes.',
  alternates: {
    canonical: '/faqs',
  },
};

// Reduce the markdown used in answers (**bold**, [label](url)) to clean plain
// text so the FAQPage schema carries readable answers for search engines.
function toPlainText(markdown: string): string {
  return markdown
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export default async function FAQsPage() {
  const faqCategories = await getFaqs();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqCategories.flatMap((category) =>
      category.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: toPlainText(item.a),
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQsClient />
    </>
  );
}
