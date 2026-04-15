import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FORGE — AI App Builder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        background: '#0a0a0a',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
        fontFamily: 'monospace',
      }}>
        <div style={{ color: '#22c55e', fontSize: 28, marginBottom: 40, letterSpacing: 4 }}>FORGE</div>
        <div style={{ color: '#f5f5f5', fontSize: 72, fontWeight: 700, textAlign: 'center', lineHeight: 1.1, marginBottom: 32 }}>
          Ship production apps from a prompt.
        </div>
        <div style={{ color: '#a3a3a3', fontSize: 32, textAlign: 'center' }}>
          Next.js 15 · TypeScript · Claude · Vercel
        </div>
        <div style={{ position: 'absolute', bottom: 60, color: '#525252', fontSize: 20 }}>
          claudeforge.shop · by NorwegianSpark SA
        </div>
      </div>
    ),
    { ...size }
  )
}
