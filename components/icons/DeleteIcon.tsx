import React from 'react'
import { IconProps } from '../../types/component'

export default function DeleteIcon({
  className = 'w-4 h-4',
  testId,
  ...props
}: IconProps) {
  return (
    <svg
      className={className}
      data-testid={testId}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  )
}
