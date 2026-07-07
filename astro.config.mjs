import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://markuskollers.de',
  vite: {
    plugins: [tailwindcss()]
  }
});
