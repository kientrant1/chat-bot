export interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: string
}

// Add other shared types here as they emerge
export type MessageId = string
export type Timestamp = string
