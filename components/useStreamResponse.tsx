import React from "react"
import { useMutation } from "@tanstack/react-query"

type TUseStreamResponse = {
  streamCallback: React.Dispatch<React.SetStateAction<string>>
}

function useStreamResponse({ streamCallback }: TUseStreamResponse) {
  const [responses, setResponses] = React.useState("")
  const [data, setData] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const { mutate: startStream } = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.body) {
        throw new Error("Readable is not supported")
      }

      const reader = response.body.getReader()

      return reader
    },
    onSuccess: (reader) => {
      setLoading(true)
      async function read() {
        const { done, value } = await reader.read()
        if (done) {
          setLoading(false)
          return
        }

        const text = new TextDecoder("utf-8").decode(value)
        if (text.includes("END STREAM")) {
          setData(JSON.parse(text.replace(/.*END STREAM/, "")))
        } else {
          setResponses((responses) => responses + text)
          streamCallback((message) => message + text)
        }
        read()
      }
      read()
    },
  })

  return { responses, data, loading, startStream }
}

export default useStreamResponse
