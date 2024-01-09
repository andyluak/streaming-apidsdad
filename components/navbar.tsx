import React from "react"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

function Navbar({ className }: Props) {
  return <header className={cn(className)}>Navbar</header>
}

export default Navbar
