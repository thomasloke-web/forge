export type Template = {
  id: string
  name: string
  category: string
  description: string
  prompt: string
  tags: string[]
}

export const TEMPLATES: Template[] = [
  { id: "saas-starter", name: "SaaS Starter", category: "SaaS", description: "Landing page with pricing, auth and dashboard stub.", prompt: "Build a modern SaaS landing page with hero, features, pricing (3 tiers), testimonials, FAQ, sign-in/sign-up forms and a minimal dashboard placeholder. Use Tailwind, Next.js App Router, TypeScript.", tags: ["nextjs","tailwind","auth"] },
  { id: "ai-chat", name: "AI Chat App", category: "AI", description: "Streaming chat interface with Claude backend.", prompt: "Build an AI chat application that streams responses from Claude via server-sent events. Include message history, markdown rendering, code highlighting and a sleek dark UI.", tags: ["ai","streaming","chat"] },
  { id: "portfolio", name: "Personal Portfolio", category: "Portfolio", description: "Minimal portfolio with projects and blog.", prompt: "Create a minimalist personal portfolio with about, projects grid, blog list, contact form and smooth page transitions with framer-motion.", tags: ["portfolio","blog"] },
  { id: "ecommerce", name: "E-commerce Store", category: "E-commerce", description: "Product catalog with cart and Stripe checkout.", prompt: "Build an e-commerce storefront with product grid, product detail pages, cart drawer, Stripe Checkout integration and order confirmation.", tags: ["stripe","cart"] },
  { id: "landing", name: "Marketing Landing", category: "Marketing", description: "High-converting landing page.", prompt: "Create a high-converting marketing landing page with animated hero, social proof, feature grid, video demo section, testimonials slider, pricing and CTA footer.", tags: ["marketing","cta"] },
  { id: "dashboard", name: "Admin Dashboard", category: "Dashboard", description: "Data-heavy admin with charts.", prompt: "Build an admin dashboard with sidebar navigation, KPI cards, recharts line/bar/pie charts, data table with sorting and pagination, and dark mode.", tags: ["dashboard","charts"] },
  { id: "blog", name: "MDX Blog", category: "Blog", description: "Static MDX blog with syntax highlighting.", prompt: "Create a Next.js MDX blog with post list, tag pages, RSS feed, sitemap, reading time, syntax highlighting via Shiki, and SEO metadata.", tags: ["mdx","seo"] },
  { id: "docs", name: "Documentation Site", category: "Docs", description: "Developer docs with sidebar and search.", prompt: "Build a documentation site with collapsible sidebar nav, in-page TOC, search via cmdk, dark mode, MDX content and previous/next page links.", tags: ["docs","mdx"] },
  { id: "directory", name: "Web Directory", category: "Directory", description: "Searchable directory of tools or services.", prompt: "Build a searchable directory with category filters, tag filters, card grid, detail pages, submission form, and Supabase-backed database.", tags: ["directory","supabase"] },
  { id: "crm-lite", name: "CRM Lite", category: "SaaS", description: "Lightweight contact and deal tracker.", prompt: "Build a lite CRM with contacts list, deal pipeline kanban, activity timeline, notes, and CSV import/export.", tags: ["crm","kanban"] },
  { id: "booking", name: "Booking App", category: "Booking", description: "Calendar-based appointment booking.", prompt: "Create an appointment booking app with service selection, calendar picker, time slots, Stripe deposit payment, and confirmation emails via Resend.", tags: ["calendar","stripe"] },
  { id: "newsletter", name: "Newsletter Site", category: "Content", description: "Newsletter signup + archive.", prompt: "Build a newsletter landing with signup form (double opt-in via Resend), archive of past issues stored as MDX, and a simple about page.", tags: ["newsletter","mdx"] },
  { id: "invoice", name: "Invoice Generator", category: "Tools", description: "Generate and download PDF invoices.", prompt: "Build an invoice generator with client form, line items, tax calculation, PDF export via react-pdf, and saved invoices list.", tags: ["pdf","tool"] },
  { id: "link-in-bio", name: "Link in Bio", category: "Social", description: "Linktree-style bio page.", prompt: "Build a link-in-bio page with avatar, bio, customizable link buttons, theme selector, analytics click tracking, and auth to edit.", tags: ["social","auth"] },
  { id: "community", name: "Community Forum", category: "Community", description: "Threaded discussion forum.", prompt: "Build a community forum with categories, threaded posts, markdown replies, upvotes, user profiles, and moderation tools.", tags: ["forum","community"] },
]

export function getTemplate(id: string) {
  return TEMPLATES.find(t => t.id === id)
}

export function getTemplateCategories() {
  return Array.from(new Set(TEMPLATES.map(t => t.category)))
}
