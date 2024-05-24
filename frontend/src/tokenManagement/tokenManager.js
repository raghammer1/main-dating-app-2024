import { logout } from '../shared/utils/auth';

// Set the token with an expiry time s
export const setTokenWithExpiry = (token, expiryTimeInMinutes) => {
  const now = new Date();
  const item = {
    value: token,
    expiry: now.getTime() + expiryTimeInMinutes * 60000, // Convert minutes to milliseconds
  };
  localStorage.setItem('token', JSON.stringify(item));
};

// Get the token and check if it has expired
export const getToken = () => {
  const itemStr = localStorage.getItem('token');
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // Compare the expiry time with the current time
  if (now.getTime() > item.expiry) {
    // Token has expired, remove it from localStorage
    localStorage.removeItem('token');
    logout();
    return null;
  }
  return item.value;
};
