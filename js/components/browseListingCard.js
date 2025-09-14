export function createBrowseListingCard(listing) {
  const image =
    listing.media?.[0]?.url || '/placeholder.svg?height=192&width=256';
  const bidCount = listing._count?.bids || 0;
  const highestBid = getHighestBid(listing.bids);
  const timeLeft = getTimeLeft(listing.endsAt);
  const isUrgent = isTimeUrgent(listing.endsAt);
  //removed onerror="this.src='/placeholder.svg?height=192&width=256'" infinity request svg
  return `
      <div class="bg-white rounded-lg p-6">
        <div class="relative w-full h-48 bg-dropp-gray-200 rounded-lg mb-4 overflow-hidden">
          <img
            src="${image}"
            alt="${listing.title}"
            class="w-full h-full object-cover rounded-lg"
            
          />
          <div class="time-overlay ${isUrgent ? 'urgent' : ''}">
            ${timeLeft}
          </div>
        </div>
        
        <h3 class="text-lg font-semibold font-archivo text-dropp-dark mb-2">
          ${listing.title}
        </h3>
        
        <div class="flex items-center justify-between mb-2">
          <div>
            <p class="text-dropp-gray-500 text-s">Current bid</p>
            ${
              highestBid
                ? `<p class="text-dropp-primary font-semibold">${highestBid} credits</p>`
                : '<p class="text-dropp-gray-500">No bids yet</p>'
            }
            <p class="text-xs text-dropp-gray-500">${bidCount} bid${
              bidCount !== 1 ? 's' : ''
            }</p>
          </div>
        </div>
        
        <p class="text-sm text-dropp-gray-600 mb-4 line-clamp-3">
          ${listing.description || 'No description available.'}
        </p>
        
        <button
          onclick="viewListing('${listing.id}')"
          class="w-full bg-dropp-primary text-white py-2 px-4 rounded-md hover:bg-dropp-primary/90 transition-colors"
        >
          View Auction
        </button>
      </div>
    `;
}

function getHighestBid(bids) {
  if (!bids || bids.length === 0) {
    return null;
  }
  return Math.max(...bids.map(bid => bid.amount));
}

function getTimeLeft(endsAt) {
  const now = new Date();
  const endTime = new Date(endsAt);
  const timeDiff = endTime - now;

  if (timeDiff <= 0) {
    return 'Ended';
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else {
    return `${hours}h`;
  }
}

function isTimeUrgent(endsAt) {
  const now = new Date();
  const endTime = new Date(endsAt);
  const timeDiff = endTime - now;
  const hoursLeft = timeDiff / (1000 * 60 * 60);

  // Urgent if less than 24 hours left
  return hoursLeft > 0 && hoursLeft <= 24;
}
