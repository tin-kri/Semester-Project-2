import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: './postcss.config.js',
  },
  test: {
    environment: 'happy-dom', // or 'jsdom'
    globals: true,
    setupFiles: [], // add test setup files if needed
  },
});
