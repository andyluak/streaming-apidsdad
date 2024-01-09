import type { AppProps } from "next/app"

import Layout from "@/components/layout"

import "@/styles/globals.css"

import { Inter as FontSans } from "next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  )
}
