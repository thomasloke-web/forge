// lib/tutorials.ts — FORGE Deep Tutorials
// 3 long-form cornerstone tutorials for claudeforge.shop
// Drop this file into /lib and wire into /tutorials route

export type Tutorial = {
  slug: string
  title: string
  subtitle: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  publishedAt: string
  updatedAt: string
  author: 'Thomas' | 'Øyvind'
  heroImage?: string
  chapters: Chapter[]
  whatYouWillBuild: string[]
  prerequisites: string[]
}

export type Chapter = {
  number: number
  title: string
  body: string
  estimatedMinutes: number
}

export const tutorials: Tutorial[] = [
  // ═══════════════════════════════════════════════════════════════
  // DEEP TUTORIAL 1: Ship a SaaS in a Weekend
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'ship-a-saas-in-a-weekend-with-forge',
    title: 'Ship a SaaS in a Weekend With FORGE',
    subtitle: 'From empty folder to live paying product in 48 hours',
    description: 'A complete build log of shipping a real SaaS from prompt to first paying customer using FORGE, Stripe, and Cloudflare Pages. Every step, every mistake, every fix.',
    difficulty: 'Intermediate',
    duration: '48 hours of work, 3 hours of reading',
    publishedAt: '2026-04-17',
    updatedAt: '2026-04-17',
    author: 'Thomas',
    prerequisites: [
      'Basic comfort with a terminal',
      'A FORGE Pro or Agency subscription',
      'A Stripe account (test mode is fine for this tutorial)',
      'A Cloudflare account (free tier)',
      'A GitHub account',
    ],
    whatYouWillBuild: [
      'A functional SaaS with authentication, subscriptions, and a working core feature',
      'Deployed to Cloudflare Pages on a custom domain',
      'With Stripe subscriptions running in test mode',
      'Ready to accept real payments by flipping one switch',
    ],
    chapters: [
      {
        number: 1,
        title: 'Picking What to Build',
        estimatedMinutes: 30,
        body: `
Most weekend SaaS projects fail before the first line of code. Not because the code is hard. Because the idea is wrong.

A weekend SaaS needs three traits to succeed.

Narrow scope. One user type. One core action. You should be able to describe the whole product in a sentence. If you need a paragraph, the scope is too wide.

Real willingness to pay. Someone you can name would pay five to twenty a month for this. Not hypothetically. Actually.

Minimal external dependencies. No complex integrations that require API approvals taking weeks. No regulatory compliance layers. No hardware. Just web app, database, payments, email.

For this tutorial, we are building a simple SaaS I actually shipped. An invoice generator for solo freelancers. Users enter client info and line items, export a PDF, get a link to send the client. Free tier gives three invoices a month with a watermark. Pro tier at seven dollars a month removes the watermark and gives unlimited invoices.

Narrow scope: one user, freelancers. One core action: make an invoice. Willingness to pay: yes, every freelancing forum has complaints about invoice software being bloated. Dependencies: none.

You can follow this tutorial with my exact idea or substitute your own. The steps are identical. The specifics of your business logic will differ.

Spend thirty minutes now defining your idea this clearly. Write it down. If you cannot write it down in ten lines, keep refining until you can.
`,
      },
      {
        number: 2,
        title: 'Writing the Prompt',
        estimatedMinutes: 45,
        body: `
The prompt is the most important hour of your weekend. Rushing here costs you Saturday.

Open a text file. Write it like this.

Section one, the user.

This tool is for solo freelancers who invoice between three and ten clients per month. They are not accountants. They want to generate professional invoices quickly without learning software.

Section two, the core loop.

User logs in. Sees a list of past invoices. Clicks New Invoice. Enters client name, client email, their own business info (cached from profile), line items (description, quantity, rate). Tool calculates subtotal, tax, total. User clicks Generate. Gets a PDF download and a shareable link.

Section three, the data model.

Users have a Profile (business name, business email, business address, tax number, default tax rate). Users have Clients (name, email, address). Users have Invoices. Invoices have many LineItems. Invoices have a status (draft, sent, paid). Invoices have a total calculated from line items plus tax.

Section four, the stack.

Next.js 15, TypeScript strict, Tailwind, Clerk auth, Supabase database, Stripe for subscriptions, Resend for email. Deploy to Cloudflare Pages.

Section five, the pages.

The home page for logged-in users shows a list of invoices grouped by status, a prominent New Invoice button, and a stat showing total invoiced this month.

The invoice creation page has a two-column layout. Left column is the form for entering data. Right column is a live preview of the invoice updating as the user types. Bottom of the page has a Generate button that creates the PDF and navigates to the success page.

The invoice view page shows the rendered invoice, a Download PDF button, a Copy Link button, and status controls (mark as sent, mark as paid).

The pricing page shows two tiers side by side. Free tier, three invoices a month, watermark. Pro tier, seven dollars a month, unlimited invoices, no watermark, custom branding.

Section six, non-negotiables.

Must not use dark navy backgrounds. Must use next/image for all images. Must await params in all dynamic routes. All forms must use server actions, not client-side fetch. All auth-protected routes must verify auth server-side, not just in middleware.

That is roughly 400 words of prompt. Resist the urge to add more detail. Let the model infer the rest.

Open FORGE. Paste the prompt. Wait for the generation to complete. With Sonnet on Pro tier, expect two to three minutes.

When it is done, download the ZIP. Extract somewhere clean. Open in your editor.

You now have a complete Next.js 15 project. Auth scaffold, Supabase migrations, Stripe integration, the pages described. It will not be perfect. It will be ninety percent there.
`,
      },
      {
        number: 3,
        title: 'Running It Locally',
        estimatedMinutes: 60,
        body: `
Before deploying, get it running on your machine. This catches the obvious issues early.

Open the project. Rename .env.example to .env.local.

You need to fill in values for every variable listed. Here is the minimum set for this SaaS:

Clerk publishable key and secret key. Create a free Clerk account. Go to API Keys. Copy both.

Supabase URL and anon key. Create a free Supabase project. Go to Settings, API. Copy the project URL and anon key. Also copy the service role key for server-side operations.

Stripe publishable and secret keys. Create a Stripe account if you do not have one. Start in test mode. Copy both keys from Developers, API keys.

Resend API key. Create a free Resend account. Copy the key.

Save .env.local. This file never commits to git. Confirm it is in .gitignore.

Run the setup commands. If the project uses pnpm (check for pnpm-lock.yaml), use pnpm. Otherwise npm.

pnpm install

Now set up the database. FORGE includes migration SQL in a migrations folder. Open Supabase SQL Editor. Copy the migration file contents. Paste and run.

Supabase should now have your tables. Verify by going to Table Editor. You should see users, profiles, clients, invoices, line_items.

Run the dev server.

pnpm run dev

Open localhost:3000. You should see the landing page.

Click Sign Up. Create an account. You should be redirected to the dashboard. It will be mostly empty.

If any of these steps fail, check the server logs. The most common issues at this stage:

Missing env variable. The error usually says which one. Add it and restart.

Clerk webhook not configured for local dev. The user gets created in Clerk but not in your Supabase users table. Fix by manually inserting a row in Supabase users with the Clerk ID, or set up the Clerk webhook with ngrok for local testing.

Supabase migration failed silently. Go to Supabase SQL Editor, re-run the migration, check for errors in the response panel.

Once you can sign up and see the dashboard, you have a working local setup. This probably took forty-five minutes. Normal.
`,
      },
      {
        number: 4,
        title: 'Testing the Core Loop',
        estimatedMinutes: 45,
        body: `
Before deploying, verify the core loop actually works.

Click New Invoice. Fill in client details. Add two line items. Click Generate.

Does it produce a PDF. Does the PDF look reasonable. Does it appear in the invoice list.

Probably not. FORGE output gets you ninety percent. The last ten is you.

Common issues at this stage:

PDF generation uses a library that needs specific setup. Look at the server logs. If it complains about missing binaries, you may need to add @vercel/og or a pdf-lib import. FORGE usually picks a library but sometimes picks one that needs extra deps.

The preview does not update in real time as the user types. This is a React rerender issue. Usually a missing key on the line items array or a form state bug. Ten minutes to fix.

Tax calculation is wrong. FORGE may have set up a simple tax calculation that ignores your profile's default tax rate. Fix the form to pull the rate from the profile.

Fix each issue as it appears. Do not add new features. Only fix the core loop. You want one user to be able to sign up, create an invoice, download the PDF.

Once that works end to end, you are ready to deploy.

This stage is where weekends get lost. People fix five things, get excited, start adding features, never ship. Discipline. Core loop only. Everything else after launch.
`,
      },
      {
        number: 5,
        title: 'Setting Up Stripe',
        estimatedMinutes: 30,
        body: `
The core loop works. Now add payments so you can actually charge for Pro.

In Stripe dashboard (still in test mode):

Create a product called Pro Plan. Price, seven dollars, recurring monthly. Copy the Price ID.

Add to your .env.local:

STRIPE_PRO_PRICE_ID=price_1Abcd...

In Stripe dashboard, go to Developers, Webhooks. Add endpoint. For now, skip the URL step, we will add it after deploy.

The FORGE output already has /api/webhooks/stripe/route.ts wired up. You just need to point Stripe at it once deployed.

Restart your dev server. Go to the pricing page in your app. Click Upgrade to Pro. Stripe Checkout should open. Use test card 4242 4242 4242 4242.

Complete checkout. You should be redirected back to your app. Your account should show as Pro.

If the upgrade does not happen, the webhook is not firing (since we have not deployed yet). For now, manually update the user plan in Supabase. We will wire the webhook properly after deploy.

Test that Pro features work. Create an invoice. The watermark should be gone on Pro accounts.

You now have a working SaaS locally. Authentication, a functional product, a pricing tier that unlocks features. Time to deploy.
`,
      },
      {
        number: 6,
        title: 'Deploying to Cloudflare Pages',
        estimatedMinutes: 60,
        body: `
Push to GitHub first.

git init
git add .
git commit -m "initial shippable version"

Create a new repo on GitHub. Push.

git remote add origin https://github.com/you/your-saas
git branch -M main
git push -u origin main

Install the Cloudflare adapter.

pnpm add -D @cloudflare/next-on-pages

In package.json add:

"scripts": {
  "pages:build": "npx @cloudflare/next-on-pages"
}

Commit and push.

In Cloudflare dashboard, Workers and Pages, Create, Pages, Connect to Git.

Select your repo. Build settings:

Framework preset: Next.js
Build command: pnpm run pages:build
Build output: .vercel/output/static

Environment variables: add every variable from .env.local. Every single one.

Save and deploy.

First build takes three to five minutes. Watch the log.

Common deploy failures:

Missing env variable. The build log will say which one. Add it and retry.

Node version too old. Add NODE_VERSION=20 to env vars.

pnpm not found. Cloudflare usually auto-detects, but if it fails, change build command to "npm install -g pnpm and pnpm run pages:build" or use npm instead.

Once the deploy succeeds, you get a .pages.dev URL. Visit it. Your SaaS is live.

Now update Stripe and Clerk to point at your live URL.

Stripe: go to Webhooks, add endpoint. URL is your-site.pages.dev/api/webhooks/stripe. Select events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted, invoice.payment_failed. Copy the signing secret. Add to Cloudflare env vars as STRIPE_WEBHOOK_SECRET.

Clerk: in Clerk dashboard, go to Domains. Add your .pages.dev domain. Update redirect URLs to point at your live URL.

Redeploy Cloudflare to pick up the new env vars. Another three minutes.

Test the live site. Sign up with a fresh email. Check that the Clerk webhook fires and creates a Supabase user. Click upgrade to Pro, do test checkout, verify the Stripe webhook upgrades your account.

If everything works, you have a live, functional SaaS. On a free hosting plan. This is end of Saturday.
`,
      },
      {
        number: 7,
        title: 'Custom Domain',
        estimatedMinutes: 30,
        body: `
The .pages.dev URL is fine for testing. For real customers, you want a real domain.

Buy a domain. Porkbun, Cloudflare Registrar, Namecheap are all fine. For this tutorial, let us say you bought quickinvoice.so.

If you bought through Cloudflare Registrar, skip the DNS step.

Otherwise, in your domain registrar, point nameservers to Cloudflare. Instructions vary by registrar but take five minutes.

In Cloudflare Pages, go to your project, Custom Domains, Set up a custom domain. Enter quickinvoice.so.

Cloudflare configures DNS automatically if you use Cloudflare Registrar. Otherwise it gives you the records to add manually.

Within an hour (usually ten minutes), your site is live on quickinvoice.so.

Update Clerk again to include the new domain. Update Stripe webhook URL to use the new domain.

Do one final test on the real domain. Sign up, create an invoice, upgrade to Pro. If all three work, you are done with infrastructure.
`,
      },
      {
        number: 8,
        title: 'Going Live',
        estimatedMinutes: 60,
        body: `
Time to flip to live Stripe mode.

In Stripe dashboard, toggle from Test to Live.

Create your product again in live mode. It is separate from test. Note the new Live Price ID.

Create a live webhook endpoint pointing at your real domain. Copy the new signing secret.

Update your Cloudflare env vars:

STRIPE_SECRET_KEY to the new live secret key.
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to the new live publishable key.
STRIPE_PRO_PRICE_ID to the live Price ID.
STRIPE_WEBHOOK_SECRET to the new live signing secret.

Redeploy.

On the live site, test with a real card for the cheapest possible amount. If you can, temporarily create a one-dollar product, buy it, confirm it works, then refund yourself.

Once confirmed, delete the test product. Keep your Pro Plan live.

Your SaaS is now accepting real payments.

Final steps.

Set up monitoring. Cloudflare has basic analytics. For error monitoring, add Sentry if not already in your FORGE output.

Set up email deliverability. If using Resend, configure SPF and DKIM for your domain. Takes ten minutes.

Write a Terms of Service and Privacy Policy. FORGE output usually includes placeholders. Fill them in. For a simple SaaS, terms and privacy boilerplate from iubenda or a similar service is fine.

Announce on one channel. Your Twitter, a relevant subreddit, Hacker News show HN. Do not spam ten places. Pick one where your user lives and post there. Include the URL, a screenshot, and a short description.

If your idea and execution are right, you will get first users within hours.
`,
      },
      {
        number: 9,
        title: 'Weekend Retrospective',
        estimatedMinutes: 20,
        body: `
What you just accomplished.

You went from empty folder to live SaaS accepting real payments. In about two days of work. With maybe fifty dollars of SaaS tool costs if you were on the free tiers throughout.

Five years ago, this took a team.

What worked.

Narrow scope. You picked one thing and only built that.

Fixing core loop before adding features. You stayed ruthless about what was blocking launch vs what was nice to have.

Using FORGE's output as a starting point instead of a final product. You reviewed, fixed, and shipped. You did not treat the generated code as sacred.

Free tiers all the way. Cloudflare Pages, Supabase free, Clerk free, Resend free. Total cost to ship: your FORGE Pro subscription plus whatever you spent on the domain.

What to do next.

Watch your first users. Every complaint is a todo item. Every feature request that three people ask for, build it. Every feature request only one person asks for, ignore it for now.

Iterate on the signup flow. The first version you shipped is fine. The version you ship next month will convert better.

Consider content. One SEO article a week takes hours. Over six months that is 25 articles ranking for invoice-related keywords. Free traffic compounds.

What not to do.

Do not rebuild from scratch. You will feel the urge to rewrite now that you know more. Resist. Iterate on what you have.

Do not add payment tiers until you need them. Free and Pro is enough for most SaaS projects for the first year.

Do not chase features that first users did not ask for. Let the users tell you what is missing.

Ship again next weekend.

Now that you have the process, the next SaaS takes less time. Second one in a day. Third in half a day. This is the real value of FORGE and the weekend SaaS approach.

Some of them will work. Most will not. That is fine. The ones that work pay for the FORGE subscription and then some.

Go ship.
`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // DEEP TUTORIAL 2: Building a Niche Directory Site
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'build-a-niche-directory-site-with-forge',
    title: 'Build a Niche Directory Site With FORGE',
    subtitle: 'From empty project to SEO-ready directory with 200 listings in one session',
    description: 'Directory sites rank well, monetise via affiliate links, and scale without manual effort. Here is how to build one properly with FORGE, including content structure, SEO architecture, and revenue path.',
    difficulty: 'Beginner',
    duration: '6 hours of work, 2 hours of reading',
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    author: 'Øyvind',
    prerequisites: [
      'A FORGE Pro or Agency subscription',
      'Basic familiarity with a terminal',
      'A domain name (ideally bought already)',
      'Willingness to do some manual research on your chosen niche',
    ],
    whatYouWillBuild: [
      'A fully-functional niche directory with categories, filters, and individual listing pages',
      'SEO-optimised from day one with proper schema, sitemap, and metadata',
      'Affiliate-ready with /go/ redirect routing for every outbound link',
      'Deployed live, ready to rank in Google',
    ],
    chapters: [
      {
        number: 1,
        title: 'Why Directories Work',
        estimatedMinutes: 20,
        body: `
A directory is a list of things, organised by category, with detail pages for each item. Boring. Underestimated. One of the highest-leverage site formats you can build.

Why they work.

SEO structure is ideal. Category pages target commercial-intent keywords. Listing pages target long-tail keywords. The internal linking structure naturally forms the kind of topical authority search engines reward.

Content scales without manual writing. Two hundred listings with auto-generated structured content rank better than fifty hand-written articles, in most cases, because the breadth signals authority to Google.

Monetisation is clear. Affiliate links on every listing. Premium listings. Sponsored placements. Newsletter sign-ups to build a list. All stackable.

Durability. A well-built directory keeps ranking for years with minimal maintenance. Add new listings occasionally, update old ones yearly, watch traffic compound.

What niches work.

Any category where buyers want to compare options before choosing. Tools, software, services, products, venues, events. Anywhere there are many options and buyers want a structured way to evaluate them.

Examples that work well: AI tools directory, VPN comparison, B-corp brands, remote job boards, newsletter recommendations, podcast directories, indie SaaS tools, Scandinavian design furniture.

Examples that do not work well: anything too generic (a directory of all products), anything that requires expert editorial judgement on every listing (a directory of fine art).

For this tutorial, we will build a directory of indie newsletter tools. Niche enough to rank, broad enough to have two hundred listings, commercial intent because users pay for these tools.

Substitute your niche. Steps are the same.
`,
      },
      {
        number: 2,
        title: 'Research Before Prompting',
        estimatedMinutes: 90,
        body: `
Directory sites live or die on data quality. Garbage in, nothing ranks. Spend a full ninety minutes on this step.

What you need to collect.

Listing names. The things you are listing. For newsletter tools, that is names like Substack, Beehiiv, Ghost, ConvertKit, Kit, and so on. Aim for fifty as a minimum to launch. A hundred is better. Two hundred is great.

Listing URLs. The homepage of each tool.

Categories. Group your listings into five to ten meaningful categories. For newsletter tools: Writing Platforms, Email Service Providers, Audience Growth Tools, Monetisation Tools, Analytics.

Affiliate program availability. For each listing, check if they have an affiliate program. If yes, get the program URL. If no, flag it.

Key data points per listing. For newsletter tools: starting price, free tier available, custom domain support, best for (solo writers / publications / teams), notable feature.

Do this in a spreadsheet. Columns for each field. One row per listing.

You can do this manually, or you can use AI assistance. Ask Claude to list the top fifty newsletter tools with starting prices and categorise them. Verify every output. AI is wrong about specifics often. Never trust a directory build without verification.

Budget ninety minutes. Do not shortcut this. A directory with fifty meticulously researched listings outperforms one with two hundred sloppy ones. Search engines reward accuracy.

By the end of this step, you have a spreadsheet with fifty to two hundred rows and eight to ten columns filled out. Save as CSV. You will feed it to FORGE.
`,
      },
      {
        number: 3,
        title: 'Writing the Directory Prompt',
        estimatedMinutes: 45,
        body: `
Directory prompts are structural. You are describing an architecture, not features.

Open a text file. Here is the template.

Build a directory site for indie newsletter tools. Users are people starting or running newsletters who want to compare platforms and service providers.

Stack: Next.js 15, TypeScript strict, Tailwind, Supabase for the listing database, Resend for newsletter signups. No auth needed for public browsing. Admin pages protected by a simple env-variable-based password for now.

Data model:

Tools have: slug, name, tagline, description (200 word), category, subcategory, homepage_url, affiliate_url, logo_url, starting_price, has_free_tier (boolean), custom_domain_support (boolean), best_for (writers/publications/teams/any), notable_feature, rating (editorial 1-5), last_updated.

Categories have: slug, name, description, icon.

Pages to build:

Home page: hero with search, category grid, top-rated tools section, recently added tools section, newsletter signup.

Category page at /category/[slug]: lists all tools in that category, filterable by price tier and best-for. Uses ItemList schema and BreadcrumbList schema for SEO.

Tool detail page at /tool/[slug]: full description, key details table, primary CTA to affiliate URL via /go/[slug], related tools from the same category. Uses Product schema.

Search page at /search: text search across tool names and taglines, filterable by category.

About page: who runs the site, how listings are chosen, disclosure about affiliate links.

Submit page: form for tool creators to request a listing. Submits to Supabase submissions table, admin reviews before publishing.

Admin pages at /admin: add tools, edit tools, approve submissions. Password-gated with ADMIN_PASSWORD env var.

SEO requirements:

Every listing page has unique metadata generated from the tool data.
Every category page has unique metadata emphasising the category name.
app/sitemap.ts includes every tool page and category page.
app/robots.ts blocks /admin and /api but allows everything else.
Structured data (JSON-LD) on home, category pages, tool pages.

Monetisation:

All outbound links to tools go through /go/[slug] for tracking. Each click fires a Vercel Analytics custom event named tool_click with the slug as a property.

Newsletter signup on every page, wired to Resend.

Design:

Clean, minimal, fast-loading. Light theme. Avoid dark navy. Emphasise readability. Card-based layout for listings. Single primary colour accent.

Non-negotiables:

next/image for every image with placeholder blur.
await params in all dynamic routes.
generateMetadata on every route.
TypeScript strict, no any.
Rate limiting on the submit form and newsletter endpoints.
Zod validation on all form inputs.

Seed the database with the tools from this CSV: [paste your CSV here].

Paste into FORGE. Generate. Three to four minutes for this scope on Sonnet.
`,
      },
      {
        number: 4,
        title: 'Loading the Data',
        estimatedMinutes: 45,
        body: `
FORGE will generate the schema and scaffolding. You still need to load the data into Supabase.

Two paths.

Path one, bulk insert via Supabase SQL Editor. FORGE usually generates a seed file in the format of SQL INSERT statements. Open it, copy into Supabase SQL Editor, run. Your tools table populates.

Path two, CSV import. Supabase's table editor supports CSV import. Go to Table Editor, select the tools table, click Import data. Upload your CSV. Map columns. Import.

Whichever path you take, verify the data. Go to the tools table in Supabase. Count the rows. Should match your source CSV count.

Check a sample of rows. Are URLs correct. Are prices correct. Is the category slug matching the category table. Is the logo URL loading.

Fix any issues in the CSV or via SQL updates. This is the step people rush and regret. Directory quality is data quality.

Run the dev server. Open localhost:3000. Your home page should show real tools, real categories, real data.

Browse a category. Your listings should appear. Click into a tool. The detail page should render with real information.

If anything looks wrong, do not try to fix it by re-prompting FORGE. Fix the data directly in Supabase. The code is fine. The data needs cleaning.
`,
      },
      {
        number: 5,
        title: 'Configuring Affiliate Redirects',
        estimatedMinutes: 30,
        body: `
Every outbound link should go through /go/[slug] before reaching the affiliate URL.

Why. Three reasons.

Tracking. You can count clicks per tool and know what converts.

Flexibility. If an affiliate program changes URL format or ends, you update one place in the database instead of editing every page.

SEO. Outbound affiliate links with rel=nofollow sponsored tell search engines not to pass ranking signals. A /go/ redirect route makes this systematic.

FORGE usually scaffolds the /go/ route correctly. Verify by opening app/go/[slug]/route.ts. It should:

Accept a slug parameter.
Look up the affiliate URL in Supabase.
Fire an analytics event.
Redirect (307) to the affiliate URL.

If it does not exist, create it. Simple implementation:

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data } = await supabase
    .from('tools')
    .select('affiliate_url, homepage_url')
    .eq('slug', slug)
    .single()

  const destination = data?.affiliate_url ?? data?.homepage_url ?? '/'
  return NextResponse.redirect(destination, 307)
}

Verify /go/ routes do not appear in sitemap.xml. Open app/sitemap.ts, confirm the /go/ path is excluded.

Verify robots.txt blocks /go/. Open app/robots.ts, confirm Disallow: /go/ is present.

Test a redirect. Visit /go/substack in your browser. It should redirect to the affiliate URL for Substack, or the homepage URL if no affiliate URL is set.

This is the monetisation foundation. Get it right now, it runs for years without attention.
`,
      },
      {
        number: 6,
        title: 'Deploying and Submitting to Google',
        estimatedMinutes: 60,
        body: `
Push to GitHub. Deploy to Cloudflare Pages (the detailed steps are in the Weekend SaaS tutorial, chapter 6).

Once live on a .pages.dev URL, point your custom domain.

Now the critical steps for a directory site: Search Console submission.

Go to search.google.com/search-console. Add property. Use Domain property (not URL prefix).

Verify ownership via DNS TXT record. Google gives you the record. Add it in Cloudflare DNS. Verification usually completes within an hour.

Submit your sitemap. In Search Console, go to Sitemaps. Add your-site.com/sitemap.xml. Google starts crawling.

For a directory with two hundred listings, initial indexation takes a few days to a few weeks. Monitor progress in Search Console, Coverage report.

Also submit to Bing Webmaster Tools at bing.com/webmasters. Bing has an Import from Google Search Console option that is one click. Do this. It covers Bing, DuckDuckGo, Yahoo, and Ecosia all at once.

Early traffic.

Directory sites do not get instant traffic. They build over months. The critical first steps:

One. Share the directory on your own social media. Some traffic, but mostly to get Google to notice the site via mentions.

Two. Submit to relevant directories-of-directories. For newsletter tools: beehiivcommunity-style places, indie hacker communities, relevant subreddits. Be transparent it is a directory, not an article.

Three. Write two or three thoughtful blog posts on the directory about topics in the niche. Link them into relevant category pages. This gives Google a signal that the site has editorial content, not just listings.

By month three, expect to see some organic traffic. By month six, it should be growing meaningfully. By month twelve, directory sites in good niches generate real revenue.
`,
      },
      {
        number: 7,
        title: 'Ongoing Operation',
        estimatedMinutes: 30,
        body: `
A directory is not done after launch. It needs ongoing maintenance to stay competitive.

Monthly tasks.

Add new listings. Aim for five to ten new additions per month. Fresh content signals to Google that the site is active.

Remove dead listings. Any tool that has shut down or been acquired, update or remove. Broken links hurt user trust and SEO.

Verify pricing. Tools change prices. Once a quarter, spot-check ten random listings against their current pricing. Update anything stale.

Respond to submissions. If you built a submit form, check it weekly. Approve legitimate tools. Reject spam.

Quarterly tasks.

Write a trend piece. What is new in the niche this quarter. What tools are gaining popularity. Internal link to relevant category pages.

Refresh category descriptions. Make sure they still reflect the current state of the niche.

Review affiliate programs. Are any programs ending. Any new ones worth joining. Update affiliate URLs.

Annual tasks.

Comprehensive data audit. Verify every listing's data. Remove dead tools. Update descriptions.

Re-photograph logos. Tool logos change. Fresh logos are a small but noticeable quality signal.

Revisit your search terms. Use Search Console's Performance report to see what terms are bringing traffic. Are your category pages well-optimised for those terms. Adjust copy where needed.

Monetisation.

At six months, evaluate affiliate earnings. Which listings convert. Which do not. For high-converting listings, consider featuring them more prominently (a "Featured" badge, top position in category, mention in homepage carousel).

Consider paid listings. Tools can pay to be featured. Price depending on your traffic. Rule of thumb: charge what a month of your top-position traffic would cost via Google Ads to that tool.

Consider a newsletter. Weekly digest of new listings plus one editorial pick. This builds an email list you can monetise directly via sponsored slots.

The pattern.

Directory sites are long-tail, high-margin businesses. They do not get exciting traffic spikes. They get steady, compounding traffic that turns into steady, compounding revenue. A good directory in a good niche is a five-year project that pays for itself for years after that.

Build it once, well. Maintain it monthly. Let it compound.
`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // DEEP TUTORIAL 3: From FORGE Output to Paying Customers
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'from-forge-output-to-paying-customers',
    title: 'From FORGE Output to Paying Customers',
    subtitle: 'The actual work between generating a SaaS and making money with it',
    description: 'Generation is the easy part. This tutorial covers everything FORGE does not do for you: positioning, pricing, launch channels, onboarding, retention. The unglamorous work that determines whether your SaaS earns anything.',
    difficulty: 'Advanced',
    duration: '4 weeks of execution, 3 hours of reading',
    publishedAt: '2026-04-13',
    updatedAt: '2026-04-13',
    author: 'Thomas',
    prerequisites: [
      'A deployed FORGE SaaS (complete the Weekend SaaS tutorial first)',
      'Willingness to do unglamorous marketing work',
      'Patience for a 4-to-8 week ramp to first customers',
    ],
    whatYouWillBuild: [
      'A positioning and messaging framework for your SaaS',
      'A pricing model calibrated to your market',
      'A launch plan with specific channels and measurable goals',
      'An onboarding flow that converts signups to paid users',
      'A retention system that keeps them paying',
    ],
    chapters: [
      {
        number: 1,
        title: 'The Honest Truth About FORGE Output',
        estimatedMinutes: 20,
        body: `
FORGE ships functional SaaS in hours. This fact misleads people into thinking the whole business is short.

It is not.

Generating the code is roughly twenty percent of shipping a SaaS. The other eighty percent is:

Positioning. Deciding who specifically this is for and what specifically it does, in language they recognise.

Pricing. Setting numbers that capture value without losing customers.

Launch. Getting the first fifty users, which is always harder than the next fifty thousand.

Onboarding. Converting signups to paying customers.

Retention. Keeping them paying month after month.

Support. Answering the first hundred questions that tell you what is actually broken.

Iteration. Fixing the unexpected problems that only show up with real users.

None of this happens in FORGE. All of it determines whether your SaaS earns.

This tutorial is about the other eighty percent.

If you shipped a SaaS following the Weekend SaaS tutorial, congratulations. Now the real work.
`,
      },
      {
        number: 2,
        title: 'Positioning',
        estimatedMinutes: 45,
        body: `
Positioning is how you answer the question, "who is this for and why would they use it instead of what they use now."

Most founders skip this step. They launch with generic messaging aimed at everyone, which appeals to no one.

The positioning exercise.

Step one. List three specific people who have the exact problem your SaaS solves. Real people you can name. Not personas. Actual humans.

For the invoice SaaS from the Weekend tutorial, this might be:
- Sarah, a freelance designer, invoices six clients a month, currently uses a spreadsheet and a PDF printer, hates the manual work.
- Tom, a consultant, invoices four big clients, currently uses Microsoft Word templates, frustrated with formatting.
- Ingrid, a copywriter, invoices twelve clients, currently uses PayPal invoicing but wants more professional output.

Step two. For each person, write one sentence: what they would type into Google to look for a tool like yours.

Sarah would type: "simple invoice generator for freelancers"
Tom would type: "professional invoice template with automatic tax"
Ingrid would type: "invoice software with branding"

These search queries are your keywords. Your homepage copy should contain language that matches what these people search for.

Step three. Write the one-sentence positioning.

Template: "[Product name] is [category] for [specific user] who need to [specific outcome]."

Example: "QuickInvoice is invoice software for solo freelancers who need to send professional invoices in under two minutes."

Notice what this positioning does not say. It does not say it is AI-powered. It does not say it is revolutionary. It does not try to appeal to enterprises or teams. It names a specific user and a specific outcome.

Step four. Rewrite your homepage hero with this positioning.

Headline: the outcome. "Send professional invoices in under two minutes."

Subhead: the user and the differentiator. "QuickInvoice is built for solo freelancers who hate bloated accounting software. Free for up to three invoices a month."

Primary CTA: the next step. "Create your first invoice free."

Compare this to what FORGE probably generated. FORGE produces competent but generic hero copy. Your positioning exercise replaces it with copy that resonates with specific users.

Step five. Apply this positioning everywhere.

Twitter bio. Email signature. About page. Pricing page. App empty state. Onboarding email. All of it should reflect the same positioning. Consistency is what makes a small SaaS feel like a real product.

Budget three hours for this exercise. It is the single highest-leverage work you will do on your SaaS this month.
`,
      },
      {
        number: 3,
        title: 'Pricing That Captures Value',
        estimatedMinutes: 40,
        body: `
Generated SaaS code ships with placeholder pricing. FORGE usually picks reasonable numbers, but those numbers were chosen without knowing your specific product and market. You need to redo them.

Pricing has three goals that pull against each other.

Maximise revenue. Higher prices mean more money per customer.

Minimise friction. Lower prices mean more customers sign up.

Signal value. Price positions your product. Too cheap looks cheap. Too expensive without the signals to match turns people away.

Balancing these requires research, not guessing.

The research.

Find three to five direct competitors. Note their pricing.

For an invoice SaaS, competitors might be: Wave (free), FreshBooks ($17/mo), QuickBooks Solopreneur ($15/mo), Bonsai ($25/mo).

Find three to five indirect competitors. These are tools used for the same job, even if they are not the same category. For invoicing: Microsoft Word templates (free but painful), PayPal invoicing (free but basic), spreadsheet plus PDF printer (free but ugly).

Your price has to exist in this landscape. Above free alternatives means you need to show value they do not offer. Below direct competitors means you are positioning as the budget option. In between means you need to explain why you picked that spot.

The two-tier model.

For most solo-founder SaaS, two tiers is enough. Free and Pro.

Free tier. Generous enough that users can get real value and decide if they want to pay. Limited enough that serious users hit the limit quickly.

For the invoice SaaS, free is three invoices a month with watermark. Someone invoicing two clients a month finds it useful. Someone invoicing ten clients hits the limit fast.

Pro tier. Whatever price your market supports. Usually somewhere between seven and thirty a month for an SMB-focused tool.

Pick a number that is memorable. Seven, nine, fifteen, nineteen, twenty-nine. Not six or eighteen. Not because the math is different, but because round-ish numbers signal confidence.

For the invoice SaaS: seven dollars a month. Below direct competitors. Above free. Priced as the simple, cheap alternative.

Annual option.

Offer annual billing at a discount. Seventy for the year instead of seven times twelve (84). Two months free.

Reason. Annual billing is a commitment. It signals real intent. It also improves your cashflow. About a quarter of Pro subscribers will pick annual if offered.

Do not launch with discounts.

Resist the urge to launch with a discount to attract early users. Two problems.

One, it trains users to expect discounts. When you raise prices later, they feel betrayed.

Two, customers who subscribe because of a discount are not validating your product. They are validating your discount. You learn nothing about real willingness to pay.

Better to launch at real price with a generous free tier. The free tier attracts users. The Pro tier attracts only those who actually value the product.

Changing prices later.

It is fine, and often required, to raise prices after six months. Existing subscribers usually get grandfathered at the old price. New customers pay the new price. This is standard practice and no one feels wronged.

It is harder to lower prices. Once you charge twenty-nine, lowering to nineteen feels like an admission. Start at a price you believe in, adjust up when demand supports it.
`,
      },
      {
        number: 4,
        title: 'The Launch Plan',
        estimatedMinutes: 50,
        body: `
Your SaaS is live. Now you need the first users.

There is no universal answer to "where to launch." The right channels depend on your niche. But there is a predictable sequence that works across most SaaS.

Week one: soft launch to your immediate network.

Email ten people you know who might have the problem your SaaS solves. Personal emails, not mass mail. Ask them to try it and give feedback.

Share with your personal social media. Twitter, LinkedIn, whatever you actually use. Tell the story. Explain what you built and why.

Goal for week one: ten signups, five of them active, two giving real feedback.

Purpose of week one: validate the product works, collect early feedback, fix obvious issues before wider launch.

Week two: relevant online communities.

Find three communities where your target users hang out. For freelancer tools: r/freelance, Indie Hackers, specific industry Slack groups.

Post in each. Not "check out my product." Instead, write a thoughtful post about the problem your product solves, mention your product at the end as how you approached the problem. Rule of thumb: eighty percent of the post should be useful to people who never click your link.

Goal for week two: fifty signups, fifteen active, five giving feedback.

Week three: Product Hunt or Hacker News.

These platforms are better for different products. Product Hunt works well for design-forward, consumer-ish SaaS. Hacker News works well for developer-adjacent or technical products.

For the invoice SaaS, Product Hunt is probably the better fit.

Launch well. Prepare:
- A good screenshot and gallery
- A clear one-line description
- A ready-to-engage audience (email your week one and week two users the night before, ask them to support)
- Time on the launch day to respond to comments for hours

A good Product Hunt launch gets 200-500 signups in a day. A bad one gets 20. The difference is preparation.

Goal for week three: 200 signups, 30 active, 5 paid upgrades.

Week four: content and SEO groundwork.

Write three SEO articles targeting keywords your positioning research identified. For the invoice SaaS: "how to invoice as a freelancer," "free invoice template," "invoice software for freelancers."

Each article should be thorough (1500-2500 words), genuinely useful, and reference your product contextually.

Publish on your site blog. Share each on your launch channels.

Goal for week four: articles published, indexed in Google, starting to rank for long-tail queries. Traffic from search is slow to start (2-3 months to meaningful levels) but compounds indefinitely.

After week four: steady work.

New users come from three sources.

Search traffic from your articles (growing slowly, month over month).
Word of mouth from existing users (grows with user count).
Ongoing content and community work (maintained pace of one article per week, one community post per week).

There is no magic channel that gets you from fifty users to five thousand quickly unless you are lucky with a viral moment. Most SaaS grow by doing the four-week plan above, then repeating the content and community work consistently for a year.

What not to do.

Do not pay for ads in the first three months. You do not know your conversion funnel yet. Money spent on ads is wasted until you understand what converts. By month three, you will know whether paid makes sense.

Do not try to scale too early. The founders who succeed spend more time talking to the first hundred customers than doing marketing. Every conversation teaches you something that changes how you build the product. That compounds.

Do not obsess over metrics weekly. Monthly is enough. Weekly metrics fluctuate too much to be meaningful.
`,
      },
      {
        number: 5,
        title: 'Onboarding That Converts',
        estimatedMinutes: 35,
        body: `
Signups do not equal customers. The gap between "created an account" and "paid for Pro" is called onboarding. Most SaaS lose most signups here.

Your goal: get users to experience the product's value within their first session. If they feel the value, many will eventually pay. If they do not, they churn silently and never come back.

The first-session checklist.

When a new user signs up, what is the absolute minimum they need to experience to feel the value.

For the invoice SaaS, it is: create their first invoice, download the PDF, see how good it looks.

If they do that, they get it. If they do not, they forget about your tool within a week.

Every step in the onboarding should be designed around getting them to that moment.

Step one. Signup itself.

Keep it minimal. Email and password. That is all. Do not ask for company name, role, phone number, how they heard about you. Every field costs you conversions.

Do collect email. Add them to a welcome email sequence (next section).

Step two. First app experience.

When they land after signup, do not show a blank dashboard. Show a clear next step.

For the invoice SaaS: "Welcome. Let's create your first invoice. It takes less than two minutes. [Start button]"

No tour. No 10-step onboarding flow. One clear action.

Step three. Guided first action.

Walk them through creating their first invoice. Pre-fill where you can.

Their business name, pulled from their email domain as a guess they can edit. Tax rate, defaulted to zero with a note to update. Line items, with a sample item pre-populated they can modify.

The goal is to get them to "Generate PDF" with as little friction as possible.

Step four. The payoff moment.

They click Generate. They get a PDF.

The PDF must be good. It must be clearly formatted, look professional, and represent something they would genuinely send to a client.

This is the moment that makes or breaks your retention. If the PDF is ugly, they churn. If it is polished, they become a user.

Step five. The nudge to upgrade.

After they create their third invoice (or hit whatever free tier limit), show a clear upgrade prompt.

Not a paywall. An invitation.

"You've created your third invoice this month. Upgrade to Pro for unlimited invoices, remove the watermark, and add your own branding. Seven dollars a month."

Clear value. Clear price. One-click upgrade.

The email sequence.

New signups get five emails over their first week.

Day zero: welcome email with a link to create their first invoice.
Day two: "did you create your first invoice" check-in with support offer.
Day four: a tip email, one specific feature they might not know about.
Day seven: "how's it going" email asking for any feedback, offering help.
Day fourteen: case study email, a short story of someone using the tool successfully.

Keep emails short. Two to four sentences each. Send from a personal-looking address, not no-reply.

Most email platforms can run this sequence automatically. Resend with a simple cron job works fine for early-stage SaaS.

Measuring onboarding.

Two metrics matter.

Activation rate. Percent of signups who complete the payoff moment (created first invoice, downloaded PDF) within the first week. Healthy: 40%+.

Day-7 return rate. Percent of signups who return within seven days. Healthy: 25%+.

Track these monthly. If either drops, examine your onboarding flow. Usually the problem is in step two or step four: the first app experience is confusing, or the payoff moment is not delivering.
`,
      },
      {
        number: 6,
        title: 'Retention and Growing',
        estimatedMinutes: 35,
        body: `
A paying customer today is worth five signups next month. Retention matters more than acquisition for a small SaaS.

Why customers churn.

Three reasons, in rough order.

One: the product is not valuable enough. They signed up, tried it, the value was real but small, and they do not miss it when it is gone.

Two: they changed. They are no longer freelancing, or they hired an accountant, or their business pivoted. You cannot control this.

Three: the product broke for them. A bug, a failed export, a missed email. Something visible went wrong and you did not notice.

Category one is fixed by making the product more valuable over time. Category two is uncontrollable. Category three is fixed by being attentive.

Retention mechanics.

Fix bugs the day you hear about them. For the first hundred customers, treat every reported issue as a top priority. This is not scalable long-term. It is essential short-term. Users who see their bug fixed within 24 hours become advocates.

Add feature requests strategically. Not all feature requests should be built. Criteria:

If three or more users request the same thing, consider it.
If one user requests it but it is on your roadmap, prioritise it.
If one user requests something unique to their niche, thank them and file it.

Do not add every feature. The product should stay simple enough to pitch in one sentence.

Proactive support. Once a month, email your entire paying user base. Short update on what is new, what you fixed, anything coming. One question: "Is there anything not working for you."

Fifteen percent of users will respond. Read every response. Half will be nothing important. Half will teach you something valuable.

Pricing reviews. Every six months, review your pricing.

Is the free tier still right, or are users converting too slowly.
Is the Pro tier still the right price, or are users willing to pay more.
Should there be a third tier at a higher price for teams.

Do not change pricing lightly, but do review it.

Measuring retention.

Two metrics.

Monthly recurring revenue (MRR). Total subscription revenue collected per month. This is the headline number for any SaaS.

MRR churn rate. Percent of MRR lost each month from cancellations. Healthy for a small SaaS: under 5% monthly. Under 3% is good. Under 1% is excellent.

Calculate both monthly. Track them in a simple spreadsheet.

If MRR churn spikes, investigate. Usually it is one of: a pricing change, a bug that slipped through, a feature removed that users relied on.

Growing past early stage.

If you are at thirty paying customers after three months, you are doing well. That is real.

If you are at zero paying customers after three months, something is wrong. Either the positioning is off, the pricing is wrong, or the product itself does not solve the problem you think it solves.

Talk to ten people who signed up but did not pay. Ask them: "why did you try it, and why did you not upgrade." The answers will tell you which of those three things is wrong.

Adjust accordingly. If positioning is off, rewrite the home page. If pricing is wrong, test a different number. If the product does not solve the problem, add the missing feature or pivot the positioning to what the product actually does well.

From thirty paying customers to three hundred is the real grind. Content marketing, community, word of mouth, ongoing product work. There is no shortcut.

From three hundred to three thousand starts looking like real business. At that point, you can afford to hire help, invest in paid acquisition, and specialise.

But it starts with the first thirty. Focus there.

The meta-lesson.

FORGE ships the code. You ship the business. The code was the fast part. The business is a year of work at best.

This does not have to be discouraging. Most founders never get past "had an idea." Most "had an idea" founders never ship code. Most founders who ship code never find their first ten customers.

If you followed the Weekend SaaS tutorial and then this one, you will be ahead of 99% of people who ever think about starting something.

The other 1% who make it further are not smarter than you. They are more patient. They do the unglamorous work, month after month, until it compounds.

Go do that.
`,
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find(t => t.slug === slug)
}

export function getTutorialsByDifficulty(difficulty: Tutorial['difficulty']): Tutorial[] {
  return tutorials.filter(t => t.difficulty === difficulty)
}

export function getAllTutorials(): Tutorial[] {
  return [...tutorials].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}
