// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://neuralcraft.fr', // ← adapte à ton vrai domaine
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});