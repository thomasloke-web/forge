"use client"
import { useState } from "react"
import { toast } from "sonner"
import { Copy, Download, Loader2, Sparkles } from "lucide-react"
import { TEMPLATES } from "@/lib/templates"

type Stats = {
  model: string
  inputTokens: number
  outputTokens: number
  costCents: number
} | null

export default function PromptTester() {
  const [prompt, setPrompt] = useState("")
  const [template, setTemplate] = useState("")
  const [style, setStyle] = useState("minimal")
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState("")
  const [stats, setStats] = useState<Stats>(null)

  async function onGenerate() {
    if (!prompt.trim()) return toast.error("Enter a prompt first")
    setLoading(true)
    setOutput("")
    setStats(null)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt, template, style }),
      })

      if (res.status === 429) {
        toast.error("Daily generation limit reached. Upgrade your plan for more.")
        return
      }
      if (res.status === 503) {
        toast.error("Service temporarily at capacity. Try again later.")
        return
      }
      if (!res.ok || !res.body) throw new Error("Failed")

      const reader = res.body.getReader()
      const dec = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += dec.decode(value, { stream: true })

        const lines = buffer.split("\n\n")
        buffer = lines.pop() ?? ""

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const jsonStr = line.slice(6)
          try {
            const event = JSON.parse(jsonStr)
            if (event.type === "delta") {
              setOutput(prev => prev + event.text)
            } else if (event.type === "done") {
              setStats({
                model: event.model,
                inputTokens: event.inputTokens,
                outputTokens: event.outputTokens,
                costCents: event.costCents,
              })
            } else if (event.type === "error") {
              toast.error(event.message ?? "Generation failed")
            }
          } catch {}
        }
      }

      toast.success("Generation complete")
    } catch {
      toast.error("Generation failed. Check your plan or try again.")
    } finally {
      setLoading(false)
    }
  }

  function copyOutput() {
    navigator.clipboard.writeText(output)
    toast.success("Copied to clipboard")
  }

  function downloadZip() {
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "forge-output.tsx"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Template</label>
          <select value={template} onChange={e => setTemplate(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 outline-none">
            <option value="">None — free-form</option>
            {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Style</label>
          <div className="flex gap-2 flex-wrap">
            {["minimal","playful","dense","brutalist","editorial"].map(s => (
              <button key={s} onClick={() => setStyle(s)} className={`px-3 py-1.5 rounded-full text-xs border ${style === s ? "bg-orange-500 text-zinc-950 border-orange-500" : "border-zinc-800 text-zinc-400 hover:border-zinc-600"}`}>{s}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Prompt</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={8}
            placeholder="Describe what you want to build..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-3 text-sm focus:border-orange-500 outline-none resize-none"
          />
        </div>
        <button
          onClick={onGenerate}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs uppercase tracking-widest text-zinc-500">Output</label>
          {output && (
            <div className="flex gap-2">
              <button onClick={copyOutput} className="p-1.5 rounded border border-zinc-800 hover:border-zinc-600" title="Copy">
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
              </button>
              <button onClick={downloadZip} className="p-1.5 rounded border border-zinc-800 hover:border-zinc-600" title="Download">
                <Download className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          )}
        </div>
        <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-300 h-[420px] overflow-auto whitespace-pre-wrap">{output || "// Output will stream here..."}</pre>
        {stats && (
          <div className="mt-2 flex gap-4 text-[11px] text-zinc-500">
            <span>Model: {stats.model}</span>
            <span>In: {stats.inputTokens.toLocaleString()} tokens</span>
            <span>Out: {stats.outputTokens.toLocaleString()} tokens</span>
          </div>
        )}
      </div>
    </div>
  )
}
