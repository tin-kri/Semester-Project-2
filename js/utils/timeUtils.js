export function calculateTimeLeft(endsAt) {
  const now = new Date();
  const endTime = new Date(endsAt);
  const diff = endTime - now;

  if (diff <= 0) {
    return { isEnded: true, days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { isEnded: false, days, hours, minutes };
}

export function formatTimeRemaining(endsAt) {
  const timeLeft = calculateTimeLeft(endsAt);

  if (timeLeft.isEnded) {
    return 'Auction Ended';
  }

  if (timeLeft.days > 0) {
    return `${timeLeft.days} Day${timeLeft.days !== 1 ? 's' : ''} ${
      timeLeft.hours
    } Hour${timeLeft.hours !== 1 ? 's' : ''}`;
  } else if (timeLeft.hours > 0) {
    return `${timeLeft.hours} Hour${timeLeft.hours !== 1 ? 's' : ''}`;
  } else {
    return `${timeLeft.minutes} Minute${timeLeft.minutes !== 1 ? 's' : ''}`;
  }
}

export function isAuctionEnded(endsAt) {
  return new Date(endsAt) <= new Date();
}

export function getAuctionStatus(endsAt) {
  const timeLeft = calculateTimeLeft(endsAt);

  return {
    isEnded: timeLeft.isEnded,
    timeRemaining: formatTimeRemaining(endsAt),
    cssClass: timeLeft.isEnded ? 'text-red-600' : 'text-green-600',
  };
}
