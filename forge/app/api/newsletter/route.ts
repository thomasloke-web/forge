import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const limit = rateLimit(`newsletter:${ip}`, 5, 60 * 60 * 1000)
  if (!limit.success) return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 })

  let body: unknown
  try { body = await req.json() } catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 }) }

  const parsed = schema.safeParse(body)
  if (!parsed.success) return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 })

  const { error } = await supabaseAdmin
    .from('newsletter_subscribers')
    .upsert({ email: parsed.data.email, first_name: parsed.data.firstName ?? null }, { onConflict: 'email' })

  if (error) return new Response(JSON.stringify({ error: 'Failed to subscribe' }), { status: 500 })

  return new Response(JSON.stringify({ success: true }), { status: 201 })
}
