import type { Metadata } from "next"

export const revalidate = 86400

export const metadata: Metadata = {
  title: "How FORGE Works",
  description: "Our methodology: how FORGE generates production-ready Next.js apps from plain English using Claude AI.",
}

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 prose prose-invert">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">How FORGE Works</h1>
      <p className="text-lg text-zinc-400 leading-relaxed mb-10">
        FORGE transforms plain-English prompts into production-ready Next.js applications. Here&apos;s how.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">1. Prompt engineering</h2>
      <p className="text-zinc-300 leading-relaxed">
        Every generation starts with a carefully crafted system prompt that enforces strict quality standards: TypeScript strict mode with zero <code>any</code> types, Tailwind CSS only, Next.js 15 App Router conventions, proper image handling with <code>next/image</code>, and SEO metadata on every route.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Model selection by plan</h2>
      <p className="text-zinc-300 leading-relaxed">
        Free users generate with Claude Haiku (fast, efficient, 1,500 tokens). Pro users get Claude Sonnet (balanced quality, 4,000 tokens). Agency users access Claude Opus — Anthropic&apos;s most capable model — with 8,000 tokens of output.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Real-time streaming</h2>
      <p className="text-zinc-300 leading-relaxed">
        Code streams to your browser as Claude generates it, using Server-Sent Events. You see tokens arrive live — no waiting for the full response. Token counts and model info display when generation completes.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Quality standards</h2>
      <p className="text-zinc-300 leading-relaxed">
        Every generated project includes: <code>generateMetadata()</code> on every route, <code>app/sitemap.ts</code>, <code>app/robots.ts</code>, error boundaries, a <code>.env.example</code>, and a README with deploy instructions for Vercel, Cloudflare Pages, and Netlify. Dark navy backgrounds and inline styles are explicitly forbidden.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. You own the code</h2>
      <p className="text-zinc-300 leading-relaxed">
        Generated code is a clean Next.js project with no runtime dependency on FORGE. Download the ZIP, push to your own GitHub, deploy anywhere. There is no lock-in, no proprietary SDK, no phone-home.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Who built this</h2>
      <p className="text-zinc-300 leading-relaxed">
        FORGE is built by Thomas and Øyvind at NorwegianSpark SA. Thomas is a former electrician and house builder who started coding in 2023. Øyvind handles systems and numbers. We use the best available AI model, charge fairly, and don&apos;t lock you in.
      </p>

      <p className="mt-12 text-xs text-zinc-500">NorwegianSpark SA · Org no: 834 984 172</p>
    </div>
  )
}
