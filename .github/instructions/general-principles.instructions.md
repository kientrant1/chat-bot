# General Principles

## Core Values

- **Clean Code:** Prioritize **readability, maintainability, and reusability**.
- **Conciseness:** Aim for concise and expressive code.
- **Descriptive Naming:** Use clear and descriptive names for variables, functions, components, and files (e.g., `getUserProfile`, `ProductCard`, `useAuth`).
- **DRY (Don't Repeat Yourself):** Extract reusable logic into functions, custom hooks, or components.
- **Modularization:** Break down complex problems and features into smaller, manageable units (components, functions, utilities).
- **TypeScript First:** All new code should be written in **TypeScript**, leveraging its type safety features.
- **Testable Code:** Design code to be easily testable.

## Architecture Guidelines

- Co-locate logic that change together
- Group code by feature, not by type
- Separate UI, logic, and data fetching
- Types safety across the whole stack – db-server-client. If a type changes, everywhere using it should be aware
- Clear product logic vs product infrastructure separation
- Design code such that it is easy to replace and delete
- Minimize places/number of changes to extend features
- Functions / APIs should do one thing well. One level of abstraction per function
- Minimize API interface and expose only what's necessary
- Favor pure functions, it makes logic easy to test
- Long, clear names over short, vague names, even at the cost of verbosity

## Logging Guidelines

- **Centralized Logger:** **Always use the `logger` utility from `@/utils/logger` instead of direct `console` methods.**
- **No Direct Console Usage:** Never use `console.log`, `console.error`, `console.warn`, or `console.info` directly in application code.
- **Exception:** Console methods like `console.time` and `console.timeEnd` for performance timing utilities are acceptable in development-specific utilities.

## Patterns

### ✅ Patterns to Follow

- Use **Dependency Injection** and **Separation of Concerns**.
- Validate input using [Zod](https://zod.dev/) or class-validator.
- Use custom error classes for API and business logic errors.
- Handle errors with centralized middleware.
- Use `dotenv` or similar for config management.
- Prefer `axios` or `fetch` with interceptors for API calls.
- Structure logic around clear modules and services.

### 🚫 Patterns to Avoid

- Avoid using `any` unless explicitly needed.
- Don't duplicate logic across controllers and services.
- Avoid deeply nested callbacks or overly clever code.
- Do not commit hardcoded secrets or tokens.
- Avoid global state unless using scoped context providers (in React).
