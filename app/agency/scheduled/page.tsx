"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Calendar, Plus, Trash2 } from "lucide-react"

type Schedule = {
  id: string
  name: string
  prompt: string
  cron_expression: string
  enabled: boolean
  last_run_at: string | null
  created_at: string
}

export default function ScheduledBuildsPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [prompt, setPrompt] = useState("")
  const [cron, setCron] = useState("0 9 * * 1")

  useEffect(() => {
    fetch("/api/agency/scheduled")
      .then(r => r.json())
      .then(d => setSchedules(d.schedules ?? []))
      .catch(() => toast.error("Failed to load schedules"))
      .finally(() => setLoading(false))
  }, [])

  async function addSchedule() {
    if (!name.trim() || !prompt.trim()) return toast.error("Name and prompt are required")
    const res = await fetch("/api/agency/scheduled", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, prompt, cron_expression: cron }),
    })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      return toast.error(d.error ?? "Failed to create schedule")
    }
    const { schedule } = await res.json()
    setSchedules(prev => [schedule, ...prev])
    setName("")
    setPrompt("")
    setCron("0 9 * * 1")
    setShowForm(false)
    toast.success("Schedule created")
  }

  async function deleteSchedule(id: string) {
    await fetch(`/api/agency/scheduled?id=${id}`, { method: "DELETE" })
    setSchedules(prev => prev.filter(s => s.id !== id))
    toast.success("Schedule deleted")
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Scheduled Builds</h1>
          <p className="text-zinc-400 mt-2">Automate recurring code generations on a cron schedule.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400"
        >
          <Plus className="w-4 h-4" /> New schedule
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl border border-zinc-800 p-6 space-y-4">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Schedule name *"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 outline-none"
          />
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={4}
            placeholder="Generation prompt *"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-3 text-sm focus:border-orange-500 outline-none resize-none"
          />
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Cron expression</label>
            <input
              value={cron}
              onChange={e => setCron(e.target.value)}
              placeholder="0 9 * * 1"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm font-mono focus:border-orange-500 outline-none"
            />
            <p className="mt-1 text-xs text-zinc-500">e.g. &quot;0 9 * * 1&quot; = every Monday at 9 AM UTC</p>
          </div>
          <button
            onClick={addSchedule}
            className="px-5 py-2 rounded-full bg-orange-500 text-zinc-950 text-sm font-medium hover:bg-orange-400"
          >
            Create schedule
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-zinc-500 text-center py-12">Loading...</p>
      ) : schedules.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 p-12 text-center">
          <Calendar className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400 mb-2">No scheduled builds yet.</p>
          <p className="text-sm text-zinc-500">Create a schedule to automate your code generation.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {schedules.map(s => (
            <div key={s.id} className="rounded-xl border border-zinc-800 p-5 flex items-start justify-between">
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-zinc-400 mt-1 line-clamp-1">{s.prompt}</p>
                <div className="flex gap-4 mt-2 text-xs text-zinc-500">
                  <span className="font-mono">{s.cron_expression}</span>
                  <span>{s.enabled ? "Enabled" : "Disabled"}</span>
                  {s.last_run_at && <span>Last run: {new Date(s.last_run_at).toLocaleString()}</span>}
                </div>
              </div>
              <button
                onClick={() => deleteSchedule(s.id)}
                className="p-2 rounded-lg border border-zinc-800 hover:border-red-600 text-zinc-400 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
