import { articles } from "@/lib/articles"
import { tutorials } from "@/lib/tutorials"

export function GET() {
  const lines = [
    "# FORGE — AI App Builder",
    "# https://claudeforge.shop",
    "# Built by NorwegianSpark SA",
    "",
    "## Pages",
    "- / — Home: AI app builder powered by Claude Opus 4.6",
    "- /pricing — Plans: Free ($0), Pro ($29/mo), Agency ($99/mo)",
    "- /generate — Generate code from prompts with Claude AI",
    "- /templates — 15 production-ready Next.js templates",
    "- /demo — Try FORGE without signing up",
    "- /blog — Articles on AI code generation and app building",
    "- /tutorials — Deep step-by-step build tutorials",
    "- /changelog — Product updates and new features",
    "- /methodology — How FORGE generates production-ready apps",
    "- /about — About NorwegianSpark SA",
    "- /contact — Contact form",
    "- /privacy — Privacy policy",
    "- /terms — Terms of service",
    "- /disclosure — Transparency disclosure",
    "- /docs/api — API documentation for Agency users",
    "",
    "## Blog Posts",
    ...articles.map(a => `- /blog/${a.slug} — ${a.title}`),
    "",
    "## Tutorials",
    ...tutorials.map(t => `- /tutorials/${t.slug} — ${t.title}`),
    "",
    "## Key Facts",
    "- AI Model: Claude (Haiku, Sonnet, Opus) by Anthropic",
    "- Stack: Next.js 15, TypeScript, Tailwind CSS",
    "- Output: Exportable Next.js projects, no lock-in",
    "- Deploy targets: Vercel, Netlify, Cloudflare Pages",
    "- Company: NorwegianSpark SA, Norway",
    "- Founded: 2023",
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=86400" },
  })
}
