import { fetchListingDetail } from "../api/listings.js";
import { isLoggedIn } from "../utils/authUtils.js";

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
    alert("Failed to load listing: " + error.message);
  }
}

function displayListing(listing) {
  document.querySelector("#single-listing-title").textContent = listing.title;

  const mainImage = document.querySelector("#single-listing-image");
  if (listing.media && listing.media.length > 0) {
    mainImage.src = listing.media[0].url;
    mainImage.alt = listing.title;
  }

  updateTags(listing.tags);

  updateCurrentBid(listing.bids);

  updateTimeRemaining(listing.endsAt);

  updateSeller(listing.seller);

  document.querySelector("#single-listing-description").textContent =
    listing.description || "No description provided";

  displayBidHistory(listing.bids);

  setupBidding(listing);
// updates the browser tab title 
  document.title = `${listing.title} - DROPP//`;
}

function updateTags(tags) {
  const container = document.querySelector("#single-listing-tag");
  if (tags && tags.length > 0) {
    container.innerHTML = tags
      .map(
        (tag) =>
          `<span class="px-4 py-2 bg-dropp-primary/10 text-dropp-primary rounded-lg text-sm font-medium border border-dropp-primary/20">${tag}</span>`
      )
      .join("");
  } else {
    container.innerHTML =
      '<span class="text-dropp-gray-500 text-sm">No tags</span>';
  }
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
  const now = new Date();
  const endTime = new Date(endsAt);
  const diff = endTime - now;

  if (diff <= 0) {
    timeEl.textContent = "Auction Ended";
    timeEl.className = "text-2xl font-bold font-archivo text-red-600";
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      timeEl.textContent = `${days} Day${days !== 1 ? "s" : ""} ${hours} Hour${
        hours !== 1 ? "s" : ""
      }`;
    } else {
      timeEl.textContent = `${hours} Hour${hours !== 1 ? "s" : ""}`;
    }
    timeEl.className = "text-2xl font-bold font-archivo text-dropp-secondary";
  }
}

function updateSeller(seller) {
  if (!seller) return;

  document.querySelector("#single-listing-seller-name").textContent =
    seller.name;
  document.querySelector("#single-listing-seller-bio").textContent =
    seller.bio || "Passionate collector and seller";
}

function displayBidHistory(bids) {
  const container = document.querySelector("#single-listing-bid-history");

  if (!bids || bids.length === 0) {
    container.innerHTML = `
            <div class="text-center py-8 text-dropp-gray-500">
                <p>No bids yet - Be the first to bid!</p>
            </div>
        `;
    return;
  }

  // Sort bids by amount (highest first)
  const sortedBids = [...bids].sort((a, b) => b.amount - a.amount);

  container.innerHTML = sortedBids
    .slice(0, 5)
    .map(
      (bid, index) => `
        <div class="flex justify-between items-center p-4 bg-dropp-gray-50 rounded-lg">
            <div>
                <p class="font-semibold text-dropp-dark">${
                  bid.bidder?.name || "Anonymous"
                }</p>
                <p class="text-sm text-dropp-gray-600">${new Date(
                  bid.created
                ).toLocaleDateString()}</p>
            </div>
            <p class="text-lg font-bold font-archivo ${
              index === 0 ? "text-dropp-primary" : "text-dropp-gray-700"
            }">
                ${bid.amount} credits
            </p>
        </div>
    `
    )
    .join("");
}

function setupBidding(listing) {
  const bidButton = document.querySelector("#placeBidBtn");
  const bidInput = document.querySelector("#bidAmount");

  if (!bidButton || !bidInput) return;

  // Check if user can bid
  if (!isLoggedIn()) {
    bidButton.textContent = "Log In to Bid";
    bidButton.onclick = () => (window.location.href = "/auth/login/");
    bidInput.disabled = true;
    bidInput.placeholder = "Please log in to bid";
    return;
  }

  // Check if auction ended
  const now = new Date();
  const endTime = new Date(listing.endsAt);
  if (endTime <= now) {
    bidButton.textContent = "Auction Ended";
    bidButton.disabled = true;
    bidInput.disabled = true;
    bidInput.placeholder = "Auction has ended";
    return;
  }

  // Set minimum bid
  const currentBid = getCurrentBid(listing.bids);
  const minBid = currentBid + 1;
  bidInput.min = minBid;
  bidInput.placeholder = `Minimum bid: ${minBid} credits`;

  // Setup bid submission
  bidButton.onclick = () => handleBid(listing.id);
  bidInput.onkeypress = (e) => {
    if (e.key === "Enter") handleBid(listing.id);
  };
}

async function handleBid(listingId) {
  const bidInput = document.querySelector("#bidAmount");
  const bidAmount = parseInt(bidInput.value);
  const minBid = parseInt(bidInput.min);

  if (!bidAmount || bidAmount < minBid) {
    alert(`Please enter a bid of at least ${minBid} credits`);
    return;
  }

  try {
    // TODO: Implement placeBid function in listings.js
    alert("Bidding functionality will be implemented next!");
    console.log(`Would place bid of ${bidAmount} on listing ${listingId}`);

    // When implemented, this would be:
    // await placeBid(listingId, bidAmount);
    // location.reload(); // Refresh to show new bid
  } catch (error) {
    console.error("Bid failed:", error);
    alert("Failed to place bid: " + error.message);
  }
}

// Utility function
function getCurrentBid(bids) {
  if (!bids || bids.length === 0) return 0;
  return Math.max(...bids.map((bid) => bid.amount));
}
