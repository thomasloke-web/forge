import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-[--forge-green] mb-4">ERROR 404</p>
      <h1 className="font-display text-5xl text-[--text-primary] mb-4 italic">Page not found</h1>
      <p className="text-[--text-secondary] max-w-sm mb-8">
        This page doesn&apos;t exist. Maybe the URL changed, or you followed a broken link.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[--forge-green] text-black text-sm font-medium rounded-lg hover:bg-[--forge-green-dim] transition-colors"
      >
        Back to FORGE
      </Link>
    </div>
  )
}
