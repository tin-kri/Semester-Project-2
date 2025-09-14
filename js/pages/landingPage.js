import {
  fetchEndingSoonListings,
  fetchNewestListings,
} from '../api/listings.js';
import { createListingCard } from '../components/listingCard.js';
import { setHTML, showError, showEmpty } from '../utils/dom.js';
import { createSkeletonCards } from '../components/skeletonCard.js';

export function initLandingPage() {
  loadListings();
}

async function loadListings() {
  setHTML('#ending-soon-listings', createSkeletonCards(3));
  setHTML('#newest-listings', createSkeletonCards(3));
  try {
    const [endingSoonData, newestData] = await Promise.all([
      fetchEndingSoonListings(),
      fetchNewestListings(),
    ]);

    renderEndingSoon(endingSoonData.data || []);
    renderNewest(newestData.data || []);
  } catch (error) {
    console.error('Failed to load listings:', error);
    showError('#ending-soon-listings', 'Failed to load auctions');
    showError('#newest-listings', 'Failed to load listings');
  }
}

function renderEndingSoon(listings) {
  if (listings.length === 0) {
    showEmpty('#ending-soon-listings', 'No auctions ending soon');
    return;
  }

  const cards = listings
    .slice(0, 3)
    .map(listing => createListingCard(listing, true))
    .join('');

  setHTML('#ending-soon-listings', cards);
}

function renderNewest(listings) {
  if (listings.length === 0) {
    showEmpty('#newest-listings', 'No new listings available');
    return;
  }

  const cards = listings
    .slice(0, 3)
    .map(listing => createListingCard(listing, false))
    .join('');

  setHTML('#newest-listings', cards);
}

window.viewListing = function (listingId) {
  window.location.href = `/listing-details/index.html?id=${listingId}`;
};
