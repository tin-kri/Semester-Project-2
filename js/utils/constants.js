console.log(' EnvVariables Debug:');
console.log('VITE_API_KEY:', import.meta.env.VITE_API_KEY);
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('All env vars:', import.meta.env);

export const API_CONFIG = {
  API_KEY: import.meta.env.VITE_API_KEY,
  BASE_URL: import.meta.env.VITE_API_BASE_URL,

  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      // BASE: "/auth",
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      CREATE_API_KEY: '/auth/create-api-key',
    },

    // Auction endpoints
    AUCTION: {
      BASE: '/auction',
      LISTINGS: '/auction/listings',
      LISTING_DETAIL: '/auction/listings/<id>',
      PROFILES: '/auction/profiles',
      SEARCH: '/auction/listings/search',
    },
  },
};
console.log('🔧 Final API_CONFIG:', API_CONFIG);