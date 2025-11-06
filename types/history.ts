import { Message } from './message'

export interface ChatHistoryExport {
  version: string
  exportDate: string
  userName: string
  messages: Message[]
  messageCount: number
}
