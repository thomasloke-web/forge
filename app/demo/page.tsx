"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Loader2, Sparkles, ArrowRight } from "lucide-react"

export default function DemoPage() {
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState("")
  const [done, setDone] = useState(false)

  const DEMO_PROMPT = "Build a simple pricing page with 3 tiers (Free, Pro, Enterprise) using Next.js App Router, TypeScript, and Tailwind. Include a toggle for monthly/annual billing."

  async function runDemo() {
    setLoading(true)
    setOutput("")
    setDone(false)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: DEMO_PROMPT, style: "minimal" }),
      })

      if (res.status === 401) {
        setOutput("// Sign up for free to try FORGE — 5 generations/day, no credit card required.")
        setDone(true)
        return
      }
      if (!res.ok || !res.body) throw new Error("Failed")

      const reader = res.body.getReader()
      const dec = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done: streamDone, value } = await reader.read()
        if (streamDone) break
        buffer += dec.decode(value, { stream: true })
        const lines = buffer.split("\n\n")
        buffer = lines.pop() ?? ""
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          try {
            const event = JSON.parse(line.slice(6))
            if (event.type === "delta") setOutput(prev => prev + event.text)
            if (event.type === "done") setDone(true)
          } catch {}
        }
      }
      if (!done) setDone(true)
    } catch {
      toast.error("Demo failed — try signing up for the full experience.")
      setOutput("// Something went wrong. Sign up for free to generate code with FORGE.")
      setDone(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Try FORGE</h1>
      <p className="text-zinc-400 mb-8 max-w-2xl">See real Claude-generated code in under 30 seconds. No signup required to watch — sign up free to generate your own.</p>

      <div className="rounded-2xl border border-zinc-800 p-6 mb-6">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Demo prompt</p>
        <p className="text-sm text-zinc-300 italic">&ldquo;{DEMO_PROMPT}&rdquo;</p>
      </div>

      {!output && !loading && (
        <button
          onClick={runDemo}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400"
        >
          <Sparkles className="w-4 h-4" /> Run demo
        </button>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-orange-400 mb-4">
          <Loader2 className="w-4 h-4 animate-spin" /> Generating with Claude...
        </div>
      )}

      {output && (
        <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-300 h-[400px] overflow-auto whitespace-pre-wrap mb-6">
          {output}
        </pre>
      )}

      {done && (
        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 text-center">
          <p className="text-lg font-semibold mb-2">Like what you see?</p>
          <p className="text-sm text-zinc-400 mb-4">Sign up free and generate your own apps — 5 per day, no credit card.</p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400"
          >
            Get started free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
