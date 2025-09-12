/**
 * Stores a key-value pair in local storage.
 *
 * @param {string} key - The key under which the value will be stored.
 * @param {string} value - The value to store in local storage.
 * @returns {boolean} - Returns `true` if the operation was successful, otherwise `false`.
 */
export function addToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error(`Failed to store ${key}:`, error);
        return false;
    }
}


/**
 * Retrieves a value from local storage.
 *
 * @param {string} key - The key of the item to retrieve.
 * @returns {string|null} - Returns the stored value if found, otherwise `null`.
 */
export function getFromLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value;
    } catch (error) {
        console.error(`Failed to retrieve ${key}:`, error);
        return null;
    }
}

export function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Failed to remove ${key}:`, error);
        return false;
    }
}

export function clearLocalStorage() {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Failed to clear localStorage:', error);
        return false;
    }
}