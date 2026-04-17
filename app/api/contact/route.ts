import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { rateLimit, getIp } from "@/lib/rate-limit"
import * as Sentry from "@sentry/nextjs"

export const runtime = "nodejs"

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
})

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  if (!await rateLimit(`contact:${ip}`, 5, 3600_000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })
  const { name, email, message } = parsed.data

  const fromEmail = process.env.RESEND_FROM_EMAIL || "thomas@claudeforge.shop"
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("Contact submission (no Resend key):", { name, email })
    return NextResponse.json({ ok: true })
  }

  try {
    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: `FORGE <${fromEmail}>`,
      to: ["norwegianspark@gmail.com"],
      replyTo: email,
      subject: `FORGE contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    Sentry.captureException(err)
    console.error("contact error", err)
    return NextResponse.json({ error: "Failed to send" }, { status: 500 })
  }
}
