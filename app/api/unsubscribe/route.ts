import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")
  if (!email) {
    return new Response("<html><body><h1>Unsubscribe</h1><form method='POST'><label>Email: <input name='email' type='email' required /></label><button type='submit'>Unsubscribe</button></form></body></html>", {
      headers: { "content-type": "text/html" },
    })
  }

  const supabase = getSupabaseAdmin()
  await supabase.from("newsletter_subscribers").delete().eq("email", email)

  return new Response("<html><body><h1>Unsubscribed</h1><p>You have been removed from the FORGE mailing list.</p><a href='/'>Back to FORGE</a></body></html>", {
    headers: { "content-type": "text/html" },
  })
}

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const email = form.get("email") as string
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })

  const supabase = getSupabaseAdmin()
  await supabase.from("newsletter_subscribers").delete().eq("email", email)

  return NextResponse.redirect(new URL("/api/unsubscribe?email=" + encodeURIComponent(email), req.url))
}
