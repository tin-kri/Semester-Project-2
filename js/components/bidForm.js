import { isLoggedIn, getCurrentUser } from '../utils/authUtils.js';

export function initBidForm(
  bidButton,
  bidInput,
  listing,
  onBidSuccess,
  onBidError,
) {
  if (!bidButton || !bidInput) {
    console.error('Bid form elements not found');
    return;
  }

  setupBidding();

  function setupBidding() {
    if (!isLoggedIn()) {
      setLoginState();
      return;
    }
    if (isAuctionEnded()) {
      setEndedState();
      return;
    }
    if (isUserSeller()) {
      setSellerState();
      return;
    }

    setActiveState();
  }

  function setLoginState() {
    bidButton.textContent = 'Log In to Bid';
    bidButton.onclick = () => (window.location.href = '/auth/login/');
    bidButton.disabled = false;
    bidButton.className = 'btn btn-secondary w-full py-4 text-lg font-semibold';
    bidInput.disabled = true;
    bidInput.placeholder = 'Please log in to bid';
  }

  function setEndedState() {
    bidButton.textContent = 'Auction Ended';
    bidButton.disabled = true;
    bidButton.className =
      'btn w-full py-4 text-lg font-semibold bg-gray-400 text-white cursor-not-allowed';
    bidInput.disabled = true;
    bidInput.placeholder = 'Auction has ended';
  }

  function setSellerState() {
    bidButton.textContent = 'Your Listing';
    bidButton.disabled = true;
    bidButton.className =
      'btn w-full py-4 text-lg font-semibold bg-gray-400 text-white cursor-not-allowed';
    bidInput.disabled = true;
    bidInput.placeholder = 'You cannot bid on your own item';
  }

  function setActiveState() {
    const currentBid = getCurrentBid(listing.bids);
    const minBid = currentBid + 1;

    bidInput.min = minBid;
    bidInput.placeholder = `Minimum bid: ${minBid} credits`;
    bidInput.disabled = false;

    bidButton.textContent = 'Place Bid';
    bidButton.disabled = false;
    bidButton.className = 'btn btn-primary w-full py-4 text-lg font-semibold';

    bidButton.onclick = handleBidSubmission;
    bidInput.onkeypress = (e) => {
      if (e.key === 'Enter') {handleBidSubmission();}
    };
  }

  async function handleBidSubmission() {
    const bidAmount = parseInt(bidInput.value);
    const minBid = parseInt(bidInput.min);

    if (!bidAmount || bidAmount < minBid) {
      onBidError(`Please enter a bid of at least ${minBid} credits`);
      return;
    }

    setBiddingState();

    try {
      await onBidSuccess(listing.id, bidAmount);
      bidInput.value = '';
    } catch (error) {
      console.error('Bid submission failed:', error);
      onBidError(error.message || 'Failed to place bid');
    } finally {
      setActiveState();
    }
  }

  function setBiddingState() {
    bidButton.disabled = true;
    bidButton.textContent = 'Placing Bid...';
    bidButton.className =
      'btn btn-primary w-full py-4 text-lg font-semibold opacity-50 cursor-not-allowed';
    bidInput.disabled = true;
  }

  // Utility functions
  function isAuctionEnded() {
    const now = new Date();
    const endTime = new Date(listing.endsAt);
    return endTime <= now;
  }

  function isUserSeller() {
    const currentUser = getCurrentUser();
    return (
      currentUser && listing.seller && currentUser.name === listing.seller.name
    );
  }

  function getCurrentBid(bids) {
    if (!bids || bids.length === 0) {return 0;}
    return Math.max(...bids.map((bid) => bid.amount));
  }
}
