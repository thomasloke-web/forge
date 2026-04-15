'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-red-400 mb-4">SOMETHING WENT WRONG</p>
      <h2 className="text-2xl font-medium text-[--text-primary] mb-4">An error occurred</h2>
      <p className="text-[--text-secondary] max-w-sm mb-8 text-sm">{error.message}</p>
      <button
        onClick={reset}
        className="px-5 py-2.5 bg-[--forge-green] text-black text-sm font-medium rounded-lg hover:bg-[--forge-green-dim] transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
