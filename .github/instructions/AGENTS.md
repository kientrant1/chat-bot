<!-- Reference link https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions#creating-path-specific-custom-instructions-1 -->

# GitHub Copilot .instructionss for React/Next.js Projects

This directory contains modular guidelines for GitHub Copilot to ensure consistent, clean, and performant code generation for React and Next.js applications.

## Development Workflow

### Code Quality & Configuration

- ESLint: Uses Flat config (eslint.config.js) with Next.js and TypeScript rules
- Prettier: Auto-formatting via lint-staged (see .prettierrc for custom rules)
- Husky, lint-staged: Check code before committing or pushing
- TypeScript: Strict mode enabled in tsconfig.json
- Tests: Run unit tests

## Guidelines Overview

This project follows a modular approach to coding guidelines. Each aspect is documented in its own file:

- **[General Principles](./general-principles..instructions.md)** - Core coding principles, patterns, and best practices
- **[React Guidelines](./react..instructions.md)** - React-specific component design, state management, and performance
- **[Next.js Guidelines](./nextjs..instructions.md)** - Next.js routing, data fetching, and optimization
- **[TypeScript Guidelines](./typescript..instructions.md)** - TypeScript configuration and type organization
- **[Testing Guidelines](./testing..instructions.md)** - Testing strategies and best practices
- **[Security Guidelines](./security..instructions.md)** - Security practices and sensitive data handling
- **[Project Structure](./project-structure..instructions.md)** - File organization and architecture patterns

## Quick Reference

### Package Management

This project uses **yarn** for managing dependencies. All package installations and scripts should use `yarn` instead of `npm` or `pnpm`.

### Documentation

All principal documentation should be created in the `docs` folder.

### Type Organization

When generating TypeScript types or interfaces, always place them in the `types/` folder with descriptive filenames (e.g. `user.ts`, `post.ts`).
