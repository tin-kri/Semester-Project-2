
import { createListing } from '../api/createListing.js';
import { showSuccess, showError } from '../utils/messages.js';
import {
  validateTitle,
  validateImageUrl,
  validateAuctionDate,
  validateAuctionTime,
  validateAuctionDateTime,
  setupFieldValidation,
  setupFormSubmission,
} from '../utils/createListingFormValidator.js';

export function initCreateNewListing() {
  const createNewListingForm = document.querySelector('#create-listing-form');

  if (!createNewListingForm) {
    console.error('createNewListingForm not found!');
    return;
  }

  setupFieldValidation('#title', validateTitle);
  setupFieldValidation('#imageUrl', validateImageUrl);
  setupFieldValidation('#auctionDate', validateAuctionDate);
  setupFieldValidation('#auctionTime', validateAuctionTime);

  createNewListingForm.addEventListener('submit', handleFormSubmit);
  console.log('Create new listing page initialized successfully');
}

function validateForm() {
  const titleField = document.querySelector('#title');
  const imageUrlField = document.querySelector('#imageUrl');
  const dateField = document.querySelector('#auctionDate');
  const timeField = document.querySelector('#auctionTime');

  const isTitleValid = validateTitle(titleField);
  const isImageUrlValid = validateImageUrl(imageUrlField);
  const isDateValid = validateAuctionDate(dateField);
  const isTimeValid = validateAuctionTime(timeField);
  const isDateTimeValid = validateAuctionDateTime(dateField.value, timeField.value);

  return isTitleValid && isImageUrlValid && isDateValid && isTimeValid && isDateTimeValid;
}

async function handleFormSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const submitButton = event.target.querySelector('button[type="submit"]');
  const resetButton = setupFormSubmission(submitButton, 'Creating Listing...');

  try {
    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData);
    const listingData = buildListingData(formFields);

    await createListing(listingData);

    showSuccess('Listing created successfully! Redirecting...', {
      elementId: 'form-success',
      duration: 2000,
    });

    setTimeout(() => {
      window.location.href = '/profile/index.html';
    }, 1500);
  } catch (error) {
    console.error('Failed to create listing:', error.message);

    showError('Failed to create listing. Please try again.', {
      elementId: 'form-error',
      duration: 4000,
    });
  } finally {
    resetButton();
  }
}

function combineDateTime(date, time) {
  const isoString = `${date}T${time}:00.000Z`;
  return isoString;
}

function buildListingData(formFields) {
  const endsAt = combineDateTime(
    formFields.auctionDate,
    formFields.auctionTime,
  );

  const listingData = {
    title: formFields.title.trim(),
    endsAt: endsAt,
  };

  if (formFields.description && formFields.description.trim()) {
    listingData.description = formFields.description.trim();
  }

  if (formFields.imageUrl && formFields.imageUrl.trim()) {
    listingData.media = [
      {
        url: formFields.imageUrl.trim(),
        alt: formFields.title.trim(),
      },
    ];
  }

  listingData.tags = processTags(formFields.tagInput);

  return listingData;
}


function processTags(tagInput) {
  if (!tagInput || !tagInput.trim()) {
    return []; 
  }


  return tagInput
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .slice(0, 5); 
}

