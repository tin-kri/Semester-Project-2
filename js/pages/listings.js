import { fetchBrowseListings } from '../api/listings.js';
import { createBrowseListingCard } from '../components/browseListingCard.js';
import {
  initTagFilters,
  initSortFilters,
} from '../components/filterComponent.js';
import { showError, showEmpty, setHTML } from '../utils/dom.js';
import { initSearchComponent } from '../components/searchComponent.js';
import { createSkeletonCards } from '../components/skeletonCard.js';

// Global state for filtering and sorting
let allListings = [];
let currentTag = null;
let currentSort = 'ending-soon';
let currentSearchQuery = '';

/**
 * Initialize the browse listings page with filters and data loading
 */
export async function initBrowseListingsPage() {
  try {
    await loadAllListings();
    await initTagFilters(handleTagChange, handleClearFilters);
    initSortFilters(handleSortChange);
    initSearchComponent(handleSearchChange);
  } catch (error) {
    console.error('Failed to load browse listings:', error);
    showError('#listings-grid', 'Failed to load listings');
  }
}

/**
 * Load all active listings from API and validate response format
 */
async function loadAllListings() {
  try {
    setHTML('#listings-grid', createSkeletonCards(100));
    // showLoading('#listings-grid', 'Loading listings...');
    const data = await fetchBrowseListings();

    // Validate API response structure to prevent runtime errors
    if (!data || !Array.isArray(data.data)) {
      throw new Error('Invalid API response format');
    }

    allListings = data.data;
    renderFilteredListings();
  } catch (error) {
    console.error('Error loading listings:', error);
    showError('#listings-grid', 'Failed to load listings. Please try again.');
  }
}

function handleSearchChange(searchQuery) {
  try {
    currentSearchQuery = searchQuery;
    renderFilteredListings();
  } catch (error) {
    console.error('Error handling search change:', error);
    showError('#listings-grid', 'Failed to search listings');
  }
}

/**
 * Handle tag filter changes - updates current tag and re-renders
 * @param {string|null} tag - Tag to filter by, or null to clear filter
 */
function handleTagChange(tag) {
  try {
    currentTag = tag;
    renderFilteredListings();
  } catch (error) {
    console.error('Error handling tag change:', error);
    showError('#listings-grid', 'Failed to filter by tag');
  }
}

/**
 * Handle sort option changes - updates sort method and re-renders
 * @param {string} sortBy - Sort method identifier
 */
function handleSortChange(sortBy) {
  try {
    currentSort = sortBy;
    renderFilteredListings();
  } catch (error) {
    console.error('Error handling sort change:', error);
    showError('#listings-grid', 'Failed to sort listings');
  }
}

function handleClearFilters() {
  try {
    currentTag = null;
    currentSort = 'ending-soon';
    currentSearchQuery = '';

    // Clears
    const searchInput = document.querySelector('#search-filter');
    if (searchInput) {
      searchInput.value = '';
    }

    renderFilteredListings();
  } catch (error) {
    console.error('Error clearing filters:', error);
    showError('#listings-grid', 'Failed to clear filters');
  }
}

// Separate filter functions - each with single responsibility

function applySearchFilter(listings, searchQuery) {
  if (!searchQuery) {
    return listings;
  }

  const query = searchQuery.toLowerCase();

  return listings.filter(listing => {
    if (!listing) {
      return false;
    }

    const searchableText = [
      listing.title || '',
      listing.description || '',
      listing.tags ? listing.tags.join(' ') : '',
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(query);
  });
}

function applyTagFilter(listings, tag) {
  if (!tag) {
    return listings;
  }

  return listings.filter(listing => {
    if (!listing || !Array.isArray(listing.tags)) {
      return false;
    }

    return listing.tags.some(
      listingTag =>
        typeof listingTag === 'string' &&
        listingTag.toLowerCase() === tag.toLowerCase()
    );
  });
}

function applySorting(listings, sortType) {
  const sortedListings = [...listings];

  switch (sortType) {
    case 'newest':
      return sortedListings.sort(
        (a, b) => new Date(b.created || 0) - new Date(a.created || 0)
      );

    case 'ending-soon':
      return sortedListings.sort(
        (a, b) => new Date(a.endsAt || 0) - new Date(b.endsAt || 0)
      );

    case 'popularity':
      return sortedListings.sort(
        (a, b) => (b._count?.bids || 0) - (a._count?.bids || 0)
      );

    case 'price-low':
      return sortedListings.sort(
        (a, b) => getHighestBid(a.bids) - getHighestBid(b.bids)
      );

    case 'price-high':
      return sortedListings.sort(
        (a, b) => getHighestBid(b.bids) - getHighestBid(a.bids)
      );

    default:
      return sortedListings;
  }
}

function validateListingsData(listings) {
  if (!Array.isArray(listings)) {
    console.warn('allListings is not an array:', listings);
    showError('#listings-grid', 'No listings data available');
    return false;
  }
  return true;
}

/**
 * Apply current filters and sorting, then render the results
 * This is the single source of truth for displaying listings
 */
function renderFilteredListings() {
  try {
    // Early return for invalid data
    if (!validateListingsData(allListings)) {
      return;
    }

    // Apply filters in sequence using function composition
    let filteredListings = allListings;
    filteredListings = applySearchFilter(filteredListings, currentSearchQuery);
    filteredListings = applyTagFilter(filteredListings, currentTag);
    filteredListings = applySorting(filteredListings, currentSort);

    // Render results
    renderListings(filteredListings);
    updateResultsCount(filteredListings.length, currentSearchQuery, currentTag);
  } catch (error) {
    console.error('Error filtering and rendering listings:', error);
    showError('#listings-grid', 'Failed to display listings');
  }
}

/**
 * Render listings to the DOM or show empty state
 * @param {Array} listings - Array of listing objects to render
 */
function renderListings(listings) {
  if (listings.length === 0) {
    showEmpty('#listings-grid', 'No auctions found');
    return;
  }

  const cards = listings
    .map(listing => createBrowseListingCard(listing))
    .join('');
  setHTML('#listings-grid', cards);
}

/**
 * Update the results count display with current filter context
 * @param {number} count - Number of results being displayed
 * @param {string} searchQuery - Current search query
 * @param {string|null} tag - Current tag filter, if any
 */
function updateResultsCount(count, searchQuery = '', tag = null) {
  let text = `Showing ${count} results`;

  if (searchQuery && tag) {
    text = `Found ${count} results for "${searchQuery}" in "${tag}"`;
  } else if (searchQuery) {
    text = `Found ${count} results for "${searchQuery}"`;
  } else if (tag) {
    text = `Showing ${count} results for "${tag}"`;
  }

  const element = document.getElementById('results-count');
  if (element) {
    element.textContent = text;
  }
}

/**
 * Get the highest bid amount from a bids array
 * @param {Array} bids - Array of bid objects
 * @returns {number} Highest bid amount, or 0 if no bids
 */
function getHighestBid(bids) {
  if (!bids || bids.length === 0) {
    return 0;
  }
  return Math.max(...bids.map(bid => bid.amount));
}

window.viewListing = function (listingId) {
  window.location.href = `/listing-details/index.html?id=${listingId}`;
};
