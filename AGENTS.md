## Rules

Follow these on every task:

@.ai/rules/00-code-begin.md
@.ai/rules/03-scope.md
@.ai/rules/04-workflow.md

If your tool doesn't load the `@` lines above, read those three files before you start.

Topic rules aren't loaded automatically. Before you plan or edit code in an area, read its file:

| When the task touches | Read |
|---|---|
| API calls, `data/`, `models/`, `docs/api/` | `.ai/rules/01-api-request.md` |
| `stores/` | `.ai/rules/01-api-request.md`, `.ai/rules/05-stores.md` |
| `pages/`, `components/`, forms or any `.vue` UI | `.ai/rules/02-components.md`, `.ai/rules/06-pages-forms.md`, `.ai/rules/07-styling.md` |

**Ask, don't guess.** Before you start work, ask about anything that's unclear: requirements, naming, API fields, UI behavior, where code should go, or a spec that conflicts with the code. Ask all your questions together, up front, and wait for the answers before you edit. If something new comes up mid-task, stop and ask again.

## Commands

Package manager is **yarn** (v1, pinned via `packageManager`).

- `yarn install`: installs deps. `postinstall` runs `nuxt prepare` (regenerates `.nuxt/` types, which `tsconfig.json` extends).
- `yarn dev`: dev server on http://localhost:3000 with `VITE_APP_ENV=local`.
- `yarn generate`: static build (the production path) → `.output/public`. Stamps `BUILD_DATE`. Does **not** type-check.
- Type-check: `npx nuxt prepare && npx -y -p typescript@5 -p vue-tsc@2 vue-tsc --noEmit -p .nuxt/tsconfig.app.json`. Run `nuxt prepare` first: `yarn generate` writes its types to a cache folder, so `.nuxt/` can be stale. `vue-tsc` isn't a dependency, so `nuxi typecheck` fails.
- `yarn build` / `yarn preview`: standard Nuxt build and preview.

No test runner, linter or formatter is configured.

## Architecture

Nuxt 4 + Nuxt UI 4 (Tailwind CSS 4) + Pinia. Source lives in `app/`. `@/` and `~/` point to it. It's a client-only static SPA (`ssr: false`, `nitro.preset: "static"`) served by nginx, so browser APIs (`window`, `navigator`) are safe anywhere and `server/` is unused.

| Auto-imported | Needs `import ... from "@/..."` |
|---|---|
| `components/*` (no prefix), `components/global/*` (**`Global` prefix**: `AppDialog.vue` → `<GlobalAppDialog>`), top-level `composables/*` and `utils/*`, `stores/*`, Nuxt UI components (`U*`) and composables (`useToast`, `useOverlay`), VueUse | `core/`, `data/`, `models/`, `consts/`, `configs/` |

- `app.vue` wraps everything in `<UApp>` (required for Nuxt UI overlays, toasts and tooltips) and renders `<GlobalAppDialog />` once.
- `composables/global.ts`: `goPath`, `reloadPath`, `delayGoPath`, `goBack`, `FormateDate` (need Nuxt, router or `window`).
- `composables/useDialog.ts`: SweetAlert-style dialogs and `catchError` (see `06-pages-forms.md`).
- `utils/format.ts`: `formatNumber`. Put pure helpers (no Nuxt, router or `window`) in `utils/`.
- `core/apiError.ts`: `ApiError` and `getErrorMessage` (error → user text, used by `catchError`). `composables/` and `data/` import it from `core/`, never from each other.
- `consts/messages.ts`: every error text (`messages.OFFLINE`, `messages.ERROR_TITLE`). Add new error text here, not inline.
- `consts/rules.ts`: shared **zod** schemas for form fields (`rules.VALIDATE`, `rules.MAX_LENGTH(n)`).
- `docs/api/README.md`: the response envelope. `docs/api/template.md`: copy it to start `docs/api/<feature>.md`.
- `dayjs-nuxt` uses timezone `Asia/Bangkok`. Access it with `useDayjs()`.
- Theme: semantic colors in `app.config.ts` → `ui.colors`. App fonts (Roboto for English, Noto Sans Lao for Lao, both self-hosted in `public/fonts/`, with system fallbacks) and Tailwind `@theme` in `assets/css/main.css`. Light mode only (`ui.colorMode: false` in `nuxt.config.ts`).
- Icons: Lucide (`i-lucide-*`) from the local `@iconify-json/lucide` collection. `nuxt.config.ts` bundles the icons found in source and never calls the Iconify API (`fallbackToApi: false`).
- `plugins/pinia.ts` registers `pinia-plugin-persistedstate`. `runtimeConfig.public` exposes `BUILD_DATE` and `APP_ENV`. `app.config.ts` holds the app name, version and theme.
