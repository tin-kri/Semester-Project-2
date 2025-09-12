import { API_CONFIG } from '../utils/constants';
import { getAuthHeaders } from '../utils/authUtils';

export async function placeBid(listingId, bidAmount) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}/${listingId}/bids`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ amount: bidAmount }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || 'Failed to place bid');
        }

        const data = await response.json();
        console.log('Bid placed successfully:', data);
        return data;

    } catch (error) {
        console.error('Error placing bid:', error);
        throw error;
    }
}

