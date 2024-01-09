import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { ChatCompletion } from "openai/resources/index.mjs"

function useStreamResponse({
  streamCallback,
}: {
  streamCallback: React.Dispatch<React.SetStateAction<string>>
}) {
  const [responses, setResponses] = useState("")
  const [data, setData] = useState<ChatCompletion | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: startStream, isPending } = useMutation({
    mutationFn: async (messageContent: string) => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageContent }),
      })

      if (!response.body) {
        throw new Error("ReadableStream not supported in this browser.")
      }

      const reader = response.body.getReader()
      return reader
    },
    onSuccess: (data) => {
      setIsLoading(true)
      readStream(data)
    },
  })

  async function readStream(reader: ReadableStreamDefaultReader) {
    async function read() {
      const { done, value } = await reader.read()
      if (done) {
        setIsLoading(false)
        return
      }

      const text = new TextDecoder().decode(value)
      if (text.includes("END STREAM")) {
        setResponses((prev) => prev + text.replace(/.*END STREAM/, ""))
      } else {
        setResponses((prev) => prev + text)
        streamCallback((prevValue) => prevValue + text)
      }
      read()
    }
    read()
  }

  return { responses, data, startStream, isLoading }
}

export default useStreamResponse
