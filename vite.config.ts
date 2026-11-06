/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { contentIndex, deepLinks, serviceWorker } from './scripts/vite-plugins.mjs';

// Relative base so the build works on GitHub Pages (/Learn-UI-UX/) and from any folder.
export default defineConfig({
  base: './',
  plugins: [react(), contentIndex(), deepLinks(), serviceWorker()],
  build: {
    rolldownOptions: {
      output: {
        // Each lesson is its own chunk, fetched when a page needs it. The groups keep the framework
        // and the icons in long-lived chunks: editing a lesson changes that lesson's chunk and the
        // light index, never them. Higher priority first, so no group swallows another's modules.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/, priority: 30 },
            { name: 'icons', test: /node_modules[\\/]lucide-react[\\/]/, priority: 20 },
            // Fetched on demand by their tabs.
            { name: 'cultures', test: /src[\\/]content[\\/]cultures[\\/](profiles|pairs)\.ts/, priority: 15 },
            { name: 'catalog', test: /src[\\/]content[\\/]antipatterns\.ts/, priority: 15 },
            // What every page needs of the content: the light index, resources and sources.
            { name: 'content', test: /src[\\/]content[\\/]|virtual:content\/index/, tags: ['$initial'], priority: 10 },
          ],
        },
      },
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
