# Next.js Guidelines

## Data Fetching & Rendering

- **App Router Preference:** Use the **App Router** for new development.
- **Server Components:** Prioritize fetching data in **Server Components** (`async` components in `app` directory) for better performance and security. This is where a lot of the traditional memoization benefits are handled automatically.
- **Data Fetching Methods:**
  - For build-time data or rarely changing content, suggest `getStaticProps` (Pages Router) or direct `fetch` in Server Components with `revalidate` (App Router).
  - For dynamic, frequently changing data, suggest `getServerSideProps` (Pages Router) or direct `fetch` in Server Components (App Router).
  - Avoid client-side data fetching for initial page loads unless absolutely necessary (e.g., user-specific data after hydration).
- **Parallel Fetching:** When fetching multiple independent data sources, initiate requests in parallel.

## Routing

- **File-System Routing:** Use Next.js's App Route file-system convention.
- **Route Groups:** Utilize `(folderName)` to organize routes without affecting the URL path.
- **Dynamic Routes:** Define dynamic segments clearly (e.g., `[slug]`).
- **Middleware:** Suggest using `middleware.ts` for authentication, authorization, or other global request handling.

## API routes

### **Best practices for REST API design**

When creating API routes in Next.js, follow [these REST principles](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/):

1. **Resource Naming:**
   - Use plural nouns for collections (`/api/users`, `/api/products`)
   - Never use verbs in URL paths
   - Use kebab-case for multi-word resources (`/api/user-profiles`)

2. **HTTP Methods:**
   - GET for retrieval (safe, idempotent)
   - POST for creation (not idempotent)
   - PUT for full updates (idempotent)
   - PATCH for partial updates (not necessarily idempotent)
   - DELETE for removal (idempotent)

| Method   | Purpose                | Example                 | Response               |
| -------- | ---------------------- | ----------------------- | ---------------------- |
| `GET`    | Retrieve data          | `GET /api/users/123`    | 200 + data             |
| `POST`   | Create new resource    | `POST /api/users`       | 201 + created resource |
| `PUT`    | Update entire resource | `PUT /api/users/123`    | 200 + updated resource |
| `PATCH`  | Partial update         | `PATCH /api/users/123`  | 200 + updated resource |
| `DELETE` | Remove resource        | `DELETE /api/users/123` | 204 (no content)       |

3. **Status Codes:**
   - 200 for successful GET/PUT/PATCH
   - 201 for successful POST
   - 204 for successful DELETE
   - 400 for bad requests
   - 404 for not found
   - 422 for validation errors

4. **Query Parameters:**
   - Use for filtering: `?role=admin&active=true`
   - Use for sorting: `?sort=name&order=asc`
   - Use for pagination: `?page=2&limit=20`
   - Use for searching: `?search=john`

5. **Response Format:**
   - Always use consistent response structure
   - Include pagination metadata for collections
   - Provide clear error messages with details

   ```typescript
   // Success response
   {
     success: true,
     data: T,
     message?: string,
     meta?: {
       pagination?: PaginationMeta,
       timestamp: string,
       version: string
     }
   }

   // Error response
   {
     success: false,
     error: string,
     message?: string,
     details?: ValidationError[],
     meta?: {
       timestamp: string,
       version: string
     }
   }
   ```

6. **Nesting:**
   - Use logical resource hierarchy
   - Limit nesting to 2-3 levels maximum
   - Consider flattening deeply nested resources

   ```typescript
    // Good: Logical nesting
    GET /api/orders/456/items          # Get items for order 456

    // Avoid: Deep nesting (max 2-3 levels)
    ❌ GET /api/users/123/orders/456/items/789/details

    // Better: Flatten when necessary
    ✅ GET /api/order-items/789
   ```

7. **Validation and Error Handling:**
   - **Always validate input using Zod schemas** - Define schemas for request body and query parameters
   - **Use centralized error handling** - Leverage `withErrorHandling` wrapper for consistent error responses
   - **Implement custom error classes** - Use `ApiError` for structured business logic errors
   - **Provide detailed validation feedback** - Include field-specific error messages in responses
   - **Log errors appropriately** - Log server errors for debugging while sanitizing client responses
   - **Handle edge cases** - Account for malformed JSON, missing required fields, and type coercion failures

8. **Exception Cases for Action-Oriented Endpoints:**
   - Some endpoints don't fit standard CRUD operations:

   ```
   app/api/
   ├── auth/
   │   ├── login/           # POST /api/auth/login
   │   ├── logout/          # POST /api/auth/logout
   │   ├── refresh/         # POST /api/auth/refresh
   │   └── reset-password/  # POST /api/auth/reset-password
   ├── search/              # GET /api/search?q=term&type=users
   ├── upload/              # POST /api/upload
   ├── webhooks/            # POST /api/webhooks/stripe
   └── health/              # GET /api/health
   ```

9. **Versioning:**

   ```typescript
   // URL versioning (recommended for major changes)
   ;/api/1v / users / api / v2 / users

   // Header versioning (for minor changes)
   Accept: application / vnd.api + json
   version = 1
   ```

## Optimization

- **Image Optimization:** Always use `next/image` component for images.
- **Font Optimization:** Use `next/font` for optimizing fonts.
- **Dynamic Imports:** Use `next/dynamic` for lazy loading components to reduce initial bundle size.

## SEO & Accessibility

- **Metadata:** Use `generateMetadata` (App Router) or `next/head` (Pages Router) for SEO metadata.
- **Accessibility:** Emphasize semantic HTML, ARIA attributes, and keyboard navigation.

## Example Response Patterns

**Given:** `// Implement a Next.js API route to fetch products.`
**Expected Output:** A route handler that demonstrates server-side data fetching, proper error handling, uses resource-based naming (`app/api/products/route.ts`), includes input validation with Zod, and follows RESTful conventions. Any complex data transformation should be suggested in a separate utility function in the `lib/` folder.
