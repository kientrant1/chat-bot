export interface Message {
  id: string // Unique identifier for the message
  text: string // The actual message content
  isUser: boolean // Indicates who sent the message by human or AI
  timestamp: string // When the message was sent
}

// Add other shared types here as they emerge
export type MessageId = string
export type Timestamp = string
