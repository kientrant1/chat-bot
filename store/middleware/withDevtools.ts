import { siteConfig } from '@/constants/siteConfig'
import { StateCreator } from 'zustand'
import { devtools, DevtoolsOptions } from 'zustand/middleware'

/**
 * Type helper for creating stores with devtools
 */
export type WithDevtoolsStore<T> = StateCreator<
  T,
  [['zustand/devtools', never]],
  [],
  T
>

export type PlainStore<T> = StateCreator<T, [], [], T>

/**
 * Higher-Order Component to wrap Zustand stores with devtools middleware
 * Only enables devtools in development environment
 * @param storeInitializer - The store initializer function
 * @param options - Devtools configuration options
 * @returns Store wrapped with devtools middleware (dev only) or plain store (production)
 */
export const withDevtools = <T>(
  storeInitializer: StateCreator<T, [['zustand/devtools', never]], [], T>,
  options?: DevtoolsOptions
): StateCreator<T, [], [], T> => {
  if (siteConfig.isDev) {
    return devtools(storeInitializer, options) as PlainStore<T>
  }
  return storeInitializer as PlainStore<T>
}
