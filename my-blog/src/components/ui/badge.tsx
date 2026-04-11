import * as React from "react"

import { cn } from "@/lib/utils"

function Badge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-full border border-(--earth-border) bg-(--earth-stone) px-3 py-1 text-xs font-medium text-(--earth-forest)",
        className,
      )}
      {...props}
    />
  )
}

export { Badge }