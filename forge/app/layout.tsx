import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://claudeforge.shop'),
  title: {
    default: 'FORGE — AI App Builder. Ship production Next.js apps from a prompt.',
    template: '%s | FORGE',
  },
  description: 'Describe your app. FORGE generates production-grade Next.js 15 + TypeScript code. Deploy free on Cloudflare Pages. No vendor lock-in, no Vercel bill.',
  keywords: ['AI app builder', 'Next.js generator', 'vibe coding', 'Lovable alternative', 'Bolt alternative', 'Claude AI', 'Cloudflare Pages'],
  authors: [{ name: 'NorwegianSpark SA' }],
  creator: 'NorwegianSpark SA',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://claudeforge.shop',
    siteName: 'FORGE',
    title: 'FORGE — AI App Builder',
    description: 'Ship production Next.js apps from a prompt. Free Cloudflare Pages deployment.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FORGE AI App Builder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORGE — AI App Builder',
    description: 'Ship production Next.js apps from a prompt.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[--forge-green] text-black px-4 py-2 rounded z-50">
            Skip to main content
          </a>
          <main id="main-content" role="main">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
