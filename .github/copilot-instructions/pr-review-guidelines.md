# GitHub PR Review Guidelines

## Review Focus Areas

### 🔍 **Code Quality**

- Verify TypeScript usage and type safety
- Check for descriptive naming conventions
- Ensure code follows DRY principles
- Review for proper error handling

### 🏗️ **Architecture Compliance**

- Confirm feature-based file organization
- Validate separation of concerns (UI/logic/data)
- Check component size and single responsibility
- Verify proper abstraction levels

### ⚛️ **React/Next.js Best Practices**

- Functional components with hooks
- Proper use of Server Components
- App Router patterns
- Performance considerations (keys, lazy loading)

### 🔒 **Security Review**

- No exposed environment variables or secrets
- Input validation with Zod
- Proper authentication/authorization patterns
- Secure data handling practices

### 📁 **Project Structure**

- Types in `types/` folder with descriptive filenames
- Utilities in `lib/` folder
- No barrel files (direct imports only)
- Proper component organization

### 📝 **Testing & Documentation**

- Test coverage for new features
- Clear commit messages
- Updated documentation when needed
- Mock data in `src/__mock__` directory

## Review Checklist

### ✅ **Approve When:**

- All guidelines are followed
- Code is clean, readable, and maintainable
- Proper TypeScript usage
- Security best practices applied
- Tests are included and passing

### ❌ **Request Changes When:**

- Using `any` type without justification
- Hardcoded secrets or exposed environment variables
- Duplicated logic that should be extracted
- Missing input validation
- Improper file organization
- Missing or inadequate tests

## Comment Suggestions

- Suggest specific improvements with code examples
- Reference relevant guideline sections
- Prioritize security and performance issues
- Encourage best practices adoption
