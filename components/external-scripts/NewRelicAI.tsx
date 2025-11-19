// Restrict this component to the server so we can call the Node agent APIs safely
import 'server-only'
import Script from 'next/script'
import newrelic from 'newrelic'

export default function NewRelicAI() {
  // Ensure Node agent is connected first; instrumentation.ts loads 'newrelic' globally
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
