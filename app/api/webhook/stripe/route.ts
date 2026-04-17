import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { getSupabaseAdmin } from "@/lib/supabase"
import * as Sentry from "@sentry/nextjs"

export const runtime = "nodejs"

async function sendPlanEmail(email: string, plan: string): Promise<void> {
  try {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    const subjects: Record<string, string> = {
      pro: "Welcome to FORGE Pro!",
      agency: "Welcome to FORGE Agency!",
      free: "Your FORGE subscription has ended",
    }
    const bodies: Record<string, string> = {
      pro: "<h2>Welcome to Pro!</h2><p>You now have access to 100 generations/day with Claude Sonnet. Start building at <a href='https://claudeforge.shop/generate'>claudeforge.shop/generate</a>.</p>",
      agency: "<h2>Welcome to Agency!</h2><p>You now have unlimited generations, white-label, API access, and scheduled builds. Head to <a href='https://claudeforge.shop/agency/clients'>your Agency dashboard</a> to get started.</p>",
      free: "<p>Your subscription has ended and you've been moved to the free plan. You can re-subscribe anytime at <a href='https://claudeforge.shop/pricing'>claudeforge.shop/pricing</a>.</p>",
    }

    await resend.emails.send({
      from: `FORGE <${process.env.RESEND_FROM_EMAIL || "thomas@claudeforge.shop"}>`,
      to: email,
      subject: subjects[plan] ?? "FORGE plan update",
      html: bodies[plan] ?? `<p>Your plan has been updated to ${plan}.</p>`,
    })
  } catch (e) {
    console.error("Failed to send plan email:", e)
  }
}

function getPlanFromPriceId(priceId: string): string {
  if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) return "agency"
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return "pro"
  return "pro"
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!sig || !secret) return NextResponse.json({ error: "Missing signature" }, { status: 400 })

  const body = await req.text()
  const stripe = getStripe()
  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch (err) {
    console.error("Invalid Stripe signature", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  const { data: existing } = await supabase
    .from("stripe_events")
    .select("id")
    .eq("id", event.id)
    .single()

  if (existing) {
    return NextResponse.json({ received: true, duplicate: true })
  }

  await supabase.from("stripe_events").insert({
    id: event.id,
    event_type: event.type,
  })

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as {
          customer: string
          subscription: string
          metadata?: { user_id?: string; plan?: string }
          customer_email?: string
          line_items?: { data?: Array<{ price?: { id: string } }> }
        }
        const userId = session.metadata?.user_id
        if (userId) {
          const plan = session.metadata?.plan ?? "pro"
          await supabase.from("users").upsert({
            clerk_id: userId,
            stripe_customer_id: session.customer,
            plan,
          }, { onConflict: "clerk_id" })

          await supabase.from("subscriptions").upsert({
            user_id: userId,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            status: "active",
            plan,
          })

          if (session.customer_email) {
            sendPlanEmail(session.customer_email, plan).catch(() => {})
          }
        }
        break
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as unknown as {
          id: string
          status: string
          current_period_end: number
          items?: { data?: Array<{ price?: { id: string } }> }
        }
        const priceId = sub.items?.data?.[0]?.price?.id
        const plan = priceId ? getPlanFromPriceId(priceId) : undefined

        const updates: Record<string, unknown> = {
          status: sub.status,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        }
        if (plan) updates.plan = plan

        await supabase.from("subscriptions").update(updates).eq("stripe_subscription_id", sub.id)

        if (plan) {
          const { data: subRow } = await supabase
            .from("subscriptions")
            .select("user_id")
            .eq("stripe_subscription_id", sub.id)
            .single()
          if (subRow) {
            await supabase.from("users").update({ plan }).eq("clerk_id", subRow.user_id)
          }
        }
        break
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as { id: string }
        const { data: subRow } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_subscription_id", sub.id)
          .single()

        await supabase.from("subscriptions").update({ status: "canceled", plan: "free" }).eq("stripe_subscription_id", sub.id)

        if (subRow) {
          await supabase.from("users").update({ plan: "free" }).eq("clerk_id", subRow.user_id)
          const { data: userRow } = await supabase.from("users").select("email").eq("clerk_id", subRow.user_id).single()
          if (userRow?.email) {
            sendPlanEmail(userRow.email, "free").catch(() => {})
          }
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as { customer_email?: string; subscription?: string }
        if (invoice.customer_email) {
          try {
            const { Resend } = await import("resend")
            const resend = new Resend(process.env.RESEND_API_KEY)
            await resend.emails.send({
              from: `FORGE <${process.env.RESEND_FROM_EMAIL || "thomas@claudeforge.shop"}>`,
              to: invoice.customer_email,
              subject: "FORGE: Payment failed — action required",
              html: "<p>Your latest payment failed. Please update your payment method within 3 days to keep your plan. After that, you'll be moved to the free plan.</p><p><a href='https://claudeforge.shop/pricing'>Update payment →</a></p>",
            })
          } catch {}
        }
        break
      }
    }
    return NextResponse.json({ received: true })
  } catch (err) {
    Sentry.captureException(err)
    console.error("webhook handler error", err)
    return NextResponse.json({ error: "Handler failed" }, { status: 500 })
  }
}
