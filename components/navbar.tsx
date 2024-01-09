import React from "react"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

function Navbar({ className }: Props) {
  return (
    <header className={cn("py-16 text-6xl text-center", className)}>
      Finish My Sentence
    </header>
  )
}

export default Navbar
