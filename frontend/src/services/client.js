import axios from 'axios';
import { getToken } from '../tokenManagement/tokenManager';

// Creates an Axios instance configured with base settings.
const apiClient = axios.create({
  baseURL: 'http://localhost:5002', // Base URL for all requests.
  // timeout: 1000, // Request timeout set to 1000 milliseconds.
});

// Adds a request interceptor to include a bearer token in each request's headers.
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    const token = getToken();
    if (token) {
      try {
        config.headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.log(err);
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default apiClient;
