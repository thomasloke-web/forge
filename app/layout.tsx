import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import CookieBanner from "@/components/cookie-banner"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://claudeforge.shop"),
  title: { default: "FORGE — AI App Builder Powered by Claude Opus 4.6", template: "%s · FORGE" },
  description: "Build production-ready web apps from plain English. Powered by Claude Opus 4.6. Deploy anywhere — Vercel, Netlify, Cloudflare. You own the code.",
  openGraph: { type: "website", url: "https://claudeforge.shop", siteName: "FORGE", title: "FORGE — AI App Builder Powered by Claude Opus 4.6", description: "Build production-ready web apps from plain English." },
  twitter: { card: "summary_large_image", title: "FORGE", description: "AI App Builder powered by Claude Opus 4.6" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const tree = (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <CookieBanner />
        <Footer />
        <Toaster position="top-center" theme="dark" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
  return hasClerk ? <ClerkProvider>{tree}</ClerkProvider> : tree
}
