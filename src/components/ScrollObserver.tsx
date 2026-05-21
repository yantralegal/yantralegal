'use client';

import { useEffect } from 'react';

export default function ScrollObserver() {
  useEffect(() => {
    // Select all elements that have scroll reveal classes
    const animatedElements = document.querySelectorAll('.reveal-on-scroll');
    
    if (animatedElements.length === 0) return;

    const observerOptions = {
      root: null, // use the viewport
      rootMargin: '0px 0px -8% 0px', // trigger slightly before entering the screen fully
      threshold: 0.05, // trigger when 5% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class to trigger CSS transition
          entry.target.classList.add('is-visible');
          // Once the element has animated in, we stop observing it
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => observer.observe(el));

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
