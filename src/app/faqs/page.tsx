import React from 'react';
import type { Metadata } from 'next';
import FAQsClient from './FAQsClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Yantra Legal',
  description: 'Straightforward answers to common questions about Australian partner visas, skilled migration, employer sponsorship, ART appeals, and divorce processes.',
};

export default function FAQsPage() {
  return <FAQsClient />;
}
