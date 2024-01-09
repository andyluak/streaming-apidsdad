import { cn } from "@/lib/utils"

import Footer from "./footer"
import Navbar from "./navbar"

type TLayout = {
  children: React.ReactNode
}

export default function Layout({ children }: TLayout) {
  return (
    <>
      <Navbar className={cn("font-sans")} />
      <main className={cn("min-h-screen bg-background font-sans antialiased")}>
        {children}
      </main>
      <Footer className={cn("font-sans")} />
    </>
  )
}
