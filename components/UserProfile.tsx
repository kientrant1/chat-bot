'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { ChevronDownIcon, LogoutIcon } from 'snackact-ui/icons'
import logger from '../utils/logger'
import { PAGE_URL } from '@/constants/url'
import { removeStorageItem, STORAGE_KEY } from '@/utils/storage'

interface UserProfileProps {
  userName?: string
  userEmail?: string
  avatarUrl?: string
  className?: string
}

export default function UserProfile({
  userName,
  userEmail,
  avatarUrl,
  className = '',
}: UserProfileProps) {
  const { data: session, status } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Get user data from session or fallback to props
  const displayName = userName || session?.user?.name || 'User'
  const displayEmail = userEmail || session?.user?.email || undefined
  const displayAvatar = avatarUrl || session?.user?.image || undefined

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Generate initials from user name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSignOut = async () => {
    try {
      removeStorageItem(STORAGE_KEY.CHAT_HISTORY_KEY)
      await signOut({
        callbackUrl: PAGE_URL.LOGIN,
        redirect: true,
      })
    } catch (error) {
      logger.error('Error signing out', error)
    }
  }

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Show loading state if session is loading
  if (status === 'loading') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="flex flex-col min-w-0">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
        onClick={handleProfileClick}
      >
        {/* Avatar */}
        <div className="relative mr-3">
          {displayAvatar ? (
            <Image
              src={displayAvatar}
              alt={`${displayName}'s avatar`}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              {getInitials(displayName)}
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0 mr-3">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {displayName}
          </div>
          {displayEmail && (
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {displayEmail}
            </div>
          )}
        </div>

        {/* Chevron Icon */}
        <div className="shrink-0">
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
          <div className="py-1">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {displayName}
              </p>
              {displayEmail && (
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {displayEmail}
                </p>
              )}
            </div>

            <div className="px-2 py-1">
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2 rounded-md"
              >
                <LogoutIcon />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
