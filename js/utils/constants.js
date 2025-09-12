export const API_CONFIG = {
  API_KEY: "caa49feb-b79f-4a81-af43-5b413d07215c",
  BASE_URL: "https://v2.api.noroff.dev",

  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      // BASE: "/auth",
      REGISTER: "/auth/register",
      LOGIN: "/auth/login",
      CREATE_API_KEY: "/auth/create-api-key",
    },

    // Auction endpoints
    AUCTION: {
      BASE: "/auction",
      LISTINGS: "/auction/listings",
      LISTING_DETAIL: "/auction/listings/<id>",
      PROFILES: "/auction/profiles",
      SEARCH: "/auction/listings/search",
    },
  },
};

