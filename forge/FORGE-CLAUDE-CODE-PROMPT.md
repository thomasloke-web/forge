Read C:\Users\Eier\_NS-MASTER\CLAUDETHOMAS-ULTIMATE-v7.md first, then execute everything below.

═══════════════════════════════════════════════════════════════
FORGE — FULL BUILD + DEPLOY PROMPT
claudeforge.shop | NorwegianSpark SA
Not an affiliate site — no /go/ routes, no affiliate standards apply.
Use NS-SAAS-MASTER standards instead.
═══════════════════════════════════════════════════════════════

SITE NAME: FORGE
DOMAIN: claudeforge.shop
LOCAL PATH: C:\Users\Eier\forge
TEAM SCOPE: team_9saHTio8irKbiaFz3ispRyDr
DEPLOY: Cloudflare Pages (primary) — NOT Vercel
COPYRIGHT: © 2026 NorwegianSpark SA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 0 — ENVIRONMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

cd C:\Users\Eier\forge
Detect package manager: if pnpm-lock.yaml exists → pnpm, else npm.

Install all dependencies:
npm install (or pnpm install)

Key packages already in package.json:
- next@15.2.4
- @clerk/nextjs@^6
- @supabase/supabase-js@^2.45
- stripe@^16
- @stripe/stripe-js@^4
- zod, lucide-react, framer-motion, sonner
- resend, @sentry/nextjs
- @vercel/analytics, @vercel/speed-insights

Write .env.local if it doesn't exist (copy from .env.example, leave values blank):
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=
STRIPE_AGENCY_PRICE_ID=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=https://claudeforge.shop

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — VERIFY ALL FILES EXIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Check that every file below exists. If any is missing, create it now.
Do NOT modify any existing file — only create missing ones.

REQUIRED FILES:
├── app/
│   ├── layout.tsx                          ← Clerk provider, metadata, skip-nav
│   ├── page.tsx                            ← Homepage
│   ├── globals.css                         ← Dark theme CSS variables
│   ├── not-found.tsx                       ← Branded 404
│   ├── error.tsx                           ← Error boundary
│   ├── loading.tsx                         ← Loading UI
│   ├── sitemap.ts                          ← All public routes
│   ├── robots.ts                           ← Crawl rules
│   ├── sign-in/[[...sign-in]]/page.tsx     ← Clerk sign-in
│   ├── sign-up/[[...sign-up]]/page.tsx     ← Clerk sign-up
│   ├── dashboard/page.tsx                  ← User projects dashboard
│   ├── generate/page.tsx                   ← Main build UI with streaming
│   ├── pricing/page.tsx                    ← Pricing + FAQ
│   ├── templates/page.tsx                  ← Template grid
│   ├── templates/[id]/page.tsx             ← Template detail
│   ├── journal/page.tsx                    ← Article listing
│   ├── journal/[slug]/page.tsx             ← Article detail
│   ├── about/page.tsx                      ← Founders story
│   ├── privacy/page.tsx                    ← Privacy policy (noindex)
│   ├── terms/page.tsx                      ← Terms (noindex)
│   └── api/
│       ├── generate/route.ts               ← Anthropic streaming endpoint
│       ├── projects/route.ts               ← Save/list projects
│       ├── webhook/stripe/route.ts         ← Plan upgrades
│       ├── newsletter/route.ts             ← Email capture
│       └── health/route.ts                 ← Health check
├── components/
│   ├── nav.tsx                             ← Navbar with Clerk
│   ├── footer.tsx                          ← Footer with newsletter
│   └── prompt-tester.tsx                   ← Free AI scoring tool
├── lib/
│   ├── env.ts                              ← Zod env validation
│   ├── supabase.ts                         ← Supabase client + types
│   ├── stripe.ts                           ← Stripe client + PLANS
│   ├── rate-limit.ts                       ← In-memory rate limiter
│   ├── articles.ts                         ← 20 SEO articles
│   └── templates.ts                        ← 15 app templates
├── middleware.ts                            ← Clerk route protection
├── next.config.ts                          ← CSP headers
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── .env.example
├── .gitignore
├── supabase-schema.sql
├── README.md
└── public/
    └── manifest.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — FIX lib/env.ts FOR BUILD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

lib/env.ts uses Zod to validate env vars. In development with empty
.env.local values, the build will fail. 

Update lib/env.ts so validation is skipped in development
(when NODE_ENV !== 'production'):

Replace the validateEnv() call at the bottom with:
  export const env = process.env.NODE_ENV === 'production'
    ? validateEnv()
    : (process.env as unknown as Env)

This lets the build pass locally without real API keys.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — BUILD CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

npm run build (or pnpm run build)

Fix ALL TypeScript errors before proceeding. Zero errors required.
Common issues to watch for:
- Missing 'use client' on components using hooks
- await params in dynamic routes (Next.js 15 requirement)
- Missing return types on server actions
- Import paths — always use @/ prefix

Do NOT proceed to deploy until build is clean.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — CLOUDFLARE PAGES DEPLOY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORGE deploys to Cloudflare Pages, NOT Vercel.

Install Cloudflare adapter:
npm install @cloudflare/next-on-pages

