import { NextRequest, NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import logger from '@/utils/logger'
import { ChatMessage, Message } from '@/types/message'
import { withAuth } from '@/utils/auth'

export const GET = withAuth(async (request: NextRequest) => {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const records = await getPrisma().chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    })

    const messages: Message[] = records.map((r: ChatMessage) => ({
      messageId: r.messageId,
      text: r.text,
      isUser: r.isUser,
      timestamp: r.timestamp,
    }))

    return NextResponse.json({ messages })
  } catch (error) {
    logger.error('Error fetching chat history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    )
  }
})

export const POST = withAuth(async (request: NextRequest) => {
  try {
    const body = await request.json()
    const { userId, messages, replace } = body as {
      userId?: string
      messages?: Message[]
      replace?: boolean
    }

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'messages array is required' },
        { status: 400 }
      )
    }

    if (replace) {
      // delete existing messages for user
      await getPrisma().chatMessage.deleteMany({ where: { userId } })
    }

    // Bulk create messages
    const toCreate = messages.map((m: Message) => ({
      userId,
      messageId: m.messageId,
      text: m.text,
      isUser: m.isUser,
      timestamp: m.timestamp,
    }))

    if (toCreate.length > 0) {
      await getPrisma().chatMessage.createMany({
        data: toCreate,
        skipDuplicates: true,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error saving chat history:', error)
    return NextResponse.json(
      { error: 'Failed to save chat history' },
      { status: 500 }
    )
  }
})

export const DELETE = withAuth(async (request: NextRequest) => {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    await getPrisma().chatMessage.deleteMany({ where: { userId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error deleting chat history:', error)
    return NextResponse.json(
      { error: 'Failed to delete chat history' },
      { status: 500 }
    )
  }
})
