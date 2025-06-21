import { API_AUTH_REGISTER } from "../utils/constants";

export async function registerUser(userDetails) {
    try {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(API_AUTH_REGISTER, fetchOptions)
        const json = await response.json()

        if (response.ok) {
            return json.data
        } else {
            throw new Error(json.message || 'Failed to register')
        }
    } catch (error) {
        console.log('Registration error:', error)
        throw error 
    }
}