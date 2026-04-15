export const metadata = { title: "Terms", robots: { index: false } }

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-semibold mb-3">Terms of Service</h1>
      <p className="text-xs text-zinc-500 mb-10">Last updated: 2026-04-15</p>
      <div className="space-y-6 text-zinc-300 leading-relaxed text-sm">
        <p>By using FORGE you agree to these terms. FORGE is operated by NorwegianSpark SA, Org no: 834 984 172.</p>
        <h2 className="text-xl font-semibold text-white">Your code</h2>
        <p>Code you generate is yours. You may use it freely, including commercially. We claim no ownership.</p>
        <h2 className="text-xl font-semibold text-white">Acceptable use</h2>
        <p>Do not use FORGE to generate illegal content, malware, spam, or anything that violates OpenAI/Anthropic usage policies.</p>
        <h2 className="text-xl font-semibold text-white">Payments</h2>
        <p>Subscriptions are billed monthly via Stripe. Cancel any time; access continues to the end of the paid period.</p>
        <h2 className="text-xl font-semibold text-white">Liability</h2>
        <p>FORGE is provided &ldquo;as is&rdquo;. You are responsible for reviewing and testing generated code before deploying it.</p>
        <h2 className="text-xl font-semibold text-white">Contact</h2>
        <p><a href="mailto:thomaslien@norwegianspark.com" className="text-orange-400">thomaslien@norwegianspark.com</a></p>
      </div>
    </div>
  )
}
