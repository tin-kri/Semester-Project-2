import { API_CONFIG } from "../utils/constants.js";
import { addToLocalStorage } from "../utils/storage.js";

export async function registerUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`;
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message || "Registration failed");
    }

    const data = await response.json();
    console.log("Registration successful:", data);
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function loginUser(userDetails) {
    try {
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json",
            },
        };
        
        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`;
        const response = await fetch(url, fetchOptions);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || "Login failed");
        }
        
    
        const { data } = await response.json();
        console.log("Login successful:", data);
        
        const accessToken = data.accessToken;
        console.log("Access token:", accessToken);
        
        
        const stored = addToLocalStorage('accessToken', accessToken);
        if (stored) {
            console.log("Access token stored successfully");
        } else {
            console.warn("Failed to store access token");
        }
        
        return data;
        
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

