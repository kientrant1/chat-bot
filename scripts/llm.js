/* eslint-disable @typescript-eslint/no-require-imports */
// const OpenAI = require('openai')
const GeminiAI = require('@google/generative-ai')

const provider = 'gemini'

/* const generateWithOpenAI = async ({
  system,
  user,
}) => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set')

  const client = new OpenAI({ apiKey })

  const completion = await client.chat.completions.create({
    model: 'gpt-4.1',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  })

  const content = completion.choices[0]?.message?.content
  if (!content) {
    throw new Error('Received empty completion from OpenAI')
  }

  return content
} */

const generateWithGemini = async ({ system, user }) => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set')
  const genAI = new GeminiAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const res = await model.generateContent(`${system}\n\nUser:\n${user}`)
  return res.response.text()
}

export async function generate({ system, user }) {
  if (provider === LLMProvider.OpenAI) {
    // return generateWithOpenAI({ system, user })
    throw new Error(
      'Gemini provider not implemented yet. Set LLM_PROVIDER=openai.'
    )
  }

  if (provider === LLMProvider.Gemini) {
    return generateWithGemini({ system, user })
  }

  throw new Error(`Unknown LLM_PROVIDER: ${provider}`)
}
