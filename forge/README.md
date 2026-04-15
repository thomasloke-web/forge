# FORGE — AI App Builder

Generate production-grade Next.js 15 apps from a prompt. Powered by Claude. Deploy free on Cloudflare Pages.

**Live:** https://claudeforge.shop  
**Built by:** NorwegianSpark SA · norwegianspark@gmail.com

---

## Stack

- **Framework:** Next.js 15 App Router, TypeScript strict
- **Styling:** Tailwind CSS
- **Auth:** Clerk
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe
- **Email:** Resend
- **AI:** Anthropic Claude Sonnet
- **Deploy:** Cloudflare Pages (primary), Netlify (alternative)

---

## Local setup

```bash
cp .env.example .env.local
# Fill in all env vars
npm install
npm run dev
```

## Database

Run `supabase-schema.sql` in your Supabase SQL editor.

## Deploy to Cloudflare Pages

1. Push to GitHub
2. Go to Cloudflare Pages → Create application → Connect repo
3. Build command: `npm run build`
4. Build output: `.next` (with `@cloudflare/next-on-pages` adapter)
5. Add all env vars from `.env.example`
6. Deploy

## Pricing

- **Free:** $0 · 5 builds/month · Code export
- **Pro:** $19/month · Unlimited builds · Cloudflare/Netlify deploy · Save projects
- **Agency:** $79/month · White-label · Client dashboard · API access

---

© 2026 NorwegianSpark SA · Org no: 834 984 172 · Bank: 3624 19 61537
