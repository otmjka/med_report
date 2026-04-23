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
- `npx vitest run --project unit` — run only unit tests (skip Storybook project)
- `npx vitest run src/path/to/file.test.tsx` — run a single test file
- `npm run storybook` — start Storybook on port 6006

## Architecture

Feature-Sliced Design (FSD) structure under `src/`:

- **app/** — entry point (`main.tsx`), root `App` component, router config (`appRouter.ts`), global CSS
- **pages/** — route-level slices (see Slice layout below)
- **widgets/** — composed UI blocks (e.g. `AppNav`)
- **entities/** — domain entities (e.g. `client`); each is a slice with `api/`, `model/`, `ui/`, `index.ts` as public API
- **shared/** — cross-cutting concerns:
  - `api/` — API URLs and fetch functions that don't belong to a single entity (e.g. `createReport`)
  - `ui/` — shadcn/ui primitives (auto-generated, ESLint-ignored)
  - `UiKit/` — custom reusable layout/typography primitives (`Layout`, `Header`, `Logo`, `PageContent`, `H1`, `H2`, `Section`, `ErrorAlert`, …)
  - `queryClient/` — TanStack Query client with localStorage persistence
  - `types/` — shared TypeScript types
  - `tests/` — test setup, MSW mock handlers and data
  - `lib/` — utility functions (`cn()` from clsx + tailwind-merge)

### Slice layout (FSD)

Every page or entity slice follows this canonical structure:

```
SliceName/
  index.ts        ← public API (only what other slices may import)
  config/         ← routes, constants
  api/            ← fetch functions (entities only; pages usually skip)
  model/          ← hooks, query/mutation wrappers, derived state
  lib/            ← helpers, mappers, table column defs, formatters
  ui/             ← all React components (each in its own file)
```

Anything not exported from `index.ts` is private to the slice. External code must never import slice internals — go through the public `index.ts`.

## Key Technical Details

- **React 19** + **TypeScript** (strict mode, `noUnusedLocals`, `noUnusedParameters`)
- **Vite 7** with Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- **react-router v7** with `createBrowserRouter`, basename from `import.meta.env.BASE_URL`
- **TanStack Query** with `PersistQueryClientProvider` (localStorage persister)
- **shadcn/ui** (new-york style) — components live in `src/shared/ui/`, configured via `components.json`
- **Path aliases**: `@/*` → `src/*`, `@/shared/ui/*` → `src/shared/ui/*` (configured in both `tsconfig.json` and `vite.config.ts`)

## Testing

- **Vitest** + **jsdom** + **React Testing Library**, plus a separate Storybook project (browser, Playwright). Use `--project unit` for the jsdom suite.
- **MSW** for API mocking — handlers in `src/shared/tests/mocks/handlers.ts`, fixtures in `src/shared/tests/mocks/*Data.ts`
- Global test setup in `src/shared/tests/setupTests.ts` (starts MSW server, clears localStorage, polyfills `EventSource`)
- Test files **co-located** with the component (`Foo.tsx` + `Foo.test.tsx`) — no `__tests__/` subfolder for new code.

### Reusable assertion helpers (expectations)

For every component that owns a `data-testid`, ship an `Foo.expectations.ts` next to it. It exports queries (`getFoo`, `queryFoo`) and assertions (`expectFooVisible`, `expectFooAbsent`, `expectFooText(...)`).

- Component unit tests use these helpers — they don't read `data-testid` directly.
- Page-level tests compose helpers from many slices: `expectH1Text('Dashboard')` + `expectClientsTableHasRows(...)` + `expectMakeClientsReportEnabled()` etc.

If you change a `data-testid` or rendered text, update the expectations file once and every consumer follows.

## Pre-commit Hook

Husky runs on commit: lint-staged (ESLint --fix) → full lint → tests → build. All must pass.

## Code Style

- Prettier: single quotes, trailing commas, 80 char width, 2-space indent
- ESLint ignores `src/shared/ui/**` (shadcn generated code)
- **Single function per file.** Each React component lives in its own `.tsx`. Types in a sibling `types.ts`. Helpers in their own `.ts`.
- **Never inline UI blocks** — extract into a separate component file. Components should be small and reusable.
- **Helpers and types in separate files** — utility functions go in dedicated files (e.g., `getRowSelectedState.ts`); types in `types.ts` next to the component (or in slice `lib/`).

### JSX = pure composition

This is the most important rule and applies to every `.tsx` file in the project:

- **No ternaries inside JSX.** Not in children, not in props, not inside `.map()` callbacks.
  - ❌ `{cond ? <A /> : <B />}` — extract a child component that decides via early return.
  - ❌ `{header.isPlaceholder ? null : flexRender(...)}` — extract `<HeaderCell header={header} />`.
  - ❌ `error={isError ? error : null}` — derive `displayError` in the hook above the return.
  - ✅ `{cond && <A />}` for simple presence checks.
- **No computations inside JSX.** No `flexRender(...)` / function calls / inline arithmetic in markup. Compute the value above the `return` (or in the hook), then pass a ready node/value.
- **Smart components with early return** are how we express conditional rendering. A component takes the relevant flags/data as props and decides internally:
  ```tsx
  if (!isLoading) return null;
  ```
  This keeps page-level JSX a flat outline: `<Skeleton .../><ErrorAlert .../><Table .../>`.
- **Conditional classNames** — always `cn()` from `@/shared/lib/utils`, never ternaries: `cn('base', disabled && 'opacity-50')`.

A page's JSX should read like a layout outline (which sections appear in what order), never like business logic.

### Hooks own derived state

If a value involves a ternary, conditional, or computation that would otherwise live in JSX, derive it in the page/feature hook and return it ready-to-use. Example: `useClientsPage` returns `{ clients: { data, isLoading, displayError } }` — the page renders `<ErrorAlert error={clients.displayError} />` with no logic.

### Page composition

A typical page renders only:

```tsx
<PageContent>
  <H1>...</H1>
  <Section><H2>...</H2><SomeButton ... /></Section>
  <SomeSmartTable state={...} />
</PageContent>
```

No skeletons / error alerts / empty states inline — those live inside the smart child components (`SomeSmartTable` itself renders skeleton / error / data based on its `state` prop).
