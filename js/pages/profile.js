import { getMyProfile } from "../api/profiles.js";

export async function initProfile() {
    console.log('Profile page initialized successfully');
    
    try {
        const profileData = await getMyProfile();
        console.log('Profile data:', profileData);
        // Need to do it: Update the HTML and JS for real data
    } catch (error) {
        console.error('Failed to load profile:', error);
    }
}