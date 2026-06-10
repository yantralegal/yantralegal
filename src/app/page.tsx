import React from 'react';
import ScrollObserver from '../components/ScrollObserver';
import HeroSection from '../components/HeroSection';
import IntroductionSection from '../components/IntroductionSection';
import WhatHappensNext from '../components/WhatHappensNext';
import AboutPrincipal from '../components/AboutPrincipal';
import SupportingDiverseCommunities from '../components/SupportingDiverseCommunities';
import ServicesSection from '../components/ServicesSection';
import WhyChooseValues from '../components/WhyChooseValues';
import BlogSection from '../components/BlogSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import AffiliationsSection from '../components/AffiliationsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <ScrollObserver />
      <HeroSection />
      <IntroductionSection />
      <WhatHappensNext />
      <AboutPrincipal />
      <SupportingDiverseCommunities />

      <ServicesSection />
      <WhyChooseValues />
      <BlogSection />
      <TestimonialsSection />
      <FAQSection />
      <AffiliationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
