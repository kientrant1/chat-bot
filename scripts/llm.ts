// import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

type GenerateParams = {
  system: string
  user: string
}

enum LLMProvider {
  OpenAI = 'openai',
  Gemini = 'gemini',
}

const provider = LLMProvider.Gemini.toString()

/* const generateWithOpenAI = async ({
  system,
  user,
}: GenerateParams): Promise<string> => {
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

const generateWithGemini = async ({
  system,
  user,
}: GenerateParams): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set')
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

  const res = await model.generateContent(`${system}\n\nUser:\n${user}`)
  return res.response.text()
}

export async function generate({
  system,
  user,
}: GenerateParams): Promise<string> {
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
