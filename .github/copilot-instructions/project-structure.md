# Project Structure Guidelines

## File Organization

### Colocation Principle

- **Feature-Based Organization:** Colocate component files (JSX/TSX, CSS Modules, tests) within a feature folder.
- **Related Files Together:** Keep files that change together in the same directory.

### Directory Structure

#### Core Directories

- **`src/components/`** - Reusable UI components
  - `client/` - Client-side components
  - `server/` - Server components
  - `shared/` - Components used in both client and server
  - `ui/` - Basic UI components (buttons, inputs, etc.)

- **`src/lib/`** - **All general utility functions, helper functions, and large, non-component-specific logic should be extracted into a dedicated `lib/` folder.**

- **`src/types/`** - TypeScript type definitions organized by domain (e.g., `user.ts`, `post.ts`)

- **`src/services/`** - API calls and external service integrations

- **`src/hooks/`** - Custom React hooks

- **`src/stores/`** - Global state management

- **`src/utils/`** - Pure utility functions

#### Next.js App Router Structure

```
src/app/
├── (auth)/          # Route group for auth pages
├── (dashboard)/     # Route group for dashboard
├── api/            # API routes
├── globals.css     # Global styles
├── layout.tsx      # Root layout
└── page.tsx        # Home page
```

### Naming Conventions

- **Components:** `PascalCase` (e.g., `UserProfile.tsx`)
- **Files:** `kebab-case` for non-component files (e.g., `user-service.ts`)
- **Directories:** `kebab-case` or `camelCase` consistently
- **Route Groups:** `(groupName)` for Next.js route organization

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

#### Private Folders

- **Internal Files:** Use underscore-prefixed folders (e.g., `_lib`, `_components`) for internal, non-route-related files.

### Best Practices

- **Consistent Structure:** Maintain consistent folder structure across similar features
- **Shallow Nesting:** Avoid deeply nested folder structures
- **Clear Separation:** Separate concerns clearly (UI, logic, data, types)
- **Easy Navigation:** Structure should make it easy to find and modify related code
