import { ImageResponse } from 'next/og';

// Site-wide Open Graph / Twitter share image (1200×630).
// Applied to every route unless a segment provides its own opengraph-image.
export const alt = 'Yantra Legal — Sydney Migration & Family Lawyers';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #04120d 0%, #0a2018 60%, #04120d 100%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            color: '#dfad3e',
            fontSize: '34px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ fontSize: '46px' }}>⚖️</span>
          Yantra Legal
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: '72px',
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: '900px',
            }}
          >
            Sydney Migration &amp; Family Lawyers
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: '32px',
              lineHeight: 1.4,
              maxWidth: '860px',
            }}
          >
            Clear, practical advice on Australian visas, refusals &amp; appeals, and
            family law. Fixed-fee initial consultations.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '26px',
            borderTop: '1px solid rgba(223,173,62,0.25)',
            paddingTop: '28px',
          }}
        >
          <span>www.yantralegal.com.au</span>
          <span style={{ color: '#dfad3e' }}>Level 35, 1 Martin Place, Sydney</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
