"use client"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

const KEY = "forge-prompt-tip-seen"

export default function PromptTip() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    setOpen(!localStorage.getItem(KEY))
  }, [])

  if (!open) return null

  function dismiss() {
    localStorage.setItem(KEY, "1")
    setOpen(false)
  }

  return (
    <div className="relative mb-8 rounded-xl border border-zinc-800 border-l-2 border-l-green-500 bg-zinc-900/50 p-5 pr-10">
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-200"
      >
        <X className="w-4 h-4" />
      </button>
      <p className="text-xs uppercase tracking-widest text-green-400 mb-3">How to write a good prompt</p>
      <ul className="space-y-2 text-sm text-zinc-300">
        <li>• Specify your stack: <span className="text-zinc-400">&ldquo;Next.js 15, Clerk auth, Supabase, Stripe&rdquo;</span></li>
        <li>• List your pages: <span className="text-zinc-400">&ldquo;/dashboard, /api/payments, /settings&rdquo;</span></li>
        <li>• Describe your business rules: <span className="text-zinc-400">&ldquo;Free plan: 5 items. Pro: unlimited.&rdquo;</span></li>
      </ul>
    </div>
  )
}
