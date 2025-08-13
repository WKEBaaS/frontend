# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production version
- `npm run preview` - Preview production build locally

### Code Quality

- `npm run check` - Run Svelte type checking and sync
- `npm run check:watch` - Run type checking in watch mode
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Format code with Prettier

### Testing

- `npm run test:unit` - Run Vitest unit tests
- `npm run test:e2e` - Run Playwright end-to-end tests
- `npm run test` - Run both unit and e2e tests

## Architecture Overview

This is a **SvelteKit 5** frontend application with the following key architectural components:

### Framework & Build Tools

- **SvelteKit 5** with Vite as the build tool
- **TypeScript** for type safety
- **TailwindCSS 4** for styling with the new Vite plugin
- **Vitest** for unit testing, **Playwright** for e2e testing

### Authentication & Authorization

- **Better Auth** (`better-auth`) with SSO support for authentication
- JWT-based session validation with JOSE library
- Authentication handled in `src/hooks.server.ts` with session management
- Auth client configured in `src/lib/auth-client.ts`

### UI Component System

- **bits-ui** and **svelte-radix** for accessible base components
- Custom UI components in `src/lib/components/ui/` following shadcn-style architecture
- **Lucide Svelte** for icons
- **Sonner** for toast notifications

### Internationalization (i18n)

- **Paraglide.js** for internationalization with Inlang project
- Supports English (`en`) and Traditional Chinese (`zh-tw`)
- Messages stored in `messages/` directory
- Auto-generated types in `src/lib/paraglide/`

### Form Handling & Validation

- **SvelteKit Superforms** for form management
- **Valibot** and **Zod** for schema validation
- **Formsnap** for form components

### Project Structure

#### Route Structure

- `(app)/` - Public application routes (landing page)
- `(dashboard)/dashboard/` - Authenticated dashboard routes
  - `project/[ref]/` - Individual project management
    - `auth/` - Project authentication settings
    - `settings/` - Project configuration
- Uses SvelteKit's route groups and layout inheritance

#### Key Directories

- `src/lib/` - Shared utilities, components, and business logic
- `src/lib/components/ui/` - Reusable UI components
- `src/lib/hooks/` - Custom Svelte hooks
- `messages/` - Internationalization message files
- `e2e/` - Playwright end-to-end tests

### State Management

- Uses Svelte 5's built-in reactivity with runes
- Server-side session management via hooks
- Form state managed by Superforms

### Development Workflow

- **Husky** for git hooks
- **lint-staged** for pre-commit code formatting
- **ESLint** with TypeScript and Svelte support
- **Prettier** with Svelte and TailwindCSS plugins

### Backend Integration

- Connects to external auth API via `PUBLIC_AUTH_API_URL`
- JWT verification using `JWK_PRBLIC_KEY` environment variable
- SSE (Server-Sent Events) support via `sveltekit-sse`

## Important Notes

### Environment Variables

- `PUBLIC_AUTH_API_URL` - Authentication API endpoint
- `JWK_PRBLIC_KEY` - JWT public key for token verification
- `EXTERNAL_DOMAIN` - External domain for URL generation

### Testing Strategy

- Unit tests for utilities and components using Vitest
- E2E tests for user workflows using Playwright
- E2E tests run against production build (`npm run build && npm run preview`)

### Code Conventions

- Follow existing TypeScript patterns and interfaces
- Use Svelte 5 syntax with runes (`$props`, `$state`, etc.)
- UI components follow shadcn/ui naming and structure conventions
- Form schemas defined using Valibot or Zod depending on context
