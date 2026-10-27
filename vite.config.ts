/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works on GitHub Pages (/Learn-UI-UX/) and from any folder.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // Content (lessons, mocks) is the bulk of the bundle; keep the framework in its own long-lived chunk.
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react';
          if (id.includes('node_modules/lucide-react')) return 'icons';
          // Loaded on demand by their tabs: let them get their own chunks.
          if (id.includes('/src/content/cultures/profiles') || id.includes('/src/content/cultures/pairs')) return 'cultures';
          if (id.includes('/src/content/antipatterns.ts')) return 'catalog';
          if (id.includes('/src/content/')) return 'content';
          return undefined;
        },
      },
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
