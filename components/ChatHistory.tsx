'use client'

import React, { useEffect, useRef } from 'react'
import ChatMessage from '@/components/ChatMessage'
import SearchNotFound from '@/components/SearchNotFound'
import { Message } from '@/types/message'

interface ChatHistoryProps {
  messages: Message[]
  searchTerm: string
  isLoading: boolean
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

export default function ChatHistory({
  messages,
  searchTerm,
  isLoading,
}: ChatHistoryProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const filteredMessages = searchTerm
    ? messages.filter(message =>
        message.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages

  return (
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
          <SearchNotFound searchTerm={searchTerm} />
        )}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
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
  )
}
