import React from 'react'
import { IconProps } from '../../types/component'

export default function CloseIcon({
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}
