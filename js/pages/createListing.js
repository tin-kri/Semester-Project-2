import { createListing } from '../api/createListing.js';
import { showSuccess, showError} from '../utils/messages.js';

export async function initCreateNewListing() {
  const createNewListingForm = document.querySelector('#create-listing-form');

  if (!createNewListingForm) {
    console.error('createNewListingForm not found!');
    return;
  }
  createNewListingForm.addEventListener('submit', handleFormSubmit);

  console.log('Create new listing page initialized successfully');
}

async function handleFormSubmit(event) {
  event.preventDefault();
  console.log('form submitted');

  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);
  const listingData = buildListingData(formFields);
  console.log('API data structure:', listingData);

  try {
    const result = await createListing(listingData);
    console.log('Listing created successfully:', result);
    showSuccess('Listing created successfully!', { duration: 3000 });
    setTimeout(() => {
      window.location.href = '/profile/';
    }, 5000);
  } catch (error) {
    console.error('Failed to create listing:', error);
    showError('Failed to create listing. Please try again.');
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
    description: formFields.description.trim(),
    media: [
      {
        url: formFields.imageUrl.trim(),
        alt: '',
      },
    ],
    tags: [],
    endsAt: endsAt,
  };
  return listingData;
}
