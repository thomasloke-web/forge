export const metadata = { title: "Privacy", robots: { index: false } }

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-semibold mb-3">Privacy Policy</h1>
      <p className="text-xs text-zinc-500 mb-10">Last updated: 2026-04-15</p>
      <div className="space-y-6 text-zinc-300 leading-relaxed text-sm">
        <p>NorwegianSpark SA (&ldquo;we&rdquo;) operates claudeforge.shop. This policy explains what we collect and why.</p>
        <h2 className="text-xl font-semibold text-white">Data we collect</h2>
        <p>Email and name (Clerk), payment metadata (Stripe), project content you create (Supabase), and anonymous usage analytics (Vercel).</p>
        <h2 className="text-xl font-semibold text-white">How we use it</h2>
        <p>To run your account, process payments, and improve the product. We never sell your data.</p>
        <h2 className="text-xl font-semibold text-white">Your rights</h2>
        <p>Access, export, or delete your data any time. Email <a href="mailto:thomaslien@norwegianspark.com" className="text-orange-400">thomaslien@norwegianspark.com</a>.</p>
        <h2 className="text-xl font-semibold text-white">Cookies</h2>
        <p>We use essential cookies for authentication and anonymous analytics. No third-party advertising cookies.</p>
      </div>
    </div>
  )
}
