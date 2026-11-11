// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,

  //config that pure html css js generate
  //not server side mode
  nitro: {
    preset: "static",
  },

  runtimeConfig: {
    public: {
      BUILD_DATE: process.env.BUILD_DATE,
      APP_ENV: import.meta.env.VITE_APP_ENV ?? "local",
    },
  },

  app: {
    head: {
      title: "Nuxt4 + UI",
    },
  },

  //components
  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
    {
      path: "@/components/global",
      pathPrefix: false,
      prefix: "global",
    },
  ],

  //css
  css: ["~/assets/css/main.css"],

  //modules
  modules: ["@nuxt/ui", "dayjs-nuxt", "@pinia/nuxt", "@vueuse/nuxt/module"],

  //light mode only: turns off Nuxt UI's color mode (no dark theme)
  ui: {
    colorMode: false,
  },

  //static SPA: bundle the icons used in source (@iconify-json/lucide), never call the Iconify API
  icon: {
    clientBundle: {
      scan: true,
    },
    fallbackToApi: false,
  },

  dayjs: {
    locales: ["en"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "en",
    defaultTimezone: "Asia/Bangkok",
  },

  pinia: {
    storesDirs: ["stores/**"],
  },

  //import directory need to include nuxt project
  imports: {
    dirs: ["stores"],
  },
});
