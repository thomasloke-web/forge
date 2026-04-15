import { SignUp } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create account — FORGE',
  robots: { index: false },
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[--surface]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-mono text-[--forge-green] font-medium text-2xl">FORGE</span>
          <p className="text-sm text-[--text-muted] mt-2">5 free builds · No credit card required</p>
        </div>
        <SignUp />
      </div>
    </div>
  )
}
