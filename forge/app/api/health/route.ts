import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const start = Date.now()
  let dbOk = false

  try {
    await supabaseAdmin.from('user_profiles').select('id').limit(1)
    dbOk = true
  } catch { /* noop */ }

  return Response.json({
    status: dbOk ? 'ok' : 'degraded',
    db: dbOk ? 'ok' : 'error',
    latency_ms: Date.now() - start,
    ts: new Date().toISOString(),
  }, { status: dbOk ? 200 : 503 })
}
