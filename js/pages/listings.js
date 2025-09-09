import { fetchBrowseListings } from "../api/listings.js"
import { createBrowseListingCard } from "../components/browseListingCard.js"
import { initTagFilters, initSortFilters } from "../components/filterComponent.js"
import { showError, showLoading, showEmpty, setHTML } from "../utils/dom.js"

// Global state for filtering and sorting
let allListings = []
let currentTag = null
let currentSort = "ending-soon"

/**
 * Initialize the browse listings page with filters and data loading
 */
export async function initBrowseListingsPage() {
  console.log("Loading browse listings page...")
  
  try {
    await loadAllListings()
    await initTagFilters(handleTagChange, handleClearFilters)
    initSortFilters(handleSortChange)
  } catch (error) {
    console.error("Failed to load browse listings:", error)
    showError("#listings-grid", "Failed to load listings")
  }
}

/**
 * Load all active listings from API and validate response format
 */
async function loadAllListings() {
  try {
    showLoading("#listings-grid", "Loading listings...")
    const data = await fetchBrowseListings()
    
    // Validate API response structure to prevent runtime errors
    if (!data || !Array.isArray(data.data)) {
      throw new Error('Invalid API response format')
    }
    
    allListings = data.data
    renderFilteredListings()
  } catch (error) {
    console.error('Error loading listings:', error)
    showError("#listings-grid", "Failed to load listings. Please try again.")
  }
}

/**
 * Handle tag filter changes - updates current tag and re-renders
 * @param {string|null} tag - Tag to filter by, or null to clear filter
 */
function handleTagChange(tag) {
  try {
    currentTag = tag
    renderFilteredListings()
  } catch (error) {
    console.error('Error handling tag change:', error)
    showError("#listings-grid", "Failed to filter by tag")
  }
}

/**
 * Handle sort option changes - updates sort method and re-renders
 * @param {string} sortBy - Sort method identifier
 */
function handleSortChange(sortBy) {
  try {
    currentSort = sortBy
    renderFilteredListings()
  } catch (error) {
    console.error('Error handling sort change:', error)
    showError("#listings-grid", "Failed to sort listings")
  }
}

/**
 * Reset all filters to default state
 */
function handleClearFilters() {
  try {
    currentTag = null
    currentSort = "ending-soon"
    renderFilteredListings()
  } catch (error) {
    console.error('Error clearing filters:', error)
    showError("#listings-grid", "Failed to clear filters")
  }
}

/**
 * Apply current filters and sorting, then render the results
 * This is the single source of truth for displaying listings
 */
function renderFilteredListings() {
  try {
    // Defensive check - ensure we have valid data to work with
    if (!Array.isArray(allListings)) {
      console.warn('allListings is not an array:', allListings)
      showError("#listings-grid", "No listings data available")
      return
    }

    let filteredListings = [...allListings]
    
    // Apply tag filter - exact match on lowercase tag names
    if (currentTag) {
      filteredListings = filteredListings.filter(listing => {
        if (!listing || !Array.isArray(listing.tags)) return false
        return listing.tags.some(tag => 
          typeof tag === 'string' && tag.toLowerCase() === currentTag.toLowerCase()
        )
      })
    }
    
    // Apply sorting based on user selection
    switch (currentSort) {
      case "newest":
        // Sort by creation date: newest listings first
        filteredListings.sort((a, b) => 
          new Date(b.created || 0) - new Date(a.created || 0)
        )
        break
        
      case "ending-soon":
        // Sort by end date: auctions ending soonest first
        filteredListings.sort((a, b) => 
          new Date(a.endsAt || 0) - new Date(b.endsAt || 0)
        )
        break
        
      case "popularity":
        // Sort by bid count: most popular auctions first
        filteredListings.sort((a, b) => 
          (b._count?.bids || 0) - (a._count?.bids || 0)
        )
        break
        
      case "price-low":
        // Sort by price: lowest current bid first
        filteredListings.sort((a, b) => 
          getHighestBid(a.bids) - getHighestBid(b.bids)
        )
        break
        
      case "price-high":
        // Sort by price: highest current bid first
        filteredListings.sort((a, b) => 
          getHighestBid(b.bids) - getHighestBid(a.bids)
        )
        break
    }
    
    // Single render call with results count update
    renderListings(filteredListings)
    updateResultsCount(filteredListings.length, currentTag)
    
  } catch (error) {
    console.error('Error filtering and rendering listings:', error)
    showError("#listings-grid", "Failed to display listings")
  }
}

/**
 * Render listings to the DOM or show empty state
 * @param {Array} listings - Array of listing objects to render
 */
function renderListings(listings) {
  if (listings.length === 0) {
    showEmpty("#listings-grid", "No auctions found")
    return
  }
  
  const cards = listings.map(listing => createBrowseListingCard(listing)).join("")
  setHTML("#listings-grid", cards)
}

/**
 * Update the results count display with current filter context
 * @param {number} count - Number of results being displayed
 * @param {string|null} tag - Current tag filter, if any
 */
function updateResultsCount(count, tag = null) {
  const text = tag ? `Showing ${count} results for "${tag}"` : `Showing ${count} results`
  const element = document.getElementById("results-count")
  if (element) element.textContent = text
}

/**
 * Get the highest bid amount from a bids array
 * @param {Array} bids - Array of bid objects
 * @returns {number} Highest bid amount, or 0 if no bids
 */
function getHighestBid(bids) {
  if (!bids || bids.length === 0) return 0
  return Math.max(...bids.map(bid => bid.amount))
}