import React from 'react';
import Image from 'next/image';

export default function LawyerPortrait() {
  return (
    <div style={containerStyle}>
      {/* Soft golden lighting glow behind the silhouette */}
      <div style={glowBackdropStyle} />

      <Image
        src="/solicitorkrishna.png"
        alt="Principal Solicitor Portrait"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 440px"
        className="lawyer-portrait-image"
        style={{
          objectFit: 'contain',
          objectPosition: 'bottom center',
          zIndex: 2,
        }}
      />

      {/* Bottom gradient mask to fade the hard cut-off into the background */}
      <div style={bottomFadeStyle} />
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
};

const glowBackdropStyle: React.CSSProperties = {
  position: 'absolute',
  top: '20%',
  left: '10%',
  right: '10%',
  bottom: '10%',
  background: 'radial-gradient(circle, rgba(16, 66, 48, 0.6) 0%, rgba(6, 25, 18, 0.35) 50%, transparent 70%)',
  filter: 'blur(50px)',
  zIndex: 1,
  pointerEvents: 'none',
};

const bottomFadeStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: '12%', /* Height proportion to softly blend the chest/shoulders outline */
  background: 'linear-gradient(to bottom, transparent 0%, #061912 100%)',
  zIndex: 3,
  pointerEvents: 'none',
};

