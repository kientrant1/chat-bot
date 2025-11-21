# TypeScript Guidelines

## Configuration

- **Strict Mode:** Ensure `strict: true` is enabled in `tsconfig.json`.
- **Type Definitions:** Provide accurate type definitions for API responses, props, and state.

## Type Organization

- **Dedicated Types Folder:** When generating TypeScript types or interfaces in this project, always place them in the `types/` folder with a descriptive filename (e.g. `user.ts`, `post.ts`).
- **No Inline Types:** Do not define types or interfaces inside components.
- **Clear Naming:** Use descriptive names for types and interfaces (e.g., `UserProfile`, `ApiResponse<T>`, `ProductCardProps`).

## Best Practices

- **Avoid `any`:** Avoid using `any` unless explicitly needed. Prefer `unknown` for truly dynamic content.
- **Utility Types:** Leverage TypeScript utility types (`Partial<T>`, `Pick<T>`, `Omit<T>`, etc.) for type transformations.
- **Generic Types:** Use generic types for reusable components and functions.
- **Type Guards:** Implement type guards for runtime type checking when needed.
- **Interface vs Type:** Prefer `interface` for object shapes that might be extended, `type` for unions, primitives, and computed types.

## Integration

- **Props Typing:** Always type component props with interfaces or types.
- **API Responses:** Create types for all API responses and requests.
- **State Typing:** Type all state variables and context values.
- **Event Handlers:** Type event handlers properly (e.g., `React.MouseEvent<HTMLButtonElement>`).

## Example Patterns

```typescript
// In types/user.ts
export interface User {
  id: string
  name: string
  email: string
}

export interface UserProfile extends User {
  bio?: string
  avatar?: string
}

// In components
interface UserCardProps {
  user: User
  onEdit: (userId: string) => void
}
```
