export type Template = {
  id: string
  name: string
  description: string
  category: string
  prompt: string
  preview: string
  popular?: boolean
}

export const templates: Template[] = [
  {
    id: 'saas-starter',
    name: 'SaaS starter',
    description: 'Auth, pricing, dashboard, Stripe subscriptions. Everything to launch a paid product.',
    category: 'SaaS',
    popular: true,
    preview: '/templates/saas-starter.png',
    prompt: `Build a SaaS starter with Next.js 15, TypeScript strict, Tailwind, Clerk auth, Supabase database, Stripe subscriptions.

Pages: landing page, /sign-in, /sign-up, /dashboard, /settings, /pricing.

Features:
- Clerk authentication (email + Google)
- Supabase: users table with plan column (free/pro)
- Stripe: Free plan (limited features) and Pro plan ($19/month, unlimited)
- Webhook handler at /api/webhook/stripe to update user plan on payment
- Dashboard: shows current plan, usage stats placeholder, upgrade CTA for free users
- Settings: update name, email preferences, manage subscription (link to Stripe portal)
- Pricing page: two tiers, highlighted Pro, checkout flow

Design: dark theme (#0a0a0a), green accent (#22c55e), clean minimal. No gradients.`,
  },
  {
    id: 'landing-page',
    name: 'Landing page',
    description: 'High-converting product landing page with waitlist, pricing, and FAQ.',
    category: 'Marketing',
    popular: true,
    preview: '/templates/landing-page.png',
    prompt: `Build a product landing page with Next.js 15, TypeScript, Tailwind.

Sections: Hero (headline, subheadline, primary CTA, secondary CTA), Social proof (logo strip or testimonials), Features (3 columns, icon + title + description), Pricing (3 tiers), FAQ (5 questions, accordion), Footer CTA.

Features:
- Email waitlist signup → Supabase waitlists table → confirmation email via Resend
- Smooth scroll navigation
- Mobile-first responsive
- Subtle fade-in animations on scroll (Intersection Observer)
- OpenGraph image, metadata, sitemap

Design: dark background, single accent color, clean typography. No stock photo backgrounds.`,
  },
  {
    id: 'client-portal',
    name: 'Client portal',
    description: 'Secure client login, file sharing, project status updates, invoices.',
    category: 'Agency',
    preview: '/templates/client-portal.png',
    prompt: `Build a client portal with Next.js 15, TypeScript strict, Tailwind, Clerk auth, Supabase.

Pages: /portal (redirect to login), /portal/[clientId]/overview, /portal/[clientId]/files, /portal/[clientId]/invoices, /admin/clients, /admin/clients/[id].

Features:
- Two roles: admin (agency) and client
- Admin creates client accounts, can upload files, add project updates, create invoices
- Clients see only their own portal
- File uploads: Supabase Storage, PDF and image support
- Project status: timeline of updates with status badges (In Progress, Review, Completed)
- Invoices: line items, total, status (Pending/Paid)
- Email notification to client when new file or invoice is added (Resend)

Design: professional, light theme, brand-neutral so agencies can white-label it.`,
  },
  {
    id: 'waitlist',
    name: 'Waitlist manager',
    description: 'Branded waitlist page, invite system, referral tracking.',
    category: 'Marketing',
    preview: '/templates/waitlist.png',
    prompt: `Build a waitlist manager with Next.js 15, TypeScript, Tailwind, Supabase, Resend.

Pages: / (waitlist signup page), /admin (password-protected dashboard), /confirm (post-signup thank you).

Features:
- Public signup form: name, email, optional referral code field
- Supabase: waitlist table (id, name, email, referral_code, referred_by, position, status, created_at)
- Each signup gets a unique referral code and link to share
- Referral tracking: signup via referral link bumps referrer up the list
- Confirmation email via Resend with referral link and position number
- Admin dashboard (simple password via env var): see all signups, search, filter by status, bulk invite (sends access email), CSV export
- Position counter on signup page (live from Supabase count)

Design: dark, minimal, product-launch feel.`,
  },
  {
    id: 'feedback-tool',
    name: 'Feedback collector',
    description: 'Share a link, collect structured feedback, view in dashboard.',
    category: 'Productivity',
    preview: '/templates/feedback.png',
    prompt: `Build a feedback collection tool with Next.js 15, TypeScript, Tailwind, Clerk auth, Supabase, Resend.

Pages: /, /dashboard, /boards, /boards/new, /b/[slug] (public feedback page), /sign-in, /sign-up.

Features:
- Users create feedback boards (name, description, custom slug)
- Each board has a shareable URL at /b/[slug]
- Anyone with the link can submit feedback (no auth required): title, description, optional email
- Feedback types: feature request, bug report, general
- Voting: visitors can upvote feedback items (one vote per IP per item)
- Dashboard: all boards, each board shows submissions sorted by votes
- Email notification to board owner on new submission (Resend)
- Status management: mark items as planned, in progress, completed

Design: clean light theme, neutral colors.`,
  },
  {
    id: 'invoice-generator',
    name: 'Invoice generator',
    description: 'Create and send professional invoices. PDF export, email delivery.',
    category: 'Finance',
    preview: '/templates/invoice.png',
    prompt: `Build an invoice generator with Next.js 15, TypeScript, Tailwind, Clerk auth, Supabase, Resend.

Pages: /dashboard, /invoices, /invoices/new, /invoices/[id], /clients, /settings.

Features:
- Client management: save client details (name, email, address, company)
- Invoice creation: select client, add line items (description, quantity, rate), tax rate, notes, payment terms, due date
- Invoice numbering: auto-increment per user (INV-001, INV-002...)
- PDF generation: use a simple HTML template rendered server-side, downloadable
- Send invoice by email: sends PDF as attachment via Resend
- Status tracking: Draft, Sent, Paid, Overdue
- Dashboard: outstanding balance, invoices due this month, recent activity
- Settings: business name, address, logo upload (Supabase Storage), payment instructions

Design: professional, light, clean. Invoice template should look premium.`,
  },
  {
    id: 'booking-scheduler',
    name: 'Booking scheduler',
    description: 'Service booking with availability, customer management, email confirmations.',
    category: 'Service Business',
    preview: '/templates/booking.png',
    prompt: `Build a booking scheduler with Next.js 15, TypeScript, Tailwind, Clerk auth, Supabase, Resend.

Pages: / (public booking page), /book/[serviceSlug] (book specific service), /dashboard, /services, /bookings, /settings.

Features:
- Service setup: name, description, duration (15/30/60/90 min), price, buffer time
- Availability settings: working hours per day of week, blocked dates
- Public booking flow: select service → pick date/time → enter details (name, email, notes) → confirm
- Supabase: services, availability_rules, bookings, blocked_dates tables
- Email confirmations: booking confirmation to customer + notification to owner (Resend)
- Dashboard: today's bookings, upcoming week, total bookings this month
- Booking management: confirm, reschedule, cancel (sends updated email to customer)
- No payment integration in base (add Stripe separately)

Design: clean, trustworthy, works well on mobile (customers book on phone).`,
  },
  {
    id: 'knowledge-base',
    name: 'Knowledge base',
    description: 'Searchable docs site with categories, full-text search, dark/light mode.',
    category: 'Documentation',
    preview: '/templates/knowledge-base.png',
    prompt: `Build a knowledge base / documentation site with Next.js 15, TypeScript, Tailwind.

Pages: / (home with category grid and search), /articles (all articles), /articles/[slug] (article page), /categories/[slug], /admin (add/edit articles, Clerk auth).

Features:
- Articles stored in Supabase: title, slug, content (Markdown), category, tags, published_at, updated_at
- Full-text search via Supabase full-text search (tsvector)
- Category filtering
- Markdown rendering with syntax highlighting for code blocks
- Table of contents auto-generated from headings
- Breadcrumb navigation
- Related articles (same category)
- Dark/light mode toggle (localStorage)
- Admin panel (Clerk auth): create, edit, publish articles
- Sitemap including all published articles

Design: documentation-focused, readable typography, sidebar navigation on desktop.`,
  },
  {
    id: 'api-status-page',
    name: 'API status page',
    description: 'Monitor your endpoints, display uptime history, alert subscribers on incidents.',
    category: 'Developer Tools',
    preview: '/templates/status.png',
    prompt: `Build an API status page with Next.js 15, TypeScript, Tailwind, Supabase, Resend.

Pages: / (public status page), /admin (manage monitors and incidents, Clerk auth).

Features:
- Monitor configuration: URL, name, check interval (every 1/5/10 minutes via cron), expected status code
- Uptime tracking: Supabase checks table (monitor_id, status, response_time_ms, checked_at)
- Public page: overall status banner (All Systems Operational / Degraded / Outage), per-service status, 90-day uptime percentage bars, recent incidents list
- Incident management: admin creates incidents (title, status, message), updates over time, resolves
- Subscriber alerts: email signup on public page, email via Resend when incident created/resolved
- Metrics: average response time, uptime percentage per monitor, checks per day
- Auto-refresh every 60 seconds on public page (no full reload, fetch update)

Design: clean, trustworthy. Green for operational, yellow for degraded, red for outage.`,
  },
  {
    id: 'changelog',
    name: 'Changelog',
    description: 'Public changelog with email subscribers. Keep users updated on new releases.',
    category: 'Product',
    preview: '/templates/changelog.png',
    prompt: `Build a product changelog site with Next.js 15, TypeScript, Tailwind, Supabase, Resend.

Pages: / (public changelog), /subscribe (email subscription management), /admin (post new entries, Clerk auth).

Features:
- Changelog entries: version, date, title, body (Markdown), category tags (Feature, Improvement, Bug Fix, Breaking Change)
- Public page: reverse chronological list, filterable by tag, each entry expandable
- Email subscription: visitors enter email to subscribe (Supabase subscribers table)
- When admin publishes new entry: send email digest to all subscribers (Resend, batched)
- Unsubscribe link in every email
- RSS feed at /rss.xml
- Admin: create/edit/publish entries, see subscriber count
- Each entry has a shareable permalink

Design: minimal, clean. Category tags color-coded (green=feature, blue=improvement, red=breaking, gray=bugfix).`,
  },
  {
    id: 'saas-admin-dashboard',
    name: 'Admin dashboard',
    description: 'Data tables, charts, user management. Clean admin panel for any SaaS.',
    category: 'SaaS',
    preview: '/templates/admin.png',
    prompt: `Build a SaaS admin dashboard with Next.js 15, TypeScript, Tailwind, Clerk auth, Supabase.

Pages: /admin (redirect to overview), /admin/overview, /admin/users, /admin/users/[id], /admin/revenue, /admin/settings.

Features:
- Overview: 4 KPI cards (MRR, active users, churn rate, new signups this month), charts (MRR trend 12 months, user growth), recent signups table
- Users: searchable/filterable table, columns (name, email, plan, joined, last active), click to user detail
- User detail: profile info, current plan, subscription history, ability to upgrade/downgrade/cancel, activity log
- Revenue: MRR by month chart, plan distribution pie chart, recent transactions list
- Charts: use Recharts (already in Tailwind ecosystem)
- Role protection: only users with admin role in Supabase can access /admin/*
- Export: users table CSV export

Design: professional dark admin theme. Dense data tables. Charts in muted colors.`,
  },
  {
    id: 'link-in-bio',
    name: 'Link-in-bio',
    description: 'Customizable profile page with links, analytics, and themes.',
    category: 'Creator',
    preview: '/templates/link-in-bio.png',
    prompt: `Build a link-in-bio tool with Next.js 15, TypeScript, Tailwind, Clerk auth, Supabase.

Pages: / (marketing landing page), /[username] (public profile page), /dashboard, /dashboard/links, /dashboard/appearance, /dashboard/analytics, /sign-in, /sign-up.

Features:
- Users claim a username on signup (unique, URL-safe)
- Link management: add links (title, URL, icon option), reorder via drag, toggle visibility
- Profile customization: bio, avatar (Supabase Storage upload), background color or gradient, button style (rounded/square/pill), font choice
- Analytics: click tracking (Supabase link_clicks table: link_id, clicked_at, country, device_type), chart of clicks per link over time
- Public profile at /[username]: all visible links, click tracking, open in new tab
- Social meta tags: OG image generated from profile (edge function)

Design: marketing page is dark and polished. Profile pages are clean and theme-able.`,
  },
  {
    id: 'team-standup',
    name: 'Async standup',
    description: 'Daily async standups via form. Aggregated digest sent to team by email.',
    category: 'Productivity',
    preview: '/templates/standup.png',
    prompt: `Build an async standup tool with Next.js 15, TypeScript, Tailwind, Clerk auth, Supabase, Resend.

Pages: /dashboard, /standup (today's standup form), /history, /team, /settings/schedule.

Features:
- Team members submit daily standup: what I did yesterday, what I'm doing today, blockers (optional)
- Supabase: teams, team_members, standups tables
- Schedule: admin sets digest time (e.g., 9am) and timezone
- Daily digest email to all team members via Resend: lists all submitted standups, flags who hasn't submitted
- Reminder email 1 hour before digest to members who haven't submitted
- History page: calendar view, click day to see all standups for that day
- Dashboard: today's submissions count, team members who've submitted vs pending
- Team management: invite members by email (sends Clerk invitation)

Design: calm, productivity-focused. Green accent for submitted, amber for pending.`,
  },
  {
    id: 'event-registration',
    name: 'Event registration',
    description: 'Event page with registration, ticket types, attendee management, and email confirmations.',
    category: 'Events',
    preview: '/templates/event.png',
    prompt: `Build an event registration system with Next.js 15, TypeScript, Tailwind, Supabase, Resend, Stripe.

Pages: /events (public listing), /events/[slug] (event page + registration), /tickets/[id] (ticket confirmation), /admin/events, /admin/events/[id], /admin/events/new.

Features:
- Event management: title, description, date, location (physical or online), banner image (Supabase Storage), capacity
- Ticket types per event: name, price (free or paid), quantity available, description
- Registration flow: select ticket type → fill form (name, email, optional questions) → Stripe checkout for paid → confirmation page + email
- QR code on confirmation page and email (encode ticket ID)
- Admin: create events, see registrations, export attendee CSV, check-in attendees (mark ticket as used)
- Waitlist: when capacity full, offer to join waitlist, auto-invite when spot opens

Design: clean event listing, prominent registration CTA, mobile-optimized checkout.`,
  },
  {
    id: 'newsletter-platform',
    name: 'Newsletter platform',
    description: 'Write and send newsletters. Paid subscriptions via Stripe. Subscriber management.',
    category: 'Creator',
    preview: '/templates/newsletter.png',
    prompt: `Build a newsletter platform with Next.js 15, TypeScript, Tailwind, Clerk auth, Supabase, Resend, Stripe.

Pages: / (public newsletter landing page), /[username] (writer profile + archive), /posts/[slug] (individual post, free preview or full for paid), /dashboard, /dashboard/write, /dashboard/subscribers, /dashboard/earnings.

Features:
- Writers sign up, claim username, set up newsletter (name, description, subscription price or free)
- Posts: rich text editor (use a simple textarea with Markdown, render with react-markdown), free or premium flag, publish or schedule
- Subscribers: free and paid tiers (Stripe subscriptions), paid subscribers see full posts
- Send: when post published, send email to all subscribers (free preview for free, full for paid) via Resend
- Subscriber management: list, export CSV, search
- Revenue: Stripe Connect so writers receive payments directly (platform takes 10% fee)
- Analytics: open rate, subscriber growth chart, revenue per month

Design: editorial, readable typography, writer-focused.`,
  },
]

export function getTemplate(id: string) {
  return templates.find(t => t.id === id)
}
