/* eslint-disable */
'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'
import SearchBar from '@/components/SearchBar'
import SearchNotFound from '@/components/SearchNotFound'
import Confirmation from '@/components/Confirmation'
import UserProfile from '@/components/UserProfile'
import DeleteIcon from '@/components/icons/DeleteIcon'
import { callGeminiAPI } from '@/services/geminiService'
import { getCurrentTimeString, formatTimestamp } from '@/utils/date'
import logger from '@/utils/logger'
import { Message } from '@/types/message'
import { getDefaultInitialMessage, initializeMessage } from '@/utils/message'
import { ComponentProps } from '../types/component'
import {
  loadHistoryFromDb,
  appendMessageToDb,
  clearHistoryInDb,
  migrateLocalToDbIfNeeded,
  getOrCreateGuestId,
  saveImportedMessagesToDb,
} from '@/services/chatHistoryService'
import { useSession } from 'next-auth/react'
import ChatHistory from '@/components/ChatHistory'

interface ChatContainerProps extends ComponentProps {
  userName: string
}

// Highlight search term if matching words or phrases in history chat
const highlightSearchTerm = (text: string, searchTerm: string) => {
  if (!searchTerm) return text

  const regex = new RegExp(`(${searchTerm})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span
        key={index}
        className="bg-yellow-200 dark:bg-yellow-600 px-1 rounded"
      >
        {part}
      </span>
    ) : (
      part
    )
  )
}

export default function ChatContainer({ userName }: ChatContainerProps) {
  const { data: session } = useSession()
  const userId = session?.user?.id || getOrCreateGuestId()

  const [messages, setMessages] = useState<Message[]>(() => {
    // initial in-memory default while DB loads
    return getDefaultInitialMessage(userName)
  })
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  // scrolling is handled inside ChatHistory component

  // Load history from DB on mount and migrate from localStorage if needed
  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        // Attempt to migrate any localStorage history first
        await migrateLocalToDbIfNeeded(userId)

        const loaded = await loadHistoryFromDb(userId)
        if (!mounted) return

        if (loaded && Array.isArray(loaded) && loaded.length > 0) {
          setMessages(loaded)
        } else {
          setMessages(getDefaultInitialMessage(userName))
        }
      } catch (error) {
        logger.error('Error loading history in ChatContainer:', error)
        // fallback to default
        if (mounted) setMessages(getDefaultInitialMessage(userName))
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [userId, userName])

  // compute search result count for SearchBar
  const searchResultCount = searchTerm
    ? messages.filter(message =>
        message.text.toLowerCase().includes(searchTerm.toLowerCase())
      ).length
    : messages.length

  // Clear chat history (ask for confirmation first)
  const handleClearHistory = useCallback(() => {
    setShowConfirmation(true)
  }, [])

  const handleConfirmClear = useCallback(async () => {
    try {
      setMessages([initializeMessage(userName)])
      setSearchTerm('')
      setIsSearchVisible(false)
      setShowConfirmation(false)

      await clearHistoryInDb(userId)
    } catch (error) {
      logger.error('Error clearing history:', error)
    }
  }, [userId, userName])

  const handleCancelClear = useCallback(() => {
    setShowConfirmation(false)
  }, [])

  // Handle import of chat history
  const handleImportHistory = useCallback(async (importedMessages: Message[]) => {
    try {
      // Replace existing history with imported messages
      setMessages(importedMessages)
      await saveImportedMessagesToDb(userId, importedMessages)
      setSearchTerm('')
      setIsSearchVisible(false)
      logger.info(`Imported ${importedMessages.length} messages`)
    } catch (error) {
      logger.error('Error importing messages:', error)
    }
  }, [userId])

  const handleSendMessage = useCallback(
    async (text: string) => {
      // Clear search when sending new message
      setSearchTerm('')
      setIsSearchVisible(false)

      const now = Date.now()
      const userMessage: Message = {
        id: `user-${now}`,
        text,
        isUser: true,
        timestamp: formatTimestamp(now),
      }

      const messagesWithNewUser = [...messages, userMessage]
      setMessages(messagesWithNewUser)

      // Persist user message to DB (best-effort)
      try {
        await appendMessageToDb(userId, userMessage)
      } catch (err) {
        logger.error('Failed to append user message to DB:', err)
      }

      setIsLoading(true)

      try {
        // Call Gemini API with full conversation history
        const aiResponse = await callGeminiAPI(messagesWithNewUser)

        const aiNow = Date.now()
        const aiMessage: Message = {
          id: `ai-${aiNow}`,
          text: aiResponse,
          isUser: false,
          timestamp: formatTimestamp(aiNow),
        }
        setMessages(prev => [...prev, aiMessage])

        // Persist AI message
        try {
          await appendMessageToDb(userId, aiMessage)
        } catch (err) {
          logger.error('Failed to append AI message to DB:', err)
        }
      } catch (error) {
        logger.error('Error generating AI response:', error)
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          text: "I'm sorry, I encountered an error. Please try again.",
          isUser: false,
          timestamp: getCurrentTimeString(),
        }
        setMessages(prev => [...prev, errorMessage])

        try {
          await appendMessageToDb(userId, errorMessage)
        } catch (err) {
          logger.error('Failed to append error message to DB:', err)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [messages, userId]
  )

  const handleToggleSearch = () => {
    setIsSearchVisible(!isSearchVisible)
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setIsSearchVisible(false)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                AI Chat Bot
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                Powered by Google Gemini - Ask me anything!
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={handleClearHistory}
                className="px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Clear chat history"
              >
                <DeleteIcon />
              </button>
              <SearchBar
                isVisible={isSearchVisible}
                searchTerm={searchTerm}
                resultCount={searchResultCount}
                onToggleVisibility={handleToggleSearch}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
              />
              <div className="pl-3 border-l border-gray-200 dark:border-gray-600">
                <UserProfile
                  messages={messages}
                  onImportHistory={handleImportHistory}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ChatHistory messages={messages} searchTerm={searchTerm} isLoading={isLoading} />

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} />

      {/* Confirmation Modal */}
      <Confirmation
        isOpen={showConfirmation}
        title="Clear Chat History"
        message="Are you sure you want to clear all chat history? This action cannot be undone."
        confirmText="Clear History"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
      />
    </div>
  )
}
