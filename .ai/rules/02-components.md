# Component reuse rules

Follow these rules when you build or change UI in pages and components.

## Check before you build

- Before you write new UI, look in `components/global/` and `components/` for something that already does the job. Use it, or extend it with a prop or slot, instead of writing a near-copy.
- Then check whether a Nuxt UI component already does it (`UButton`, `UInput`, `USelect`, `USelectMenu`, `UInputMenu`, `UTable`, `UPagination`, `UCard`, `UModal`, `UBadge`, `UTabs`, `UDropdownMenu` and so on). Read its props in the Nuxt UI docs or in `node_modules/@nuxt/ui/dist/runtime/components/<Name>.vue.d.ts`.
- **Don't wrap a Nuxt UI component only to rename or preset its props** (no `CustomTextField` around `UInput`). Use it directly. Change a look for the whole app in `app.config.ts` → `ui` (ask first, see `03-scope.md`).
- Existing global components:
  - `GlobalAppDialog`: the dialog host for `useDialog()`. It's rendered once in `app.vue`; don't use it anywhere else.
  - `GlobalDatePicker`: `v-model` is an ISO date string (`"YYYY-MM-DD"`) or `null`, shown with `FormateDate`. Props: `placeholder`, `disabled`.

## When to extract

- If similar UI appears in **2 or more places** (pages, dialogs or components), extract it into one component. This includes UI you're about to add that matches something that already exists.
- "Similar" means the same structure with different data or labels, e.g. a page header with a title and action buttons, a search/filter bar, a form section, a status badge, a summary card or a table with the same columns pattern.
- Replace the copies in files the task already touches. If other files have copies too, list them and ask before you change them (see `03-scope.md`).
- Don't extract one-off UI only because it's long. If a page gets hard to read, ask before splitting it.

## Where it goes

- **Generic, app-wide UI** with no feature logic and no store or API calls → `components/global/`. It's auto-imported with the `Global` prefix (`components/global/PageHeader.vue` → `<GlobalPageHeader>`).
- **UI shared only within one feature** → `components/<feature>/`. Folders don't add a prefix (`pathPrefix: false`), so start the file name with the feature to keep names unique (`components/user/UserStatusBadge.vue` → `<UserStatusBadge>`).
- `UTable` column definitions (`TableColumn<User>[]`) for a feature go in the page, or in `components/<feature>/` next to the table component when two pages share them.
- If you're not sure which one fits, ask.

## How to design it

- Pass data in through props and send actions out through emits (plain camelCase names, see naming rules). Use `defineModel()` for `v-model`. Use slots for parts that differ between pages.
- Shared components don't call stores, repositories or the API. The page does that and passes the result in as props. Feature components in `components/<feature>/` may read their feature's store when that keeps the page simpler.
- Type props and emits with `defineProps<...>()` and `defineEmits<...>()`, using entity types from `models/entities` (or form types from `models/forms` for form components).
- Accept a `class` passthrough instead of adding style props (`width`, `height`, `fontSize`).
- Keep it small and focused on one job. Add a prop only when a real caller needs it, not for a possible future one.
