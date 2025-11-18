import Script from 'next/script'
import newrelic from 'newrelic'

export default function NewRelicAI() {
  // Ensure Node Agent is Connected First: newrelic.cjs is loaded automatically by Next.js server startup
  // get the browser timing header/script from New Relic
  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
    allowTransactionlessInjection: true,
  })

  return (
    <Script
      id="newrelic-browser-agent"
      dangerouslySetInnerHTML={{ __html: browserTimingHeader }}
    />
  )
}
