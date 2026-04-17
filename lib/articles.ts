// lib/articles.ts — FORGE Journal
// 15 articles for claudeforge.shop
// Drop this file into /lib and wire into /journal route

export type Article = {
  slug: string
  title: string
  description: string
  category: 'Comparisons' | 'Guides' | 'Tutorials'
  readingTime: number
  publishedAt: string
  updatedAt: string
  author: 'Thomas' | 'Øyvind'
  content: string
}

export const articles: Article[] = [
  // ═══════════════════════════════════════════════════════════════
  // COMPARISON / LISTICLE ARTICLES (10)
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'forge-vs-lovable-honest-comparison',
    title: 'FORGE vs Lovable: An Honest Comparison After Building With Both',
    description: 'Lovable is fast. FORGE gives you the code. Here is when each one makes sense, based on real projects.',
    category: 'Comparisons',
    readingTime: 8,
    publishedAt: '2026-04-17',
    updatedAt: '2026-04-17',
    author: 'Thomas',
    content: `
Lovable ships web apps fast. So does FORGE. The difference shows up on day 30, not day 1.

I have built with both. Here is the honest version, without the marketing gloss.

## The one-sentence version

Lovable is a hosted app builder optimised for non-technical founders who want something live this week. FORGE is a code generator for people who want to own what they build and deploy it wherever they want.

If you stop reading here, that is the whole comparison. The rest is detail.

## Pricing as of April 2026

Lovable Free gives you five daily messages. Pro is twenty-five dollars a month. Teams runs thirty dollars per user per month. Business sits at fifty per user.

FORGE Free gives you five generations a day on Haiku. Pro is twenty-nine a month with Sonnet and project saving. Agency is ninety-nine a month with white-label, API access, and client dashboards.

Same ballpark for solo users. FORGE pulls ahead for agencies because you get white-label and an API at the Agency tier, which Lovable does not offer at equivalent prices.

## Where Lovable wins

Speed to first live URL. Lovable has hosting baked in. You get a working app on a Lovable subdomain within minutes of your first prompt. For validating an idea this weekend, that is hard to beat.

The iteration loop is tight. You see your changes in a live preview instantly. No build step, no deploy step, no local setup. If you are testing whether an idea resonates before investing real engineering time, Lovable removes almost every barrier.

Non-technical friendliness. You never see a terminal. You rarely see code unless you ask for it. Someone who has never opened a text editor can ship a working app on Lovable.

## Where FORGE wins

You own the code. FORGE generates a clean Next.js 15 repository. You download it, push it to your own GitHub, deploy to Vercel or Cloudflare Pages or Netlify, and you are the only person who controls it. Lovable keeps your app inside Lovable.

No lock-in. Migrating off Lovable means rebuilding. Migrating off FORGE means nothing, because there is nothing to migrate off. The code is already yours.

Hosting costs at scale. A FORGE app on Cloudflare Pages costs zero for most traffic levels. Lovable charges per user as you scale your team. Year two, the math tilts hard toward FORGE.

Better for agencies. Agency tier on FORGE gives you white-label output, an API, and a client dashboard. You can build for clients under your own brand. Lovable does not currently offer a comparable agency workflow at the same price point.

Code quality you can hire against. FORGE outputs standard Next.js. Any Next.js developer can maintain it. Finding someone to maintain a Lovable app means hiring someone willing to learn Lovable's environment, which narrows your pool.

## Where both fall short

Neither is a substitute for thinking through your data model before you start prompting. Both will happily generate something that looks right and is structurally wrong. You still need to know what you are building before you ask the tool to build it.

Neither handles complex backend logic gracefully. If your app needs real auth flows, background jobs, webhooks, or serious database design, you will end up editing the generated code anyway. With FORGE, that is fine, because you already have the code. With Lovable, you are editing inside their environment with their constraints.

## The honest recommendation

Weekend validation, non-technical founder, throwaway if it does not work — use Lovable.

Production app you plan to grow, team that includes a developer, anything you might want to sell or fundraise around — use FORGE. Own the code from day one.

Agency work for clients — use FORGE Agency. You cannot white-label Lovable output at ninety-nine a month.

Mixed team with technical and non-technical people — use FORGE and give the non-technical people the prompt interface. The developer still has the code when things get complex.

## What I actually use

FORGE for anything I plan to run longer than a month. Lovable for a same-day prototype when someone asks what something could look like and I want to send them a link before the call ends.

Both tools are good. They are good at different things.
`,
  },
  {
    slug: 'forge-vs-v0-vercel',
    title: 'FORGE vs v0 by Vercel: Which One Actually Fits Your Workflow',
    description: 'v0 is built for Vercel. FORGE is built to be portable. That difference matters more than the pricing.',
    category: 'Comparisons',
    readingTime: 7,
    publishedAt: '2026-04-16',
    updatedAt: '2026-04-16',
    author: 'Thomas',
    content: `
v0 and FORGE look like competitors. They are not really competing for the same user.

## What v0 actually is

v0 generates React components and Next.js pages inside Vercel's ecosystem. It is excellent at producing polished shadcn/ui components on demand. Premium is twenty a month, Team is thirty per user.

v0's superpower is that it was built by the team that built Next.js. The output lands in Vercel cleanly because it was designed to.

## What FORGE actually is

FORGE generates entire Next.js 15 applications with auth, database schemas, Stripe integration, API routes, and deploy instructions for Vercel, Cloudflare Pages, and Netlify. Pro is twenty-nine. Agency is ninety-nine with white-label and API access.

FORGE's superpower is that the output is a complete repository you own and can host anywhere.

## The real difference

v0 answers: build me a component. FORGE answers: build me an app.

If you already have a Next.js app and need a landing section, a pricing table, or a dashboard layout, v0 is faster and more focused. You paste the component in, done.

If you are starting from nothing and want a working SaaS with auth, subscriptions, a database, and a deployment target, FORGE generates the whole thing.

## Hosting and lock-in

v0 assumes Vercel. The components work elsewhere but the optimised path is Vercel-first. If you are already deploying there, this is frictionless. If you are deploying to Cloudflare Pages because it is free at scale, v0's Vercel bias costs you some conversion steps.

FORGE writes code that runs the same on Vercel, Cloudflare Pages, Netlify, or a self-hosted Node server. The README includes deploy instructions for all three. No assumption about where you will run it.

## Pricing math for a solo developer

v0 Premium at twenty a month gets you unlimited generations.

FORGE Pro at twenty-nine a month gets you a hundred generations a day on Sonnet plus project saving plus deploy guides.

Nine dollars more. You are paying for the full-app generation, not just components.

## Pricing math for an agency

v0 at thirty per user per month times a five-person team equals one hundred fifty a month. You still do not have white-label output or an API.

FORGE Agency at ninety-nine flat. White-label, API, client dashboard, unlimited generations across all users under that one account.

If you are running an agency, the Agency tier on FORGE is roughly a third of the price of v0 Teams for five users and includes features v0 does not offer.

## When to pick v0

You live inside Vercel already. Your team uses Next.js. You mainly need components and sections added to existing apps. Pricing is not your top concern. Quality of the generated shadcn/ui components is your top concern.

## When to pick FORGE

You are starting apps from zero. You care about where you host. You want the code to be yours without any environment dependency. You run an agency and need white-label. You care about cost at scale.

## Can you use both

Yes. FORGE for generating whole apps. v0 for adding components to an existing FORGE output. They stack without friction because both produce standard Next.js.

I use FORGE to scaffold and v0 to fill in components when I want something very specific and shadcn-flavoured. This is the most common workflow I see from developers who have tried both.
`,
  },
  {
    slug: 'forge-vs-base44',
    title: 'FORGE vs Base44: A Closer Look for Builders Who Care About the Code',
    description: 'Base44 is proprietary environment. FORGE is code you own. Here is how that plays out in practice.',
    category: 'Comparisons',
    readingTime: 7,
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    author: 'Thomas',
    content: `
Base44 is a capable app builder. It ships apps fast. The question is whether the trade-offs fit your project.

## The environment question

Base44 apps run in Base44's environment. The platform handles hosting, database, auth, and storage. You build inside their editor and your app lives on their infrastructure.

FORGE generates a Next.js repository. You deploy it wherever you want. Auth is Clerk or NextAuth. Database is Supabase or Postgres. Storage is S3 or Cloudflare R2. Nothing proprietary.

Both approaches work. They suit different projects.

## Where Base44 is genuinely better

Non-technical solo founders. If you have never seen a terminal, Base44 will get you to a live app faster than FORGE will. You do not have to understand Next.js, pnpm, or Vercel to ship. Base44 abstracts all of it.

Single-app scope. If you are building one app and you are sure you will never migrate it, the simplicity of Base44's all-in-one environment is a genuine advantage.

No devops burden. You do not manage hosting bills, deployment, or infrastructure. Base44 handles it.

## Where FORGE is genuinely better

Portability. FORGE output runs on Vercel, Cloudflare Pages, Netlify, or a VPS. You can move hosts when pricing changes or requirements shift. Base44 apps do not move.

Hiring. Any Next.js developer can maintain a FORGE output. Finding a developer who knows Base44's environment is harder. This matters the moment your project outgrows one person.

Scale economics. Cloudflare Pages hosting a FORGE app is free for most traffic. Base44 pricing grows with users and usage. Year three, the difference is meaningful.

Agency work. FORGE Agency at ninety-nine a month includes white-label and client dashboards. Base44 does not offer a comparable tier. If you are building for clients, FORGE is structurally better fit.

Custom backend logic. FORGE produces standard Next.js API routes you can edit freely. Base44 custom logic happens inside their environment with their constraints.

## Pricing as of April 2026

Base44 Free tier exists. Builder is twenty a month. Pro is fifty. Enterprise is custom.

FORGE Free gives five daily Haiku generations. Pro is twenty-nine with Sonnet. Agency is ninety-nine with white-label plus API.

Similar ballpark for solo use. FORGE pulls ahead on Agency tier.

## When the difference matters

Day one, Base44 wins. You have a live URL faster.

Month three, they are even. FORGE apps are easier to modify because the code is standard.

Month six, FORGE wins. You can hire a developer who knows Next.js and Postgres. That is most of the market. Hiring someone who knows Base44's proprietary environment is harder.

Year two, the gap widens. FORGE apps on Cloudflare Pages have near-zero hosting costs at scale. Base44 costs grow with usage.

## The honest recommendation

Validating an idea in a weekend, non-technical, plan to throw it away if it does not work — Base44 is fine.

Building something you plan to grow — use FORGE. Own your code from day one. The extra hour spent learning to deploy pays back the first time you need to modify something Base44 does not let you modify.

Agency work — FORGE Agency. The white-label tier is the decisive factor.
`,
  },
  {
    slug: 'forge-vs-bolt-new',
    title: 'FORGE vs Bolt.new: Two Different Takes on AI Code Generation',
    description: 'Bolt.new runs the code in a browser VM. FORGE hands you the repo. Each approach has a real cost.',
    category: 'Comparisons',
    readingTime: 6,
    publishedAt: '2026-04-14',
    updatedAt: '2026-04-14',
    author: 'Øyvind',
    content: `
Bolt.new and FORGE both generate full-stack apps from prompts. The execution model is the main difference.

## How Bolt.new works

Bolt.new runs a full WebContainer inside your browser. It generates code, installs packages, and runs the dev server, all client-side. You see your app running in a preview frame. When you deploy, Bolt pushes to Netlify or Vercel for you.

Pricing runs from Free through Pro 200 at two hundred dollars a month, tiered by token usage.

## How FORGE works

FORGE generates a Next.js repository server-side. The output arrives as streamed code in your browser. You download the ZIP, push to GitHub, deploy to the host of your choice. FORGE does not run the app for you during generation.

Pricing is Free, Pro at twenty-nine, Agency at ninety-nine.

## What Bolt.new does better

Instant preview of the generated app. Because the WebContainer runs in your browser, you see the app live as it builds. That feedback loop is tight and satisfying.

Zero setup to test. No cloning, no pnpm install, no deploy step to see your app working. For rapid iteration on a small app, this is genuinely faster.

Browser-based IDE. If you are on a Chromebook, a borrowed laptop, or anywhere without a dev environment, Bolt still works.

## What FORGE does better

Real code in a real repo. When the generation finishes, you have a GitHub-ready Next.js project. No extraction step, no dependency on Bolt's environment.

Server-side generation is cheaper. WebContainers burn browser resources heavily. Your laptop fan will let you know. FORGE runs the generation on Anthropic's infrastructure and streams text only. Much lighter on your machine.

Complex projects survive the transition. FORGE output is just Next.js. You can run it in any tooling. Bolt apps are easier to build inside Bolt than outside it.

Pricing predictability. FORGE is flat monthly. Bolt's tiers are keyed to token consumption, which means your bill varies with your usage. For agencies planning budgets, flat pricing is easier to sell internally.

## The WebContainer trade-off

The browser VM is Bolt's defining feature and also its ceiling. It is brilliant for small apps. It struggles with anything that needs real background jobs, real webhooks, real cron, real external services. The moment your project needs those things, you are exporting the code to run elsewhere anyway.

FORGE skips the VM step. You build knowing the output is for a normal Node environment from the start.

## When to pick Bolt.new

Rapid prototyping. Short-lived experiments. Situations where the visible feedback loop is worth more than the output portability. Projects that fit comfortably inside a browser VM.

## When to pick FORGE

Anything you plan to run in production. Agency work. Projects that need real infrastructure. Situations where hosting cost matters long-term. Teams that want the output to live in normal source control from day one.

## Can you use both

Yes. Bolt for twenty-minute prototypes. FORGE for building the version you will actually ship. The workflows do not conflict.
`,
  },
  {
    slug: 'seven-ai-code-generators-compared-2026',
    title: 'Seven AI Code Generators Compared: What Each One Is Actually For',
    description: 'FORGE, Lovable, v0, Base44, Bolt, Replit Agent, Cursor. No winner, just clarity on which fits which job.',
    category: 'Comparisons',
    readingTime: 10,
    publishedAt: '2026-04-13',
    updatedAt: '2026-04-13',
    author: 'Thomas',
    content: `
Every few months someone publishes a ranking of AI code tools. The rankings are mostly useless because the tools are mostly not competing for the same job.

Here is the honest version: what each one is actually for.

## FORGE

Generates full Next.js 15 applications you own as a repo. Designed for builders who want portable code and for agencies who need white-label output. Pro is twenty-nine a month. Agency is ninety-nine with API access, white-label, and client dashboards.

Best for: production apps you plan to grow, agencies building for clients, teams that want code in their own GitHub from day one.

Weak at: instant live preview during generation, non-technical onboarding.

## Lovable

Hosted app builder. Your app lives on Lovable. Tight iteration loop, very accessible to non-technical users. Pro is twenty-five a month.

Best for: weekend validation, non-technical founders, apps you may throw away.

Weak at: portability, agency use cases, long-term hosting economics.

## v0 by Vercel

Component and page generator focused on shadcn/ui output for Next.js. Premium is twenty a month.

Best for: adding polished components and sections to existing Next.js apps. Works beautifully if you live in Vercel's ecosystem.

Weak at: generating whole apps from scratch with auth, billing, and database. It is not really trying to do that.

## Base44

All-in-one app builder with proprietary environment. Pro is fifty a month.

Best for: solo non-technical founders building one app they do not plan to migrate.

Weak at: portability, hiring ease, scale economics.

## Bolt.new

Runs a WebContainer in your browser so you see the generated app live as it builds. Pricing tiered on token usage, Free through Pro 200.

Best for: fast prototypes, browser-based development, visual feedback during generation.

Weak at: complex backend infrastructure, predictable pricing at scale.

## Replit Agent

AI agent inside Replit's IDE. Generates and edits code inside your Replit workspace.

Best for: developers already using Replit for hosting and collaboration. Tight integration with Replit's environment.

Weak at: producing code that naturally lives outside Replit. You can export, but the native experience is inside.

## Cursor

AI-first code editor. Not really a code generator in the same sense. You write and edit inside Cursor with strong AI assistance. Subscription starts around twenty a month for Pro.

Best for: developers who want AI pair programming in a full IDE. Best of class for editing existing codebases with AI help.

Weak at: generating whole new apps from a single prompt, non-technical users.

## The honest grouping

Full-app generators: FORGE, Lovable, Base44, Bolt.new. Pick based on whether you want the code (FORGE) or the hosted environment (the others), and whether you need agency features (FORGE).

Component and section generators: v0. Stack it with anything else.

AI-assisted editors: Cursor, Replit Agent. Different category entirely. Use alongside a generator, not instead of one.

## Realistic workflows

Solo developer building a side project:
FORGE for the scaffold. Cursor for daily editing. v0 when you need a specific component. Deploy to Cloudflare Pages for cost. Total cost around fifty to eighty a month depending on which tiers.

Agency building for clients:
FORGE Agency at ninety-nine. Covers generation with white-label. Clients get apps under the agency's brand. One subscription for the whole team.

Non-technical founder validating an idea this weekend:
Lovable or Base44. Ship something live by Sunday night. If the idea works, rebuild on FORGE when you need real infrastructure.

Existing Next.js team adding features:
v0 for components. Cursor for editing. FORGE when you spin up a new app.

## What none of them are good at yet

Complex state machines. Real-time collaboration. Sophisticated permission systems. Anything involving non-trivial audio or video processing. Generation gets you ninety percent of a typical CRUD app. The last ten percent of anything unusual still takes human engineering.

## What to actually choose

Stop asking which is best. Ask which fits the job in front of you this week.

Weekend prototype, not sure if the idea is real: Lovable or Bolt.
Production SaaS you plan to grow: FORGE.
Agency output for paying clients: FORGE Agency.
Polished component dropped into existing app: v0.
Daily editing of code you already have: Cursor.

Most serious builders end up using two or three of these. That is fine. The tools are cheap relative to engineering time.
`,
  },
  {
    slug: 'ten-app-ideas-you-can-build-with-forge-this-weekend',
    title: 'Ten App Ideas You Can Build With FORGE This Weekend',
    description: 'Niches with real demand, small scope, and achievable with one FORGE session plus a bit of polish.',
    category: 'Guides',
    readingTime: 8,
    publishedAt: '2026-04-12',
    updatedAt: '2026-04-12',
    author: 'Thomas',
    content: `
The hardest part of building is picking what to build. Here are ten ideas sized for a weekend, with enough demand to be worth the time.

All ten are achievable with one FORGE Pro session plus a few hours of polish. Each has a path to monetisation that does not require a million users.

## One: invoice generator for freelancers

Freelancers hate invoice software. Most want a simple tool: enter line items, export PDF, done.

Scope: form for client details, dynamic line items, tax calculation, PDF export. Stripe payment to unlock brand removal and unlimited invoices.

Monetisation: free with watermark, five a month for unlimited and branding.

Why it works: low competition in the simple end of the market. Existing tools are bloated.

## Two: bulk link checker for marketers

Marketers manage affiliate link lists. Dead links lose money. Existing tools charge enterprise prices.

Scope: paste a list of URLs, tool checks each for 200 or 404, shows results, flags broken ones. CSV export.

Monetisation: free up to fifty links, Pro at nine a month for bulk uploads and scheduled checks.

Why it works: specific painpoint, clear buyer.

## Three: meeting notes to action items

Someone pastes messy meeting notes. Tool uses Claude to extract action items with assignees and dates.

Scope: text input area, Claude API call, structured output. Export to email, Slack, or Notion.

Monetisation: ten free a month, Pro at fifteen a month for unlimited plus integrations.

Why it works: every company has this problem. The tool takes one day.

## Four: domain name generator for startups

Founders spend days on domain names. A tool that suggests available .com domains based on a description is genuinely useful.

Scope: input describing the business. Claude generates candidates. Tool checks availability via WHOIS. User gets a filtered list.

Monetisation: ten free searches a day. Pro at nine a month for unlimited and saved searches.

Why it works: WHOIS lookups are easy. The value is in the curation.

## Five: personal finance dashboard

Plaid integration is complex. A simpler version that lets users manually enter accounts and track net worth over time works for a surprising number of people.

Scope: add accounts, enter balances, see net worth chart over time. Monthly update reminder.

Monetisation: free for three accounts, Pro at seven a month for unlimited and export.

Why it works: YNAB and Mint left gaps. People want something simpler.

## Six: resume tailoring tool

Users paste their resume and a job posting. Tool uses Claude to rewrite the resume emphasising relevant experience.

Scope: two text areas, Claude call with careful system prompt, output with tracked changes view.

Monetisation: three free rewrites a month, Pro at nine for unlimited.

Why it works: job seekers are motivated buyers. Low friction, clear value.

## Seven: podcast episode planner

Podcasters need guest research. Tool accepts guest name and topic, returns researched talking points, relevant questions, recent news.

Scope: input form, research pipeline using web search plus Claude, structured output.

Monetisation: five free episodes a month, Pro at twenty for unlimited.

Why it works: saves real hours. Podcasters at any scale will pay.

## Eight: regex generator and tester

Developers write regex badly. A tool that generates regex from natural language plus a tester with live matching is small but loved.

Scope: prompt to regex via Claude, live tester with highlighted matches, common patterns library.

Monetisation: free with daily limit, Pro at five a month for unlimited plus saved patterns.

Why it works: niche but real. Developers will share a good one.

## Nine: email subject line A/B generator

Marketers spend time testing subject lines. Tool takes an email body, generates ten subject line variations, predicts open rate likelihood.

Scope: input form, Claude call, output ranked by predicted performance.

Monetisation: twenty free a month, Pro at nineteen for unlimited plus tracking integration.

Why it works: marketers have budget. Subject lines are measurable.

## Ten: contract plain-language translator

Small businesses receive contracts they cannot parse. Tool takes a contract, returns plain language summary plus flagged risky clauses.

Scope: PDF upload or paste, Claude call with legal system prompt, summary plus flagged clauses.

Monetisation: one free contract, Pro at twenty-nine for five a month, Business at ninety-nine for twenty a month.

Why it works: clear pain, willing buyer, obvious value.

## The pattern

Notice what all ten have in common. Narrow scope. Clear user. Obvious willingness to pay. Low infrastructure requirement. Each one is a one-weekend FORGE project that could earn something.

You do not need a unicorn. You need a tool someone will pay nine dollars a month for because it saves them an hour.

Pick one. Ship it. Move on.
`,
  },
  {
    slug: 'why-next-js-is-the-right-base-for-ai-generated-apps',
    title: 'Why Next.js Is the Right Base for AI-Generated Apps in 2026',
    description: 'Not a love letter. A practical breakdown of why FORGE and most serious AI generators landed on Next.js.',
    category: 'Guides',
    readingTime: 6,
    publishedAt: '2026-04-11',
    updatedAt: '2026-04-11',
    author: 'Thomas',
    content: `
Most AI code generators output Next.js. This is not coincidence or fashion. It is the pragmatic choice for this particular use case.

Here is why, without the hype.

## Everything in one place

Next.js app router puts pages, API routes, data fetching, and middleware in one file tree. For an AI generator, this matters enormously. The model can produce a complete application with consistent conventions and the output is immediately runnable.

Compare this to a stack of separate backend and frontend repos. Twice the coordination, twice the chance for the AI to produce mismatched pieces.

## Hosting is flexible

Next.js runs on Vercel natively, on Cloudflare Pages via the adapter, on Netlify, on AWS, on a VPS. An app generated once can deploy anywhere.

This is why FORGE output includes deploy instructions for three hosts. The framework does not lock you in. Your hosting decision can change when pricing changes.

## TypeScript support is first class

AI-generated code has a specific failure mode: subtly wrong types that compile but break at runtime. TypeScript strict mode catches most of these at generation time, which means the output that reaches you has already passed a layer of validation.

Next.js ships with TypeScript ready. No configuration overhead.

## The ecosystem fits

Clerk for auth, Supabase for database, Stripe for payments, Resend for email, Sentry for monitoring. Every one of these has mature Next.js integration with documented patterns.

An AI generator can produce working auth flows, billing flows, and email flows because the patterns are well-documented and consistent. The model has training data on all of them.

## Server components reduce client complexity

Server components mean the AI can generate data-fetching logic that runs on the server without writing useEffect dances. Less client-side state management, fewer bugs, simpler output.

This is a real quality improvement. Compare AI-generated React from two years ago, stuffed with useEffect and useState, to AI-generated Next.js 15 server components now. Night and day.

## Deployment story is short

FORGE can include three-sentence deploy instructions for Vercel in a README and the user is done. Push to GitHub, connect to Vercel, add env vars, deploy.

Frameworks with more complex deployment stories force the generator to produce more documentation to be useful. Next.js lets the generator produce less and have it still work.

## The counterargument

Next.js is not the right choice for every project. If you need realtime-first architecture, a framework like SvelteKit or a more dedicated realtime stack may fit better. If you need static site generation for a blog, Astro is often more appropriate.

But for the kind of app an AI generator typically produces — a CRUD app with auth, billing, and a database — Next.js is the shortest path from prompt to working deployed application.

## Why FORGE chose Next.js 15 specifically

Three reasons.

App router conventions are stable now. The early wrinkles are ironed out. Generated output is less likely to hit an awkward edge case.

Server actions reduce the amount of API route boilerplate needed. The generator produces less code. Less code has fewer bugs.

The breaking changes in the Next.js 15 series are known and documentable. Await params in dynamic routes, for instance. A generator can enforce this pattern.

## What this means for you

If you are using an AI generator in 2026, you are probably getting Next.js output whether you asked for it or not. This is usually the right answer. Lean into it. Learn the framework conventions. The skills transfer directly to any hand-written Next.js work.

The Next.js you get from FORGE is the same Next.js a developer would write. Not a weird dialect, not a stripped-down subset. Real Next.js that runs wherever Next.js runs.
`,
  },
  {
    slug: 'five-mistakes-first-time-ai-app-builders-make',
    title: 'Five Mistakes First-Time AI App Builders Make (and How to Avoid Them)',
    description: 'The predictable errors that eat weekends. Skip the ones we already made.',
    category: 'Guides',
    readingTime: 6,
    publishedAt: '2026-04-10',
    updatedAt: '2026-04-10',
    author: 'Øyvind',
    content: `
Watching people use FORGE for the first time, the same mistakes keep showing up. None of them are stupid. They are all recoverable. But you can skip them if you know what to watch for.

## One: prompting for features before prompting for structure

The instinct is to describe all the features at once. A dashboard with charts and filters and export and dark mode and...

What the model produces when you do this is a feature-rich demo with a messy data model.

Better: prompt for the data model first. What are the tables. What are the relationships. What does a user own. Once the structure is right, feature prompts land on a clean foundation.

This is the same mistake humans make when they start building without schema thinking. AI does not save you from it, it just makes the consequences arrive faster.

## Two: not reading the generated auth flow

Most people skim the auth code because it is boring and they assume it works. Sometimes it does. Sometimes the generator has produced auth that validates on the client but not the server. Or it has left an admin route unprotected. Or it has written middleware that matches the wrong paths.

Every first-time builder should manually test: signup, login, logout, accessing a protected route while logged out, accessing an admin route as a regular user. Takes five minutes. Catches the auth holes that kill projects.

## Three: ignoring the env file

Generated apps have .env.example files listing every variable you need. First-time builders often deploy without filling them in, or fill in the Stripe test keys in production, or miss a required variable entirely.

The deploy fails silently. The app loads but signup does not work. The debugging spiral starts.

Fix: before deploy, open .env.example, read every line, confirm you have a real value for every variable in your production environment. Ten minutes. Saves hours.

## Four: skipping the local run

First-time builders often generate code and push straight to Vercel. The deploy fails because of a build error they could have caught locally in two minutes.

Run pnpm install and pnpm run build locally before the first deploy. Fix whatever the build complains about. Then deploy. The first deploy will usually succeed.

## Five: adding too many features before shipping

The app is ninety percent done. Instead of shipping, first-time builders keep adding. Dark mode. Keyboard shortcuts. A tour. Animations. Onboarding emails.

Meanwhile no real user has touched the product. The signal from real users is worth more than any of those features.

Fix: ship when the core loop works. Core loop means a user can sign up, do the main thing the app does, and pay if that is the business model. Everything else waits until real users ask for it.

## The meta-lesson

AI generation is fast at producing code. It is not fast at producing a product. The gap between working code and a live product with paying users is still mostly human work. Data modelling, auth verification, environment handling, local testing, ruthless scoping.

None of this is new. Experienced developers know it. First-time builders run into it every time. The tools get better, the lessons stay the same.

If you are building your first app with FORGE, set aside the afternoon you expect to spend on features and instead spend it on the five items above. You will ship a better product faster.
`,
  },
  {
    slug: 'what-makes-a-good-prompt-for-a-code-generator',
    title: 'What Makes a Good Prompt for a Code Generator',
    description: 'Two thousand words on how to actually write prompts that produce shippable apps, not generic demos.',
    category: 'Guides',
    readingTime: 8,
    publishedAt: '2026-04-09',
    updatedAt: '2026-04-09',
    author: 'Thomas',
    content: `
The people who get great output from FORGE write prompts that look nothing like the people who get mediocre output. The difference is not cleverness. It is structure.

Here is the structure that works.

## Start with who it is for

Bad: build me a project management app.

Better: build a project management app for solo freelancers managing five to ten active clients.

Good: build a project management app for solo freelancers juggling five to ten active clients who need to track project status, log billable hours, and send invoices. The user logs in once a day to see what is due.

The user description shapes every decision the model makes about feature scope, complexity, and polish. A tool for solo freelancers looks very different from a tool for teams of fifty.

## Name the core loop

Every app has one main thing the user does repeatedly. Identify it. State it explicitly.

For the freelancer tool above, the core loop is: open dashboard, see what is due today, mark items complete or log hours against them, close dashboard.

Stating this focuses the model on making that specific loop excellent. Secondary features become secondary. Primary features get the attention they deserve.

## Specify the data model

This is where most prompts fail. The model will invent a data model if you do not provide one, and the invented model is usually overcomplicated.

For the freelancer tool:
- Users have Clients.
- Clients have Projects.
- Projects have Tasks and TimeEntries.
- TimeEntries and Tasks both belong to a Project.
- Projects roll up to an Invoice when closed.

Ten lines of data model specification save you from rebuilding later.

## Name the stack

Every AI generator has default stack choices. Sometimes those defaults fit your project. Often they do not. Be explicit.

Stack for this project: Next.js 15, TypeScript strict, Tailwind, Clerk auth, Supabase postgres, Stripe for invoicing, Resend for email.

This produces much cleaner output than letting the model guess.

## State the non-negotiables

What must the generated app absolutely not do. List it.

Must not use dark navy backgrounds. Must not use react-icons. Must use next/image for all images. Must await params in all dynamic routes. Must validate env vars at startup.

These are the rules that catch the model's common failures. FORGE bakes many of these in already, but stating them in your prompt adds belt and braces.

## Describe the first page in detail

If you describe all fifteen pages at once, each page gets thin treatment. Describe the first page with care and let the rest be inferred from the pattern.

The home page for a logged-in user shows: a list of projects sorted by most recent activity, a prominent "log time" button, a sidebar showing today's tasks across all projects, and a header with current client count and hours logged this week.

That level of detail produces a well-thought-out home page. The model will apply the same care to subsequent pages if you ask it to maintain the pattern.

## Leave space for defaults

This is the subtle one. Experienced prompters know what not to say.

Do not specify things you do not care about. Font choice, colour palette details, animation timing, loading state appearances. If you specify them, you are committing to decisions before you have seen the output. If you leave them blank, the model makes sensible defaults you can iterate on.

Lean prompts with clear priorities outperform thick prompts with everything specified.

## The minimum viable prompt structure

For a weekend FORGE project, the prompt should contain:

- One sentence on who uses this.
- One sentence on the core loop.
- A data model, ten lines or less.
- A stack line.
- A detailed description of the most important page.
- A short list of non-negotiables.

That is it. Everything else flows from this. If your prompt fits on one screen, you are probably in the right zone.

## What goes wrong with giant prompts

Counterintuitively, prompts that are too long produce worse output than prompts that are focused.

When you specify every detail of every page, the model dedicates equal attention to trivial concerns and critical ones. It fills every screen with the average amount of effort instead of concentrating effort where it matters.

When you specify the core loop clearly and leave the rest to inference, the model can allocate more attention to making the core loop excellent.

Quality comes from focus, not from volume.

## Iteration after first generation

First output is never final. Plan to iterate.

First generation: does the data model match what I described. Does the main page show what I said to show. Does the auth flow work end to end.

If yes to all three, move on to polish. If no to any, correct that specific thing in the next prompt. Do not rewrite everything.

Second generation target: one specific fix. Not five.

Third generation target: another specific fix. Still not five.

This discipline is how serious FORGE users ship weekend projects. One big generation plus three targeted iterations. Not ten broad regenerations.

## The hardest part of prompt writing

The hardest part is not knowing what you want. Most people start prompting because they have a vague idea and hope the tool will help them discover the details.

It will not. The tool will produce whatever average thing fits the vague idea.

Before you open FORGE, write the data model on paper. Write the core loop on paper. Name the user on paper. Only then open the tool.

This feels like extra work. It saves ten times the work later. Every experienced FORGE user eventually adopts this pattern.

## One final note

If a prompt is not working, stop blaming the tool. Read the prompt again as if you are the model. Is the user clear. Is the data model stated. Is the core loop named. Are the non-negotiables listed.

Ninety percent of bad output is bad prompt. The remaining ten percent is genuine model limitation. Focus on the ninety first.
`,
  },
  {
    slug: 'deploying-forge-output-where-and-why',
    title: 'Deploying FORGE Output: Where and Why',
    description: 'Vercel, Cloudflare Pages, and Netlify. The actual trade-offs at realistic scales.',
    category: 'Guides',
    readingTime: 7,
    publishedAt: '2026-04-08',
    updatedAt: '2026-04-08',
    author: 'Thomas',
    content: `
FORGE generates standard Next.js. You can deploy it anywhere Next.js runs. Three hosts dominate the decision for most builders: Vercel, Cloudflare Pages, and Netlify.

Here is how to actually choose.

## The five-minute answer

Going live today, not sure how much traffic: Vercel. Fastest path from zero to deployed.

Expecting decent traffic, want lowest cost at scale: Cloudflare Pages. Free tier is generous beyond what most people need.

Already on Netlify for other projects: Netlify. Consistency beats squeezing a few dollars.

That is eighty percent of cases. Read on if you are in the remaining twenty.

## Vercel

The native home for Next.js. Everything works. Preview deployments on every PR. Edge functions. Serverless functions. Image optimisation.

Free tier: generous for small projects. Commercial use is not allowed on the free tier, which matters if you plan to monetise.

Pro tier: twenty a month per user. Covers most serious projects. Once you are on Pro, you rarely hit limits until you are doing real traffic.

The strength: everything just works. No configuration. No adapter. Push and deploy.

The cost concern: at scale, Vercel pricing is not cheap. Bandwidth charges and function invocation limits become real costs once you hit meaningful traffic.

## Cloudflare Pages

Runs Next.js via the @cloudflare/next-on-pages adapter. Not as native as Vercel but good enough for most apps.

Free tier: five hundred builds per month, unlimited bandwidth, unlimited requests. This is extraordinary for a free tier. Real production apps run on it without paying.

Paid tiers start at five a month.

The strength: near-zero cost at scale. Cloudflare's network is one of the fastest in the world. Great developer experience.

The concern: the adapter layer can produce subtle differences from native Next.js behaviour. Most of the time it is fine. Occasionally you hit an edge case that works on Vercel and fails on Cloudflare. Usually fixable, sometimes annoying.

## Netlify

Next.js runtime is mature. Handles most Next.js features. Split testing, form handling, functions all work.

Free tier: generous. Pro starts at nineteen a month.

The strength: good for teams that already use Netlify for static sites and want a consistent platform.

The concern: less native to Next.js than Vercel, less cost-effective at scale than Cloudflare Pages. It sits in the middle without a decisive edge for new projects.

## What FORGE does for you

Every FORGE-generated app includes a README with deploy instructions for all three. Environment variables are listed in .env.example. The code is standard Next.js with no host-specific dependencies.

You can deploy to one today and migrate to another next month. No lock-in.

## Specific scenarios

Prototype that might become a product:
Vercel. Fastest iteration. When it takes off, either stay on Vercel Pro or migrate to Cloudflare Pages for cost.

Agency building for a client:
Ask the client. Most clients do not care about the host. If the client has strong opinions, they will tell you. If they do not, default to Vercel for ease, pitch Cloudflare if cost comes up later.

Saas you are bootstrapping:
Cloudflare Pages. The free tier will get you to real revenue before you pay for hosting. Migrate to something else only if you hit a specific blocker.

Internal tool for a company:
Whatever the company already uses. Consistency matters more than the small cost differences.

High-traffic content site:
Cloudflare Pages, no contest. The free bandwidth is the winning feature.

Project with complex edge functions:
Vercel. Native edge function support is more mature than the alternatives.

## The migration cost

Migrating between the three hosts is manageable. Most migrations are:
- Change DNS.
- Rebuild on new host.
- Copy environment variables.
- Verify auth redirects still point to the right URLs.
- Done.

One afternoon of work in most cases. Do not overthink the initial choice. You can change it.

## What you should not do

Do not spend a day researching which host is "best". The differences are small for most projects. The time you save by just picking one and shipping is worth more than the five dollars a month you might save with the theoretical best choice.

Do not deploy to all three for redundancy on a small project. That is premature optimisation.

Do not use a host you have never used before for a project you need to ship today. Stick with what you know for new launches.

## My actual choice

For new FORGE projects, I deploy to Vercel first. Ship fast, worry about cost later.

If the project starts taking real traffic, I migrate to Cloudflare Pages for cost savings. Takes an afternoon.

If the project has specific needs only Vercel handles well (complex middleware, specific edge function features), I stay on Vercel and pay.

This is the pragmatic path. Not the cheapest, not the most optimised, but the one that lets me focus on shipping rather than infrastructure research.

The whole point of FORGE producing portable Next.js is that you never have to commit to a host on day one. Use that portability. Ship fast now. Optimise host later.
`,
  },

  // ═══════════════════════════════════════════════════════════════
  // SHORTER TUTORIALS (5)
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'tutorial-add-stripe-to-forge-output-in-20-minutes',
    title: 'Tutorial: Add Stripe to Your FORGE Output in 20 Minutes',
    description: 'Step by step from FORGE ZIP to first live Stripe payment. No prior Stripe experience required.',
    category: 'Tutorials',
    readingTime: 8,
    publishedAt: '2026-04-07',
    updatedAt: '2026-04-07',
    author: 'Thomas',
    content: `
FORGE ships apps with Stripe scaffolding already in place. But you still need to wire up your actual Stripe account. Here is how to do it the first time without wasting an afternoon.

## What you need before starting

- A FORGE-generated project with Stripe scaffolding (Pro or Agency tier output).
- A Stripe account, even an empty one.
- Twenty minutes.

## Step one: Stripe dashboard setup

Log into dashboard.stripe.com. Stay in test mode for now. You can flip to live mode after everything works.

Navigate to Products. Create your products with prices. For a simple Pro tier:
- Name: Pro Plan
- Recurring, monthly, amount of your choice.
- Save, then copy the Price ID. It looks like price_1AbcDEfghIJkl.

Repeat for any other tiers.

## Step two: get your API keys

In the Stripe dashboard, click Developers in the left sidebar, then API keys.

Copy:
- Publishable key starts with pk_test_
- Secret key starts with sk_test_

## Step three: add keys to your FORGE project

Open .env.local in your FORGE project. Add:

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PRO_PRICE_ID=price_1AbcDEfghIJkl

Save.

## Step four: set up the webhook endpoint

The webhook is how Stripe tells your app when a payment succeeds.

In the Stripe dashboard, go to Developers then Webhooks. Click Add endpoint.

Endpoint URL: for local testing, use the Stripe CLI. For production, use https://your-domain.com/api/webhooks/stripe

Events to listen to: check these four.
- checkout.session.completed
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_failed

Save. Copy the signing secret. Looks like whsec_abc123.

Add to .env.local:

STRIPE_WEBHOOK_SECRET=whsec_abc123

## Step five: test locally with Stripe CLI

Install Stripe CLI from stripe.com/docs/stripe-cli. Run:

stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe

This pipes Stripe's webhook events to your local dev server. Keep this terminal open.

## Step six: make a test purchase

In a second terminal, run your app:

pnpm run dev

Open the browser. Navigate to your pricing page. Click the Pro tier checkout button. Stripe test mode presents a checkout page.

Use test card: 4242 4242 4242 4242. Any future expiry, any CVC, any ZIP.

Complete checkout. Watch the terminal with stripe listen. You should see the checkout.session.completed event fire. Your app should mark the user as Pro.

If it does not, open your browser console and your server logs. The usual issues:
- Missing env variable.
- Webhook secret mismatch.
- Price ID typo.

## Step seven: verify the upgrade

Log in as the test user. Navigate to the dashboard. Confirm the Pro features are accessible.

If yes, you have a working Stripe integration.

## Going live

When ready:
- In Stripe dashboard, switch to Live mode.
- Create your products again in live mode (they are separate from test mode).
- Generate new live API keys.
- Create a new webhook endpoint pointing to your production URL.
- Replace keys in production environment (Vercel dashboard, Cloudflare Pages, wherever you host).
- Test with a real card for a cheap product first, then refund.

The test mode to live mode switch is the most common place for mistakes. Keys are different, products are different, webhooks are different. Go slowly the first time.

## Common issues

Webhook fires but user is not upgraded: check the webhook handler route for errors. Usually a Supabase connection issue or missing service role key.

Checkout page does not load: usually the Price ID is wrong or Stripe public key is missing.

User is upgraded but cannot access Pro features: auth middleware is reading the wrong user attribute. Check what your middleware is comparing against.

Each of these takes five minutes to debug once you know where to look. Check the server logs first, the webhook events second, the database state third.

That is the whole flow. One Stripe account, five env variables, one webhook, one test purchase. Twenty minutes, not a weekend.
`,
  },
  {
    slug: 'tutorial-connect-clerk-auth-to-supabase',
    title: 'Tutorial: Connect Clerk Auth to Supabase in Your FORGE App',
    description: 'The five-minute setup that makes Clerk users match Supabase rows and row-level security work correctly.',
    category: 'Tutorials',
    readingTime: 6,
    publishedAt: '2026-04-06',
    updatedAt: '2026-04-06',
    author: 'Øyvind',
    content: `
FORGE outputs apps with Clerk for auth and Supabase for database. Connecting them properly takes five minutes and saves hours of debugging later.

## The problem

Clerk manages users. Supabase stores data. Without the right plumbing, your app has no way to know that Clerk user X owns Supabase row Y.

The fix is small: sync the Clerk user ID into a users table in Supabase, and use that ID in your queries.

## Step one: the users table

Open Supabase SQL Editor. Run:

create table users (
  id uuid default gen_random_uuid() primary key,
  clerk_id text unique not null,
  email text,
  plan text default 'free',
  created_at timestamptz default now()
);

The clerk_id column is what ties everything together.

## Step two: sync on first login

In your FORGE app, open or create app/api/webhooks/clerk/route.ts. Clerk sends webhook events when users sign up.

Add a handler that catches user.created events:

import { Webhook } from 'svix'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const payload = await req.text()
  const headers = Object.fromEntries(req.headers)
  
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)
  const evt = wh.verify(payload, headers) as any

  if (evt.type === 'user.created') {
    await supabase.from('users').insert({
      clerk_id: evt.data.id,
      email: evt.data.email_addresses[0]?.email_address
    })
  }

  return new Response('ok')
}

## Step three: register the webhook with Clerk

In the Clerk dashboard, go to Webhooks. Add a new endpoint:
- URL: https://your-domain.com/api/webhooks/clerk (or use ngrok for local)
- Events: user.created, user.updated, user.deleted
- Copy the signing secret into CLERK_WEBHOOK_SECRET in your env.

## Step four: query Supabase with the Clerk user ID

In any authenticated route, get the Clerk user ID and filter Supabase by it:

import { auth } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) return <div>Not authed</div>

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', userId)
    .single()

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)

  return <ProjectList projects={projects} />
}

## Step five: row-level security

RLS is how you make sure users can only see their own data. In Supabase SQL Editor:

alter table projects enable row level security;

create policy "Users see own projects"
on projects for select
using (user_id = (
  select id from users where clerk_id = auth.jwt()->>'sub'
));

For this to work, you need Clerk to pass the JWT to Supabase. FORGE output handles this via a Clerk template JWT.

## Testing

Sign up a new user in your app. Check Supabase users table. A new row should appear with the Clerk ID.

Insert a test project row. Log in as that user. Query the projects. Only your rows should return.

Log in as a different user. Query the projects. Should return empty.

If both users see both sets of rows, RLS is not active or the policy is wrong. Re-run the policy creation and verify.

## What you just avoided

Without this flow, you end up storing Clerk IDs in every table, writing ad-hoc auth checks in every query, and eventually shipping an authorization bug because you forgot a check somewhere.

With this flow, RLS enforces the rules at the database level. Even if your application code has a bug, the database refuses to return other users' data.

This is worth the five minutes.
`,
  },
  {
    slug: 'tutorial-deploy-forge-app-to-cloudflare-pages',
    title: 'Tutorial: Deploy Your FORGE App to Cloudflare Pages Free',
    description: 'From GitHub to live on Cloudflare in under ten minutes, with zero hosting cost for most projects.',
    category: 'Tutorials',
    readingTime: 6,
    publishedAt: '2026-04-05',
    updatedAt: '2026-04-05',
    author: 'Thomas',
    content: `
Cloudflare Pages hosts Next.js apps with a generous free tier. For many FORGE projects, you will never pay for hosting. Here is the deploy, step by step.

## What you need

- A FORGE-generated app, running locally.
- A Cloudflare account (free to sign up).
- Your code in a GitHub repo.

## Step one: push to GitHub

If you have not already:

cd your-forge-project
git init
git add .
git commit -m "initial commit"

Create a new repo on github.com. Then:

git remote add origin https://github.com/you/your-repo
git branch -M main
git push -u origin main

## Step two: install the Cloudflare adapter

FORGE outputs standard Next.js. Cloudflare Pages needs a small adapter to run it.

pnpm add -D @cloudflare/next-on-pages

In package.json, add a build script:

"scripts": {
  "build": "next build",
  "pages:build": "npx @cloudflare/next-on-pages",
  "pages:deploy": "wrangler pages deploy .vercel/output/static"
}

Commit and push.

## Step three: connect Cloudflare Pages to your repo

In Cloudflare dashboard, go to Workers & Pages. Click Create, then Pages tab, then Connect to Git.

Authorise GitHub. Select your repo.

Build settings:
- Framework preset: Next.js
- Build command: pnpm run pages:build
- Build output directory: .vercel/output/static
- Environment variables: add every variable from your .env.local

Click Save and Deploy.

## Step four: first build

Cloudflare clones your repo, installs dependencies, runs the build. First build takes three to five minutes.

If it succeeds, you get a URL like your-app.pages.dev. Open it. Your app should load.

If it fails, click the build log. Most common issues:
- Missing env variables. Add them and retry.
- Node version mismatch. Add NODE_VERSION=20 to env vars.
- Build command wrong. Double-check the command above.

## Step five: custom domain

When ready to use a real domain:

In your Pages project, go to Custom domains. Add your domain.

If the domain is already managed by Cloudflare, one click and you are done.

If elsewhere, Cloudflare gives you a CNAME to add. Once DNS propagates, your site is live on the real domain.

## Step six: production env variables

Any env variable you need in production must be added in the Cloudflare Pages dashboard under Settings, Environment variables.

Do this for both Production and Preview environments.

Do not commit .env.local to git. It is already in .gitignore for FORGE outputs. Confirm that.

## Step seven: webhooks

If your app has webhook endpoints (Stripe, Clerk, Resend), update the webhook URLs in those services to point to your new Cloudflare URL.

A webhook pointing to localhost or an old URL fails silently and creates confusing bugs. Update these before you go live.

## Ongoing deploys

From here, every push to main triggers a new deploy. Preview deploys happen for every other branch and pull request.

To roll back, go to Deployments in your Pages project and click Rollback next to any previous deploy.

## The cost reality

Cloudflare Pages free tier: five hundred builds per month, unlimited bandwidth, unlimited requests.

A typical SaaS project pushes to main a few times a day. That is under a hundred builds a month. You will never hit the cap.

Bandwidth and requests are unlimited on the free tier. Your app can serve a million visitors a month on the free tier.

For most FORGE projects, hosting costs nothing until you hit enterprise scale. Compared to Vercel Pro at twenty a month per user, this is a meaningful saving, especially for projects that are not yet profitable.

## What you lose vs Vercel

Image optimisation is slightly less seamless. Some advanced Next.js features (like specific middleware patterns) work but need attention. Build times on Cloudflare are sometimes longer than Vercel.

None of these are dealbreakers. They are trade-offs for the cost.

## When to not use Cloudflare Pages

Complex middleware that relies on specific Vercel runtime features. In those cases, stay on Vercel.

Projects where the team already pays for Vercel Pro. The marginal saving is not worth the migration effort.

Everything else: Cloudflare Pages is the better default for cost.
`,
  },
  {
    slug: 'tutorial-add-anthropic-api-to-a-forge-app',
    title: 'Tutorial: Add Anthropic API Calls to Your FORGE App',
    description: 'Add Claude-powered features to any FORGE output in under ten minutes. With streaming.',
    category: 'Tutorials',
    readingTime: 7,
    publishedAt: '2026-04-04',
    updatedAt: '2026-04-04',
    author: 'Thomas',
    content: `
FORGE generates apps. Sometimes you want those apps to have their own AI features. Here is how to add Claude API calls to any FORGE-generated project.

## What you are building

A simple endpoint that takes a prompt, calls Claude, streams the response back to the frontend. Works for chatbots, content generators, analysis tools, anything.

## Step one: install the SDK

In your FORGE project:

pnpm add @anthropic-ai/sdk

## Step two: get an API key

Go to console.anthropic.com. Sign up if you have not. Navigate to API Keys. Create a new key.

Add to .env.local:

ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

## Step three: set a monthly budget

This is the step people skip and regret. In the Anthropic console, go to Plans and Billing. Set a monthly spending limit. Start with fifty dollars.

If a bug sends your API into a loop, this cap saves you. Do not skip this step.

## Step four: create the API route

Create app/api/claude/route.ts:

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
})

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const response = await client.messages.stream({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })

      for await (const chunk of response) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(chunk.delta.text))
        }
      }
      controller.close()
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked'
    }
  })
}

## Step five: add rate limiting

Do not skip this. A public API endpoint that calls Anthropic will be abused within days.

Simple in-memory rate limit. Add to the top of route.ts:

const counts = new Map<string, { count: number; reset: number }>()

function rateLimit(ip: string, max = 20, window = 3600000) {
  const now = Date.now()
  const record = counts.get(ip)
  if (!record || record.reset < now) {
    counts.set(ip, { count: 1, reset: now + window })
    return true
  }
  if (record.count >= max) return false
  record.count++
  return true
}

In your POST handler:

const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
if (!rateLimit(ip)) {
  return new Response('Rate limit exceeded', { status: 429 })
}

This allows twenty requests per hour per IP. Adjust to taste.

## Step six: the frontend

Create a page or component that calls the endpoint and displays the streaming response:

'use client'
import { useState } from 'react'

export default function ClaudePage() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    setResponse('')

    const res = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      setResponse(prev => prev + decoder.decode(value))
    }

    setLoading(false)
  }

  return (
    <div>
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
      <div>{response}</div>
    </div>
  )
}

## Step seven: add authentication if needed

If you want only logged-in users to call this endpoint, add Clerk middleware.

At the top of your route:

import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })
  
  // ... rest of your handler
}

## Model choice

Haiku is fastest and cheapest. Use for simple tasks, short responses, high volume.
Sonnet is the sensible default. Good quality, reasonable cost.
Opus is most capable but costly. Use for complex reasoning or when output quality justifies the spend.

For a user-facing chatbot, start with Sonnet. Switch down to Haiku for features where quality matters less. Switch to Opus only for premium tier features.

## Cost tracking

Log input and output tokens for every call. Cheap to do, saves you from billing surprises.

Most serious AI apps maintain a per-user token counter in the database and enforce monthly caps. If you are building a paid product, do this from day one.

## What you just built

A streaming Claude endpoint in a FORGE app. Same pattern works for any Claude-powered feature. Chat interfaces, content generation, summarisation, analysis. Swap the system prompt and the UI.

Total time: under ten minutes if you move quickly. The pattern is the same for every AI feature you will ever add.
`,
  },
  {
    slug: 'tutorial-white-label-forge-output-for-clients',
    title: 'Tutorial: White-Label Your FORGE Output for Agency Clients',
    description: 'Strip FORGE branding, inject client branding, ship code that looks like yours. Agency tier only.',
    category: 'Tutorials',
    readingTime: 5,
    publishedAt: '2026-04-03',
    updatedAt: '2026-04-03',
    author: 'Øyvind',
    content: `
Agency tier on FORGE includes white-label output. Here is how to actually use it for client work.

## Before you start

You need FORGE Agency ($99/mo). White-label is not available on Free or Pro.

Have your client's brand assets ready:
- Logo (SVG or PNG).
- Primary brand colour.
- Brand name.

## Step one: set your agency profile

In FORGE, navigate to Settings then White Label.

Upload your agency logo. Set your agency brand name. Set your agency primary colour.

This becomes the default branding on all your generated code. You are essentially saying, by default, strip FORGE branding and use my agency branding.

## Step two: create a client

Go to Agency then Clients. Click Add Client.

Fill in:
- Client name.
- Client email.
- Company name.
- Client logo URL (the client's logo, not yours).
- Client primary colour.

Save. You now have a client profile.

## Step three: generate code for this client

When starting a new generation, there is a dropdown labeled Branding.

Select the client profile you just created.

Prompt as normal. The generated output will use the client's brand instead of yours or FORGE's.

## Step four: what actually gets branded

The generated code includes the client's brand in:
- The footer of every page.
- The default logo component.
- The default primary colour in the Tailwind config.
- The OpenGraph image template.
- The favicon placeholder.
- The README title and description.

The code itself is clean. No "Made with FORGE" watermarks. No tracking pixels phoning home to NorwegianSpark.

## Step five: deliver to the client

Download the ZIP. The code is ready to hand over.

In the client call:
- Walk them through the README.
- Explain where to update environment variables.
- Show them how to deploy (Vercel is easiest for most clients).
- Offer optional ongoing maintenance if that is part of your package.

The client has no way to tell the code was generated by FORGE unless you tell them. It looks like custom work because, for their purposes, it is.

## Step six: maintaining multiple clients

The Client Dashboard shows all your client projects in one view.

Columns: client name, project count, last generation date, current plan status.

Click into any client to see their projects, usage, and billing status.

For agency workflows with five or more clients, this dashboard pays for the Agency tier on its own. You do not need to maintain a spreadsheet of which project belongs to which client.

## The legal and ethical note

White-label does not mean hiding from the client that you used AI to generate code. Be honest if asked.

What white-label means is that the output does not carry FORGE branding. The client gets code that is yours to deliver under whatever arrangement you have with them.

Most agency clients do not ask how the code was produced. They care about the deliverable. If they ask, tell them the truth.

## Pricing the work

A common question: if generation takes minutes and white-label strips the brand, what do you charge the client?

The work you charge for is not the generation. It is:
- Understanding their requirements (hours of discovery).
- Prompting correctly to match their needs.
- Reviewing the output for quality.
- Customising after generation to fit specific needs.
- Deploying and handing over.
- Ongoing support and maintenance.

Generation is one step in a larger engagement. Charge for the engagement, not the generation.

Typical agency projects using FORGE land between five thousand and twenty thousand per project depending on scope. FORGE reduces your build time from weeks to days. The savings go to your margin, not the client's bill.

## What not to do

Do not advertise that you use FORGE. That is fine for them to know if they ask, but proactively telling them undermines your value prop.

Do not deliver raw FORGE output without review. The generator is excellent but not infallible. Ten to twenty percent of outputs need human cleanup before they are client-ready. Catch that before delivery.

Do not use white-label to pass off genuinely bad work as yours. Review carefully. Reputation matters more than the short-term margin.
`,
  },
]

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getArticlesByCategory(category: Article['category']): Article[] {
  return articles.filter(a => a.category === category)
}

export function getRecentArticles(limit = 6): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export const articleCategories = ['Comparisons', 'Guides', 'Tutorials'] as const

export const ARTICLES = articles.map(a => ({
  slug: a.slug,
  title: a.title,
  description: a.description,
  date: a.publishedAt,
  author: a.author,
  readTime: `${a.readingTime} min read`,
  tags: [a.category.toLowerCase()],
  body: a.content,
}))

export function getArticle(slug: string) {
  return ARTICLES.find(a => a.slug === slug)
}
