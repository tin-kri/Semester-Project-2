import { fetchListingDetail } from "../api/listings.js";
import { initBidForm } from "../components/bidForm.js";
import { placeBid } from "../api/bids.js";
import { createBidHistory } from "../components/createBidHistory.js";
import { createTagsDisplay } from "../components/createTagsDisplay.js";
import { setHTML } from "../utils/dom.js";
import { formatTimeRemaining, isAuctionEnded } from "../utils/timeUtils.js";
import { showSuccess, showError } from "../utils/messages.js";

export function initListingsDetailsPage() {
  console.log("Loading listing detail page...");
  loadListingDetail();
}

async function loadListingDetail() {
  try {
    const response = await fetchListingDetail();
    const listing = response.data;
    console.log("Displaying listing:", listing);
    displayListing(listing);
  } catch (error) {
    console.error("Error loading listing:", error);
    showError("Failed to load listing: " + error.message);
  }
}
function displayListing(listing) {
  // Update title
  document.querySelector("#single-listing-title").textContent = listing.title;

  // Update main image
  const mainImage = document.querySelector("#single-listing-image");
  if (listing.media && listing.media.length > 0) {
    mainImage.src = listing.media[0].url;
    mainImage.alt = listing.title;
  }
  setHTML("#single-listing-tag", createTagsDisplay(listing.tags));
  setHTML("#single-listing-bid-history", createBidHistory(listing.bids));

  // Update all sections
  updateCurrentBid(listing.bids);
  updateTimeRemaining(listing.endsAt);
  updateSeller(listing.seller);
  updateDescription(listing.description);

  // Initialize bid form component
  initializeBidForm(listing);

  // Update browser tab title
  document.title = `${listing.title} - DROPP//`;
}

function updateCurrentBid(bids) {
  const currentBid = getCurrentBid(bids);
  const bidCount = bids?.length || 0;

  document.querySelector("#single-listing-current-bid").textContent =
    currentBid > 0 ? `${currentBid} credits` : "No bids yet";

  document.querySelector(
    "#single-listing-bid-count"
  ).textContent = `${bidCount} bid${bidCount !== 1 ? "s" : ""}`;
}

function updateTimeRemaining(endsAt) {
  const timeEl = document.querySelector("#single-listing-time-remaning");

  timeEl.textContent = formatTimeRemaining(endsAt);
  timeEl.className = `text-2xl font-bold font-archivo ${
    isAuctionEnded(endsAt) ? "text-red-600" : "text-green-600"
  }`;
}

function updateSeller(seller) {
  if (!seller) return;

  document.querySelector("#single-listing-seller-name").textContent =
    seller.name;
  document.querySelector("#single-listing-seller-bio").textContent =
    seller.bio || "No bio available";
}

function updateDescription(description) {
  document.querySelector("#single-listing-description").textContent =
    description || "No description provided";
}

function initializeBidForm(listing) {
  const bidButton = document.querySelector("#placeBidBtn");
  const bidInput = document.querySelector("#bidAmount");

  initBidForm(bidButton, bidInput, listing, handleBidSuccess, handleBidError);
}

async function handleBidSuccess(listingId, bidAmount) {
  console.log(`Placing bid of ${bidAmount} on listing ${listingId}`);

  //  place the bid
  await placeBid(listingId, bidAmount);

 
  showSuccess(`Bid of ${bidAmount} credits placed successfully!`);

  // Reload listing data to show new bid
  await loadListingDetail();
}

function handleBidError(errorMessage) {
  console.error("Bid error:", errorMessage);
  showError(errorMessage); // Using utility function
}


// Utility function
function getCurrentBid(bids) {
  if (!bids || bids.length === 0) return 0;
  return Math.max(...bids.map((bid) => bid.amount));
}
