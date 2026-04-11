import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-md border border-(--earth-border) bg-(--earth-panel) px-3 py-2 text-sm text-(--earth-ink) shadow-xs outline-none placeholder:text-(--earth-muted) focus-visible:border-(--earth-forest) focus-visible:ring-(--earth-forest)/30 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
