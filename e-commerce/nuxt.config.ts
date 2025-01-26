// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_API_URL,
      publishableApiKey: process.env.NUXT_PUBLIC_API_KEY
    },
  },
  modules: [
    '@primevue/nuxt-module', '@pinia/nuxt', '@nuxtjs/tailwindcss'
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  devtools: {enabled: false},
  css: ['@/assets/css/colors.css', '@/assets/css/main.css', '@/assets/css/variables.css'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp'
        },
      ],
    },
  },
  vite: {
    plugins: [],
  },
  typescript: {
    typeCheck: true,
  }
})
