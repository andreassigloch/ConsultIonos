import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://siglochconsulting.de',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    css: {
      transformer: 'lightningcss'
    }
  }
});
