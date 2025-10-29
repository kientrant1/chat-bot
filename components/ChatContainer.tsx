'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'
import SearchBar from '@/components/SearchBar'
import Confirmation from '@/components/Confirmation'
import UserProfile from '@/components/UserProfile'
import DeleteIcon from '@/components/icons/DeleteIcon'
import SearchNotFoundIcon from '@/components/icons/SearchNotFoundIcon'
import { callGeminiAPI } from '@/services/geminiService'
import { getCurrentTimeString, formatTimestamp } from '@/utils/date'
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from '@/utils/storage'
import logger from '@/utils/logger'
import { Message } from '@/types/message'

const CHAT_HISTORY_KEY = 'chatbot-history'

// Default initial message
const defaultInitialMessage: Message = {
  id: 'initial-1',
  text: "Hello! I'm your AI assistant powered by Google Gemini. How can I help you today?",
  isUser: false,
  timestamp: getCurrentTimeString(),
}

const getDefaultInitialMessage = (): Message[] => {
  const savedMessages = getStorageItem<Message[]>(CHAT_HISTORY_KEY)
  return savedMessages &&
    Array.isArray(savedMessages) &&
    savedMessages.length > 0
    ? savedMessages
    : [defaultInitialMessage]
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

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load messages from localStorage on initial render
    return getDefaultInitialMessage()
  })
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    setStorageItem(CHAT_HISTORY_KEY, messages)
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Clear chat history
  const handleClearHistory = useCallback(() => {
    setShowConfirmation(true)
  }, [])

  const handleConfirmClear = useCallback(() => {
    setMessages([defaultInitialMessage])
    setSearchTerm('')
    setIsSearchVisible(false)
    setShowConfirmation(false)

    // Clear from localStorage
    removeStorageItem(CHAT_HISTORY_KEY)
  }, [])

  const handleCancelClear = useCallback(() => {
    setShowConfirmation(false)
  }, [])

  // Filter messages based on search term
  const filteredMessages = searchTerm
    ? messages.filter(message =>
        message.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages

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
      } catch (error) {
        logger.error('Error generating AI response:', error)
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          text: "I'm sorry, I encountered an error. Please try again.",
          isUser: false,
          timestamp: getCurrentTimeString(),
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    },
    [messages]
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
                resultCount={filteredMessages.length}
                onToggleVisibility={handleToggleSearch}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
              />
              <div className="pl-3 border-l border-gray-200 dark:border-gray-600">
                <UserProfile />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {filteredMessages.map(msg => (
            <ChatMessage
              key={msg.id}
              message={highlightSearchTerm(msg.text, searchTerm)}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))}

          {searchTerm && filteredMessages.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 dark:text-gray-400">
                <SearchNotFoundIcon className="mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium mb-1">No messages found</p>
                <p className="text-sm">Try searching with different keywords</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    AI is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

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
