'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const links = [
  { href: '/templates', label: 'Templates' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/journal', label: 'Journal' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[--border] bg-[--surface]/90 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-mono text-[--forge-green] font-medium tracking-tight text-lg">FORGE</span>
          <span className="text-[--text-muted] text-xs font-mono hidden sm:inline">by NorwegianSpark</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                pathname.startsWith(l.href)
                  ? 'text-[--text-primary]'
                  : 'text-[--text-secondary] hover:text-[--text-primary]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="text-sm px-4 py-1.5 bg-[--forge-green] text-black font-medium rounded-lg hover:bg-[--forge-green-dim] transition-colors"
            >
              Start free
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/generate"
              className="text-sm px-4 py-1.5 bg-[--forge-green] text-black font-medium rounded-lg hover:bg-[--forge-green-dim] transition-colors"
            >
              Build
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}
