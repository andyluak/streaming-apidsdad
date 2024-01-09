import React, { useEffect } from "react"
import { Label } from "@radix-ui/react-label"
import { Wand2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import useStreamResponse from "@/components/useStreamResponse"

function MyComponent() {
  const [sentence, setSentence] = React.useState<string>("")
  const { startStream, isLoading, responses } = useStreamResponse({
    streamCallback: setSentence,
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "Enter") {
        startStream(sentence)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  console.log(sentence)

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          startStream(sentence)
        }}
        className="max-w-2xl flex flex-col gap-5 m-auto"
      >
        <Label htmlFor="message">Message</Label>
        <div className="flex flex-row">
          <Textarea
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="Your message"
            className="pr-14 text-base"
            rows={10}
          />
          <Button
            type="submit"
            variant="ghost"
            className="-ml-14"
            animate={{
              rotate: isLoading ? 360 : 0,
              scale: isLoading ? [1.2, 1.4, 0.5] : 1,
            }}
            transition={{ duration: 1 }}
          >
            <Wand2 />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MyComponent
