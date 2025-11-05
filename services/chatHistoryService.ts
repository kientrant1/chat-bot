import { Message } from '@/types/message'
import logger from '../utils/logger'
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  STORAGE_KEY,
} from '../utils/storage'

const CHAT_HISTORY_API = '/api/chatHistory'
const GUEST_ID_KEY = 'chatbot-guest-id'

export async function loadHistoryFromDb(
  userId: string
): Promise<Message[] | null> {
  try {
    const res = await fetch(
      `${CHAT_HISTORY_API}?userId=${encodeURIComponent(userId)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    if (!res.ok) {
      logger.warn('loadHistoryFromDb: server returned non-OK', await res.text())
      return null
    }

    const data = await res.json()
    return Array.isArray(data.messages) ? (data.messages as Message[]) : null
  } catch (error) {
    logger.error('Error loading history from DB:', error)
    return null
  }
}

export async function saveHistoryToDb(
  userId: string,
  messages: Message[],
  replace = true
): Promise<boolean> {
  try {
    const res = await fetch(CHAT_HISTORY_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, messages, replace }),
    })

    if (!res.ok) {
      logger.warn('saveHistoryToDb: server returned non-OK', await res.text())
      return false
    }

    return true
  } catch (error) {
    logger.error('Error saving history to DB:', error)
    return false
  }
}

export async function appendMessageToDb(
  userId: string,
  message: Message
): Promise<boolean> {
  try {
    const res = await fetch(CHAT_HISTORY_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, messages: [message], replace: false }),
    })

    if (!res.ok) {
      logger.warn('appendMessageToDb: server returned non-OK', await res.text())
      return false
    }

    return true
  } catch (error) {
    logger.error('Error appending message to DB:', error)
    return false
  }
}

export async function clearHistoryInDb(userId: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${CHAT_HISTORY_API}?userId=${encodeURIComponent(userId)}`,
      {
        method: 'DELETE',
      }
    )

    if (!res.ok) {
      logger.warn('clearHistoryInDb: server returned non-OK', await res.text())
      return false
    }

    return true
  } catch (error) {
    logger.error('Error clearing history in DB:', error)
    return false
  }
}

/**
 * If localStorage contains chat history (legacy), migrate it to DB for the given userId and remove local copy.
 * This is intended to run once after a user signs in or on first load for guests.
 */
export async function migrateLocalToDbIfNeeded(
  userId: string
): Promise<boolean> {
  try {
    if (typeof window === 'undefined') return false

    const local = getStorageItem<Message[]>(STORAGE_KEY.CHAT_HISTORY_KEY)
    if (!local || !Array.isArray(local) || local.length === 0) return false

    const success = await saveHistoryToDb(userId, local, true)
    if (success) {
      // Remove local storage copy to prevent double-write
      removeStorageItem(STORAGE_KEY.CHAT_HISTORY_KEY)
      logger.info(
        `Migrated ${local.length} messages from localStorage to DB for user ${userId}`
      )
      return true
    }

    return false
  } catch (error) {
    logger.error('Error migrating local history to DB:', error)
    return false
  }
}

/**
 * Helper to get or create a guest id persisted in localStorage for anonymous users
 */
export function getOrCreateGuestId(): string {
  if (typeof window === 'undefined') return `guest-${Date.now()}`

  const existing = getStorageItem<string>(GUEST_ID_KEY)
  if (existing) return existing

  const id = `guest-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  setStorageItem(GUEST_ID_KEY, id)
  return id
}

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

// helper to save imported messages via API (kept local to this component)
export async function saveImportedMessagesToDb(
  userId: string,
  messages: Message[]
) {
  try {
    await fetch(CHAT_HISTORY_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, messages, replace: true }),
    })
  } catch (error) {
    // best-effort
    console.error('Error saving imported messages to DB:', error)
  }
}
