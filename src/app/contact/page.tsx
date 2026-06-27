import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact | Yantra Legal',
  description: 'Book a fixed-fee consultation with Krishna Giri — migration and divorce law advice in Sydney and across Australia. In person, Zoom, or phone.',
};

export default function ContactPage() {
  return <ContactClient />;
}
