import logger from './logger'

/**
 * Utility functions for localStorage operations with error handling
 */

/**
 * Get an item from localStorage and parse it as JSON
 * @param key - The localStorage key
 * @returns Parsed data or null if not found or error occurred
 */
export function getStorageItem<T>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    logger.error(`Error reading from localStorage (key: ${key}):`, error)
    return null
  }
}

/**
 * Set an item in localStorage as JSON
 * @param key - The localStorage key
 * @param value - The value to store
 * @returns True if successful, false otherwise
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    logger.error(`Error writing to localStorage (key: ${key}):`, error)
    return false
  }
}

/**
 * Remove an item from localStorage
 * @param key - The localStorage key
 * @returns True if successful, false otherwise
 */
export function removeStorageItem(key: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    logger.error(`Error removing from localStorage (key: ${key}):`, error)
    return false
  }
}

/**
 * Check if localStorage is available
 * @returns True if localStorage is available and working
 */
export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const testKey = '__storage_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    logger.warn('localStorage is not available:', error)
    return false
  }
}

/**
 * Clear all items from localStorage (use with caution)
 */
export function clearStorage(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    localStorage.clear()
    return true
  } catch (error) {
    logger.error('Error clearing localStorage:', error)
    return false
  }
}
