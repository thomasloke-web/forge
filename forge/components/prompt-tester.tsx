'use client'

import { useState } from 'react'

type Score = {
  overall: number
  specificity: number
  techStack: number
  dataModel: number
  businessLogic: number
  feedback: string[]
  improved: string
}

const EXAMPLE_PROMPT = 'Build me a SaaS app with auth and payments'

export default function PromptTester() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Score | null>(null)
  const [error, setError] = useState('')
  const [streaming, setStreaming] = useState('')

  async function analyzePrompt() {
    if (prompt.trim().length < 10) return
    setLoading(true)
    setResult(null)
    setError('')
    setStreaming('')

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Analyze this AI app builder prompt and score it. Return ONLY valid JSON, no other text.

Prompt: "${prompt}"

Score these dimensions 0-100:
- specificity: how specific are the requirements?
- techStack: does it specify framework, database, auth?
- dataModel: does it describe the data/entities?
- businessLogic: does it explain the business rules?

Overall = average of above.

Return exactly this JSON structure:
{
  "overall": number,
  "specificity": number,
  "techStack": number,
  "dataModel": number,
  "businessLogic": number,
  "feedback": ["specific improvement 1", "specific improvement 2", "specific improvement 3"],
  "improved": "rewritten version of the prompt that would score 90+"
}`
          }],
        }),
      })

      if (!res.ok) {
        setError('Analysis unavailable. Try again.')
        return
      }

      const data = await res.json()
      const text = data.content?.[0]?.text ?? ''
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as Score
        setResult(parsed)
      } else {
        setError('Could not parse result. Try again.')
      }
    } catch {
      setError('Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function getColor(score: number) {
    if (score >= 80) return 'text-[--forge-green]'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  function getBarColor(score: number) {
    if (score >= 80) return 'bg-[--forge-green]'
    if (score >= 50) return 'bg-yellow-400'
    return 'bg-red-400'
  }

  return (
    <div className="rounded-xl border border-[--border] bg-[--surface-1] overflow-hidden">
      <div className="p-6">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder={EXAMPLE_PROMPT}
          rows={4}
          className="w-full bg-[--surface-2] border border-[--border] rounded-lg px-4 py-3 text-sm text-[--text-primary] placeholder:text-[--text-muted] resize-none forge-input"
          aria-label="App prompt to analyze"
        />
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-[--text-muted]">{prompt.length} characters</p>
          <button
            onClick={analyzePrompt}
            disabled={loading || prompt.trim().length < 10}
            className="px-5 py-2 bg-[--forge-green] text-black text-sm font-medium rounded-lg hover:bg-[--forge-green-dim] disabled:opacity-40 transition-colors"
          >
            {loading ? 'Analysing...' : 'Score my prompt →'}
          </button>
        </div>
      </div>

      {error && (
        <div className="px-6 pb-6">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="border-t border-[--border] p-6 space-y-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className={`text-5xl font-mono font-medium ${getColor(result.overall)}`}>
              {result.overall}
            </div>
            <div>
              <p className="text-[--text-primary] font-medium">Overall score</p>
              <p className="text-sm text-[--text-secondary]">
                {result.overall >= 80 ? 'Strong prompt — ready to build' : result.overall >= 50 ? 'Decent — a few improvements needed' : 'Needs work — too vague for good code'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {([
              ['Specificity', result.specificity],
              ['Tech stack', result.techStack],
              ['Data model', result.dataModel],
              ['Business logic', result.businessLogic],
            ] as [string, number][]).map(([label, score]) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[--text-secondary]">{label}</span>
                  <span className={getColor(score)}>{score}</span>
                </div>
                <div className="h-1.5 bg-[--surface-3] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getBarColor(score)}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs text-[--text-muted] uppercase tracking-wider mb-3">Improvements</p>
            <ul className="space-y-2">
              {result.feedback.map((f, i) => (
                <li key={i} className="flex gap-2 text-sm text-[--text-secondary]">
                  <span className="text-yellow-400 mt-0.5 shrink-0">→</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-[--text-muted] uppercase tracking-wider mb-3">Improved version</p>
            <div className="p-4 bg-[--surface-2] rounded-lg border border-[--forge-green]/20">
              <p className="text-sm text-[--text-secondary] leading-relaxed whitespace-pre-wrap">{result.improved}</p>
            </div>
            <button
              onClick={() => { setPrompt(result.improved); setResult(null) }}
              className="mt-3 text-xs text-[--forge-green] hover:text-[--forge-green-dim] transition-colors"
            >
              Use improved prompt →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
