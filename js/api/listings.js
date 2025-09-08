import { API_CONFIG } from "../utils/constants.js";
import { getAuthHeaders, isLoggedIn } from "../utils/authUtils.js";

export async function fetchBrowseListings() {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}`
  try {
    const headers = isLoggedIn()
    ? getAuthHeaders()
    :{"Content-Type": "application/json"};
    const response = await fetch(url, {headers});
    if (!response.ok) {
      throw new Error("Failed to fetch browse listings")
    }
    const data = await response.json();
    console.log("browse listings:", data);
    return data;
  }
catch(error) {
  console.error("failed to fetch browse listings", error);
  throw error;
}
}

export async function fetchEndingSoonListings() {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?limit=6&sort=endsAt&sortOrder=asc&_active=true&_seller=true&_bids=true`;

  try {
    const headers = isLoggedIn()
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error("Failed to fetch ending soon listings");
    }

    const data = await response.json();
    console.log("Ending soon listings:", data);
    return data;
  } catch (error) {
    console.error("Error fetching ending soon listings:", error);
    throw error;
  }
}

export async function fetchNewestListings() {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?limit=6&sort=created&sortOrder=desc&_seller=true&_bids=true`;

  try {
    const headers = isLoggedIn()
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error("Failed to fetch newest listings");
    }

    const data = await response.json();
    console.log("Newest listings:", data);
    return data;
  } catch (error) {
    console.error("Error fetching newest listings:", error);
    throw error;
  }
}

export async function fetchListingDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  if (!listingId) {
    throw new Error("No listing ID provided in URL");
  }

  const url = `${
    API_CONFIG.BASE_URL
  }${API_CONFIG.ENDPOINTS.AUCTION.LISTING_DETAIL.replace(
    "<id>",
    listingId
  )}?_seller=true&_bids=true`;

  try {
    const headers = isLoggedIn()
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error("Failed to fetch listing detail");
    }
    const data = await response.json();
    console.log("listing detail:", data);
    return data;
  } catch (error) {
    console.error("Error fetching listing detail:", error);
    throw error;
  }
}
