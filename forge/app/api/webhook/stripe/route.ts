import { NextRequest } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) return new Response('Missing signature', { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Invalid signature', { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.CheckoutSession
      const clerkUserId = session.metadata?.clerk_user_id
      const plan = session.metadata?.plan as 'pro' | 'agency'
      if (!clerkUserId || !plan) break

      await supabaseAdmin
        .from('user_profiles')
        .update({
          plan,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
        })
        .eq('clerk_user_id', clerkUserId)
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await supabaseAdmin
        .from('user_profiles')
        .update({ plan: 'free', stripe_subscription_id: null })
        .eq('stripe_subscription_id', sub.id)
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const priceId = sub.items.data[0]?.price.id
      let plan: 'free' | 'pro' | 'agency' = 'free'
      if (priceId === process.env.STRIPE_PRO_PRICE_ID) plan = 'pro'
      if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) plan = 'agency'

      await supabaseAdmin
        .from('user_profiles')
        .update({ plan })
        .eq('stripe_subscription_id', sub.id)
      break
    }
  }

  return new Response('OK', { status: 200 })
}
