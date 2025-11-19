/* https://nextjs.org/docs/app/guides/instrumentation
- Ensures the New Relic agent loads before any server-side code executes.
- Replaces setting NODE_OPTIONS='--require newrelic' in yarn dev/start scripts. */

import logger from '@/utils/logger'

// register() runs before each server runtime spins up (dev, build, and production requests)
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('newrelic')
    logger.info('New Relic agent loaded')
  }
}
