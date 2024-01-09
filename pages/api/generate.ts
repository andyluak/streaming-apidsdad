import type { NextApiRequest, NextApiResponse } from "next"

import openai from "@/lib/openai"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { message } = req.body as { message: string }
    try {
      const stream = openai.beta.chat.completions.stream({
        model: "gpt-4",
        messages: [
          {
            role: "assistant",
            content:
              "Your job is to finish any sentence the user starts without repeating the sentence that the user said.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        stream: true,
        max_tokens: 100,
      })

      stream.on("content", (delta) => {
        res.write(delta)
      })

      const chatCompletion = await stream.finalChatCompletion()
      res.write("END STREAM")
      res.status(200).json({ data: chatCompletion })

      res.end()
    } catch (error) {
      console.error("Error:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" })
  }
}
