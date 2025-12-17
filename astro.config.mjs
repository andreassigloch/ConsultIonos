import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://siglochconsulting.de',
  output: 'static',
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/'),
      changefreq: 'weekly',
      priority: 0.7,
      serialize: (item) => {
        // Homepage highest priority
        if (item.url === 'https://siglochconsulting.de/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Main pages
        if (item.url.includes('/beratungsleistungen')) {
          item.priority = 0.9;
        }
        // Blog/Publikationen
        if (item.url.includes('/publikationen') || item.url.includes('/blog/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        return item;
      }
    })
  ],
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    css: {
      transformer: 'lightningcss'
    }
  }
});
