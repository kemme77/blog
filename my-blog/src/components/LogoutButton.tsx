"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  return (
    <Button
      type="button"
      size="sm"
      className="rounded-full border border-(--earth-forest)/30 bg-(--earth-forest) px-4 text-sm font-semibold text-white shadow-[0_8px_24px_-14px_rgba(0,0,0,0.55)] hover:bg-(--earth-forest)/90"
      onClick={() => {
        void signOut({ callbackUrl: "/" })
      }}
    >
      Logout
    </Button>
  )
}
