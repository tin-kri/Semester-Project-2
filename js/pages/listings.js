
import { fetchBrowseListings } from "../api/listings";
import { showError, showLoading, showEmpty, setHTML } from "../utils/dom";
import { createBrowseListingCard } from "../components/browseListingCard";

export function initBrowseListingsPage() {
  console.log("loading browse listings page...");
  loadBrowseListings();
}

async function loadBrowseListings() {
  showLoading("#listings-grid", "load listings grid...");

  try {
    const [browseListingsData] = await Promise.all([fetchBrowseListings()]);

    renderBrowseListings(browseListingsData.data || []);
  } catch (error) {
    console.error("failed to load browse listings", error);
    showError("#listingGrid", "failed to load listings");
  }
}

// function renderBrowseListings(listings) {
//   if (listings.length === 0) {
//     showEmpty("#listings-grid", "No auctions rendered");
//     return;
//   }
//   const cards = listings;
//   setHTML("#listings-grid", cards);
// }
function renderBrowseListings(listings) {
  if (listings.length === 0) {
    showEmpty("#listings-grid", "No auctions found");
    return;
  }

  // Create cards using the same function as landing page
  const cards = listings
    .map((listing) => createBrowseListingCard(listing, false)) // false = don't show time left
    .join("");

  setHTML("#listings-grid", cards);
}