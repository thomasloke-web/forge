"use client"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2, Send } from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return toast.error("Fill in all fields")
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "Failed")
      setSent(true)
      toast.success("Message sent")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Contact</h1>
      <p className="text-zinc-400 mb-10">Questions, partnerships, support — we reply within 24 hours.</p>
      {sent ? (
        <div className="rounded-2xl border border-green-800/60 bg-green-950/30 p-6 text-sm text-green-300">
          Message sent — we&apos;ll reply within 24 hours.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={7}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-3 text-sm focus:border-orange-500 outline-none resize-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </div>
  )
}
