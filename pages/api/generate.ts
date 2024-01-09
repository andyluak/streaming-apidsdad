import type { NextApiRequest, NextApiResponse } from "next"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const { message } = req.body

  const stream = openai.beta.chat.completions.stream({
    model: "gpt-4",
    stream: true,
    max_tokens: 100,
    messages: [
      {
        role: "assistant",
        content:
          "Your job is to finish any sentence the user starts without repeating the sentence the user said.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  })
  try {
    stream.on("content", (delta) => {
      res.write(delta)
    })

    const chatCompleted = await stream.finalChatCompletion()
    res.write("END STREAM")
    res.status(200).json({ data: chatCompleted })

    res.end()
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e })
  }
}
