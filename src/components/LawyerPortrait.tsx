import React from 'react';
import Image from 'next/image';

export default function LawyerPortrait() {
  return (
    <div style={containerStyle}>
      <Image
        src="/finallawyerportrait.jpeg"
        alt="Principal Solicitor Portrait"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 440px"
        style={{ objectFit: 'cover' }}
      />

      
      {/* Soft bottom vignette masking */}
      <div style={vignetteStyle} />
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

const vignetteStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '150px',
  background: 'linear-gradient(to top, var(--clr-bg-primary) 5%, rgba(6, 25, 18, 0) 100%)',
  pointerEvents: 'none',
  zIndex: 3,
};
