'use client'

import React, { useEffect, useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastConfig {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  onClose?: () => void
}

interface ToastProps extends ToastConfig {
  onRemove: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 4000,
  onClose,
  onRemove,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const handleClose = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      onClose?.()
      onRemove(id)
    }, 300)
  }, [id, onClose, onRemove])

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, handleClose])

  const getToastStyles = () => {
    const baseStyles = 'border shadow-lg'

    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800`
      case 'error':
        return `${baseStyles} bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800`
      case 'warning':
        return `${baseStyles} bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800`
      case 'info':
      default:
        return `${baseStyles} bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800`
    }
  }

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'info':
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div
      className={`
        max-w-sm w-full rounded-lg px-4 py-3 
        transform transition-all duration-300 ease-in-out
        ${getToastStyles()}
        ${
          isVisible && !isExiting
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-2 h-2 ${getIconColor()} rounded-full shrink-0 mt-2`}
        ></div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{title}</p>
          {message && <p className="text-sm opacity-90 mt-1">{message}</p>}
        </div>
        <button
          onClick={handleClose}
          className="ml-2 text-current opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Toast
