export function initializeApp() {
  const currentPath = window.location.pathname;
  console.log("Current path:", currentPath);

  switch (true) {
    case currentPath === "/" || currentPath === "/index.html":
      initializeLandingPage();
      break;
    case currentPath.includes("/auth/register"):
      initializeRegisterPage();
      break;
    case currentPath.includes("/auth/login"):
      initializeLoginPage();
      break;
    case currentPath.includes("/profile"):
      initializeProfilePage();
      break;
    case currentPath.includes("/create-listing"):
      initializeCreateListingPage();
      break;
    case currentPath.includes("/listing-details"):
      initializeListingsDetailsPage();
      break;
    case currentPath.includes("/browse-listings"):
      initializeBrowseListingsPage();
      break;
    default:
      console.log("Unknown route:", currentPath);
  }
}
async function initializeLandingPage() {
  console.log("Loading landing page...");
  const { initLandingPage } = await import("../pages/landingPage.js");
  initLandingPage();
}

async function initializeBrowseListingsPage() {
  console.log("Loading Browse Listings page...")
  const {initBrowse} = await import("../pages/listings.js")
  initBrowse();
  
}
async function initializeRegisterPage() {
  console.log("Loading register page...");
  const { initRegister } = await import("../pages/register.js");
  initRegister();
}

async function initializeLoginPage() {
  console.log("Loading login page...");
  const { initLogin } = await import("../pages/login.js");
  initLogin();
}

async function initializeProfilePage() {
  console.log("Loading profile page...");
  const { initProfile } = await import("../pages/profile.js");
  initProfile();
}

async function initializeCreateListingPage() {
  console.log("Loading Create New Listing page...");
  const { initCreateNewListing } = await import("../pages/createListing.js");
  initCreateNewListing();
}

async function initializeListingsDetailsPage() {
  console.log("loading listing details page...");
  const { initListingsDetailsPage } = await import(
    "../pages/listingDetails.js"
  );
  initListingsDetailsPage();
}
