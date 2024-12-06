// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: {
    assets: "/<rootDir>/assets",
  },
  css: [
    "~/assets/main.scss"
  ],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
