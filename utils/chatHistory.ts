import { Message } from '@/types/message'
import logger from './logger'

export interface ChatHistoryExport {
  version: string
  exportDate: string
  userName: string
  messages: Message[]
  messageCount: number
}

/**
 * Export chat history to JSON format
 * @param messages - Array of messages to export
 * @param userName - Name of the user
 * @returns JSON string of the chat history
 */
export function exportChatHistory(
  messages: Message[],
  userName: string
): string {
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
export function validateChatHistoryImport(data: unknown): {
  isValid: boolean
  messages?: Message[]
  userName?: string
  error?: string
} {
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

/**
 * Read file content from file input
 * @param file - File object from input
 * @returns Promise resolving to file content as string
 */
export function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = event => {
      const content = event.target?.result
      if (typeof content === 'string') {
        resolve(content)
      } else {
        reject(new Error('Failed to read file content'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Error reading file'))
    }

    reader.readAsText(file)
  })
}
