import { z } from "zod"

const schema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  STRIPE_PRO_PRICE_ID: z.string().min(1),
  STRIPE_AGENCY_PRICE_ID: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
})

export type Env = z.infer<typeof schema>

function validateEnv(): Env {
  const parsed = schema.safeParse(process.env)
  if (!parsed.success) {
    console.warn("Env validation failed:", parsed.error.flatten().fieldErrors)
    return process.env as unknown as Env
  }
  return parsed.data
}

export const env = process.env.NODE_ENV === 'production'
  ? validateEnv()
  : (process.env as unknown as Env)
