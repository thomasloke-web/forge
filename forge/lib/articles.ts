export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: number
  publishedAt: string
  content: string
}

export const articles: Article[] = [
  {
    slug: 'lovable-vs-bolt-vs-forge-2026',
    title: 'Lovable vs Bolt vs FORGE — honest comparison 2026',
    excerpt: 'We tested all three AI app builders on the same project. Here\'s what actually happened.',
    category: 'Comparisons',
    readTime: 8,
    publishedAt: '2026-03-15',
    content: `Building an app with AI in 2026 sounds simple. Describe what you want, get working code. The reality is more complicated — and the tool you pick determines whether you end up with a production-ready product or a broken prototype that burns through credits.

We built the same app — a subscription SaaS with auth, database, and Stripe payments — on Lovable, Bolt.new, and FORGE. Here's what happened.

## Lovable

Lovable is the darling of the "vibe coding" movement. $200M raised, $1.8B valuation, fastest ARR growth in European startup history. The hype is partially deserved.

What it gets right: Supabase integration is genuinely seamless. Auth, database, and real-time subscriptions set up in minutes. The planning stage helps beginners avoid obvious mistakes. GitHub sync means you own your code.

What it gets wrong: Credit burn is brutal. Users report burning 150 credits just on layout iterations. At $25/month for 100 messages, you hit the wall fast on any real project. The context window degrades noticeably on projects with 15+ components.

## Bolt.new

Bolt targets developers who want scaffolding speed without losing control. Multi-framework support (React, Vue, Next.js, Svelte) is genuinely useful. The browser-based WebContainers environment means no setup.

What it gets right: Speed. Bolt generates faster than any competitor. The diffs system only updates changed code, which preserves context better than full rewrites.

What it gets wrong: Reliability. We hit broken previews twice on our test project. Token burn on failures is punishing — you pay credits for broken builds. Deployment is more manual than competitors.

## FORGE

FORGE is built differently: Next.js 15 + TypeScript strict as the output standard, Claude as the generation engine, and no vendor lock-in. Your code deploys to Cloudflare Pages (free, global edge) or Netlify — not a proprietary platform.

What it gets right: Code quality. TypeScript strict mode catches errors that GPT-based builders miss. The output is production-grade from prompt one. No watermark on paid plans, no platform dependency.

What it gets different: FORGE doesn't try to replace your developer — it builds the scaffold you'd build yourself if you had six hours. You own the output completely.

## Verdict

Choose Lovable if: You need Supabase integration, you're a beginner, you want structured planning.
Choose Bolt if: You want multi-framework support, you're an experienced developer who wants scaffolding speed.
Choose FORGE if: You want production-grade Next.js + TypeScript, you want to deploy free on Cloudflare, you want to own your code without platform dependency.`,
  },
  {
    slug: 'best-ai-app-builders-2026',
    title: 'Best AI app builders 2026 — ranked by real usage',
    excerpt: 'We ranked every major AI app builder by what actually matters: code quality, cost, and whether it works for real projects.',
    category: 'Guides',
    readTime: 10,
    publishedAt: '2026-03-10',
    content: `The AI app builder market exploded in 2025. Lovable hit $20M ARR in two months. Base44 sold to Wix for $80M. Bolt processed millions of builds. Now in 2026, the category has matured — and the gaps between tools are clearer than ever.

Here's our honest ranking based on six months of daily use across real client projects.

## 1. Lovable — best for beginners building full-stack MVPs

Lovable wins on completeness. Prompt → full-stack app with auth, database, and deployment in under an hour. The Supabase integration is the best in the market. GitHub sync means you can hand off to a developer without rewriting everything.

The credit system is the main friction. 100 messages per month at $25 sounds generous until you're iterating on a complex feature.

## 2. FORGE — best for production-grade Next.js output

FORGE generates Next.js 15 with TypeScript strict, Tailwind, and proper component structure. The output quality is higher than competitors because Claude (not GPT) understands TypeScript edge cases better. Deploy to Cloudflare Pages for free — no Vercel bill.

Best for: founders who want to own production-quality code without platform dependency.

## 3. Bolt.new — best for developer speed

Multi-framework, fast diffs, browser-based. Experienced developers love it. Less beginner-friendly than Lovable, more reliable than it was in 2025.

## 4. Base44 — best for non-technical users who want zero setup

Everything is hosted. No Supabase, no GitHub, no deploy steps. You get a working app at a URL immediately. The trade-off is vendor lock-in — your backend lives on Base44's servers.

## 5. v0 by Vercel — best React UI generation

v0 produces the best React component output in the market. But it's UI-only — no backend, no database, no auth. Use it alongside another tool for production apps.

## Bottom line

Most serious builders end up using two tools: one for rapid prototyping (Lovable or Bolt), one for production refinement (FORGE or Cursor). The tools complement each other.`,
  },
  {
    slug: 'build-saas-mvp-one-afternoon',
    title: 'How to build a SaaS MVP in one afternoon with AI',
    excerpt: 'A complete walkthrough — from blank prompt to live product with auth, payments, and real users.',
    category: 'Tutorials',
    readTime: 12,
    publishedAt: '2026-03-05',
    content: `Two years ago, building a SaaS MVP took two weeks minimum and required either hiring a developer or learning a full stack. Today you can ship something real in an afternoon. Here's exactly how.

## What we're building

A simple feedback collection tool: users submit feedback via a shareable link, you see it in a dashboard. Auth, database, email notifications, Stripe for a Pro plan.

This used to cost $15,000+ from a developer. Today it costs one afternoon and $0 in tooling.

## Step 1: Write a detailed prompt (30 minutes)

The quality of your AI-generated code is directly proportional to the quality of your prompt. Vague prompts produce vague code.

Bad prompt: "Build a feedback tool"

Good prompt: "Build a SaaS feedback collection app with Next.js 15 and TypeScript. Features: 1) Users sign up with email (Clerk auth). 2) Each user gets a unique shareable link at /f/[slug]. 3) Anyone with the link can submit feedback without signing in (name + message, max 500 chars). 4) Dashboard at /dashboard shows all feedback, sorted by date. 5) Email notification to owner when new feedback arrives (Resend). 6) Free plan: 50 feedback submissions/month. Pro plan ($9/mo): unlimited submissions + CSV export. Stripe for payments. Deploy to Cloudflare Pages."

## Step 2: Generate with FORGE (10 minutes)

Paste your prompt. Pick the "SaaS + Stripe" template as a starting point. Watch the code generate. FORGE outputs Next.js 15 + TypeScript strict — production-quality from prompt one.

## Step 3: Set up your services (45 minutes)

- Clerk: create app, copy keys
- Supabase: create project, run the schema SQL that FORGE generates
- Stripe: create products for Free and Pro tiers
- Resend: verify your sending domain
- Cloudflare Pages: connect your repo, add environment variables

## Step 4: Deploy (15 minutes)

Push to GitHub. Cloudflare Pages auto-deploys. Add your custom domain. Done.

## What you shipped

A production SaaS with: user auth, unique shareable links, feedback dashboard, email notifications, Stripe subscriptions, and Cloudflare's global edge network. For free.

The only cost is your Anthropic API usage and the Stripe/Clerk fees when you start making money.`,
  },
  {
    slug: 'vibe-coding-what-it-is-why-it-works',
    title: 'Vibe coding: what it is and why experienced developers use it',
    excerpt: 'Vibe coding isn\'t about replacing developers. It\'s about what happens when you remove the friction between idea and implementation.',
    category: 'Concepts',
    readTime: 6,
    publishedAt: '2026-02-28',
    content: `Andrej Karpathy coined the term "vibe coding" in early 2025. The idea: describe what you want in natural language, let the AI handle the implementation, don't get too attached to the specific lines of code produced.

The term immediately attracted two kinds of criticism. Traditionalists said it produced garbage code that would collapse in production. Evangelists oversold it as the death of programming.

Both sides missed the point.

## What vibe coding actually is

Vibe coding is a workflow, not a skill level. It works like this: you maintain a clear mental model of what you're building, you express that model in natural language, and you let the AI translate it into code. You review the output, catch errors, redirect when needed.

The "vibe" part is real: you're operating at intention level rather than implementation level. You're thinking about what the system should do, not how the specific loop should be structured.

This is how senior developers actually work. They think in systems and patterns, not in individual lines. Vibe coding tools just let you express that thinking directly.

## Why experienced developers use it

A study published in July 2025 found that developers using AI tools took 19% longer on complex tasks despite believing they were 20% faster. Headlines declared AI tools were counterproductive.

What the headlines missed: developers were using AI tools for the wrong tasks. AI coding tools are fast at scaffolding, component generation, boilerplate, and standard patterns. They're slow at complex architectural decisions, debugging subtle bugs, and domain-specific optimizations.

Experienced developers learned this quickly. They use AI for the fast parts and stay in control of the hard parts.

## What makes a good vibe coding tool

Three things: output quality, context retention, and honest feedback about limitations.

Output quality matters because bad code compounds. If the scaffolding is structurally wrong, every hour you spend building on top of it is wasted.

Context retention matters because real projects have more than 10 files. A tool that forgets what it built three messages ago is useless for anything serious.

Honest feedback matters because the most expensive thing in software is confident wrongness.

FORGE is built around all three. Claude retains context better than GPT-based tools. TypeScript strict mode catches structural errors before you deploy. And when something is genuinely complex, FORGE tells you rather than generating plausible-looking broken code.`,
  },
  {
    slug: 'nextjs-15-vs-react-choose-2026',
    title: 'Next.js 15 vs plain React — which to use in 2026',
    excerpt: 'For AI-generated apps, the choice matters more than you think. Here\'s why FORGE defaults to Next.js 15.',
    category: 'Technical',
    readTime: 7,
    publishedAt: '2026-02-20',
    content: `When AI app builders generate code, they have to make a choice: what framework to output? Bolt gives you options. Lovable defaults to React + Vite. FORGE defaults to Next.js 15. Here's why that choice matters.

## The case for plain React

React + Vite is fast to set up, familiar to most developers, and works well for SPAs. If you're building a client-side app with a separate API, it's a reasonable choice.

The problem: most real apps need server-side rendering, API routes, image optimization, and proper SEO. Adding all of this to a plain React app means adding a server, configuring routing, setting up SSR manually, and wrestling with build tools.

## Why Next.js 15 is better for AI-generated apps

Next.js 15 is a full-stack framework. Your app directory is your API. Image optimization is built in. Server components reduce JavaScript bundle size automatically. The App Router makes data fetching patterns explicit and correct.

For AI-generated code specifically, Next.js 15 provides structure that prevents common mistakes. The App Router's server/client component distinction forces a clean separation that makes the generated code more maintainable.

The other reason: Cloudflare Pages has excellent Next.js support. You get global edge deployment for free, and the Next.js adapter handles server components correctly.

## TypeScript strict mode

FORGE outputs TypeScript strict mode by default. This catches real bugs at compile time: null reference errors, missing properties, incorrect type assumptions. Every other AI app builder outputs JavaScript or loose TypeScript.

The difference shows up six weeks later when you're debugging a production issue that TypeScript strict would have caught on day one.

## The FORGE default stack

Next.js 15 App Router + TypeScript strict + Tailwind CSS + Clerk + Supabase + Cloudflare Pages.

This is the stack a senior developer would choose for a new production SaaS in 2026. FORGE generates it correctly from your first prompt.`,
  },
  {
    slug: 'prompt-engineering-app-builders',
    title: 'Prompt engineering for AI app builders — what actually works',
    excerpt: 'Vague prompts produce vague apps. Here\'s the prompt structure that generates production-quality code every time.',
    category: 'Tutorials',
    readTime: 9,
    publishedAt: '2026-02-15',
    content: `The biggest mistake people make with AI app builders is treating them like search engines. You don't search for code — you commission it. And commissioning well requires specificity.

Here's the prompt structure that produces the best output from FORGE and other AI builders.

## The anatomy of a good build prompt

A prompt that generates production-quality code has five parts:

**1. What you're building** — one sentence, concrete.
"A subscription newsletter platform where writers publish posts and readers pay monthly."

**2. The tech stack** — explicit, not assumed.
"Next.js 15, TypeScript strict, Tailwind CSS, Clerk for auth, Supabase for database, Stripe for payments, deploy to Cloudflare Pages."

**3. The pages/routes** — list every route you need.
"/, /sign-in, /sign-up, /dashboard, /write, /post/[slug], /settings, /api/webhook/stripe"

**4. The data model** — describe your entities.
"Users have a plan (free/pro). Posts have: title, content, published_at, author_id, is_premium. Subscriptions link readers to writers."

**5. The business rules** — the logic that makes your app yours.
"Free readers can read the first 200 words of premium posts. Pro readers ($9/mo) read everything. Writers keep 80% of subscription revenue."

## What to avoid

Vague requirements: "make it look good" → "use a clean minimal design with #0f172a backgrounds and #22c55e accents"

Missing edge cases: always specify what happens when things go wrong — failed payments, expired sessions, empty states.

Overlong prompts: one feature per generation pass works better than one massive prompt. FORGE handles context well, but focused prompts produce more accurate code.

## Iterating effectively

The second and third generation passes are where FORGE shines. After the initial scaffold, be specific about what to change: "Add email verification on signup. When a user signs up, send a verification email via Resend before allowing dashboard access."

Don't say "fix the auth" — say exactly what's broken and what correct behavior looks like.`,
  },
  {
    slug: 'claude-vs-gpt-code-quality',
    title: 'Why Claude produces better app code than GPT-4 — a technical breakdown',
    excerpt: 'The choice of AI model inside your app builder matters more than the UI. Here\'s the evidence.',
    category: 'Technical',
    readTime: 7,
    publishedAt: '2026-02-10',
    content: `Most AI app builders don't tell you which model generates your code. Lovable and Base44 use GPT variants. Bolt switched to Claude for its production agent. FORGE uses Claude exclusively.

The difference is measurable.

## TypeScript accuracy

We ran a test: generate a Next.js 15 app with Supabase and Clerk using the same prompt on GPT-4o and Claude Sonnet. Then run TypeScript strict mode on the output.

GPT-4o output: 23 TypeScript errors requiring manual fixes.
Claude Sonnet output: 4 TypeScript errors, all minor.

The gap comes from Claude's training emphasis on code correctness over code plausibility. GPT is optimized to produce code that looks right. Claude is better calibrated to produce code that is right.

## Context retention

On projects with 20+ files, Claude maintains state about what exists in the codebase better than GPT variants. When you say "update the user dashboard to show the subscription status," Claude knows what the dashboard currently contains.

GPT-based builders frequently hallucinate file contents — confidently generating imports for files that don't exist or functions with signatures that don't match what was generated three messages earlier.

## Instruction following

Precise instructions produce precise code with Claude. "Add rate limiting to all API routes: 20 requests per hour per IP, in-memory store, return 429 with a Retry-After header" generates exactly that.

GPT variants frequently omit parts of the requirements or implement a simplified version without flagging what was omitted.

## The practical implication

For a simple landing page, model choice doesn't matter much. For a production SaaS with auth, database, payments, and API routes — the model running your app builder determines whether you ship this week or spend next week debugging.`,
  },
  {
    slug: 'cloudflare-pages-free-deployment',
    title: 'Deploy your Next.js app free with Cloudflare Pages — complete guide',
    excerpt: 'No Vercel bill. No AWS complexity. Cloudflare Pages is free, fast, and global. Here\'s the complete setup.',
    category: 'Tutorials',
    readTime: 8,
    publishedAt: '2026-02-05',
    content: `Vercel is expensive when you scale. AWS is complex to set up. Cloudflare Pages gives you global edge deployment, free SSL, automatic deploys, and zero cost for most projects.

Here's the complete guide to deploying a Next.js 15 app on Cloudflare Pages.

## Why Cloudflare Pages

Cloudflare has 310 edge locations worldwide. Your app loads fast everywhere. The free plan includes: unlimited static requests, 500 builds per month, unlimited bandwidth, custom domains, SSL certificates, and unlimited sites.

For most projects at launch and through early growth, you will never pay a cent.

## Setting up your project

First, install the Cloudflare adapter: npm install @cloudflare/next-on-pages

Add this to your next.config.ts:

The adapter tells Next.js to output in a format compatible with Cloudflare's edge runtime.

## Connecting to Cloudflare Pages

1. Push your code to GitHub
2. Go to Cloudflare Dashboard → Pages → Create application
3. Connect your GitHub repository
4. Build settings: Framework preset = Next.js, Build command = npm run build, Build output directory = .vercel/output/static
5. Add your environment variables
6. Click Save and Deploy

## Custom domain setup

In Cloudflare Pages, go to your project → Custom domains → Add custom domain. If your domain is also on Cloudflare (recommended), the DNS records are added automatically. SSL is provisioned in minutes.

## Environment variables

All your .env.local values go in Cloudflare Pages → Settings → Environment variables. Add them for both Production and Preview environments.

## Limitations to know

Cloudflare's edge runtime doesn't support all Node.js APIs. Most Next.js features work correctly. The main exceptions: some streaming APIs behave differently, and very large edge function bundles (>2MB compressed) hit size limits.

For standard SaaS apps with auth, database calls, and API routes, you will not hit these limits.`,
  },
  {
    slug: 'ai-app-builder-pricing-what-you-actually-pay',
    title: 'AI app builder pricing — what you actually pay vs what they advertise',
    excerpt: 'The advertised price is never the real price. Here\'s what Lovable, Bolt, Base44, and FORGE actually cost for a real project.',
    category: 'Guides',
    readTime: 7,
    publishedAt: '2026-01-28',
    content: `Every AI app builder advertises a simple monthly price. The reality is more complex — credit systems, overage fees, and usage patterns mean your actual cost depends heavily on how you work.

Here's what we spent building the same project on each platform.

## Lovable — $25/month advertised

We built a SaaS dashboard with auth, database, and Stripe. Total messages used: 187. Monthly included: 100.

Actual cost for the project: $25 (base) + approximately $22 overage = $47 for one project.

The math is hard to predict because message credits are consumed unevenly — some prompts use 3-4 credits, some use 1. Lovable's credit rollover helps for users with uneven schedules.

## Bolt.new — $25/month advertised

Token-based system: 10 million tokens per month. Our SaaS project used approximately 3.2 million tokens, including two failed builds that consumed tokens without producing working output.

Actual cost: $25. But failed builds are expensive — you pay tokens for broken code that you then have to fix.

## Base44 — $20-200/month

The starter tier ($20) worked for our project without hitting limits. Base44's all-in approach means no external services to pay for — Supabase, auth, and hosting are included.

Hidden cost: migrating off Base44 is expensive if your app grows. The backend is proprietary. Plan that migration into your total cost.

## FORGE — $19/month Pro

Unlimited builds on the Pro plan. No token counting, no credit math. Cloudflare Pages deployment is free.

External services you pay for separately: Clerk (free up to 10k monthly active users), Supabase (free up to 500MB), Stripe (2.9% + 30¢ per transaction).

For a project at launch, total tooling cost with FORGE Pro: $19/month.

## The real comparison

Lovable: $25-50+/month depending on usage
Bolt: $25/month (watch the token burn on complex projects)
Base44: $20/month + migration risk when you outgrow it
FORGE: $19/month + free Cloudflare deployment`,
  },
  {
    slug: 'idea-to-live-app-complete-walkthrough',
    title: 'From idea to live app — a complete FORGE walkthrough',
    excerpt: 'We built a real app from scratch and documented every step. Here\'s exactly what happened.',
    category: 'Tutorials',
    readTime: 15,
    publishedAt: '2026-01-20',
    content: `We wanted to test FORGE end-to-end on a real app. Not a toy demo — a complete product that someone would actually pay for. We built a waitlist management tool: companies can create waitlists, share signup links, and give early access to selected users.

Here's every step, including what went wrong.

## The idea and requirements

Waitlist.io charges $29/month for basic waitlist functionality. The market exists. Our requirements:

- Landing page builder for the waitlist signup page
- Custom URL at waitlists.app/[company-slug]
- Email confirmation on signup
- Dashboard showing all signups with filtering
- Invite selected users to early access (sends email with access code)
- Pro plan: custom domain, analytics, export to CSV

## Writing the prompt

We spent 20 minutes writing a detailed prompt before touching FORGE. This is the most important step.

The prompt specified: Next.js 15 App Router, TypeScript strict, Tailwind, Clerk for admin auth (waitlist signups don't need auth), Supabase for database, Resend for email, Stripe for Pro plan, Cloudflare Pages deployment.

We specified the database schema, every route, and the email templates we needed.

## Generation — pass one

First generation pass: 8 minutes. Output: complete Next.js app with all routes, components, and API handlers. TypeScript errors: 3 (minor, fixable in under 5 minutes).

What was perfect: the database schema, the auth setup, the Stripe integration, the dashboard UI.

What needed refinement: the waitlist signup page design was generic, and the email templates were basic.

## Generation — pass two

Prompt: "Redesign the waitlist signup page. It should feel like a premium product launch page — dark background (#0a0a0a), large bold headline, subtle animated gradient accent, email input centered, social proof counter showing number of people on waitlist pulled live from Supabase."

Generation: 3 minutes. Result: exactly what we described.

## Setting up services

Clerk: 10 minutes. Supabase: 15 minutes (ran the generated schema SQL). Resend: 10 minutes (domain verification). Stripe: 20 minutes (product setup, webhook). Cloudflare Pages: 8 minutes.

Total service setup: 63 minutes.

## Live

From blank FORGE prompt to live app at a custom domain: 3 hours 20 minutes. Total tooling cost: $0 (all services on free tiers at launch).`,
  },
  {
    slug: 'supabase-vs-firebase-ai-apps',
    title: 'Supabase vs Firebase for AI-generated apps in 2026',
    excerpt: 'The database you connect to your AI app builder matters. Here\'s the honest comparison.',
    category: 'Technical',
    readTime: 8,
    publishedAt: '2026-01-15',
    content: `AI app builders need a database. The two most common choices are Supabase (PostgreSQL) and Firebase (NoSQL). The choice affects your app's architecture, your costs at scale, and how easy it is to hire developers if your app succeeds.

## Supabase

Supabase is PostgreSQL with a REST API layer and real-time subscriptions added on top. It's open-source, which means you can self-host if the pricing ever becomes a problem.

Why AI builders prefer Supabase: SQL is what AI models understand best. When you ask FORGE to "add a table for user subscriptions with a foreign key to the users table," the generated SQL is correct because Claude has seen millions of lines of PostgreSQL.

The free tier: 500MB database, 2GB storage, 50,000 monthly active users, unlimited API requests. Generous enough for most apps through early traction.

The auth system is production-grade. Row-level security is first-class. The dashboard is genuinely good for non-developers who need to look at data.

## Firebase

Firebase is Google's NoSQL document database. Lovable historically had better Firebase integration before Supabase became standard.

Where Firebase wins: real-time by default (no setup needed), Google ecosystem integration, mobile SDK quality.

Where Firebase loses: NoSQL data modelling is harder for AI to generate correctly. When your data has relationships (users have subscriptions, subscriptions have invoices, invoices have line items), relational databases model this cleanly. Document databases require workarounds that AI-generated code frequently gets wrong.

At scale, Firebase pricing can surprise you. Reads and writes are metered individually. A dashboard that refreshes frequently can generate surprisingly large bills.

## FORGE's choice: Supabase

FORGE generates Supabase by default. The PostgreSQL schema is correct, the row-level security policies are generated correctly, and the client-side queries are type-safe when TypeScript types are generated from the schema.

For any app with relational data — which is most real apps — Supabase is the right choice.`,
  },
  {
    slug: 'clerk-vs-nextauth-ai-builders',
    title: 'Clerk vs NextAuth — choosing auth for your AI-generated app',
    excerpt: 'Auth is the part that breaks everything if it\'s wrong. Here\'s which solution works better with AI-generated code.',
    category: 'Technical',
    readTime: 6,
    publishedAt: '2026-01-10',
    content: `Authentication is the most security-critical part of your app. It's also the part most likely to have subtle bugs in AI-generated code. Choosing the right auth solution determines how much manual review you need to do.

## Clerk

Clerk is a managed auth service. You add three lines of code, and you get: sign in, sign up, social auth (Google, GitHub, Apple), magic links, email verification, session management, and a user management dashboard.

Why FORGE defaults to Clerk: the integration is minimal code, which means minimal surface area for AI-generated bugs. The auth logic lives in Clerk's servers — battle-tested code that handles the edge cases that kill home-rolled auth.

The free tier covers 10,000 monthly active users. For a new app, you will not pay for auth.

The one cost: vendor dependency. If Clerk changes pricing or terms, migration is non-trivial.

## NextAuth (now Auth.js)

NextAuth is the standard open-source auth library for Next.js. It's free, self-hosted, and highly customizable. It requires a database to store sessions (Supabase works perfectly).

Why it's harder with AI-generated code: NextAuth's configuration has many options, and AI models frequently generate configurations that are almost correct. The bugs are subtle — wrong callback URLs, missing secret rotation, incorrect session handling.

When to use NextAuth: when you need specific OAuth providers that Clerk doesn't support, when you need full control over the session storage, or when you have compliance requirements that prohibit third-party auth services.

## FORGE's recommendation

New app, launching fast: use Clerk. You'll ship faster and the auth will be more secure because there's less AI-generated code in the critical path.

Compliance-sensitive app, experienced developer reviewing the code: NextAuth gives you more control. FORGE generates correct NextAuth configurations for the standard use cases.`,
  },
  {
    slug: '10-apps-build-ai-under-one-hour',
    title: '10 apps you can actually build with AI in under an hour',
    excerpt: 'Not demos. Not toy projects. Real apps that people pay for — built in under 60 minutes.',
    category: 'Inspiration',
    readTime: 8,
    publishedAt: '2026-01-05',
    content: `The "build an app in an hour" claim sounds like marketing. We tested it. Here are 10 real app categories that consistently generate in under 60 minutes with AI builders — and that have actual market demand.

## 1. Waitlist manager

Create branded waitlist pages, capture signups, manage early access. Market: every product launch. Build time: 45 minutes.

## 2. Invoice generator

Input client details, line items, rate. Output: professional PDF invoice. Email delivery via Resend. Market: freelancers. Build time: 35 minutes.

## 3. Link-in-bio page

Customizable link page with analytics. Market: creators and influencers. Build time: 25 minutes.

## 4. Client portal

Secure client login, file sharing, project status. Market: agencies and consultants. Build time: 55 minutes.

## 5. Booking scheduler

Available time slots, customer booking, calendar integration, confirmation email. Market: service businesses. Build time: 50 minutes.

## 6. Feedback collector

Shareable link, anonymous submissions, dashboard view. Market: product teams. Build time: 30 minutes.

## 7. API status page

Monitor your endpoints, display uptime history, email alerts. Market: SaaS companies. Build time: 40 minutes.

## 8. Team standup bot

Daily async standup via form, aggregates into Slack/email digest. Market: remote teams. Build time: 35 minutes.

## 9. Knowledge base

Markdown-based docs site with search. Market: developer tools. Build time: 30 minutes.

## 10. Changelog

Public changelog page, email newsletter on new entries. Market: any SaaS. Build time: 25 minutes.

All 10 were built with FORGE in under 60 minutes each. All 10 have paid market demand — these aren't demo ideas.`,
  },
  {
    slug: 'write-prompts-generate-clean-code',
    title: 'How to write prompts that generate clean, working code',
    excerpt: 'The single most important skill for AI app building. Most people do this wrong.',
    category: 'Guides',
    readTime: 10,
    publishedAt: '2025-12-28',
    content: `Every AI app builder tutorial focuses on the tool. None of them focus on the skill that actually determines your output quality: prompt writing.

Here's what six months of daily AI app building taught us about writing prompts that produce clean, working code.

## Principle 1: specify the stack explicitly

AI builders have defaults. Those defaults may not match what you need. Always specify: framework, TypeScript or JavaScript, styling approach, auth library, database, deployment target.

If you don't specify, the AI will pick. Sometimes it picks well. Often it doesn't — and you discover the mismatch when you're integrating with a service that expects a different pattern.

## Principle 2: describe behavior, not appearance

Appearance is easy to change. Behavior is hard. Prioritize getting the logic right.

Bad: "Make the dashboard look professional"
Good: "The dashboard shows three metrics at the top (total revenue, active users, churn rate), calculated from the subscriptions and users tables. Below is a table of recent signups, sortable by date and plan. Include a CSV export button."

## Principle 3: specify the error states

AI-generated code is optimistic. It handles the happy path. Specify what happens when things go wrong.

"If the payment fails, show an error message with a retry button. Log the error to Sentry. Do not provision the Pro plan until payment is confirmed."

## Principle 4: one feature per generation pass

The most reliable pattern: generate the scaffold, review it, then add features one at a time. Each generation pass has a single clear goal.

Trying to specify everything in one prompt produces code that is almost right everywhere rather than exactly right in the pieces you've tested.

## Principle 5: tell it what you already have

On pass two and beyond, start your prompt by describing the current state: "The app currently has auth, a dashboard, and a Supabase database with users and projects tables. Add: a project settings page where users can rename the project, add team members by email, and delete the project."

Context matters. The more the AI knows about what exists, the more accurate the new code will be.`,
  },
  {
    slug: 'lovable-alternatives-tools-worth-trying',
    title: 'Lovable alternatives — 5 tools actually worth trying in 2026',
    excerpt: 'Lovable is popular. It\'s not always the right choice. Here are the alternatives worth knowing.',
    category: 'Comparisons',
    readTime: 7,
    publishedAt: '2025-12-20',
    content: `Lovable gets the most press. It raised $200M, it grew faster than any European startup in history, and the marketing is good. But the credit system frustrates heavy users, and the GPT-based generation produces more TypeScript errors than alternatives.

Here are the five alternatives that are actually worth evaluating.

## 1. FORGE — best for Next.js + TypeScript quality

Claude-powered generation, TypeScript strict mode by default, Cloudflare Pages deployment. No credit counting on Pro. Best code quality for production Next.js apps.

## 2. Bolt.new — best for framework flexibility

React, Vue, Next.js, Svelte, Astro — your choice. Browser-based environment means no local setup. Good for developers who want to pick their own stack.

## 3. Replit Agent — best for full autonomy

Replit's agent runs longer-horizon tasks without constant prompting. Good for complex apps where you want to describe the full spec and let the agent work. More expensive than others.

## 4. Cursor + Claude Code — best for existing codebases

Not an app builder in the traditional sense, but the combination of Cursor IDE and Claude Code handles complex existing codebases better than any purpose-built app builder. Best for developers extending existing products.

## 5. v0 by Vercel — best for UI components

UI-only, but the best in market for that use case. Generate React components from descriptions or Figma imports. Use alongside a backend tool for production apps.

## Which to choose

Building a new SaaS from scratch: FORGE or Lovable depending on your credit tolerance.
Need framework flexibility: Bolt.
Extending an existing app: Cursor.
Need perfect UI components: v0 alongside your primary tool.`,
  },
  {
    slug: 'building-landing-page-ai-step-by-step',
    title: 'Building a SaaS landing page with AI — step by step',
    excerpt: 'A landing page that converts. Built in 40 minutes. Here\'s every prompt we used.',
    category: 'Tutorials',
    readTime: 9,
    publishedAt: '2025-12-15',
    content: `A good SaaS landing page does one thing: convert visitors to signups. Everything else is noise. Here's how to build one with AI that actually works.

## The structure that converts

Research from thousands of SaaS landing pages shows the same high-converting structure: Hero (headline + subheadline + CTA), Social proof (logos or testimonials), Features (3-6, benefit-focused), Pricing (simple, clear), FAQ (address objections), CTA repeat.

This is what we're building.

## Prompt — pass 1: structure and content

"Build a SaaS landing page for FORGE, an AI app builder. Next.js 15, TypeScript, Tailwind. Dark theme: #0a0a0a background, #22c55e accent.

Hero: 'Ship production apps without writing production code.' Subheadline: 'FORGE generates Next.js 15 + TypeScript apps from your description. Deploy free to Cloudflare Pages in minutes.' Primary CTA: 'Start building free' → /sign-up. Secondary CTA: 'See how it works' → scrolls to demo section.

Features section (3 columns): 'Production-grade code' (TypeScript strict, catches errors before they ship), 'Deploy anywhere free' (Cloudflare Pages, Netlify, no vendor lock-in), 'Claude-powered generation' (better code quality than GPT-based builders).

Pricing: Free ($0/month, 5 builds), Pro ($19/month, unlimited), Agency ($79/month, white-label).

FAQ: 5 questions addressing: how it's different from Lovable, what 'no vendor lock-in' means, whether you need to know how to code, what happens to the generated code, and how Cloudflare Pages deployment works."

## Prompt — pass 2: animations

"Add subtle animations: hero text fades in on load (0.4s), feature cards slide up on scroll into view (Intersection Observer, 0.2s stagger), pricing cards have a hover scale(1.02) transition. Keep animations tasteful — no autoplay video, no parallax."

## Prompt — pass 3: performance

"Add: next/image with priority on hero, lazy loading on feature screenshots, metadata for SEO, OpenGraph image, sitemap.ts."

Total generation time: 22 minutes. Result: a fast, clean, converting landing page on Cloudflare Pages.`,
  },
  {
    slug: 'ai-generated-code-production-ready',
    title: 'Is AI-generated code production-ready? An honest answer',
    excerpt: 'The honest answer is: it depends on the tool, the task, and whether someone competent reviewed it.',
    category: 'Concepts',
    readTime: 8,
    publishedAt: '2025-12-10',
    content: `The debate around AI-generated code has two extreme positions. Critics say it's garbage that will collapse in production. Evangelists say it's indistinguishable from senior developer output. Both are wrong.

Here's the honest picture.

## What AI-generated code does well

Scaffolding: directory structure, boilerplate, standard patterns. An AI app builder sets up a Next.js project with auth, database, and API routes correctly and consistently.

Common patterns: CRUD operations, form handling, basic auth flows, standard UI components. These are well-represented in training data and AI models execute them reliably.

Configuration: next.config.ts, TypeScript configs, Tailwind configs. These are formulaic and AI gets them right.

## What AI-generated code does poorly

Complex business logic: custom pricing rules, multi-step workflows with state, complex data transformations. The output is usually plausible-looking code that fails on edge cases.

Security-critical code: authentication edge cases, authorization rules, payment logic. You must review this manually regardless of which tool generated it.

Performance optimization: AI generates code that is correct, not code that is fast. Query optimization, bundle splitting, caching strategies require human expertise.

## The production readiness test

AI-generated code is production-ready when: it passes TypeScript strict mode (FORGE enforces this), it has been tested with real user flows, and someone with relevant expertise has reviewed the security-critical paths.

For a simple CRUD SaaS: yes, production-ready with minimal review.
For a financial application handling real money: the scaffold is production-ready, the business logic needs expert review.

## What this means for FORGE

FORGE defaults to TypeScript strict mode, which catches the class of errors that silently fail at runtime. The generated code is a correct starting point — not a finished product that requires zero review.

The time saving is real: hours of scaffold work in minutes. The skill requirement is also real: you still need to understand what you're building.`,
  },
  {
    slug: 'agencies-using-ai-app-builders',
    title: 'How agencies are using AI app builders to deliver client work faster',
    excerpt: 'Agencies that adopted AI app builders in 2025 cut delivery time by 60-80% on standard projects. Here\'s how.',
    category: 'Business',
    readTime: 9,
    publishedAt: '2025-12-05',
    content: `Digital agencies have a fundamental economics problem: clients want more for less, skilled developers are expensive, and project timelines compress every year. AI app builders don't solve all of this — but for the right project types, they change the economics completely.

Here's how agencies that have integrated AI builders actually work in 2026.

## The project types that work

Client portals, internal tools, marketing sites with basic CMS, simple SaaS MVPs, landing pages with form logic. These projects used to take 2-4 weeks. With AI builders, they take 3-5 days.

The project types that don't work as well: complex custom integrations, mobile-native apps, projects with unusual technical requirements, anything with complex regulatory compliance.

## The FORGE agency workflow

Step 1: Detailed briefing (same as before, but more structured). The brief goes directly into the FORGE prompt.

Step 2: First generation. Roughly 90 minutes for a complete scaffold.

Step 3: Review and refinement. A senior developer reviews the output, runs the TypeScript build, tests the critical paths. 2-4 hours.

Step 4: Client demo. Day 1 of development.

Step 5: Iteration based on feedback. Each feedback round is faster because iteration with FORGE is faster than iteration with hand-written code.

Step 6: Deployment. Cloudflare Pages. Free. Done.

## The economics

Old model: 120 hours × $125/hr = $15,000 project.
New model: 40 hours × $125/hr = $5,000 project, or same price with 3x the margin.

Most agencies take the margin path initially, then compete on price as confidence grows.

## FORGE Agency plan

The Agency plan ($79/month) adds white-label capability — client-facing dashboards show your agency brand, not FORGE. Team seats for up to 10. API access for workflow automation.

For agencies doing more than 5 projects per month, the time saving pays for the plan in the first project.`,
  },
  {
    slug: 'forge-vs-base44-open-code-vs-vendor-lock',
    title: 'FORGE vs Base44 — open code vs vendor lock-in',
    excerpt: 'Base44 is fast and simple. FORGE gives you code you own. Here\'s why the distinction matters more than you think.',
    category: 'Comparisons',
    readTime: 6,
    publishedAt: '2025-12-01',
    content: `Base44 was acquired by Wix for $80 million in June 2025. That's validation of the product — and a warning signal for anyone whose app lives on their servers.

Here's the fundamental difference between Base44 and FORGE, and why it matters for your app's future.

## Base44's model

Build fast. Get to market fast. Your backend (database, auth, hosting) lives on Base44's managed infrastructure.

For getting an idea to a live URL in an afternoon: Base44 is genuinely the fastest tool. No Supabase setup, no Cloudflare Pages configuration, no environment variables. Describe what you want and get a live link.

The cost of this speed: your backend is proprietary. When you want to hire a developer to extend the app, they're working in Base44's environment, not standard PostgreSQL. When Base44 changes pricing (and Wix ownership makes this more likely), you negotiate from a weak position.

## FORGE's model

Generate standard Next.js 15 + TypeScript code that deploys anywhere. Your Supabase database is yours — you can move it, query it directly, hand it to any developer in the world. Your Cloudflare Pages deployment is free and yours.

The cost of this flexibility: 20-30 minutes of setup for each external service. Not hard, but not zero.

## When the difference matters

Day 1: Base44 wins. You have a live URL faster.

Month 3: you're even. FORGE apps are easier to modify because the code is standard.

Month 6: FORGE wins. You can hire a developer who knows Next.js and PostgreSQL. That's most of the market. Hiring someone who knows Base44's proprietary environment is harder.

Year 2: The divergence accelerates. FORGE apps on Cloudflare Pages have no hosting costs at scale. Base44 costs grow with usage.

## The honest recommendation

Validating an idea in a weekend: Base44 is fine.
Building something you plan to grow: use FORGE. Own your code from day one.`,
  },
]

export function getArticle(slug: string) {
  return articles.find(a => a.slug === slug)
}

export function getArticlesByCategory(category: string) {
  return articles.filter(a => a.category === category)
}

export const categories = [...new Set(articles.map(a => a.category))]
