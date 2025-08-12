// js/utils/authUtils.js

import { getFromLocalStorage, removeFromLocalStorage } from './storage.js';
import { API_CONFIG } from './constants.js';

export function isLoggedIn() {
    const token = getFromLocalStorage('accessToken');
    return !!token; // Convert to boolean
}

export function getAccessToken() {
    return getFromLocalStorage('accessToken');
}

export function getCurrentUser() {
    const userJson = getFromLocalStorage('user');
    if (!userJson) return null;
    
    try {
        return JSON.parse(userJson);
    } catch (error) {
        console.error('Failed to parse user data:', error);
        return null;
    }
}

// ✅ NEW: Get headers with Bearer token for authenticated API calls
export function getAuthHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    const token = getAccessToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['X-Noroff-API-Key'] = API_CONFIG.API_KEY;
    }
    
    return headers;
}

// ✅ NEW: Make authenticated API calls easily
export async function makeAuthenticatedRequest(url, options = {}) {
    const authHeaders = getAuthHeaders();
    
    const fetchOptions = {
        headers: authHeaders,
        ...options
    };
    
    // If there's a body, make sure it's JSON
    if (options.body && typeof options.body === 'object') {
        fetchOptions.body = JSON.stringify(options.body);
    }
    
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.errors?.[0]?.message || 'Request failed');
    }
    
    return response.json();
}

export function logout() {
    // Remove all auth data
    removeFromLocalStorage('accessToken');
    removeFromLocalStorage('user');
    
    console.log("✅ User logged out");
    
    // Redirect to login page
    window.location.href = '/auth/login/';
}

export function requireAuth() {
    if (!isLoggedIn()) {
        console.log('❌ Authentication required, redirecting to login...');
        window.location.href = '/auth/login/';
        return false;
    }
    return true;
}