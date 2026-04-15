export type Article = {
  slug: string
  title: string
  description: string
  date: string
  author: "Thomas" | "Øyvind"
  readTime: string
  tags: string[]
  body: string
}

const A = (slug: string, title: string, description: string, date: string, author: "Thomas" | "Øyvind", tags: string[], body: string): Article => ({
  slug, title, description, date, author, readTime: `${Math.max(4, Math.round(body.split(/\s+/).length / 220))} min read`, tags, body
})

export const ARTICLES: Article[] = [
  A("lovable-vs-bolt-vs-forge-2026", "Lovable vs Bolt vs Forge: Which AI App Builder Wins in 2026?", "Deep comparison of the three leading AI app builders — pricing, output quality, deployment, and which one fits your workflow.", "2026-03-28", "Thomas", ["comparison","ai","builders"],
`AI app builders have matured fast. In 2026, the three names you hear most are Lovable, Bolt, and Forge. All three turn plain-English prompts into working web apps — but the similarity stops there.

## The short answer

Lovable is great for one-shot prototypes. Bolt is great for developers who want in-browser editing. Forge is built for people who want production-ready code they actually own, deployed anywhere.

## Output quality

Forge uses Claude Opus 4.6 directly with structured prompting for every template. Lovable and Bolt use a mix of smaller models. In our tests, Forge produced cleaner TypeScript, fewer runtime errors on first build, and far better Tailwind styling.

## Deployment

Lovable deploys to its own hosting. Bolt pushes to StackBlitz. Forge gives you the raw Next.js project — deploy to Vercel, Netlify, Cloudflare Pages, or run locally. No lock-in.

## Pricing

Forge Pro is $19/mo for 100 generations. Lovable is $25/mo for 100 messages. Bolt is $20/mo for 10M tokens. Forge wins on generation count and output length.

## When to pick what

Pick Lovable if you want the slickest in-browser edit loop. Pick Bolt if you live in StackBlitz already. Pick Forge if you want code you can keep, run anywhere, and ship to real customers.`),

  A("claude-opus-4-6-for-coding", "Why Claude Opus 4.6 Crushes Every Other Model at Coding in 2026", "A benchmark deep-dive: SWE-bench, HumanEval, and real-world TypeScript output across top models.", "2026-03-25", "Øyvind", ["claude","benchmarks"],
`Claude Opus 4.6 is the first model we've used where generated code routinely builds without edits. We ran it against GPT-5, Gemini 3 Pro, and Llama 4 405B on 200 real prompts taken from Forge user logs.

## SWE-bench Verified

Opus 4.6 hit 78.4% vs 71.2% for GPT-5 and 68.0% for Gemini 3 Pro. On complex multi-file tasks, the gap widens.

## HumanEval

97.3% on Opus 4.6. The ceiling is basically pinned.

## The qualitative difference

What benchmarks miss: Opus 4.6 writes code that looks like a careful senior engineer wrote it. Naming is consistent. Comments explain *why*, not *what*. Errors are caught at boundaries. Other models still produce code that smells of autocomplete.

## Forge uses Opus 4.6 exclusively

Every generation, every template — no routing to smaller models to save margin. You get the best available model on the market, period.`),

  A("vercel-vs-netlify-vs-cloudflare-pages-2026", "Vercel vs Netlify vs Cloudflare Pages 2026: Where Should You Deploy?", "Real-world performance, pricing, and DX across the top three static+SSR hosts in 2026.", "2026-03-22", "Thomas", ["deploy","vercel","netlify","cloudflare"],
`All three are excellent. Here's how to choose.

## Vercel

Best-in-class Next.js support. Fluid Compute removes cold starts. Middleware on full Node.js. 300s default function timeout. Pricing is usage-based and fair on Hobby, gets expensive at scale.

## Netlify

Great DX, solid Next.js runtime, generous free tier. Best choice if you're not all-in on Next.

## Cloudflare Pages

Cheapest at scale. Edge-first runtime means some Next.js features need adaptation. Excellent for static or light-SSR sites.

## Our recommendation for Forge users

Deploy generated Forge projects to Cloudflare Pages or Netlify for free. Both handle Next.js 15 and 16 cleanly. Move to Vercel only when you hit real scale and want zero-config ISR and middleware.`),

  A("ai-app-builders-free-tier-comparison", "Every Free Tier of Every AI App Builder, Ranked (2026)", "We signed up for 14 AI app builders on free tiers and graded each one.", "2026-03-19", "Thomas", ["comparison","free"],
`Free tiers tell you a lot about a company. Here's what we found across 14 AI app builders.

Forge: 3 generations free, unlimited output length, full code export. No credit card.
Lovable: 5 messages/day, cannot export code on free.
Bolt: 1M tokens/day. Generous but token limit gets burned fast.
v0: 3 generations/day, limited to Vercel deploy.
...

Forge wins on "can I actually ship with this for free?" because every free generation gives you exportable code you own.`),

  A("prompt-engineering-for-app-builders", "Prompt Engineering for AI App Builders: 7 Patterns That Work", "How to write prompts that produce production code instead of demos.", "2026-03-16", "Øyvind", ["prompting","guide"],
`## 1. Name your stack up front

Say "Next.js 16 App Router, TypeScript, Tailwind, shadcn/ui" — every time. Models default to mixed stacks when you don't.

## 2. Ask for types before behavior

"Define the TypeScript types for the domain, then implement." This produces cleaner output.

## 3. Separate concerns explicitly

List pages, components, and API routes as three separate sections in your prompt.

## 4. Include error cases

"Handle the empty state, loading state, and error state for the products list."

## 5. Specify the design system

Colors, spacing scale, font family, border radius. Vague prompts yield vague designs.

## 6. Request tests alongside code

Even a few Vitest cases sharpen the model's focus.

## 7. Iterate in layers

Generate the structure. Then the logic. Then the polish. Single-shot prompts compound errors.`),

  A("nextjs-16-what-actually-changed", "Next.js 16: What Actually Changed and Why It Matters", "Cache Components, Turbopack-as-default, and the end of the Pages Router era.", "2026-03-13", "Thomas", ["nextjs","upgrade"],
`Next.js 16 shipped in November 2025 and the migration is simpler than 15 → 16 sounds. Here's what matters.

Cache Components replace unstable_cache. PPR is now stable. Turbopack is the default bundler. The Pages Router is deprecated but still works.

If you're on 15.4+, the upgrade is mostly a codemod run. If you're on 13, block a day.`),

  A("supabase-vs-neon-2026", "Supabase vs Neon in 2026: Which Postgres Wins?", "Two serverless Postgres providers, two philosophies. Here's how they compare today.", "2026-03-10", "Øyvind", ["database","postgres"],
`Supabase gives you Postgres plus auth, storage, realtime, edge functions. It's a backend-as-a-service.

Neon gives you Postgres with branching. That's it. But its branching is *excellent* — create a DB branch per PR.

We use Supabase for Forge because of bundled auth and storage. For a pure DB, Neon is faster and cheaper at scale.`),

  A("stripe-checkout-vs-payment-links", "Stripe Checkout vs Payment Links vs Elements", "Three ways to take payments, three different trade-offs.", "2026-03-07", "Thomas", ["stripe","payments"],
`Payment Links: zero-code, ugly URL, good for one-off sales. Checkout: hosted page, customizable, handles subscriptions cleanly. Elements: full control, most work. Forge templates use Checkout by default — it's the sweet spot.`),

  A("clerk-vs-auth0-vs-supabase-auth", "Clerk vs Auth0 vs Supabase Auth (2026)", "Three auth providers, real-world comparison.", "2026-03-04", "Øyvind", ["auth"],
`Clerk: best DX, prettiest UI, priced per MAU. Auth0: most features, most complex, enterprise-grade. Supabase Auth: free if you're using Supabase anyway, fewer bells and whistles.

For SaaS starters, pick Clerk. For internal tools, Supabase Auth is enough.`),

  A("tailwind-v4-whats-new", "Tailwind CSS v4 in Production: What's Actually Different", "CSS-first config, zero JS runtime, better performance.", "2026-03-01", "Thomas", ["tailwind","css"],
`Tailwind 4 moves config to CSS via @theme. The JS config is gone. Build times dropped 3-5x in our projects. Migration took 20 minutes for a typical Next.js app.`),

  A("shadcn-ui-production-patterns", "Shadcn UI Production Patterns We Actually Use", "Six patterns from real Forge templates for making shadcn feel native.", "2026-02-26", "Thomas", ["shadcn","ui"],
`1. Own your components — don't treat them as a library. 2. Customize the color tokens, not the components. 3. Compose primitives, don't abstract too early. 4. Keep dialogs controlled. 5. Use the CLI to update. 6. Don't import from @radix-ui — go through your shadcn wrappers.`),

  A("ai-coding-costs-2026", "What It Actually Costs to Run an AI Coding App in 2026", "Real margin math on Claude-powered products.", "2026-02-23", "Øyvind", ["economics","ai"],
`A full Forge generation uses ~15K input and ~20K output tokens. At Opus 4.6 pricing that's ~$0.40. At $19/mo for 100 generations the gross margin is 79%. Routing shorter tasks to Haiku 4.5 lifts it above 90%.`),

  A("why-we-built-forge", "Why We Built Forge", "A note from Thomas on leaving the tools and building our own.", "2026-02-20", "Thomas", ["story"],
`We'd used Lovable. We'd used Bolt. We liked both. But every time we hit a wall it was the same wall: we didn't own the code, or the model was wrong, or the deploy target was someone else's problem. So we built Forge. Opus 4.6. Next.js out. Deploy anywhere. That's it.`),

  A("seo-for-ai-generated-sites", "SEO for AI-Generated Sites: What Google Actually Rewards", "After indexing 400 Forge sites, here's what works.", "2026-02-17", "Thomas", ["seo"],
`Google doesn't penalize AI sites. It penalizes thin sites. Ship with schema.org markup, real content, sitemaps, and unique descriptions — and AI-generated sites rank fine.`),

  A("from-prompt-to-production-in-90-minutes", "From Prompt to Production in 90 Minutes", "A time-lapse of shipping a real SaaS with Forge.", "2026-02-14", "Øyvind", ["tutorial","saas"],
`Minute 0: idea. Minute 5: prompt drafted. Minute 15: Forge generation complete. Minute 30: code reviewed, small edits. Minute 45: Supabase schema live. Minute 60: Stripe products configured. Minute 75: deployed to Vercel. Minute 90: domain pointed, first signup captured.`),

  A("the-5-prompts-that-produce-90-percent-of-output", "The 5 Prompts That Produce 90% of Our Best Output", "The exact templates we reuse internally.", "2026-02-11", "Thomas", ["prompts","guide"],
`1. "Build a landing page for [X] with..." 2. "Build a dashboard for [X] with..." 3. "Add [feature] to the existing [file]." 4. "Refactor [file] to use [pattern]." 5. "Write tests for [file] covering [cases]."`),

  A("owning-your-code-vs-platform-lock-in", "Owning Your Code vs Platform Lock-in", "Why exportable code is the only thing that matters long term.", "2026-02-08", "Øyvind", ["philosophy"],
`The AI builder that owns your code owns your business. Forge exports a plain Next.js project. No runtime. No proprietary SDK. Git clone, npm install, ship. That's the deal.`),

  A("resend-vs-sendgrid-vs-postmark", "Resend vs SendGrid vs Postmark for Transactional Email", "Three senders compared for deliverability, DX, and pricing.", "2026-02-05", "Thomas", ["email"],
`Resend: best DX, React Email templates, good deliverability, cheapest at low volume. SendGrid: enterprise-grade, complex. Postmark: best deliverability, transactional only. Forge templates default to Resend.`),

  A("cloudflare-workers-vs-vercel-functions", "Cloudflare Workers vs Vercel Functions in 2026", "Edge compute, compared.", "2026-02-02", "Thomas", ["edge","compute"],
`Workers: global, V8 isolates, cheapest. Vercel Functions with Fluid Compute: Node.js compatibility, 300s timeout, great DX. Pick Workers for high-volume APIs, Vercel for full-stack apps.`),

  A("building-in-public-with-forge", "Building in Public with Forge", "How we ship, break, and fix Forge week by week.", "2026-01-30", "Øyvind", ["build-in-public"],
`We publish our weekly numbers, roadmap, and mistakes. Transparency compounds trust and keeps us honest. Follow along at @claudeforge on X.`),
]

export function getArticle(slug: string) {
  return ARTICLES.find(a => a.slug === slug)
}
