import * as React from "react"

import { cn } from "@/lib/utils"

function Separator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="separator"
      className={cn("h-px w-full bg-(--earth-border)", className)}
      {...props}
    />
  )
}

export { Separator }