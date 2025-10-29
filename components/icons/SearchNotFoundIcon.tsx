import React from 'react'
import { IconProps } from '../../types/component'

export default function SearchNotFoundIcon({
  className = 'w-12 h-12',
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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}
