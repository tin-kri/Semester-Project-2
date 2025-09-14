import { requireAuth } from '../utils/authUtils.js';

export function initializeApp() {
  const currentPath = window.location.pathname;

  switch (true) {
    case currentPath === '/' || currentPath === '/index.html':
      initializeLandingPage();
      break;
    case currentPath.includes('/auth/register'):
      initializeRegisterPage();
      break;
    case currentPath.includes('/auth/login'):
      initializeLoginPage();
      break;
    case currentPath.includes('/profile'):
      initializeProfilePage();
      break;
    case currentPath.includes('/create-listing'):
      initializeCreateListingPage();
      break;
    case currentPath.includes('/listing-details'):
      initializeListingsDetailsPage();
      break;

    case currentPath.includes('/browse-listings'):
      initializeBrowseListingsPage();
      break;
    default:
  }
}
async function initializeLandingPage() {
  const { initLandingPage } = await import('../pages/landingPage.js');
  initLandingPage();
}

async function initializeBrowseListingsPage() {
  const { initBrowseListingsPage } = await import('../pages/listings.js');
  initBrowseListingsPage();
}
async function initializeRegisterPage() {
  const { initRegister } = await import('../pages/register.js');
  initRegister();
}

async function initializeLoginPage() {
  const { initLogin } = await import('../pages/login.js');
  initLogin();
}

async function initializeProfilePage() {
  if (!requireAuth()) {
    return;
  }
  const { initProfile } = await import('../pages/profile.js');
  initProfile();
}

async function initializeCreateListingPage() {
  if (!requireAuth()) {
    return;
  }
  const { initCreateNewListing } = await import('../pages/createListing.js');
  initCreateNewListing();
}

async function initializeListingsDetailsPage() {
  const { initListingsDetailsPage } = await import(
    '../pages/listingDetails.js'
  );
  initListingsDetailsPage();
}
