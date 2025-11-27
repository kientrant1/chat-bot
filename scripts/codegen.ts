import fs from 'fs'
import path from 'path'
// @ts-expect-error: install glob during CI/ Github Actions
import glob from 'glob'
import { generate } from './llm'

export type RunCodegenOptions = {
  prompt: string
}

// Which files AI can touch:
const GLOBS = ['**/*.ts', '**/*.tsx', '**/*.js']

function findFiles(patterns: string[]): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const pattern =
      patterns.length === 1 ? patterns[0] : `{${patterns.join(',')}}`

    // @ts-expect-error: ignore glob types
    glob(pattern, { nodir: true }, (err, matches) => {
      if (err) reject(err)
      else resolve(matches)
    })
  })
}

export async function runCodegen({ prompt }: RunCodegenOptions): Promise<void> {
  console.log('📝 User prompt:', prompt)

  const files = await findFiles(GLOBS)
  console.log(`📂 Found ${files.length} files`)

  for (const relativePath of files) {
    await processFile(relativePath, prompt)
  }

  console.log('✅ Repo-wide update completed')
}

async function processFile(
  relativePath: string,
  userPrompt: string
): Promise<void> {
  const fullPath = path.join(process.cwd(), relativePath)
  if (!fs.existsSync(fullPath)) return

  const original = fs.readFileSync(fullPath, 'utf8')
  console.log(`🛠  Updating ${relativePath}...`)

  const system = `
You are a careful senior TypeScript/Next.js engineer.
You receive ONE file at a time from a real project.

Rules:
- Keep the code valid TypeScript / JSX / TSX as appropriate.
- Keep exports and public API stable unless clearly requested by the user.
- Preserve comments and style as much as you reasonably can.
- If no change is needed, return the file unchanged.
- Return ONLY the full updated file content. No extra text.
`.trim()

  const user = `
User instructions:
${userPrompt}

File path: ${relativePath}

Current file content:
\`\`\`
${original}
\`\`\`
`.trim()

  const updated = await generate({ system, user })

  if (!updated || typeof updated !== 'string') {
    console.warn(`⚠️ Empty/invalid output for ${relativePath}, skipping`)
    return
  }

  fs.writeFileSync(fullPath, updated, 'utf8')
}
