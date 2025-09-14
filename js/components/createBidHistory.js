export function createBidHistory(bids) {
  if (!bids || bids.length === 0) {
    return `
        <div class="text-center py-8 text-dropp-gray-500">
          <p>No bids yet - Be the first to bid!</p>
        </div>
      `;
  }
  const sortedBids = [...bids].sort((a, b) => b.amount - a.amount);

  return sortedBids
    .slice(0, 5)
    .map(
      (bid, index) => `
          <div class="flex justify-between items-center p-4 bg-dropp-gray-50 rounded-lg">
            <div>
              <p class="font-semibold text-dropp-dark">${
                bid.bidder?.name || 'Anonymous'
              }</p>
              <p class="text-sm text-dropp-gray-600">${new Date(
                bid.created,
              ).toLocaleDateString()}</p>
            </div>
            <p class="text-lg font-bold font-archivo ${
              index === 0 ? 'text-dropp-primary' : 'text-dropp-gray-700'
            }">
              ${bid.amount} credits
            </p>
          </div>
        `,
    )
    .join('');
}
