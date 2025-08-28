import { API_CONFIG } from "./constants.js"

function getFromLocalStorage(key) {
  return localStorage.getItem(key)
}

function removeFromLocalStorage(key) {
  localStorage.removeItem(key)
}

export function isLoggedIn() {
  const token = getFromLocalStorage("accessToken")
  return !!token
}

export function getAccessToken() {
  return getFromLocalStorage("accessToken")
}

export function getCurrentUser() {
  const userJson = getFromLocalStorage("user")
  if (!userJson) return null

  try {
    return JSON.parse(userJson)
  } catch (error) {
    console.error("Failed to parse user data:", error)
    return null
  }
}

export async function makeAuthenticatedRequest(url, options = {}) {
  const token = getAccessToken()
  if (!token) {
    throw new Error("No authentication token found")
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_CONFIG.API_KEY,
    ...options.headers,
  }

  const fetchOptions = {
    ...options,
    headers,
  }

  // If there's a body, make sure it's JSON
  if (options.body && typeof options.body === "object") {
    fetchOptions.body = JSON.stringify(options.body)
  }

  const response = await fetch(url, fetchOptions)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.errors?.[0]?.message || "Request failed")
  }

  return response.json()
}

export function logout() {
  removeFromLocalStorage("accessToken")
  removeFromLocalStorage("user")
  console.log("✅ User logged out")
  window.location.href = "/auth/login/"
}

export function requireAuth() {
  if (!isLoggedIn()) {
    console.log("❌ Authentication required, redirecting to login...")
    window.location.href = "/auth/login/"
    return false
  }
  return true
}
