import axios from 'axios';
import { dispatchTokenExpired, isTokenExpiredError } from '../utils/authUtils';

const API_BASE_URL = 'http://localhost:8082/api/v1';

// Create axios instance with base configuration
const customerApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to include auth token
customerApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
customerApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken },
            { withCredentials: true }
          );

          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return customerApi(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Refresh failed, dispatch token expired event
        dispatchTokenExpired();
        return Promise.reject(refreshError);
      }
    }

    // For other errors, just pass them through without token expiration handling
    return Promise.reject(error);
  }
);

export const customerService = {
  // Create a new customer
  createCustomer: async (customerData) => {
    try {
      const response = await customerApi.post('/customer/save-customer', customerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get customer by ID
  getCustomerById: async (customerId) => {
    try {
      const response = await customerApi.get(`/customer/get-customer-by-id?id=${customerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update customer
  updateCustomer: async (customerId, customerData) => {
    try {
      const response = await customerApi.put(`/customer/update-customer?id=${customerId}`, customerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};