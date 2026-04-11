import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-(--earth-border) bg-(--earth-panel) px-3 py-1 text-sm text-(--earth-ink) shadow-xs transition-[color,box-shadow] outline-none placeholder:text-(--earth-muted) focus-visible:border-(--earth-forest) focus-visible:ring-(--earth-forest)/30 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Input }