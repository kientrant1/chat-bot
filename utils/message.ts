import { Message } from '@/types/message'
import { getStorageItem, STORAGE_KEY } from './storage'
import { getCurrentTimeString } from './date'
import { ChatHistoryExport } from '@/types/history'
import logger from './logger'

// Default initial message
export const initializeMessage = (userName: string): Message => ({
  id: 'initial-1',
  text: `Hello ${userName} ! I'm your AI assistant powered by Google Gemini. How can I help you today?`,
  isUser: false,
  timestamp: getCurrentTimeString(),
})

export const getDefaultInitialMessage = (userName: string): Message[] => {
  const savedMessages = getStorageItem<Message[]>(STORAGE_KEY.CHAT_HISTORY_KEY)
  return savedMessages &&
    Array.isArray(savedMessages) &&
    savedMessages.length > 0
    ? savedMessages
    : [initializeMessage(userName)]
}

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

    // Check for required fields
    if (!parsedData.messages || !Array.isArray(parsedData.messages)) {
      return { isValid: false, error: 'No messages found in the file' }
    }

    // Validate message structure
    for (const message of parsedData.messages) {
      if (
        !message.id ||
        !message.text ||
        typeof message.isUser !== 'boolean' ||
        !message.timestamp
      ) {
        return { isValid: false, error: 'Invalid message format detected' }
      }
    }

    return {
      isValid: true,
      messages: parsedData.messages as Message[],
      userName: (parsedData.userName as string) || 'Unknown User',
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
