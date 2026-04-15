import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { getSupabaseAdmin } from "@/lib/supabase"

export const runtime = "nodejs"

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

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const userId = session.metadata?.user_id
        if (userId) {
          await supabase.from("subscriptions").upsert({
            user_id: userId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            status: "active",
            plan: session.metadata?.plan ?? "pro",
          })
        }
        break
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object
        await supabase.from("subscriptions").update({
          status: sub.status,
          current_period_end: new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000).toISOString(),
        }).eq("stripe_subscription_id", sub.id)
        break
      }
    }
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("webhook handler error", err)
    return NextResponse.json({ error: "Handler failed" }, { status: 500 })
  }
}
