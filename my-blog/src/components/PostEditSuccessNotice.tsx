"use client"

import { useEffect, useState } from "react"

export default function PostEditSuccessNotice() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      // Remove the query parameter from the URL
      const url = new URL(window.location.href)
      url.searchParams.delete("updated")
      window.history.replaceState({}, "", url.toString())

      setVisible(false)
    }, 5_000)

    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) {
    return null
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-900"
    >
      Post updated successfully.
    </div>
  )
}
