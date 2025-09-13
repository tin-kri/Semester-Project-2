import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        environment: 'happy-dom',
      globals: true,
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/tests/**/*.spec.js',
        '**/tests/**/*.e2e.js',
      ],
    },
  });

