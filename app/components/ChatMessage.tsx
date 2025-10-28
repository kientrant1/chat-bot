import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
          }`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
          {timestamp}
        </span>
      </div>
    </div>
  );
}
