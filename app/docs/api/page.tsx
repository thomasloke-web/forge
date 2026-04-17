import Link from "next/link"

export const metadata = { title: "API Documentation" }

export default function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">API Documentation</h1>
      <p className="text-zinc-400 mb-10">Generate code programmatically with the FORGE API. Available on the Agency plan.</p>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-4">Authentication</h2>
          <p className="text-sm text-zinc-300 mb-3">
            Pass your API key in the <code className="text-orange-400 bg-zinc-900 px-1.5 py-0.5 rounded">Authorization</code> header.
            Get your key from <Link href="/agency/api" className="text-orange-400 hover:text-orange-300">Agency → API Access</Link>.
          </p>
          <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-300 overflow-x-auto">Authorization: Bearer your_api_key_here</pre>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">POST /api/v1/generate</h2>
          <p className="text-sm text-zinc-300 mb-4">Generate a full Next.js project from a text prompt.</p>

          <h3 className="text-sm font-medium mb-2">Request body</h3>
          <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-300 overflow-x-auto whitespace-pre">{`{
  "prompt": "Build a SaaS landing page with pricing",  // required
  "template": "saas-starter",                          // optional
  "style": "minimal",                                  // optional
  "model": "sonnet"                                    // optional: "sonnet" or "opus"
}`}</pre>

          <h3 className="text-sm font-medium mt-6 mb-2">Example</h3>
          <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-300 overflow-x-auto whitespace-pre">{`curl -X POST https://claudeforge.shop/api/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Build a landing page with pricing table", "style": "minimal"}'`}</pre>

          <h3 className="text-sm font-medium mt-6 mb-2">Response</h3>
          <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-300 overflow-x-auto whitespace-pre">{`{
  "code": "// Full generated Next.js code...",
  "model": "claude-sonnet-4-6",
  "usage": {
    "inputTokens": 1234,
    "outputTokens": 5678,
    "costCents": 12
  }
}`}</pre>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Error codes</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-800">
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 font-medium">Meaning</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              <tr className="border-b border-zinc-900"><td className="py-2 pr-4 font-mono">401</td><td className="py-2">Missing or invalid API key</td></tr>
              <tr className="border-b border-zinc-900"><td className="py-2 pr-4 font-mono">403</td><td className="py-2">Agency plan required</td></tr>
              <tr className="border-b border-zinc-900"><td className="py-2 pr-4 font-mono">400</td><td className="py-2">Invalid request body</td></tr>
              <tr className="border-b border-zinc-900"><td className="py-2 pr-4 font-mono">429</td><td className="py-2">Daily rate limit exceeded</td></tr>
              <tr className="border-b border-zinc-900"><td className="py-2 pr-4 font-mono">503</td><td className="py-2">Service at capacity</td></tr>
              <tr className="border-b border-zinc-900"><td className="py-2 pr-4 font-mono">500</td><td className="py-2">Generation failed</td></tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Rate limits</h2>
          <p className="text-sm text-zinc-300">
            Agency plan: up to 1,000 generations per day (soft cap). Exceeding triggers a 429 response.
          </p>
        </section>
      </div>
    </div>
  )
}