Add to package.json scripts:
"pages:build": "npx @cloudflare/next-on-pages",
"preview": "npm run pages:build && wrangler pages dev .vercel/output/static"

Create wrangler.toml:
name = "forge"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

pages_build_output_dir = ".vercel/output/static"

Run the Cloudflare build:
npm run pages:build

Then deploy via Wrangler (if Cloudflare CLI installed):
npx wrangler pages deploy .vercel/output/static --project-name=forge

OR: Print instructions for manual Cloudflare Pages setup:

---
CLOUDFLARE PAGES SETUP (manual):
1. Go to https://dash.cloudflare.com → Pages → Create application
2. Connect your GitHub repository (push code to GitHub first)
3. Framework preset: Next.js
4. Build command: npx @cloudflare/next-on-pages
5. Build output directory: .vercel/output/static
6. Environment variables: add all from .env.example with real values
7. Click Save and Deploy
8. Custom domain: add claudeforge.shop
---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 5 — GIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

git init (if not already initialised)
git add -A
git commit -m "feat: FORGE full build — AI app builder with Claude streaming"
git push origin main

Print the GitHub repo URL.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 6 — SERVICES CHECKLIST (print and stop — Thomas does these)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Print this list. Thomas sets up each service and adds the keys to
Cloudflare Pages environment variables.

SERVICES TO SET UP:

[ ] Clerk — https://clerk.com
    Create app → copy NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY
    Add allowed redirect URLs: https://claudeforge.shop/sign-in, /sign-up, /dashboard

[ ] Supabase — https://supabase.com
    Create project → run supabase-schema.sql in SQL editor
    Copy NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY

[ ] Anthropic — https://console.anthropic.com
    Create API key → ANTHROPIC_API_KEY
    Set monthly spend cap to prevent surprises

[ ] Stripe — https://dashboard.stripe.com
    Create two products: Pro ($19/mo) and Agency ($79/mo)
    Copy price IDs → STRIPE_PRO_PRICE_ID, STRIPE_AGENCY_PRICE_ID
    Copy keys → NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY
    Add webhook → https://claudeforge.shop/api/webhook/stripe
    Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
    Copy webhook secret → STRIPE_WEBHOOK_SECRET

[ ] Resend — https://resend.com
    Verify claudeforge.shop domain → copy RESEND_API_KEY

[ ] Cloudflare Pages — https://dash.cloudflare.com
    Connect GitHub repo
    Add all env vars above
    Add custom domain: claudeforge.shop
    Deployment Protection: OFF (public site)

[ ] Google Search Console
    Add claudeforge.shop as property
    Verify via Cloudflare DNS TXT record
    Submit https://claudeforge.shop/sitemap.xml

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 7 — BROWSER TEST (run after live deploy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open https://claudeforge.shop and test every route:

/ — homepage loads, terminal mockup visible, comparison table, articles
/sign-up — Clerk signup form renders
/sign-in — Clerk signin form renders
/generate — build UI loads, template picker visible, textarea works
/dashboard — redirects to /sign-in if not logged in
/pricing — three plans visible, FAQ section
/templates — all 15 templates listed by category
/templates/saas-starter — detail page with prompt visible
/journal — all 20 articles listed
/journal/lovable-vs-bolt-vs-forge-2026 — article renders with content
/about — Thomas + Øyvind story
/privacy — loads, noindex confirmed
/terms — loads, noindex confirmed
/sitemap.xml — returns valid XML
/robots.txt — blocks /api/
/api/health — returns {"status":"ok",...}

Mobile 375px: zero horizontal scroll on all pages.

Print PASS or FAIL for each route.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 8 — PAGESPEED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Run Lighthouse on https://claudeforge.shop
All 4 scores ≥ 90 required before done.

If accessibility < 90: fix contrast on failing text elements only.
Do not change backgrounds or brand colours.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FINAL CHECKLIST — nothing is done until all boxes checked
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Live URL: https://claudeforge.shop
✅ Performance:
✅ Accessibility:
✅ Best Practices:
✅ SEO:
✅ npm run build — zero TypeScript errors: PASS
✅ Cloudflare Pages deployed (not Vercel): PASS
✅ All routes return 200: PASS
✅ /dashboard redirects to /sign-in if unauthenticated: PASS
✅ Clerk sign-in/sign-up renders: PASS
✅ /generate — prompt textarea + template picker visible: PASS
✅ /api/health returns 200: PASS
✅ /sitemap.xml includes all 20 articles + 15 templates: PASS
✅ /robots.txt blocks /api/: PASS
✅ 20 articles in /journal: PASS
✅ 15 templates in /templates: PASS
✅ Footer: © 2026 NorwegianSpark SA: PASS
✅ Footer: +47 99 73 74 67: PASS
✅ Footer: 834 984 172: PASS
✅ Footer: newsletter form wired to /api/newsletter: PASS
✅ No dark navy (#0A0F1E) background: PASS
✅ Mobile 375px zero horizontal scroll: PASS
✅ GitHub pushed: PASS

Print this block with real Lighthouse scores.
Do NOT mark done until every ✅ is confirmed.
