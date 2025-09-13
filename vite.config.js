import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        login: './auth/login/index.html',
        register: './auth/register/index.html',
        browseListings: './browse-listings/index.html',
        createListing: './create-listing/index.html',
        listingDetails: './listing-details/index.html',
        profile: './profile/index.html',
      },
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: [],
  },
});
