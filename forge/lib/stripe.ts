import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: null,
    builds: 5,
    features: [
      '5 builds per month',
      'Code export (download)',
      'All templates',
      'Cloudflare Pages deploy guide',
      'FORGE watermark',
    ],
  },
  pro: {
    name: 'Pro',
    price: 19,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    builds: -1, // unlimited
    features: [
      'Unlimited builds',
      'Save & edit projects',
      'Cloudflare Pages one-click deploy',
      'Netlify one-click deploy',
      'No watermark',
      'Priority AI generation',
      'Email support',
    ],
  },
  agency: {
    name: 'Agency',
    price: 79,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID,
    builds: -1,
    features: [
      'Everything in Pro',
      'White-label builds',
      'Client dashboard',
      'API access',
      'Scheduled builds',
      'Up to 10 team members',
      'Priority support + onboarding',
    ],
  },
} as const
