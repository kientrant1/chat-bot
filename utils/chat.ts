import { MAX_REQUESTS_PER_DAY } from '@/functions/rateLimit'

export const isNotRequestedToday = (requestDate: Date | null): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset to start of day

  const myRequestDate = requestDate ? new Date(requestDate) : null
  myRequestDate?.setHours(0, 0, 0, 0)

  // Check if request is not today
  if (!myRequestDate || myRequestDate.getTime() !== today.getTime()) {
    return true
  }
  return false
}

export const calculateRemainingRequests = (requestCount: number) => {
  return Math.max(0, MAX_REQUESTS_PER_DAY - requestCount)
}
