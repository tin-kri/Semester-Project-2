import { showError } from './messages.js';
import { isAuctionEnded } from './timeUtils.js';

// Common validation patterns
export const PATTERNS = {
  url: /^https?:\/\/.+/,
  title: /^.{3,100}$/,
};

// Common validation functions
export function validateTitle(field) {
  const value = field.value.trim();

  if (!value) {
    showFieldError('title', 'Title is required');
    return false;
  } else if (value.length < 3) {
    showFieldError('title', 'Title must be at least 3 characters');
    return false;
  } else if (value.length > 100) {
    showFieldError('title', 'Title cannot exceed 100 characters');
    return false;
  } else {
    clearFieldError('title');
    return true;
  }
}

export function validateImageUrl(field) {
  const value = field.value.trim();

  // Optional field - empty is valid
  if (!value) {
    clearFieldError('imageUrl');
    return true;
  } else if (!PATTERNS.url.test(value)) {
    showFieldError('imageUrl', 'Please enter a valid URL');
    return false;
  } else {
    clearFieldError('imageUrl');
    return true;
  }
}

export function validateAuctionDate(field) {
  const value = field.value;

  if (!value) {
    showFieldError('auctionDate', 'Auction end date is required');
    return false;
  } else {
    clearFieldError('auctionDate');
    return true;
  }
}

export function validateAuctionTime(field) {
  const value = field.value;

  if (!value) {
    showFieldError('auctionTime', 'Auction end time is required');
    return false;
  } else {
    clearFieldError('auctionTime');
    return true;
  }
}

export function validateAuctionDateTime(dateValue, timeValue) {
  if (!dateValue || !timeValue) {
    return false;
  }

  const endsAt = `${dateValue}T${timeValue}:00.000Z`;
  if (isAuctionEnded(endsAt)) {
    showFieldError('auctionDate', 'Auction must end in the future');
    return false;
  } else {
    clearFieldError('auctionDate');
    return true;
  }
}

// Common helper functions
export function showFieldError(fieldName, message) {
  showError(message, { elementId: `${fieldName}-error`, duration: 0 });
}

export function clearFieldError(fieldName) {
  const errorElement = document.getElementById(`${fieldName}-error`);
  if (errorElement) {
    errorElement.classList.add('hidden');
    errorElement.textContent = '';
  }
}

// Common form submission handling
export function setupFormSubmission(
  button,
  loadingText = 'Creating Listing...',
) {
  const originalText = button.textContent;
  button.textContent = loadingText;
  button.disabled = true;

  return () => {
    button.textContent = originalText;
    button.disabled = false;
  };
}

// Common field listeners setup
export function setupFieldValidation(fieldSelector, validator) {
  const field = document.querySelector(fieldSelector);
  if (field) {
    field.addEventListener('blur', () => validator(field));
    field.addEventListener('input', () => clearFieldError(field.name));
  }
}
