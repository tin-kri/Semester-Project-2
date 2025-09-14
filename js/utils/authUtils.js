import { API_CONFIG } from './constants.js';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  addToLocalStorage,
} from './storage.js';

export function isLoggedIn() {
  const token = getFromLocalStorage('accessToken');
  return !!token;
}

export function getAccessToken() {
  return getFromLocalStorage('accessToken');
}

export function getCurrentUser() {
  const userJson = getFromLocalStorage('user');
  if (!userJson) {
    return null;
  }

  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
}

export function updateCurrentUser(updatedFields) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    console.warn('No user found to update');
    return false;
  }

  const updatedUser = { ...currentUser, ...updatedFields };
  const success = addToLocalStorage('user', JSON.stringify(updatedUser));

  if (success) {
  }

  return success;
}

export function getAuthHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getAccessToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['X-Noroff-API-Key'] = API_CONFIG.API_KEY;
  }

  return headers;
}

export async function makeAuthenticatedRequest(url, options = {}) {
  const token = getAccessToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-Key': API_CONFIG.API_KEY,
    ...options.headers,
  };

  const fetchOptions = {
    ...options,
    headers,
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
  removeFromLocalStorage('accessToken');
  removeFromLocalStorage('user');

  window.location.href = '/auth/login/';
}

export function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = '/auth/login/';
    return false;
  }
  return true;
}
