import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { rateLimit, getIp } from "@/lib/rate-limit"

export const runtime = "nodejs"

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
})

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  if (!rateLimit(`contact:${ip}`, 5, 3600_000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })
  const { name, email, message } = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("Contact submission (no Resend key):", { name, email })
    return NextResponse.json({ ok: true })
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "FORGE <contact@claudeforge.shop>",
        to: ["norwegianspark@gmail.com"],
        reply_to: email,
        subject: `FORGE contact: ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    })
    if (!res.ok) {
      const err = await res.text().catch(() => "")
      console.error("Resend error", res.status, err)
      return NextResponse.json({ error: "Failed to send" }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("contact error", err)
    return NextResponse.json({ error: "Failed to send" }, { status: 500 })
  }
}
