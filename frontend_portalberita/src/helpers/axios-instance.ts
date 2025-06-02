import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_PATH;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to handle potential CORS issues
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure cookies are sent with every request
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle authentication errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      console.log('Authentication error:', error.response.data);
      // You could redirect to login page or handle token refresh here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
