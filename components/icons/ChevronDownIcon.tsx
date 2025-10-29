import React from 'react'
import { IconProps } from '../../types/component'

export default function ChevronDownIcon({
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
        d="M19 9l-7 7-7-7"
      />
    </svg>
  )
}
