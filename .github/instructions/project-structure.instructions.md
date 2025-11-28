# Project Structure Guidelines

## File Organization

### Colocation Principle

- Prefer colocation: if logic or components only serve a single route, keep them in that route folder; promote to `components/`, `utils/`, etc., only when reused.
- Related Files Together: Keep files that change together in the same directory.
- Path alias `@/*` points to repo root (see `tsconfig.json`); prefer these aliases over long relative paths.
- Consistent Structure: Maintain consistent folder structure across similar features
- Shallow Nesting: Avoid deeply nested folder structures
- Clear Separation: Separate concerns clearly (UI, logic, data, types)
- Easy Navigation: Structure should make it easy to find and modify related code

#### Directory Structure

- Pages live in `page.tsx`; shared layouts in `layout.tsx`; colocate `loading.tsx`/`error.tsx` as needed.
- API endpoints belong in `app/api/<name>/route.ts` and should delegate logic to `services/`, `lib/`, or `functions/` rather than embedding heavy logic in the handler.

```
repo-root/
|-- app/                 # Next.js routes and route assets
|   |-- api/             # API routes (route.ts per endpoint)
|   |-- chat-bot/        # Chat experience
|   |-- login/           # Login page
|   |-- quiz-master/     # Quiz master entry
|   |-- signup/          # Signup page
|   |-- term-condition/  # Terms content
|   |-- layout.tsx       # Root layout
|   `-- page.tsx         # Home page
|-- components/          # Reusable UI components
    |-- ui/              # Basic UI components (buttons, inputs, etc.)
    |-- icons/           # Icon components
    |-- external-scripts/# Define external embedded scripts (<Script />)
    |-- others/          # Specific UI components in page (auth, quiz etc.)
|-- constants/           # Static config (menus, URLs, site settings)
|-- context/             # React context providers
|-- functions/           # Server helpers (rate limit, sessions)
|-- hooks/               # Reusable client hooks
|-- lib/                 # SDK/client setup (Firebase, Prisma, Supabase, credential providers)
|-- services/            # External service calls (Gemini, email, questions, chat history, terms)
|-- store/               # Global state + middleware
|-- styles/              # Global styles (globals.css, Tailwind layers)
|-- types/               # TypeScript definitions
|-- utils/               # Pure utilities (auth, chat, storage, routing, logging, quiz helpers)
|-- scripts/             # Dev/support scripts (LLM/codegen helpers)
|-- prisma/              # Database schema + migrations
|-- __mock__/            # Mock data for UI development or UT
`-- server-action/       # Reserved for server action helpers
```

### Naming Conventions

- Components: PascalCase (e.g., `UserProfile.tsx`).
- Non-component files: camelCase (e.g., `chatHistory.service.ts`, `menuConfig.ts`).
- Directories: kebab-case.
- Route segments: kebab-case folders; use `(group)` folders only when intentionally grouping routes.
- Context/providers end with `Provider`; hooks start with `use`; stores end with `Store`.

### Import/Export Patterns

#### ❌ Avoid Barrel Files

- **No Barrel Files:** Do not use barrel files (e.g., `index.ts` that re-exports from other files) for module exports.
- **Direct Imports:** Always import directly from the specific file to improve traceability and avoid circular dependencies.

```typescript
// ❌ Avoid this
export * from './UserCard'
export * from './UserList'

// ✅ Do this instead
import { UserCard } from '@/components/ui/UserCard'
import { UserList } from '@/components/ui/UserList'
```
