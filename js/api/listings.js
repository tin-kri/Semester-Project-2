import { API_CONFIG } from '../utils/constants.js';
import { getAuthHeaders, isLoggedIn } from '../utils/authUtils.js';

export async function fetchBrowseListings() {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?_active=true&_seller=true&_bids=true`;
  try {
    const headers = isLoggedIn()
      ? getAuthHeaders()
      : { 'Content-Type': 'application/json' };
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error('Failed to fetch browse listings');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('failed to fetch browse listings', error);
    throw error;
  }
}

export async function fetchEndingSoonListings() {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?limit=6&sort=endsAt&sortOrder=asc&_active=true&_seller=true&_bids=true`;

  try {
    const headers = isLoggedIn()
      ? getAuthHeaders()
      : { 'Content-Type': 'application/json' };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch ending soon listings');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching ending soon listings:', error);
    throw error;
  }
}

export async function fetchNewestListings() {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?limit=6&sort=created&sortOrder=desc&_active=true&_seller=true&_bids=true`;

  try {
    const headers = isLoggedIn()
      ? getAuthHeaders()
      : { 'Content-Type': 'application/json' };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch newest listings');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching newest listings:', error);
    throw error;
  }
}

export async function fetchListingDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get('id');

  if (!listingId) {
    throw new Error('No listing ID provided in URL');
  }

  const url = `${
    API_CONFIG.BASE_URL
  }${API_CONFIG.ENDPOINTS.AUCTION.LISTING_DETAIL.replace(
    '<id>',
    listingId
  )}?_seller=true&_bids=true`;

  try {
    const headers = isLoggedIn()
      ? getAuthHeaders()
      : { 'Content-Type': 'application/json' };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch listing detail');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching listing detail:', error);
    throw error;
  }
}
// export async function fetchPopularTags() {
//   // Fetch a sample of active listings to analyze tag frequency
//   const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?_active=true&_seller=true&_bids=true`;

//   try {
//     const headers = isLoggedIn()
//       ? getAuthHeaders()
//       : { "Content-Type": "application/json" };

//     const response = await fetch(url, { headers });

//     if (!response.ok) {
//       throw new Error("Failed to fetch listings for tag analysis");
//     }

//     const data = await response.json();
//     const listings = data.data || [];

//     // Analyze tags and return top 10 most popular
//     const popularTags = analyzeTagsFromListings(listings);
//

//     return popularTags;

//   } catch (error) {
//     console.error("Failed to fetch popular tags:", error);
//     throw error;
//   }
// }
export async function fetchPopularTags() {
  // This should already only get active listings
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?_active=true&_seller=true&_bids=true`;

  try {
    const headers = isLoggedIn()
      ? getAuthHeaders()
      : { 'Content-Type': 'application/json' };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch listings for tag analysis');
    }

    const data = await response.json();
    // Debug

    const listings = data.data || [];

    // Debug: check if these listings are truly active

    const popularTags = analyzeTagsFromListings(listings);

    return popularTags;
  } catch (error) {
    console.error('Error in fetchPopularTags:', error);
    throw error;
  }
}
function analyzeTagsFromListings(listings) {
  const tagCounts = {};

  listings.forEach(listing => {
    if (listing.tags && Array.isArray(listing.tags)) {
      listing.tags.forEach(tag => {
        if (tag && typeof tag === 'string' && tag.trim()) {
          const cleanTag = tag.trim().toLowerCase();
          tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
        }
      });
    }
  });

  const tagArray = Object.entries(tagCounts)
    .map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1), // Display name
      filterValue: name, // Original lowercase for API filtering
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return tagArray;
}
