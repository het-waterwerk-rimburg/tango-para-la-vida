// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// TODO (dominio pendiente): cambiar por el dominio final antes de publicar.
// Se usa en canonical, hreflang, Open Graph, sitemap, robots.txt y JSON-LD.
const SITE = 'https://www.tangoparalavida.example';

// https://astro.build/config
export default defineConfig({
  site: SITE,

  // English is the default language (at the root), Dutch lives under /nl/.
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    // sitemap-index.xml with every page linked to its other language (hreflang).
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', nl: 'nl' } },
    }),
  ],

  // Fonts are downloaded at build time and served from this site (no request to Google Fonts).
  // web-info/diseno.md: IBM Plex Sans for everything, IBM Plex Serif italic only for quotes.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-plex-sans',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Serif',
      cssVariable: '--font-plex-serif',
      weights: [400],
      styles: ['italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
