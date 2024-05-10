import apiClient from './client';

// Performs login operation using the provided credentials.
export const login = async (data) => {
  return await apiClient.post('/auth/login', data);
};

// Registers a new user with the given data.
export const register = async (data) => {
  try {
    return await apiClient.post('/auth/register', data);
  } catch (e) {
    return { error: true, e };
  }
};
