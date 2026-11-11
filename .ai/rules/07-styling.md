# Styling rules

Use Nuxt UI first, then Tailwind utility classes. Write custom CSS only when neither can do it.

## Nuxt UI first

- Use Nuxt UI components and their props (`color`, `variant`, `size`, `icon`, `block`, `loading`) before adding any class.
- To change one instance, use `class` (the root) or the `:ui` prop (inner slots: `:ui="{ base: 'justify-center' }"`). To change a component everywhere, ask first, then set it in `app.config.ts` → `ui.<component>`.
- Don't target Nuxt UI internals with CSS selectors or `:deep()`. Use `:ui` instead.

## Tailwind for layout

- Layout and spacing use Tailwind utilities: `flex`, `items-center`, `justify-between`, `gap-2`, `p-4`, `mb-2`, `text-lg`, `font-semibold`, `w-full` and so on.
- Responsive layouts use breakpoint prefixes (`grid grid-cols-1 md:grid-cols-2`, `hidden md:flex`), and `UContainer` for page width.
- Write class names in full. Tailwind only finds literal strings, so `` `text-${color}` `` won't work; use a map of full class names (see `GlobalAppDialog`).

## Colors

- Use the semantic theme colors only: `primary`, `secondary`, `success`, `info`, `warning`, `error`, `neutral`, as props (`color="error"`) or classes (`text-primary`, `bg-error`, `border-primary`).
- For text, backgrounds and borders, use Nuxt UI's design tokens: `text-default`, `text-muted`, `text-dimmed`, `text-highlighted`, `text-inverted`, `bg-default`, `bg-muted`, `bg-elevated`, `border-default`.
- No hard-coded colors: no hex, `rgb` or color names, and no raw Tailwind palette classes (`text-blue-500`, `bg-red-100`). The theme lives in `app.config.ts` → `ui.colors`. If a color you need isn't in the theme, ask before you add it.
- The app is light mode only. Don't add `dark:` classes or a color mode toggle.

## Icons

- The app uses Lucide only: `i-lucide-*` (`<UIcon name="i-lucide-pencil" />`, `<UButton icon="i-lucide-plus" />`). Nuxt UI's own icons (chevrons, close, loading) are Lucide too. Don't use names from other sets (`i-mdi-*`, `i-heroicons-*`) and don't add another icon collection without asking.
- Check that the name exists at https://lucide.dev/icons before you use it. A wrong or non-Lucide name gives no build error. It just shows nothing.
- Write the full icon name as a literal string in source. Icons are bundled at build time from what the scanner finds and the Iconify API is off, so a name built at runtime (`` `i-lucide-${name}` ``) or sent by the API shows nothing. To pick an icon by value, use a map of full names (see `GlobalAppDialog`).

## Custom CSS

- No inline `style="..."` or `:style` for things a prop or utility class can do.
- When you do need CSS, put it in `<style scoped>` in that component, and prefer `@apply` with Tailwind utilities over raw values.
- `assets/css/main.css` holds the Tailwind and Nuxt UI imports, the `@font-face` rules and `@theme`. Ask before you change it.
- Don't set `font-family`. The app font (Noto Sans Lao) is set globally through `--font-sans` in `@theme`.
- Avoid `!important`. If you can't avoid it, explain why in a short comment.
