import React, { useEffect } from "react"
import { Wand2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import useStreamResponse from "@/components/useStreamResponse"

export default function Home() {
  const [message, setMessage] = React.useState("")
  const { startStream, loading, responses, data } = useStreamResponse({
    streamCallback: setMessage,
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.metaKey) {
        startStream(message)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [message, startStream])

  return (
    <section className="max-w-2xl m-auto">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          startStream(message)
        }}
      >
        <Label htmlFor="message">Message</Label>
        <div className="flex">
          <Textarea
            id="message"
            value={message}
            placeholder="Enter a message you want completed"
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            className="pr-14"
          />
          <Button
            type="submit"
            variant="ghost"
            animate={{
              rotate: loading ? 360 : 0,
              scale: loading ? [1.3, 1.6, 1] : 1,
            }}
            transition={{
              duration: 1,
            }}
            className="-ml-14"
          >
            <Wand2 />
          </Button>
        </div>
      </form>
    </section>
  )
}
