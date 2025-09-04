import { fetchListingDetail } from "../api/listings.js";

export function initListingsDetailsPage() {
  console.log("Loading listing detail page...");
  loadListingDetail();
}



async function loadListingDetail() {
  try {
    const listing = await fetchListingDetail();
    displayListing(listing);
  } catch (error) {
    console.error("Error loading listing:", error);
    document.querySelector("errorMessage").textContent =
      "Failed to load listing";
  }
}

function displayListing(listing) {
  document.querySelector("#single-listing-title").textContent = listing.title;
  document.querySelector("#single-listing-description").textContent =
    listing.description || "No description";

  // Show first image or placeholder
  const mainImage = document.querySelector("#single-listing-image");
  if (listing.media && listing.media.length > 0) {
    mainImage.src = listing.media[0].url;
  }

  // Current bid info
  const currentBid =
    listing.bids?.length > 0
      ? Math.max(...listing.bids.map((b) => b.amount))
      : 0;
  document.querySelector("#single-listing-current-bid").textContent = `$${currentBid}`;
  document.querySelector("#single-listing-bid-count").textContent = listing.bids?.length || 0;

  // Seller info
  if (listing.seller) {
    document.querySelector("#single-listing-seller-name").textContent = listing.seller.name;
    document.querySelector("#single-listing-seller-bio").textContent = listing.seller.bio;
  }

  // Bid history
  displayBidHistory(listing.bids);

  // Tags
  displayTags(listing.tags);
}

function displayBidHistory(bids) {
  const container = document.querySelector("single-listing-bid-history");
  clearContainer(container);

  if (!bids || bids.length === 0) {
    const noBidsMsg = createElement("p", "No bids yet");
    container.appendChild(noBidsMsg);
    return;
  }

  const sortedBids = bids.sort((a, b) => b.amount - a.amount);
  sortedBids.forEach((bid) => {
    const bidElement = createBidElement(bid);
    container.appendChild(bidElement);
  });
}

function displayTags(tags) {
  const container = document.querySelector("#single-listing-tag");
  clearContainer(container);

  if (!tags || tags.length === 0) return;

  tags.forEach((tag) => {
    const tagElement = createTagElement(tag);
    container.appendChild(tagElement);
  });
}

function createElement(tag, textContent = "", className = "") {
  const element = document.createElement(tag);
  if (textContent) element.textContent = textContent;
  if (className) element.className = className;
  return element;
}

function createBidElement(bid) {
  const bidDiv = createElement("div", "", "border-b p-2");
  const amountSpan = createElement("strong", `$${bid.amount}`);
  const bidderText = document.createTextNode(` by ${bid.bidder.name}`);

  bidDiv.appendChild(amountSpan);
  bidDiv.appendChild(bidderText);
  return bidDiv;
}

function createTagElement(tag) {
  return createElement(
    "span",
    tag,
    "bg-gray-200 px-2 py-1 rounded text-sm mr-2"
  );
}

function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
