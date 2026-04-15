import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

export type Project = {
  id: string
  user_id: string
  name: string
  prompt: string
  style: string
  generated_code: string | null
  deploy_url: string | null
  template_id: string | null
  created_at: string
  updated_at: string
}

export type UserPlan = 'free' | 'pro' | 'agency'

export type UserProfile = {
  id: string
  clerk_user_id: string
  plan: UserPlan
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  builds_this_month: number
  created_at: string
}
