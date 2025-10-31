'use client'

import React from 'react'
import { useToast } from '../context/ToastProvider'
import Toast from './Toast'

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none p-4">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="pointer-events-auto mb-2"
          style={{ transform: `translateY(${index * 8}px)` }}
        >
          <Toast {...toast} onRemove={removeToast} />
        </div>
      ))}
    </div>
  )
}
