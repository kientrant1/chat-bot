import React from 'react'

interface OwlIconProps {
  className?: string
  eyePosition?: { x: number; y: number }
  eyesClosed?: boolean
}

export default function OwlIcon({
  className = '',
  eyePosition = { x: 0, y: 0 },
  eyesClosed = false,
}: OwlIconProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Owl body */}
      <ellipse cx="100" cy="120" rx="60" ry="45" fill="#8B4513" />

      {/* Owl head */}
      <circle cx="100" cy="80" r="50" fill="#D2691E" />

      {/* Ear tufts */}
      <path d="M65 45 L75 25 L85 45 Z" fill="#8B4513" />
      <path d="M115 45 L125 25 L135 45 Z" fill="#8B4513" />

      {/* Beak */}
      <path d="M95 85 L100 95 L105 85 Z" fill="#FFD700" />

      {/* Eye sockets (outer circles) */}
      <circle
        cx="85"
        cy="75"
        r="18"
        fill="#FFFFFF"
        stroke="#8B4513"
        strokeWidth="2"
      />
      <circle
        cx="115"
        cy="75"
        r="18"
        fill="#FFFFFF"
        stroke="#8B4513"
        strokeWidth="2"
      />

      {eyesClosed ? (
        /* Closed eyes - horizontal lines */
        <>
          <line
            x1="70"
            y1="75"
            x2="100"
            y2="75"
            stroke="#8B4513"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-200 ease-in-out"
          />
          <line
            x1="100"
            y1="75"
            x2="130"
            y2="75"
            stroke="#8B4513"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-200 ease-in-out"
          />
        </>
      ) : (
        /* Open eyes - animated eyeballs */
        <>
          <circle
            cx={85 + eyePosition.x}
            cy={75 + eyePosition.y}
            r="8"
            fill="#000000"
            className="transition-all duration-100 ease-out"
          />
          <circle
            cx={115 + eyePosition.x}
            cy={75 + eyePosition.y}
            r="8"
            fill="#000000"
            className="transition-all duration-100 ease-out"
          />

          {/* Eye highlights */}
          <circle
            cx={87 + eyePosition.x}
            cy={73 + eyePosition.y}
            r="2"
            fill="#FFFFFF"
            className="transition-all duration-100 ease-out"
          />
          <circle
            cx={117 + eyePosition.x}
            cy={73 + eyePosition.y}
            r="2"
            fill="#FFFFFF"
            className="transition-all duration-100 ease-out"
          />
        </>
      )}

      {/* Wing details */}
      <ellipse cx="70" cy="110" rx="15" ry="25" fill="#A0522D" />
      <ellipse cx="130" cy="110" rx="15" ry="25" fill="#A0522D" />

      {/* Chest pattern */}
      <ellipse cx="100" cy="115" rx="25" ry="20" fill="#DEB887" />

      {/* Feet */}
      <ellipse cx="90" cy="160" rx="8" ry="4" fill="#FFD700" />
      <ellipse cx="110" cy="160" rx="8" ry="4" fill="#FFD700" />
    </svg>
  )
}
