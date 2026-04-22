# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

clinic-web-app — a React SPA scaffolded from the `new-react-app` skill.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck (`tsc -b`) then build
- `npm run lint` — ESLint
- `npm run test` — run all tests once (vitest)
- `npm run test:dev` — run tests in watch mode
- `npx vitest run src/path/to/file.test.tsx` — run a single test file
- `npm run storybook` — start Storybook on port 6006

## Architecture

Feature-Sliced Design (FSD) structure under `src/`:

- **app/** — entry point (`main.tsx`), root `App` component, router config (`appRouter.ts`), global CSS
- **pages/** — route-level components, each exports a route object
- **features/** — business logic grouped by domain
- **widgets/** — composed UI blocks combining features
- **entities/** — domain entities
- **shared/** — cross-cutting concerns:
  - `api/` — API URLs and fetch functions
  - `ui/` — shadcn/ui primitives (auto-generated, ESLint-ignored)
  - `UiKit/` — custom reusable components (Layout, etc.)
  - `queryClient/` — TanStack Query client with localStorage persistence
  - `types/` — shared TypeScript types
  - `tests/` — test setup, MSW mock handlers and data
  - `lib/` — utility functions (`cn()` from clsx + tailwind-merge)

## Key Technical Details

- **React 19** + **TypeScript** (strict mode, `noUnusedLocals`, `noUnusedParameters`)
- **Vite 7** with Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- **react-router v7** with `createBrowserRouter`, basename from `import.meta.env.BASE_URL`
- **TanStack Query** with `PersistQueryClientProvider` (localStorage persister)
- **shadcn/ui** (new-york style) — components live in `src/shared/ui/`, configured via `components.json`
- **Path aliases**: `@/*` → `src/*`, `@/shared/ui/*` → `src/shared/ui/*` (configured in both `tsconfig.json` and `vite.config.ts`)

## Testing

- **Vitest** + **jsdom** + **React Testing Library**
- **MSW** for API mocking — handlers in `src/shared/tests/mocks/handlers.ts`
- Global test setup in `src/shared/tests/setupTests.ts` (starts MSW server, clears localStorage between tests)
- Test files co-located in `__tests__/` directories

## Pre-commit Hook

Husky runs on commit: lint-staged (ESLint --fix) → full lint → tests → build. All must pass.

## Code Style

- Prettier: single quotes, trailing commas, 80 char width, 2-space indent
- ESLint ignores `src/shared/ui/**` (shadcn generated code)
- **Never inline UI blocks** — always extract into a separate component file and import it. Components should be small and reusable so they can be placed anywhere.
- **Helpers and types in separate files** — utility functions go in a dedicated file (e.g., `getPageNumbers.ts`), types go in `types.ts` next to the component.
- **No ternaries in JSX/TSX** — use `condition && <Component />` pattern instead. If both branches render something, extract into a separate component or use early return.
- **Conditional classNames** — always use `cn()` from `@/shared/lib/utils`, never ternaries. Example: `cn('cursor-pointer', disabled && 'pointer-events-none opacity-50')`.
