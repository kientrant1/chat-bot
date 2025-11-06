import { v4 as uuidv4 } from 'uuid'
import { Message } from '@/types/message'
import { getCurrentTimeString } from './date'
import { ChatHistoryExport } from '@/types/history'
import logger from './logger'

export const INITIAL_PREFIX = 'initial'

export const generateMessageId = (isUser?: boolean): string => {
  let prefix: string = ''
  if (isUser === undefined) {
    prefix = INITIAL_PREFIX
  } else {
    prefix = isUser ? 'user' : 'ai'
  }
  return `${prefix}-${uuidv4()}`
}

// Default initial message
export const getInitializeMessage = (userName: string): Message[] => [
  {
    messageId: generateMessageId(),
    text: `Hello ${userName} ! I'm your AI assistant powered by Google Gemini. How can I help you today?`,
    isUser: false,
    timestamp: getCurrentTimeString(),
  },
]

/**
 * Export chat history to JSON format
 * @param messages - Array of messages to export
 * @param userName - Name of the user
 * @returns JSON string of the chat history
 */
const exportChatHistory = (messages: Message[], userName: string): string => {
  try {
    const exportData: ChatHistoryExport = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      userName,
      messages,
      messageCount: messages.length,
    }

    return JSON.stringify(exportData, null, 2)
  } catch (error) {
    logger.error('Error exporting chat history:', error)
    throw new Error('Failed to export chat history')
  }
}

/**
 * Download chat history as JSON file
 * @param messages - Array of messages to export
 * @param userName - Name of the user
 * @param filename - Optional custom filename
 */
export function downloadChatHistory(
  messages: Message[],
  userName: string,
  filename?: string
): void {
  try {
    const jsonData = exportChatHistory(messages, userName)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const defaultFilename = `chat-history-${userName}-${new Date().toISOString().split('T')[0]}.json`
    const finalFilename = filename || defaultFilename

    const link = document.createElement('a')
    link.href = url
    link.download = finalFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up the URL object
    URL.revokeObjectURL(url)

    logger.info(`Chat history exported successfully: ${finalFilename}`)
  } catch (error) {
    logger.error('Error downloading chat history:', error)
    throw new Error('Failed to download chat history')
  }
}

/**
 * Validate imported chat history data
 * @param data - Raw imported data
 * @returns Validation result and parsed data
 */
const validateChatHistoryImport = (
  data: unknown
): {
  isValid: boolean
  messages?: Message[]
  userName?: string
  error?: string
} => {
  try {
    // Check if data is an object
    if (!data || typeof data !== 'object') {
      return { isValid: false, error: 'Invalid file format' }
    }

    const parsedData = data as Record<string, unknown>
    const userName = parsedData.userName as string
    const messages = parsedData.messages as Message[]

    // Check for required fields
    if (!messages || !Array.isArray(messages)) {
      return { isValid: false, error: 'No messages found in the file' }
    }

    // Validate message structure
    for (const message of messages) {
      if (
        !message.messageId ||
        !message.text ||
        typeof message.isUser !== 'boolean' ||
        !message.timestamp
      ) {
        return { isValid: false, error: 'Invalid message format detected' }
      }
    }

    return {
      isValid: true,
      messages: messages as Message[],
      userName: userName || 'Unknown User',
    }
  } catch (error) {
    logger.error('Error validating chat history import:', error)
    return { isValid: false, error: 'Failed to validate import data' }
  }
}

/**
 * Import chat history from JSON string
 * @param jsonString - JSON string containing chat history
 * @returns Parsed and validated chat history
 */
export function importChatHistory(jsonString: string): {
  success: boolean
  messages?: Message[]
  userName?: string
  error?: string
} {
  try {
    const data = JSON.parse(jsonString)
    const validation = validateChatHistoryImport(data)

    if (!validation.isValid) {
      return { success: false, error: validation.error }
    }

    return {
      success: true,
      messages: validation.messages,
      userName: validation.userName,
    }
  } catch (error) {
    logger.error('Error importing chat history:', error)
    return { success: false, error: 'Invalid JSON format' }
  }
}
