import { API_CONFIG } from '../utils/constants.js';
import { addToLocalStorage } from '../utils/storage.js';

async function postRequest(endpoint, body, fallbackErrorMessage) {
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const response = await fetch(url, fetchOptions);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || fallbackErrorMessage);
  }

  return json;
}

export async function registerUser(userDetails) {
  try {
    const data = await postRequest(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      userDetails,
      'Registration failed'
    );

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function loginUser(userDetails) {
  try {
    const { data } = await postRequest(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      userDetails,
      'Login failed'
    );

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