# Page and form rules

## Pages

- Pages in `pages/` stay thin: they call store actions, bind store state, and put the screen together from components. Logic that isn't about this one screen belongs in a store, builder, mapper or component.
- Use `<script setup lang="ts">`. Inside it, keep this order: imports, stores, props / emits, refs, computed, functions, lifecycle hooks.
- The app is a client-only SPA, so load the page's data in `onMounted`. Don't use `useFetch` or `useAsyncData`.
- Read stores with `storeToRefs` for state, and call actions on the store directly:
  ```ts
  const userStore = useUserStore();
  const { userList, isLoading } = storeToRefs(userStore);
  onMounted(() => userStore.fetchUserList(1));
  ```

## Loading, empty and error states

- Bind the store's flags to the UI: `:loading="isLoading"` on `UTable` (and a `USkeleton` for cards or details), and `:loading="isSubmitting"` plus `:disabled="isSubmitting"` on the submit `UButton` so a form can't be sent twice.
- Show an empty state when a list is empty after loading (`UTable`'s `empty` prop or `#empty` slot). Ask for its text if the task doesn't give it.
- Errors: wrap user actions in `catchError`. For background loads you can skip it (see `01-api-request.md`).

## Dialogs

- `useDialog()` has a SweetAlert2-style API: `fire`, `confirm`, `success`, `error`, `warning`, `info`, `prompt`. Every call resolves to `{ isConfirmed, value? }`. Closing with Esc or a click outside resolves `{ isConfirmed: false }`. `prompt` validates its input with a zod schema: `prompt("Reason", { inputSchema: rules.VALIDATE })`.
- Its state is a module-level singleton, rendered once by `<GlobalAppDialog />` in `app.vue` inside `<UApp>`, so don't add another dialog host.
- `catchError(fn, title?)` shows an error dialog with the text from `getErrorMessage` in `core/apiError.ts` (`[code] message` for `ApiError`, default title `messages.ERROR_TITLE` from `consts/messages.ts`) and returns `null`. It also returns `null` when `fn` resolves to nothing, so make `fn` return a value (e.g. `true`) when you need to tell success from failure.
- Use `useDialog` for alerts, confirmations and errors. For a custom dialog with its own content (an edit form in a modal), use `UModal` in the page or component. Don't use `useToast` unless the task asks for a toast.

## Forms

- Use `<UForm :schema="schema" :state="form" @submit="handleSubmit">` with one `<UFormField name="..." label="...">` per field, wrapping a Nuxt UI input (`UInput`, `UTextarea`, `USelect`, `USelectMenu`, `UInputMenu`, `UCheckbox`, `USwitch`, `GlobalDatePicker`).
- `name` on `UFormField` must match the key in the schema and in the form state. Add `required` to show the `*` on required fields.
- The schema is a zod object built from the shared rules in `consts/rules.ts`:
  ```ts
  import { z } from "zod";
  import rules from "@/consts/rules";

  const schema = z.object({
    name: rules.VALIDATE.pipe(rules.MAX_LENGTH(100)),
    note: rules.MAX_LENGTH(255).optional(),
  });
  ```
  If you need a new shared rule, ask before adding it to `consts/rules.ts` (see `03-scope.md`). A rule only one form uses can stay in that form's schema.
- Hold form values in one `ref` typed with a form type from `models/forms` (`ref<UserForm>({ ... })`). For an edit form, fill it from the entity with a mapper (`mapUserToForm`).
- `UForm` validates before it emits `submit`, so don't call `validate()` yourself. `@submit` only runs when the form is valid.
- On submit: call the store action inside `catchError`, and only on success (a non-`null` result) show the success message, reset the form or navigate. Ask what should happen after success if the task doesn't say.

## UI text

- Write all user-facing text in **English**: labels, buttons, placeholders, messages, empty states and validation text.
- Don't invent wording for important messages (confirmations, success and error texts). Use the task's text, or ask.
- Existing text in another language (e.g. the Lao `catchError` title `ຜິດພາດ` in `consts/messages.ts`) stays as it is unless the task is to change it.
