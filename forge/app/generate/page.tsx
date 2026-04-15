'use client'

import { useState, useRef } from 'react'
import Nav from '@/components/nav'
import { templates } from '@/lib/templates'
import { useAuth } from '@clerk/nextjs'

type Step = 'prompt' | 'generating' | 'done'

const STYLES = [
  { id: 'minimal', label: 'Minimal', desc: 'Clean, dark, lots of whitespace' },
  { id: 'professional', label: 'Professional', desc: 'Light theme, business-ready' },
  { id: 'bold', label: 'Bold', desc: 'Strong colours, high contrast' },
  { id: 'soft', label: 'Soft', desc: 'Pastel tones, rounded corners' },
]

export default function GeneratePage() {
  const { isSignedIn } = useAuth()
  const [step, setStep] = useState<Step>('prompt')
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('minimal')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const outputRef = useRef<HTMLDivElement>(null)

  async function handleGenerate() {
    if (prompt.trim().length < 10) return
    setStep('generating')
    setOutput('')
    setError('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style, templateId: selectedTemplate }),
      })

      if (!res.ok) {
        const data = await res.json()
        if (data.upgradeUrl) {
          setError(`${data.error} — `)
        } else {
          setError(data.error ?? 'Generation failed. Please try again.')
        }
        setStep('prompt')
        return
      }

      if (!res.body) { setError('No response body'); setStep('prompt'); return }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const text = parsed.delta?.text ?? ''
              if (text) {
                accumulated += text
                setOutput(accumulated)
                if (outputRef.current) {
                  outputRef.current.scrollTop = outputRef.current.scrollHeight
                }
              }
            } catch { /* non-JSON lines */ }
          }
        }
      }

      setStep('done')
    } catch {
      setError('Something went wrong. Please try again.')
      setStep('prompt')
    }
  }

  function handleDownload() {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'forge-output.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleCopy() {
    navigator.clipboard.writeText(output)
  }

  return (
    <>
      <Nav />
      <div className="pt-14 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-12">

          {step === 'prompt' && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h1 className="text-3xl font-medium text-[--text-primary] mb-2">Build something</h1>
                <p className="text-[--text-secondary]">Describe your app in detail. The more specific, the better the output.</p>
              </div>

              {/* Template picker */}
              <div className="mb-6">
                <p className="text-sm text-[--text-muted] mb-3">Start from a template (optional)</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  <button
                    onClick={() => { setSelectedTemplate(null); setPrompt('') }}
                    className={`p-3 rounded-lg border text-left transition-colors text-sm ${!selectedTemplate ? 'border-[--forge-green] bg-[--forge-green]/5 text-[--forge-green]' : 'border-[--border] text-[--text-muted] hover:border-[--border-bright]'}`}
                  >
                    Blank canvas
                  </button>
                  {templates.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setSelectedTemplate(t.id); setPrompt(t.prompt) }}
                      className={`p-3 rounded-lg border text-left transition-colors ${selectedTemplate === t.id ? 'border-[--forge-green] bg-[--forge-green]/5' : 'border-[--border] hover:border-[--border-bright]'}`}
                    >
                      <span className="block text-sm font-medium text-[--text-primary]">{t.name}</span>
                      <span className="block text-xs text-[--text-muted] mt-0.5">{t.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt */}
              <div className="mb-6">
                <label htmlFor="prompt" className="block text-sm text-[--text-muted] mb-2">
                  Describe your app
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  rows={8}
                  placeholder="Build a SaaS feedback tool. Next.js 15, Clerk auth, Supabase. Users create feedback boards with shareable links. Anyone with the link can submit feedback without signing in. Dashboard shows submissions sorted by votes. Email notification on new submission via Resend..."
                  className="w-full bg-[--surface-1] border border-[--border] rounded-xl px-4 py-4 text-sm text-[--text-primary] placeholder:text-[--text-muted] resize-none forge-input leading-relaxed"
                />
                <div className="flex justify-between mt-2 text-xs text-[--text-muted]">
                  <span>{prompt.length} chars · aim for 200+ for best results</span>
                  <span>{isSignedIn ? 'Saved to your account' : '3 free generations · sign up for more'}</span>
                </div>
              </div>

              {/* Style */}
              <div className="mb-8">
                <p className="text-sm text-[--text-muted] mb-3">Design style</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {STYLES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`p-3 rounded-lg border text-left transition-colors ${style === s.id ? 'border-[--forge-green] bg-[--forge-green]/5' : 'border-[--border] hover:border-[--border-bright]'}`}
                    >
                      <span className="block text-sm font-medium text-[--text-primary]">{s.label}</span>
                      <span className="block text-xs text-[--text-muted] mt-0.5">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

              <button
                onClick={handleGenerate}
                disabled={prompt.trim().length < 10}
                className="w-full py-3.5 bg-[--forge-green] text-black font-medium rounded-xl hover:bg-[--forge-green-dim] disabled:opacity-40 transition-colors text-sm"
              >
                Generate app →
              </button>
            </div>
          )}

          {(step === 'generating' || step === 'done') && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-medium text-[--text-primary]">
                    {step === 'generating' ? 'Generating your app...' : 'Done — your app is ready'}
                  </h2>
                  <p className="text-sm text-[--text-secondary] mt-1">
                    {step === 'generating' ? 'Claude is writing your Next.js code' : 'Copy or download, then deploy to Cloudflare Pages'}
                  </p>
                </div>
                {step === 'done' && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 border border-[--border] text-[--text-secondary] hover:text-[--text-primary] text-sm rounded-lg transition-colors"
                    >
                      Copy
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-[--forge-green] text-black text-sm font-medium rounded-lg hover:bg-[--forge-green-dim] transition-colors"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => setStep('prompt')}
                      className="px-4 py-2 border border-[--border] text-[--text-secondary] hover:text-[--text-primary] text-sm rounded-lg transition-colors"
                    >
                      Build another
                    </button>
                  </div>
                )}
              </div>

              <div
                ref={outputRef}
                className="bg-[--surface-1] border border-[--border] rounded-xl p-6 h-[600px] overflow-y-auto font-mono text-xs text-[--forge-green] leading-relaxed whitespace-pre-wrap"
              >
                {output || <span className="text-[--text-muted]">Starting generation<span className="cursor" /></span>}
                {step === 'generating' && output && <span className="cursor" />}
              </div>

              {step === 'done' && (
                <div className="mt-6 p-5 rounded-xl border border-[--border] bg-[--surface-1]">
                  <p className="text-sm font-medium text-[--text-primary] mb-3">Deploy to Cloudflare Pages — free</p>
                  <ol className="space-y-2 text-sm text-[--text-secondary]">
                    <li>1. Save each file from the output above into your local project folder</li>
                    <li>2. Run <code className="font-mono text-xs bg-[--surface-3] px-1.5 py-0.5 rounded text-[--forge-green]">npm install</code> then <code className="font-mono text-xs bg-[--surface-3] px-1.5 py-0.5 rounded text-[--forge-green]">npm run build</code> to verify</li>
                    <li>3. Push to GitHub, then go to <a href="https://pages.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-[--forge-green] hover:underline">Cloudflare Pages</a> and connect your repo</li>
                    <li>4. Add your environment variables and deploy — it&apos;s free</li>
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
