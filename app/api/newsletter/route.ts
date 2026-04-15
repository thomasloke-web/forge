import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { rateLimit, getIp } from "@/lib/rate-limit"

export const runtime = "nodejs"

const schema = z.object({ email: z.string().email(), name: z.string().max(200).optional() })

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  if (!rateLimit(`nl:${ip}`, 3, 3600_000)) {
    return NextResponse.json({ error: "Rate limit" }, { status: 429 })
  }
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  const { email, name } = parsed.data

  const key = process.env.RESEND_API_KEY
  if (!key) return NextResponse.json({ ok: true, message: "Subscribed (email not configured)" })

  try {
    const { Resend } = await import("resend")
    const resend = new Resend(key)
    await resend.emails.send({
      from: "FORGE <onboarding@resend.dev>",
      to: "thomaslien@norwegianspark.com",
      subject: `New subscriber: ${email}`,
      text: `Email: ${email}\nName: ${name ?? "-"}`,
    })
    await resend.emails.send({
      from: "FORGE <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to FORGE",
      text: `Hi${name ? ` ${name}` : ""},\n\nThanks for subscribing. We'll send occasional notes on AI app builders, new templates, and Forge updates.\n\nThomas & Øyvind\nNorwegianSpark SA`,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("newsletter error", err)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
