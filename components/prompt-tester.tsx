"use client"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2, Sparkles } from "lucide-react"
import { TEMPLATES } from "@/lib/templates"

export default function PromptTester() {
  const [prompt, setPrompt] = useState("")
  const [template, setTemplate] = useState("")
  const [style, setStyle] = useState("minimal")
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState("")

  async function onGenerate() {
    if (!prompt.trim()) return toast.error("Enter a prompt first")
    setLoading(true)
    setOutput("")
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt, template, style }),
      })
      if (!res.ok || !res.body) throw new Error("Failed")
      const reader = res.body.getReader()
      const dec = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setOutput(prev => prev + dec.decode(value))
      }
      toast.success("Generation complete")
    } catch {
      toast.error("Generation failed. Check your plan or try again.")
    } finally {
      setLoading(false)
    }
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
        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Output</label>
        <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-300 h-[420px] overflow-auto whitespace-pre-wrap">{output || "// Output will stream here..."}</pre>
      </div>
    </div>
  )
}
