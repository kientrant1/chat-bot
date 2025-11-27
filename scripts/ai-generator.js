/* eslint-disable @typescript-eslint/no-require-imports */
const { runCodegen } = require('./codegen')

async function main() {
  const prompt =
    process.env.USER_PROMPT ?? 'Do a small safe refactor across the repo.'
  console.log('🔮 Starting codegen with prompt:', prompt)

  await runCodegen({ prompt })
}

main().catch(err => {
  console.error('❌ Generator failed:', err)
  process.exit(1)
})
