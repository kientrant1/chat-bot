import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { siteConfig } from '@/constants/siteConfig'
import logger from '@/utils/logger'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {
  getRemainingRequests,
  incrementRequestCount,
} from '@/functions/rateLimit'
import { Message } from '@/types/message'
import { INITIAL_PREFIX } from '@/utils/message'

const genAI = new GoogleGenerativeAI(siteConfig.gemini.apiKey)

const modelName = siteConfig.geminiModelName

const increaseRequestCount = async (userId: string) => {
  if (userId) {
    await incrementRequestCount(userId)
    const remaining = await getRemainingRequests(userId)
    logger.info(`Remaining ${remaining} requests for user ${userId}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Middleware already checked auth and rate limit, just get session for user ID
    const session = await getServerSession(authOptions)

    const messages: Message[] = (await request.json()).messages

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

    // Filter out the initial message to avoid confusing AI
    // Only include actual conversation
    const conversationMessages = messages.filter(
      (msg: Message) => !msg.messageId.startsWith(INITIAL_PREFIX)
    )

    // If no conversation yet, just use the last message
    if (conversationMessages.length === 0) {
      throw new Error('No conversation messages to process')
    }

    // Start a chat session with previous conversation
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

    // Increment request count after successful response
    await increaseRequestCount(session?.user?.id || '')

    return NextResponse.json({ response: text })
  } catch (error) {
    logger.error('Gemini API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    )
  }
}
