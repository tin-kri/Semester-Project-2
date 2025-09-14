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
