import React from 'react'

interface SearchBarProps {
  isVisible: boolean
  searchTerm: string
  resultCount: number
  onToggleVisibility: () => void
  onSearchChange: (term: string) => void
  onClearSearch: () => void
}

export default function SearchBar({
  isVisible,
  searchTerm,
  resultCount,
  onToggleVisibility,
  onSearchChange,
  onClearSearch,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Search Input - Show when visible */}
      {isVisible && (
        <div className="flex items-center gap-2 animate-in slide-in-from-right-5 duration-200">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search messages..."
              className="w-64 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={onClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Clear search"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {searchTerm && (
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {resultCount} result{resultCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}

      {/* Search Toggle Button */}
      <button
        onClick={onToggleVisibility}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isVisible
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
        }`}
        title={isVisible ? 'Close search' : 'Search messages'}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  )
}
