# Nuxt 4 + Nuxt UI Boilerplate

A client-only static SPA starter: Nuxt 4, Nuxt UI 4 (Tailwind CSS 4), Pinia and Zod. It builds to static files and is served by nginx.

## Requirements

- Node.js 22
- Yarn 1 (`corepack enable` picks up the version pinned in `package.json`)

## Getting started

```bash
yarn install    # installs deps and runs nuxt prepare
yarn dev        # http://localhost:3000 (VITE_APP_ENV=local)
```

## Build

```bash
yarn generate   # static build → .output/public
```

Docker (builds the app and serves it with nginx on http://localhost:8080):

```bash
docker compose up --build
```

## Configuration

| What | Where |
|---|---|
| API base URL per environment (`local`, `develop`, `production`) | `app/configs/env.ts`, picked by `VITE_APP_ENV` |
| App name and version | `app/app.config.ts` |
| Theme colors | `app/app.config.ts` → `ui.colors` |
| Fonts (Roboto for English, Noto Sans Lao for Lao) | `app/assets/css/main.css`, files in `public/fonts/` |
| Icons | Lucide (`i-lucide-*`), bundled locally |

## Project structure

```
app/
  core/          apiRequest and ApiError
  data/          networks, repositories, builders, mappers
  models/        entities, forms, requestbody, responsebody
  stores/        Pinia stores
  composables/   useDialog, catchError, navigation and date helpers
  components/    UI; components/global/* get the Global prefix
  consts/        messages and zod form rules
  pages/ layouts/
docs/api/        API specs (copy template.md per feature)
.ai/rules/       coding rules for people and AI agents
```

## Contributing

Read `AGENTS.md` and `.ai/rules/` before you start. Work on a branch (never commit to `main` or `develop`) and use the commit format `<branch> <TYPE>:: <message>`.
