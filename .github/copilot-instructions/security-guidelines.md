# Security Guidelines

## Environment Variables & Secrets

- **Never Expose Actual Values:** Never remember, store, or expose actual values from `.env*` files (`.env`, `.env.local`, `.env.development`, `.env.production`).
- **Centralized Configuration:** **All environment variables must be defined in `src/constants/site-config.ts`**. Never use `process.env.*` directly in components, hooks, or utilities.
- **API Keys & Secrets:** When working with API keys, tokens, secrets, or credentials, always use placeholder values (e.g., `your_api_key_here`, `pk_test_xxxxx`) and never include real keys in code suggestions or documentation
- **Credentials in Examples:** Use generic, clearly fake examples that follow the format but contain no real data
- **Documentation:** When documenting environment setup, provide templates with placeholder values, never actual credentials

## Code Security

- **Input Validation:** Always validate and sanitize user inputs using libraries like Zod
- **SQL Injection Prevention:** Use parameterized queries and ORM methods
- **XSS Prevention:** Sanitize HTML content and use proper escaping
- **CSRF Protection:** Implement CSRF tokens for state-changing operations
- **Authentication:** Use secure authentication patterns and session management
- **Authorization:** Implement proper role-based access control

## Data Handling

- **Sensitive Data:** Never log sensitive information (passwords, tokens, personal data)
- **Data Transmission:** Use HTTPS for all data transmission
- **Client-Side Storage:** Avoid storing sensitive data in localStorage or sessionStorage
- **Server-Side Validation:** Always validate data on the server, never trust client-side validation alone

## Example Secure Patterns

```typescript
// ✅ Good - Using siteConfig for environment variables
import { siteConfig } from '@/constants/site-config'
const apiKey = siteConfig.STRIPE.SECRET_KEY

// ❌ Bad - Using process.env directly in components/utils
const apiKey = process.env.STRIPE_SECRET_KEY

// ❌ Bad - Hardcoded secrets
const apiKey = 'sk_live_actual_key_here'

// ✅ Good - Input validation
const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
})

// ✅ Good - Sanitized output
const sanitizedHtml = DOMPurify.sanitize(userInput)
```
