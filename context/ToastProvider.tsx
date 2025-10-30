'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastConfig {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  onClose?: () => void
}

interface ToastContextType {
  toasts: ToastConfig[]
  showToast: (config: Omit<ToastConfig, 'id'>) => string
  showSuccess: (title: string, message?: string, duration?: number) => string
  showError: (title: string, message?: string, duration?: number) => string
  showInfo: (title: string, message?: string, duration?: number) => string
  showWarning: (title: string, message?: string, duration?: number) => string
  removeToast: (id: string) => void
  clearAllToasts: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([])

  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }, [])

  const showToast = useCallback(
    (config: Omit<ToastConfig, 'id'>): string => {
      const id = generateId()
      const toast: ToastConfig = { ...config, id }
      setToasts(prev => [...prev, toast])
      return id
    },
    [generateId]
  )

  const showSuccess = useCallback(
    (title: string, message?: string, duration?: number): string => {
      return showToast({ type: 'success', title, message, duration })
    },
    [showToast]
  )

  const showError = useCallback(
    (title: string, message?: string, duration?: number): string => {
      return showToast({ type: 'error', title, message, duration })
    },
    [showToast]
  )

  const showInfo = useCallback(
    (title: string, message?: string, duration?: number): string => {
      return showToast({ type: 'info', title, message, duration })
    },
    [showToast]
  )

  const showWarning = useCallback(
    (title: string, message?: string, duration?: number): string => {
      return showToast({ type: 'warning', title, message, duration })
    },
    [showToast]
  )

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const contextValue: ToastContextType = {
    toasts,
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast,
    clearAllToasts,
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  )
}
