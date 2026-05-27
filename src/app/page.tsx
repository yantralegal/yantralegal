import React from 'react';
import ScrollObserver from '../components/ScrollObserver';
import HeroSection from '../components/HeroSection';
import AboutPrincipal from '../components/AboutPrincipal';
import ServicesSection from '../components/ServicesSection';
import WhyChooseValues from '../components/WhyChooseValues';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <ScrollObserver />
      <HeroSection />
      <AboutPrincipal />
      <ServicesSection />
      <WhyChooseValues />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
