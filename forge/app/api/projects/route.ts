import { auth } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'

const createSchema = z.object({
  name: z.string().min(1).max(100),
  prompt: z.string().min(10).max(5000),
  style: z.string().default('minimal'),
  templateId: z.string().optional(),
  generatedCode: z.string().optional(),
})

export async function GET() {
  const { userId } = await auth()
  if (!userId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) return new Response(JSON.stringify({ error: 'Failed to fetch projects' }), { status: 500 })
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

  const limit = rateLimit(`projects:${userId}`, 30, 60 * 60 * 1000)
  if (!limit.success) return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429 })

  let body: unknown
  try { body = await req.json() } catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 }) }

  const parsed = createSchema.safeParse(body)
  if (!parsed.success) return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert({
      user_id: userId,
      name: parsed.data.name,
      prompt: parsed.data.prompt,
      style: parsed.data.style,
      template_id: parsed.data.templateId ?? null,
      generated_code: parsed.data.generatedCode ?? null,
    })
    .select()
    .single()

  if (error) return new Response(JSON.stringify({ error: 'Failed to create project' }), { status: 500 })
  return new Response(JSON.stringify(data), { status: 201, headers: { 'Content-Type': 'application/json' } })
}
