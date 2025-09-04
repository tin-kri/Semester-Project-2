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

// const API_BASE = "https://v2.api.noroff.dev";
// const API_AUTH = `${API_BASE}/auth`;
// const API_AUTH_REGISTER = `${API_AUTH}/register`;

// export const API_KEY = "4829af8a-6808-4656-99de-32c69a51c4d0";

// export const API_BASE = "https://v2.api.noroff.dev";

// export const API_AUTH = `${API_BASE}/auth`

// export const API_AUTH_REGISTER = `${API_AUTH}/register`;

// export const API_AUTH_LOGIN = `${API_AUTH}/login`

// export const API_AUCTION = `${API_BASE}/auction`;

// export const API_LISTINGS = `${API_AUCTION}/listings`;

// export const API_PROFILE = `${API_AUCTION}/profiles`;

// export const API_SEARCH = `${API_LISTINGS}/search`;
