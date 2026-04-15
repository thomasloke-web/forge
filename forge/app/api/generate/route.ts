import { auth } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

const schema = z.object({
  prompt: z.string().min(10).max(5000),
  style: z.string().default('minimal'),
  templateId: z.string().optional(),
  projectId: z.string().uuid().optional(),
})

const SYSTEM_PROMPT = `You are FORGE, an expert Next.js 15 app builder. Generate production-grade Next.js 15 code from user descriptions.

RULES — follow every one, no exceptions:
1. Always use Next.js 15 App Router — never pages directory
2. TypeScript strict mode — no 'any', no ts-ignore
3. Tailwind CSS for all styling — no CSS modules, no inline styles
4. Server Components by default — 'use client' only when necessary (event handlers, hooks, browser APIs)
5. await params in ALL dynamic routes: const { slug } = await params
6. next/image for ALL images — never raw <img>
7. placeholder="blur" + blurDataURL on all next/image components
8. priority prop on above-fold images
9. Environment variables via process.env — wrap in lib/env.ts with Zod validation
10. All API routes: input validation with Zod, rate limiting, proper error responses
11. generateMetadata() on every page — unique title, description, openGraph
12. No dark navy (#0A0F1E) as a primary background

STRUCTURE — every project must include:
- app/layout.tsx — root layout with metadata, fonts, Clerk provider
- app/page.tsx — homepage
- app/not-found.tsx — branded 404
- app/error.tsx — error boundary
- app/loading.tsx — loading UI
- app/sitemap.ts — all public routes
- app/robots.ts — crawl rules
- components/ — shared components
- lib/env.ts — Zod env validation
- .env.example — all required vars documented

OUTPUT FORMAT:
Generate complete, working code. For each file, output exactly:
=== FILE: path/to/file.tsx ===
[complete file contents]
=== END FILE ===

Include every file needed. Do not use placeholders or TODOs. Write real, complete code.`

export async function POST(req: NextRequest) {
  const { userId } = await auth()

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const limiterKey = userId ? `generate:user:${userId}` : `generate:ip:${ip}`
  const limit = await rateLimit(limiterKey, userId ? 20 : 3, 60 * 60 * 1000)

  if (!limit.success) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded. Try again in an hour.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten() }), { status: 400 })
  }

  const { prompt, style, templateId, projectId } = parsed.data

  // Check plan limits for non-auth users
  if (!userId) {
    // Allow 3 free generations (tracked by IP via rate limiter above)
  } else {
    // Check monthly build count
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('plan, builds_this_month')
      .eq('clerk_user_id', userId)
      .single()

    if (profile?.plan === 'free' && (profile?.builds_this_month ?? 0) >= 5) {
      return new Response(JSON.stringify({
        error: 'Free plan limit reached (5 builds/month). Upgrade to Pro for unlimited builds.',
        upgradeUrl: '/pricing',
      }), { status: 402 })
    }
  }

  const userPrompt = `Build this app:\n\n${prompt}\n\nStyle preference: ${style}\n\nGenerate complete, production-ready Next.js 15 code. Include every file needed to run the app.`

  // Stream from Anthropic API
  const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      stream: true,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!anthropicResponse.ok) {
    const error = await anthropicResponse.text()
    console.error('Anthropic API error:', error)
    return new Response(JSON.stringify({ error: 'Generation failed. Please try again.' }), { status: 500 })
  }

  // Update build count if authenticated
  if (userId) {
    await supabaseAdmin.rpc('increment_builds', { p_clerk_user_id: userId })
  }

  // Save project if authenticated and projectId provided
  if (userId && projectId) {
    await supabaseAdmin
      .from('projects')
      .update({ prompt, style, template_id: templateId ?? null, updated_at: new Date().toISOString() })
      .eq('id', projectId)
      .eq('user_id', userId)
  }

  // Pipe the Anthropic stream directly to the client
  return new Response(anthropicResponse.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
