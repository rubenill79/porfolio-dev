// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: 'https://rubenlazaro-dev.vercel.app',
  integrations: [tailwind(), 
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: 'en-US',
          es: 'es-ES'
        }
      }
    },
  )],

  i18n: {
    defaultLocale: "en",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true
   }
  },

  adapter: vercel()
});