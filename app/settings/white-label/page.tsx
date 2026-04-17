"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Palette } from "lucide-react"

export default function WhiteLabelSettings() {
  const [brandName, setBrandName] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const [primaryColor, setPrimaryColor] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/agency/white-label")
      .then(r => r.json())
      .then(d => {
        setBrandName(d.brandName ?? "")
        setLogoUrl(d.logoUrl ?? "")
        setPrimaryColor(d.primaryColor ?? "")
      })
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false))
  }, [])

  async function save() {
    setSaving(true)
    const res = await fetch("/api/agency/white-label", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ brand_name: brandName, logo_url: logoUrl, primary_color: primaryColor }),
    })
    setSaving(false)
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      return toast.error(d.error ?? "Failed to save")
    }
    toast.success("White-label settings saved")
  }

  if (loading) return <div className="mx-auto max-w-3xl px-5 py-16 text-zinc-500">Loading...</div>

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="flex items-center gap-3 mb-3">
        <Palette className="w-6 h-6 text-orange-400" />
        <h1 className="text-3xl font-semibold tracking-tight">White-Label</h1>
      </div>
      <p className="text-zinc-400 mb-10">Customize how your generated code is branded. Agency plan only.</p>

      <div className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Brand name</label>
          <input
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
            placeholder="Your brand name"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 outline-none"
          />
          <p className="mt-1 text-xs text-zinc-500">Replaces &quot;FORGE&quot; in generated code headers and footers.</p>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Logo URL</label>
          <input
            value={logoUrl}
            onChange={e => setLogoUrl(e.target.value)}
            placeholder="https://example.com/logo.svg"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Primary color</label>
          <div className="flex gap-3 items-center">
            <input
              value={primaryColor}
              onChange={e => setPrimaryColor(e.target.value)}
              placeholder="#F97316"
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 outline-none"
            />
            {primaryColor && (
              <div className="w-10 h-10 rounded-lg border border-zinc-800" style={{ backgroundColor: primaryColor }} />
            )}
          </div>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-3 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save settings"}
        </button>
      </div>
    </div>
  )
}
