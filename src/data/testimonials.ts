// Client testimonials — single source of truth shared by the
// TestimonialsSection component and the LegalService review schema
// (src/app/layout.tsx). Ratings reflect what is shown on the site.

export interface Testimonial {
  id: number;
  name: string;
  category: 'immigration' | 'family';
  categoryLabel: string;
  rating: number;
  time: string;
  initial: string;
  text: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah M.',
    category: 'immigration',
    categoryLabel: 'Immigration Appeal',
    rating: 5,
    time: '2 weeks ago',
    initial: 'S',
    text: 'I was facing a highly stressful visa cancellation and felt completely lost. The strategic ART appeal advice and support I received from Yantra Legal was outstanding. They handled everything with absolute professionalism and genuine care. Highly recommend their services for complex appeals.'
  },
  {
    id: 2,
    name: 'Rebecca T.',
    category: 'family',
    categoryLabel: 'Divorce Application',
    rating: 5,
    time: '3 weeks ago',
    initial: 'R',
    text: 'Going through a divorce is emotionally draining, but the family law and divorce representation here made all the difference. They protected my interests fiercely while keeping the process structured and straightforward. I felt supported and informed at every step of the process.'
  },
  {
    id: 3,
    name: 'Mark & Elena D.',
    category: 'immigration',
    categoryLabel: 'Partner Visa',
    rating: 5,
    time: '1 month ago',
    initial: 'M',
    text: 'Prompt, clear, and extremely knowledgeable. They guided us through the complex partner visa application process seamlessly. They were always responsive to our questions and explained every requirement of the Australian immigration system. Exceptional service!'
  },
  {
    id: 4,
    name: 'James W.',
    category: 'family',
    categoryLabel: 'Divorce Application',
    rating: 5,
    time: '1 month ago',
    initial: 'J',
    text: 'Excellent, efficient legal service for my divorce application. The turnaround times were fast, and the guidance on the required documentation was exceptional. They made a stressful process feel straightforward and stress-free.'
  },
  {
    id: 5,
    name: 'Kunal S.',
    category: 'immigration',
    categoryLabel: 'Employer Sponsorship',
    rating: 5,
    time: '2 months ago',
    initial: 'K',
    text: 'Outstanding professional guidance on corporate sponsor obligations and work visa pathways. Yantra Legal has become our trusted advisor for all business immigration matters. Transparent fees, straightforward communication, and results-oriented strategy.'
  },
  {
    id: 6,
    name: 'Aisha H.',
    category: 'family',
    categoryLabel: 'Divorce Application',
    rating: 5,
    time: '2 months ago',
    initial: 'A',
    text: 'A reassuring voice in a very stressful time. They helped me navigate my divorce application, keeping the process straightforward and helping me avoid unnecessary delays. Their strategic insight and empathetic approach made all the difference.'
  }
];
