"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[app-error]", error)
  }, [error])

  return (
    <main className="mx-auto flex min-h-[55vh] w-full max-w-3xl items-center justify-center px-6 py-16 md:px-10">
      <section className="earth-section w-full text-center">
        <h1 className="earth-section-title text-2xl md:text-3xl">Something went wrong</h1>
        <p className="earth-section-text mx-auto mt-3 max-w-xl">
          The page could not be loaded right now. Please try again.
        </p>
        <div className="mt-7">
          <Button
            type="button"
            className="bg-(--earth-forest) text-white hover:bg-(--earth-forest)/90"
            onClick={() => reset()}
          >
            Try again
          </Button>
        </div>
      </section>
    </main>
  )
}
