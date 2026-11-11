export default defineAppConfig({
  appName: "Nuxt4 + NuxtUI",
  apiBaseUrl: process.env.VITE_API_BASE_URL ?? "",
  appVersion: "1.0.0",

  // theme colors, any Tailwind palette name. Use them as color="primary", text-primary, bg-error...
  ui: {
    colors: {
      primary: "blue",
      secondary: "amber",
      info: "teal",
      success: "green",
      warning: "amber",
      error: "red",
      neutral: "slate",
    },
  },
});
