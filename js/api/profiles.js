import { API_CONFIG } from '../utils/constants.js';
import { makeAuthenticatedRequest, getCurrentUser } from '../utils/authUtils.js';

export async function getMyProfile() {
    const user = getCurrentUser();
    if (!user) {
        throw new Error('User not logged in');
    }
    
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.PROFILES}/${user.name}`;
    
    try {
        const data = await makeAuthenticatedRequest(url);
        console.log('My profile:', data);
        return data;
        
    } catch (error) {
        console.error('Error fetching my profile:', error);
        throw error;
    }
}

export async function getMyListings() {
    const user = getCurrentUser();
    if (!user) {
        throw new Error('User not logged in');
    }
    
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.PROFILES}/${user.name}/listings`;
    
    try {
        const data = await makeAuthenticatedRequest(url);
        console.log('My listings:', data);
        return data;
        
    } catch (error) {
        console.error('Error fetching my listings:', error);
        throw error;
    }
}

export async function getMyBids() {
    const user = getCurrentUser();
    if (!user) {
        throw new Error('User not logged in');
    }
    
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.PROFILES}/${user.name}/bids`;
    
    try {
        const data = await makeAuthenticatedRequest(url);
        console.log('My bids:', data);
        return data;
        
    } catch (error) {
        console.error('Error fetching my bids:', error);
        throw error;
    }
}