export function initializeApp() {
    const currentPath = window.location.pathname;
    console.log('Current path:', currentPath);
    
    switch (true) {
        case currentPath.includes('/auth/register'):
            initializeRegisterPage();
            break;
        case currentPath.includes('/auth/login'):
            initializeLoginPage();
            break;
        case currentPath === '/' || currentPath.includes('index'):
            initializeLandingPage();
            break;
        default:
            console.log('Unknown route:', currentPath);
    }
}
async function initializeRegisterPage() {
    console.log('Loading register page...');
    const { initRegister } = await import('../pages/register.js');
    initRegister();
}

async function initializeLoginPage() {
    console.log('Loading login page...');
    const { initLogin } = await import('../pages/login.js');
    initLogin();
}

async function initializeLandingPage() {
    console.log('Loading landing page...');
    const { initLandingPage } = await import('../pages/landingPage.js');
    initLandingPage();
}