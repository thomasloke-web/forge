"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

const KEY = "forge-cookies-accepted"

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!localStorage.getItem(KEY)) setShow(true)
  }, [])

  if (!show) return null

  function set(v: "accepted" | "declined") {
    localStorage.setItem(KEY, v)
    setShow(false)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur p-5 shadow-2xl">
      <p className="text-sm text-zinc-300 leading-relaxed">
        We use essential cookies for auth and anonymous analytics to improve FORGE. No advertising cookies.{" "}
        <Link href="/privacy" className="text-orange-400 hover:text-orange-300 underline underline-offset-2">Privacy</Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => set("accepted")}
          className="px-4 py-2 rounded-full bg-orange-500 text-zinc-950 text-sm font-medium hover:bg-orange-400"
        >Accept</button>
        <button
          onClick={() => set("declined")}
          className="px-4 py-2 rounded-full border border-zinc-700 text-sm text-zinc-300 hover:border-zinc-500"
        >Decline</button>
      </div>
    </div>
  )
}
