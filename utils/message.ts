import { Message } from '@/types/message'
import { getStorageItem, STORAGE_KEY } from './storage'
import { getCurrentTimeString } from './date'

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
