'use strict'

// Load .env before New Relic inspects license/app values (Next.js loads them later)
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config()
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn(
    'New Relic: failed to load .env via dotenv. Make sure dependencies are installed.',
    error
  )
}

if (!process.env.NEW_RELIC_LICENSE_KEY) {
  process.env.NEW_RELIC_ENABLED = 'false'
  // eslint-disable-next-line no-console
  console.warn(
    'New Relic disabled: missing NEW_RELIC_LICENSE_KEY in environment.'
  )
}

exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,

  distributed_tracing: {
    enabled: true,
  },

  logging: {
    level: 'trace', // Emit all available log levels (info, error, warn) for maximum verbosity
  },

  // AI Monitoring
  ai_monitoring: {
    enabled: process.env.NEW_RELIC_AI_MONITORING_ENABLED === 'true',
    streaming: {
      enabled: true,
    },
    // set to false if you must NOT store prompts/responses
    record_content: {
      enabled: true,
    },
  },

  span_events: {
    max_samples_stored: 10000,
  },
  custom_insights_events: {
    max_samples_stored: 100000,
  },
}
