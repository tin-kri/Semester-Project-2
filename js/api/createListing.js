import { API_CONFIG } from '../utils/constants';
import { makeAuthenticatedRequest } from '../utils/authUtils';

export async function createListing(listingData) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}`;

    try {
        const data = await makeAuthenticatedRequest(url, {
            method: 'POST',
            body: JSON.stringify(listingData),
        });

        console.log('Listing created:', data);
        return data;

    } catch (error) {
        console.error('Error creating listing:', error);
        throw error;
    }
}