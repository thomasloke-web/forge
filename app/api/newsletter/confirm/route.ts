import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")
  if (!email) return NextResponse.redirect(new URL("/", req.url))

  const supabase = getSupabaseAdmin()
  await supabase
    .from("newsletter_subscribers")
    .update({ confirmed: true })
    .eq("email", email)

  return NextResponse.redirect(new URL("/?subscribed=true", req.url))
}
