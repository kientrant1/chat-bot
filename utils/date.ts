/**
 * Formats a date to a time string in HH:MM format
 * @param date - The date to format (defaults to current date)
 * @returns Formatted time string
 */
export function formatTimeString(date: Date = new Date()): string {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Gets the current timestamp formatted as a time string
 * @returns Current time in HH:MM format
 */
export function getCurrentTimeString(): string {
  return formatTimeString()
}

/**
 * Formats a timestamp (number) to a time string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted time string
 */
export function formatTimestamp(timestamp: number): string {
  return formatTimeString(new Date(timestamp))
}
