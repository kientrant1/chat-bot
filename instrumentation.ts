/* https://nextjs.org/docs/app/guides/instrumentation
- Ensures the New Relic agent loads before any server-side code executes.
- Replaces setting NODE_OPTIONS='--require newrelic' in yarn dev/start scripts.
- Without adding this file, Here are sample package.json scripts:
"dev": "NODE_OPTIONS='--require newrelic' next dev",
"start": "NODE_OPTIONS='--require newrelic' next start"
*/

// register() hook runs automatically whenever Next spins up a server runtime, during:
// 1) next dev/start
// 2) next build
// 3) n production (Vercel or self-hosted) it runs before every serverless/Edge function is invoked
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./newrelic.cjs')
  }
}
