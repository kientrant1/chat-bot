'use client'

import React, { useState, useEffect, useRef } from 'react'
import OwlIcon from './icons/OwlIcon'

interface OwlWatcherProps {
  className?: string
}

export default function OwlWatcher({ className = '' }: OwlWatcherProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
  const [eyesClosed, setEyesClosed] = useState(false)
  const owlRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!owlRef.current || eyesClosed) return

      const owlRect = owlRef.current.getBoundingClientRect()
      const owlCenterX = owlRect.left + owlRect.width / 2
      const owlCenterY = owlRect.top + owlRect.height / 2

      const deltaX = e.clientX - owlCenterX
      const deltaY = e.clientY - owlCenterY

      // Limit eye movement range
      const maxMove = 8
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      let eyeX = deltaX
      let eyeY = deltaY

      if (distance > maxMove * 10) {
        eyeX = (deltaX / distance) * maxMove
        eyeY = (deltaY / distance) * maxMove
      } else {
        eyeX = deltaX / 10
        eyeY = deltaY / 10
      }

      setEyePosition({ x: eyeX, y: eyeY })
    }

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement
      if (target && target.type === 'password') {
        setEyesClosed(true)
      }
    }

    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement
      if (target && target.type === 'password') {
        setEyesClosed(false)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [eyesClosed])

  return (
    <div ref={owlRef} className={`relative w-32 h-32 mx-auto ${className}`}>
      <OwlIcon
        className="w-full h-full owl-container"
        eyePosition={eyePosition}
        eyesClosed={eyesClosed}
      />

      {/* Subtle animation */}
      <style jsx>{`
        @keyframes gentle-bob {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .owl-container {
          animation: gentle-bob 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
