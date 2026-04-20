"use client"

import { useEffect, useState } from "react"

import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 220)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) {
    return null
  }

  return (
    <main className="mx-auto flex min-h-[55vh] w-full max-w-6xl items-center justify-center px-6 py-16 md:px-10">
      <div className="earth-section flex items-center gap-3 px-5 py-4">
        <Spinner className="size-5 text-(--earth-forest)" />
        <p className="text-sm font-medium text-(--earth-muted)">Loading content...</p>
      </div>
    </main>
  )
}
