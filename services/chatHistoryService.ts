import { Message } from '@/types/message'
import logger from '../utils/logger'
import { API_URL } from '@/constants/url'

export async function loadHistoryFromDb(
  userId: string
): Promise<Message[] | null> {
  try {
    const res = await fetch(
      `${API_URL.CHAT_HISTORY}?userId=${encodeURIComponent(userId)}`,
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

export async function appendMessageToDb(
  userId: string,
  message: Message
): Promise<boolean> {
  try {
    const res = await fetch(API_URL.CHAT_HISTORY, {
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
      `${API_URL.CHAT_HISTORY}?userId=${encodeURIComponent(userId)}`,
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

// helper to save imported messages via API (kept local to this component)
export async function saveImportedMessagesToDb(
  userId: string,
  messages: Message[]
) {
  try {
    await fetch(API_URL.CHAT_HISTORY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, messages, replace: true }),
    })
  } catch (error) {
    logger.error('Error saving imported messages to DB:', error)
  }
}

/* const saveHistoryToDb = async (
  userId: string,
  messages: Message[],
  replace = true
): Promise<boolean> => {
  try {
    const res = await fetch(API_URL.CHAT_HISTORY, {
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

/**
 * If localStorage contains chat history (legacy), migrate it to DB for the given userId and remove local copy.
 * This is intended to run once after a user signs in or on first load for guests.
 */
/* export async function migrateLocalToDbIfNeeded(
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
} */
