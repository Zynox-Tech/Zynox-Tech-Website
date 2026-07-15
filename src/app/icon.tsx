import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: '#09090B',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 800,
          borderRadius: 8,
          border: '1.5px solid rgba(255,255,255,0.08)',
        }}
      >
        <span
          style={{
            background: 'linear-gradient(135deg, #FF6B6B, #4F8CFF)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Z
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
