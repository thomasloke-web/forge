import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { getStripe } from "@/lib/stripe"
import * as Sentry from "@sentry/nextjs"

export const runtime = "nodejs"

export async function DELETE() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = getSupabaseAdmin()

  try {
    const { data: user } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("clerk_id", userId)
      .single()

    if (user?.stripe_customer_id) {
      const stripe = getStripe()
      const subs = await stripe.subscriptions.list({ customer: user.stripe_customer_id, status: "active" })
      for (const sub of subs.data) {
        await stripe.subscriptions.cancel(sub.id)
      }
    }

    await supabase.from("generations").delete().eq("user_id", userId)
    await supabase.from("scheduled_builds").delete().eq("user_id", userId)
    const { data: clients } = await supabase.from("clients").select("id").eq("agency_user_id", userId)
    if (clients?.length) {
      const clientIds = clients.map(c => c.id)
      await supabase.from("client_projects").delete().in("client_id", clientIds)
      await supabase.from("clients").delete().eq("agency_user_id", userId)
    }
    await supabase.from("subscriptions").delete().eq("user_id", userId)
    await supabase.from("projects").delete().eq("user_id", userId)
    await supabase.from("users").delete().eq("clerk_id", userId)

    return NextResponse.json({ deleted: true })
  } catch (err) {
    Sentry.captureException(err)
    console.error("GDPR delete error", err)
    return NextResponse.json({ error: "Deletion failed" }, { status: 500 })
  }
}
