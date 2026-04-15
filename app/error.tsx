"use client"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5">
      <p className="text-xs uppercase tracking-widest text-orange-400 mb-4">Error</p>
      <h1 className="text-3xl font-semibold mb-4">Something went wrong</h1>
      <p className="text-zinc-400 mb-8">{error.digest ? `ID: ${error.digest}` : "Please try again."}</p>
      <button onClick={reset} className="px-6 py-3 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400">Try again</button>
    </div>
  )
}
