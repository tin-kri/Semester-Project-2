import { API_CONFIG } from '../utils/constants.js';
import { getAuthHeaders, isLoggedIn } from '../utils/authUtils.js';

export async function fetchEndingSoonListings() {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?limit=6&sort=endsAt&sortOrder=asc&_active=true&_seller=true&_bids=true`;
    
    try {
   
        const headers = isLoggedIn() ? getAuthHeaders() : { 'Content-Type': 'application/json' };
        
        const response = await fetch(url, { headers });
        
        if (!response.ok) {
            throw new Error('Failed to fetch ending soon listings');
        }
        
        const data = await response.json();
        console.log('Ending soon listings:', data);
        return data;
        
    } catch (error) {
        console.error('Error fetching ending soon listings:', error);
        throw error;
    }
}

export async function fetchNewestListings() {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?limit=6&sort=created&sortOrder=desc&_seller=true&_bids=true`;
    
    try {
    
        const headers = isLoggedIn() ? getAuthHeaders() : { 'Content-Type': 'application/json' };
        
        const response = await fetch(url, { headers });
        
        if (!response.ok) {
            throw new Error('Failed to fetch newest listings');
        }
        
        const data = await response.json();
        console.log('Newest listings:', data);
        return data;
        
    } catch (error) {
        console.error('Error fetching newest listings:', error);
        throw error;
    }
}

// Example of authenticated-only endpoint (placing bids) MOVED TOO API/BIDS
// export async function placeBid(listingId, bidAmount) {
//     const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}/${listingId}/bids`;
    
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: getAuthHeaders(), // ✅ Bearer token required
//             body: JSON.stringify({ amount: bidAmount })
//         });
        
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.errors?.[0]?.message || 'Failed to place bid');
//         }
        
//         const data = await response.json();
//         console.log('Bid placed successfully:', data);
//         return data;
        
//     } catch (error) {
//         console.error('Error placing bid:', error);
//         throw error;
//     }
// }
// import { API_CONFIG } from '../utils/constants.js';

// export async function fetchEndingSoonListings() {
//     const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?limit=6&sort=endsAt&sortOrder=asc&_active=true&_seller=true&_bids=true`;
    
//     try {
//         const response = await fetch(url);
        
//         if (!response.ok) {
//             throw new Error('Failed to fetch ending soon listings');
//         }
        
//         const data = await response.json();
//         console.log('Ending soon listings:', data);
//         return data;
        
//     } catch (error) {
//         console.error('Error fetching ending soon listings:', error);
//         throw error;
//     }
// }

// export async function fetchNewestListings() {
//     const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?limit=6&sort=created&sortOrder=desc&_seller=true&_bids=true`;
    
//     try {
//         const response = await fetch(url);
        
//         if (!response.ok) {
//             throw new Error('Failed to fetch newest listings');
//         }
        
//         const data = await response.json();
//         console.log('Newest listings:', data);
//         return data;
        
//     } catch (error) {
//         console.error('Error fetching newest listings:', error);
//         throw error;
//     }
// }