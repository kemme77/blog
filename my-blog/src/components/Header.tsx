"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

import Container from "./Container"
import { Button } from "./ui/button"
import LogoutButton from "./LogoutButton"

const navItems = [
  { label: "Career", href: "/career" },
  { label: "Hobbies", href: "/hobbies" },
  { label: "Travel", href: "/travel" },
  { label: "Profile", href: "/profile" },
]

export default function Header() {
  const { status } = useSession()
  const isAuthenticated = status === "authenticated"

  return (
    <header className="sticky top-0 z-50 border-b border-(--earth-border) bg-(--earth-bg)/95 backdrop-blur-sm">
      <Container className="flex min-h-18 flex-wrap items-center justify-between gap-3 py-3">
        <Button asChild variant="ghost" className="px-2 text-base font-semibold tracking-wide text-(--earth-ink)">
          <Link href="/">Kemme&apos;s Blog</Link>
        </Button>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
          <nav className="flex flex-wrap items-center justify-end gap-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                asChild
                variant="ghost"
                size="sm"
                className="rounded-full px-3 text-sm font-medium text-(--earth-muted) hover:bg-(--earth-stone) hover:text-(--earth-ink)"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {!isAuthenticated ? (
              <Button
                asChild
                size="sm"
                className="rounded-full border border-(--earth-forest)/30 bg-(--earth-forest) px-4 text-sm font-semibold text-white shadow-[0_8px_24px_-14px_rgba(0,0,0,0.55)] hover:bg-(--earth-forest)/90"
              >
                <Link href="/login?returnTo=/">Login</Link>
              </Button>
            ) : null}

            {isAuthenticated ? <LogoutButton /> : null}
          </div>
        </div>
      </Container>
    </header>
  )
}