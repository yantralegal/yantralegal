'use client';

import React from 'react';

interface BookConsultationButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function BookConsultationButton({ className, children }: BookConsultationButtonProps) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-consultation-modal'))}
      className={className}
      style={{ border: 'none', cursor: 'pointer' }}
    >
      {children}
    </button>
  );
}
