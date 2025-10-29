'use client'

import React from 'react'
import SearchNotFoundIcon from '@/components/icons/SearchNotFoundIcon'

interface SearchNotFoundProps {
  searchTerm: string
}

export default function SearchNotFound({ searchTerm }: SearchNotFoundProps) {
  return (
    <div className="text-center py-8">
      <div className="text-gray-500 dark:text-gray-400">
        <SearchNotFoundIcon className="mx-auto mb-3 opacity-50 w-10 h-10" />
        <p className="text-lg font-medium mb-1">No messages found</p>
        <p className="text-sm">
          {searchTerm
            ? `No results for "${searchTerm}". Try searching with different keywords`
            : 'Try searching with different keywords'}
        </p>
      </div>
    </div>
  )
}
