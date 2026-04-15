import { SignIn } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in — FORGE',
  robots: { index: false },
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[--surface]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-mono text-[--forge-green] font-medium text-2xl">FORGE</span>
          <p className="text-sm text-[--text-muted] mt-2">Sign in to continue building</p>
        </div>
        <SignIn />
      </div>
    </div>
  )
}
