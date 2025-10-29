import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { siteConfig } from '@/constants/siteConfig'
import logger from '@/utils/logger'
import { Message } from '@/types/message'

const genAI = new GoogleGenerativeAI(siteConfig.gemini.apiKey)

const modelName = 'gemini-2.5-flash'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    if (!siteConfig.gemini.apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: modelName })

    // Convert messages to Gemini chat format
    // Filter out the initial AI message and only include actual conversation
    const conversationMessages = messages.filter(msg => msg.id !== 'initial-1')

    if (conversationMessages.length === 0) {
      // If no conversation yet, just use the last message
      const lastMessage = messages[messages.length - 1]
      const result = await model.generateContent(lastMessage.text)
      const response = await result.response
      const text = response.text()
      return NextResponse.json({ response: text })
    }

    // Start a chat session with history
    const chat = model.startChat({
      history: conversationMessages.slice(0, -1).map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
    })

    // Send the latest message
    const lastMessage = conversationMessages[conversationMessages.length - 1]
    const result = await chat.sendMessage(lastMessage.text)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ response: text })
  } catch (error) {
    logger.error('Gemini API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    )
  }
}
