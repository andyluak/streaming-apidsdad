import React from "react"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

function Footer({ className }: Props) {
  return <div className={cn(className)}>Footer</div>
}

export default Footer
