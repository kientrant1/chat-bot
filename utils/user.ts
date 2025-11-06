import { getStorageItem, setStorageItem, STORAGE_KEY } from './storage'

/**
 * Helper to get or create a guest id persisted in localStorage for anonymous users
 */
export function getOrCreateGuestId(): string {
  if (typeof window === 'undefined') return `guest-${Date.now()}`

  const existing = getStorageItem<string>(STORAGE_KEY.GUEST_ID_KEY)
  if (existing) return existing

  const id = `guest-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  setStorageItem(STORAGE_KEY.GUEST_ID_KEY, id)
  return id
}
