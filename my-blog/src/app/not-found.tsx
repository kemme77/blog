import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[55vh] w-full max-w-3xl items-center justify-center px-6 py-16 md:px-10">
      <section className="earth-section w-full text-center">
        <p className="text-sm font-semibold tracking-wide text-(--earth-muted)">404</p>
        <h1 className="earth-section-title mt-2 text-2xl md:text-3xl">Page not found</h1>
        <p className="earth-section-text mx-auto mt-3 max-w-xl">
          The page you requested does not exist, or it has been moved.
        </p>
        <div className="mt-7">
          <Button asChild className="bg-(--earth-forest) text-white hover:bg-(--earth-forest)/90">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
