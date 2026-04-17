"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Copy, Key, RefreshCw, Trash2 } from "lucide-react"

export default function ApiKeyPage() {
  const [hasKey, setHasKey] = useState(false)
  const [keyPreview, setKeyPreview] = useState<string | null>(null)
  const [fullKey, setFullKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/agency/api-key")
      .then(r => r.json())
      .then(d => {
        setHasKey(d.hasKey)
        setKeyPreview(d.keyPreview)
      })
      .catch(() => toast.error("Failed to load API key info"))
      .finally(() => setLoading(false))
  }, [])

  async function generateKey() {
    const res = await fetch("/api/agency/api-key", { method: "POST" })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      return toast.error(d.error ?? "Failed to generate key")
    }
    const { apiKey } = await res.json()
    setFullKey(apiKey)
    setHasKey(true)
    setKeyPreview(`${apiKey.slice(0, 8)}...`)
    toast.success("API key generated — copy it now, it won't be shown again")
  }

  async function revokeKey() {
    await fetch("/api/agency/api-key", { method: "DELETE" })
    setHasKey(false)
    setKeyPreview(null)
    setFullKey(null)
    toast.success("API key revoked")
  }

  function copyKey() {
    if (fullKey) {
      navigator.clipboard.writeText(fullKey)
      toast.success("Copied to clipboard")
    }
  }

  if (loading) return <div className="mx-auto max-w-4xl px-5 py-16 text-zinc-500">Loading...</div>

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-3">API Access</h1>
      <p className="text-zinc-400 mb-10">Use your API key to generate code programmatically.</p>

      <div className="rounded-2xl border border-zinc-800 p-6 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-5 h-5 text-orange-400" />
          <h2 className="font-semibold">Your API Key</h2>
        </div>

        {fullKey ? (
          <div className="flex items-center gap-3">
            <code className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm font-mono text-green-400">
              {fullKey}
            </code>
            <button onClick={copyKey} className="p-2 rounded-lg border border-zinc-800 hover:border-zinc-600" title="Copy">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        ) : hasKey ? (
          <p className="text-sm text-zinc-400">Key: <code className="text-zinc-300">{keyPreview}</code></p>
        ) : (
          <p className="text-sm text-zinc-500">No API key generated yet.</p>
        )}

        <div className="mt-4 flex gap-3">
          <button
            onClick={generateKey}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-zinc-950 text-sm font-medium hover:bg-orange-400"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {hasKey ? "Regenerate" : "Generate key"}
          </button>
          {hasKey && (
            <button
              onClick={revokeKey}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-800 text-red-400 text-sm hover:border-red-600"
            >
              <Trash2 className="w-3.5 h-3.5" /> Revoke
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 p-6">
        <h2 className="font-semibold mb-4">Quick start</h2>
        <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-300 overflow-x-auto whitespace-pre">{`curl -X POST https://claudeforge.shop/api/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Build a landing page with pricing table",
    "style": "minimal"
  }'`}</pre>
        <h3 className="font-medium mt-6 mb-2 text-sm">Response</h3>
        <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-300 overflow-x-auto whitespace-pre">{`{
  "code": "// Generated Next.js code...",
  "model": "claude-sonnet-4-6",
  "usage": {
    "inputTokens": 1234,
    "outputTokens": 5678,
    "costCents": 12
  }
}`}</pre>
        <h3 className="font-medium mt-6 mb-2 text-sm">Parameters</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-zinc-500 border-b border-zinc-800">
              <th className="py-2 pr-4 font-medium">Field</th>
              <th className="py-2 px-4 font-medium">Type</th>
              <th className="py-2 px-4 font-medium">Required</th>
              <th className="py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            <tr className="border-b border-zinc-900"><td className="py-2 pr-4 font-mono text-xs">prompt</td><td className="py-2 px-4">string</td><td className="py-2 px-4">Yes</td><td className="py-2">What to build</td></tr>
            <tr className="border-b border-zinc-900"><td className="py-2 pr-4 font-mono text-xs">template</td><td className="py-2 px-4">string</td><td className="py-2 px-4">No</td><td className="py-2">Template ID</td></tr>
            <tr className="border-b border-zinc-900"><td className="py-2 pr-4 font-mono text-xs">style</td><td className="py-2 px-4">string</td><td className="py-2 px-4">No</td><td className="py-2">Design style</td></tr>
            <tr className="border-b border-zinc-900"><td className="py-2 pr-4 font-mono text-xs">model</td><td className="py-2 px-4">{`"sonnet" | "opus"`}</td><td className="py-2 px-4">No</td><td className="py-2">Default: sonnet</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
