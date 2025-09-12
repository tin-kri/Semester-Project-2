import { API_CONFIG } from '../utils/constants.js';
import { addToLocalStorage } from '../utils/storage.js';

export async function registerUser(userDetails) {
    try {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`;
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || 'Registration failed');
        }

        const data = await response.json();
        console.log('Registration successful');
        return data;

    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

export async function loginUser(userDetails) {
    try {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`;
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || 'Login failed');
        }

        const { data } = await response.json();
        console.log('Login successful');

        saveLoginData(data);

        return data;

    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

function saveLoginData(userData) {
    const accessToken = userData.accessToken;
    const tokenSaved = addToLocalStorage('accessToken', accessToken);

    const userInfo = {
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        banner: userData.banner,
    };
    const userSaved = addToLocalStorage('user', JSON.stringify(userInfo));

    if (!tokenSaved || !userSaved) {
        console.warn('Failed to save login data');
    }
}

