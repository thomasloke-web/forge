import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { rateLimit, getIp } from "@/lib/rate-limit"
import { getSupabaseAdmin } from "@/lib/supabase"
import * as Sentry from "@sentry/nextjs"

export const runtime = "nodejs"

const schema = z.object({ email: z.string().email(), name: z.string().max(200).optional() })

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  if (!await rateLimit(`nl:${ip}`, 3, 3600_000)) {
    return NextResponse.json({ error: "Rate limit" }, { status: 429 })
  }
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  const { email, name } = parsed.data

  const supabase = getSupabaseAdmin()
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id, confirmed")
    .eq("email", email)
    .single()

  if (existing?.confirmed) {
    return NextResponse.json({ ok: true, message: "Already subscribed" })
  }

  if (!existing) {
    await supabase.from("newsletter_subscribers").insert({ email, name: name ?? null, confirmed: false })
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "thomas@claudeforge.shop"
  const key = process.env.RESEND_API_KEY
  if (!key) return NextResponse.json({ ok: true, message: "Subscribed (email not configured)" })

  try {
    const { Resend } = await import("resend")
    const resend = new Resend(key)

    const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://claudeforge.shop"}/api/newsletter/confirm?email=${encodeURIComponent(email)}`
    const unsubUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://claudeforge.shop"}/api/unsubscribe?email=${encodeURIComponent(email)}`

    await resend.emails.send({
      from: `FORGE <${fromEmail}>`,
      to: email,
      subject: "Confirm your FORGE subscription",
      html: `<p>Hi${name ? ` ${name}` : ""},</p><p>Click below to confirm your subscription:</p><p><a href="${confirmUrl}">Confirm subscription</a></p><p style="font-size:12px;color:#666;">If you didn't sign up, ignore this email. <a href="${unsubUrl}">Unsubscribe</a></p>`,
      headers: { "List-Unsubscribe": `<${unsubUrl}>` },
    })

    await resend.emails.send({
      from: `FORGE <${fromEmail}>`,
      to: "norwegianspark@gmail.com",
      subject: `New subscriber: ${email}`,
      text: `Email: ${email}\nName: ${name ?? "-"}\nStatus: pending confirmation`,
    })

    return NextResponse.json({ ok: true, message: "Check your email to confirm" })
  } catch (err) {
    Sentry.captureException(err)
    console.error("newsletter error", err)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
