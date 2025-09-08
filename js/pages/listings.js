// init browse page
// load browse listings
//#listing-grid
//#loading-skeleton
//#pagination

import { fetchBrowseListings } from "../api/listings";
import { showError, showLoading, showEmpty, setHTML } from "../utils/dom";

export function initBrowseListingsPage() {
  console.log("loading browse listings page...");
  loadBrowseListings();
}

async function loadBrowseListings() {
  showLoading("#listing-grid", "load listing grid...");

  try {
    const [browseListingsData] = await Promise.all([fetchBrowseListings()]);

    renderBrowseListings(browseListingsData.data || []);
  } catch (error) {
    console.error("failed to load browse listings", error);
    showError("#listingGrid", "failed to load listings");
  }
}

function renderBrowseListings(listings) {
  if (listings.length === 0) {
    showEmpty("#listing-grid", "No auctions rendered");
    return;
  }
  const cards = listings;
  setHTML("#listing-grid", cards);
}
