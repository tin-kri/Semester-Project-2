import { isLoggedIn, getCurrentUser, logout } from '../utils/authUtils.js';

export function initializeHeader() {
    initializeMobileMenu();
    showAuthSection();

}

function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('button[data-mobile-menu]');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        console.log('Mobile menu initialized');
    }
}

function showAuthSection() {
    const containers = {
        desktop: document.querySelector('#desktop-auth'),
        mobile: document.querySelector('#mobile-auth'),
    };

    if (!containers.desktop || !containers.mobile) {
        console.warn('Auth containers not found in header');
        return;
    }

    if (isLoggedIn()) {
        const user = getCurrentUser();

        if (!user) {
            console.warn('User token exists but user data is missing - clearing auth');
            logout();
            return;
        }

        console.log('User logged in, showing user info:', user.name);
        showLoggedInUser(containers, user);

    } else {
        console.log('User not logged in, showing login links');
        showGuestLinks(containers);
    }
}

function showLoggedInUser(containers, user) {
    containers.desktop.innerHTML = createUserSection(user, 'desktop');
    containers.mobile.innerHTML = createUserSection(user, 'mobile');
    addLogoutListener();
}

function showGuestLinks(containers) {
    containers.desktop.innerHTML = createGuestSection('desktop');
    containers.mobile.innerHTML = createGuestSection('mobile');
}

function createUserSection(user, type) {
    const avatar = createAvatar(user);
    const userName = `<a href="/profile/" class="text-sm font-medium text-dropp-dark">${user.name}</a>`;
    const logoutBtn = createLogoutButton(type);

    if (type === 'desktop') {
        return `<div class="flex items-center space-x-3">${avatar}${userName}${logoutBtn}</div>`;
    } else {
        return `
            <div class="border-t border-dropp-gray-200 pt-3 mt-3">
                <div class="flex items-center px-3 py-2">${avatar}${userName}</div>
                ${logoutBtn}
            </div>
        `;
    }
}

function createGuestSection(type) {
    const loginLink = createLink('/auth/login/', 'Sign In', type);
    const signupLink = createLink('/auth/register/', 'Sign Up', type, true);

    if (type === 'desktop') {
        return `<div class="flex items-center space-x-4">${loginLink}${signupLink}</div>`;
    } else {
        return `
            <div class="border-t border-dropp-gray-200 pt-3 mt-3 space-y-1">
                ${loginLink}${signupLink}
            </div>
        `;
    }
}

function createAvatar(user) {
    const avatarUrl = user.avatar?.url || '/placeholder.svg?height=32&width=32';
    const classes = 'w-8 h-8 rounded-full mr-3';

    return `
        <a href="/profile/" class="inline-block"> <img 
            src="${avatarUrl}" 
            alt="${user.name}"
            class="${classes}"
            onerror="this.src='/placeholder.svg?height=32&width=32'"
        />
        </a>
    `;
}


function createLogoutButton(type) {
    const baseClasses = 'text-sm text-dropp-gray-600 hover:text-dropp-primary transition-colors';

    if (type === 'desktop') {
        return `<button class="${baseClasses}" data-logout>Logout</button>`;
    } else {
        return `<button class="block w-full text-left px-3 py-2 ${baseClasses}" data-logout>Logout</button>`;
    }
}

function createLink(href, text, type, isPrimary = false) {
    const baseClasses = 'text-sm font-medium transition-colors';

    if (type === 'desktop') {
        const classes = isPrimary
            ? `bg-dropp-primary text-white px-4 py-2 rounded-md ${baseClasses} hover:bg-dropp-primary/90`
            : `text-dropp-gray-600 hover:text-dropp-primary ${baseClasses}`;
        return `<a href="${href}" class="${classes}">${text}</a>`;
    } else {
        const classes = `block px-3 py-2 text-dropp-gray-600 hover:text-dropp-primary ${baseClasses}`;
        return `<a href="${href}" class="${classes}">${text}</a>`;
    }
}

function addLogoutListener() {
    // Use event delegation - single listener for all logout buttons
    document.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-logout')) {
            e.preventDefault();
            handleLogout();
        }
    }, { once: true }); // Remove after first use
}

function handleLogout() {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
        console.log('User logging out...');
        logout();
    }
}

window.initializeHeader = initializeHeader;
