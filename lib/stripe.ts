import Stripe from "stripe"

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder")
}

export const PRICES = {
  pro: { id: process.env.STRIPE_PRO_PRICE_ID || "", amount: 29, name: "Pro" },
  agency: { id: process.env.STRIPE_AGENCY_PRICE_ID || "", amount: 99, name: "Agency" },
}
