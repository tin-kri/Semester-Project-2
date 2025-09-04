// import { getFromLocalStorage } from "../utils/storage";
// const displayContainer = document.getElementById('display-container');

//fetch posts from api
// use auth access token
//render posts

// async function fetchListings() {}
// getFromLocalStorage
// try

// catch(error)

// function main()
// js/pages/landingPage.js

import {
  fetchEndingSoonListings,
  fetchNewestListings,
} from "../api/listings.js";
import { createListingCard } from "../components/listingCard.js";
import { setHTML, showLoading, showError, showEmpty } from "../utils/dom.js";

export function initLandingPage() {
  console.log("Loading landing page...");
  loadListings();
}

async function loadListings() {
  showLoading("#ending-soon-listings", "Loading ending soon...");
  showLoading("#newest-listings", "Loading newest listings...");

  try {
    const [endingSoonData, newestData] = await Promise.all([
      fetchEndingSoonListings(),
      fetchNewestListings(),
    ]);

    renderEndingSoon(endingSoonData.data || []);

    renderNewest(newestData.data || []);
  } catch (error) {
    console.error("Failed to load listings:", error);
    showError("#ending-soon-listings", "Failed to load auctions");
    showError("#newest-listings", "Failed to load listings");
  }
}

function renderEndingSoon(listings) {
  if (listings.length === 0) {
    showEmpty("#ending-soon-listings", "No auctions ending soon");
    return;
  }

  // Create cards with time left shown
  const cards = listings
    .slice(0, 3) // Show only 3 cards
    .map((listing) => createListingCard(listing, true)) // true = show time left
    .join("");

  setHTML("#ending-soon-listings", cards);
}

function renderNewest(listings) {
  if (listings.length === 0) {
    showEmpty("#newest-listings", "No new listings available");
    return;
  }

  // Create cards without time left
  const cards = listings
    .slice(0, 3) // Show only 3 cards
    .map((listing) => createListingCard(listing, false)) // false = don't show time left
    .join("");

  setHTML("#newest-listings", cards);
}

window.viewListing = function (listingId) {
  window.location.href = `/listing-details/index.html?id=${listingId}`;
};
