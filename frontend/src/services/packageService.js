import axios from 'axios';
import { dispatchTokenExpired, isTokenExpiredError } from '../utils/authUtils';

const API_BASE_URL = 'http://localhost:8082/api/v1';

// Create axios instance with base configuration
const packageApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to include auth token
packageApi.interceptors.request.use(
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
packageApi.interceptors.response.use(
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
          return packageApi(originalRequest);
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

export const packageService = {
  // Create a new package
  createPackage: async (packageData) => {
    try {
      const response = await packageApi.post('/package_data/save-package-data', packageData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Get a package by ID
  getPackageById: async (packageId) => {
    try {
      console.log(`Fetching package with ID: ${packageId}`);
      const response = await packageApi.get(`/package_data/get-package-by-id?id=${packageId}`);
      return response;
    } catch (error) {
      console.error(`Error fetching package with ID ${packageId}:`, error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw error.response?.data || error.message;
    }
  },

  // Get all packages
  getAllPackages: async () => {
    try {
      const response = await packageApi.get('/package_data/get-all-packages');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get packages by category
  getPackagesByCategory: async (category) => {
    try {
      const response = await packageApi.get(`/package_data/get-package-by-category?category=${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Get packages by event category (only returns active packages)
  getPackagesByEventCategory: async (eventCategory) => {
    try {
      console.log(`Sending API request to get active packages for event category: ${eventCategory}`);
      const response = await packageApi.get(`/package_data/get-packages-by-event-category?category=${eventCategory}`);
      console.log('API response:', response);
      
      // Check the structure of the response
      if (response && response.data) {
        if (response.data.data && Array.isArray(response.data.data)) {
          // Standard response format with nested data array
          console.log(`Found ${response.data.data.length} active packages in response.data.data`);
          return response.data.data;
        } else if (Array.isArray(response.data)) {
          // Direct array in response.data
          console.log(`Found ${response.data.length} active packages in response.data`);
          return response.data;
        } else {
          // Custom format
          console.log('Unexpected response format:', response.data);
          return response.data;
        }
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching active packages by event category:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw error.response?.data || error.message;
    }
  },

  // Update package
  updatePackage: async (packageId, packageData) => {
    try {
      const response = await packageApi.put(`/package_data/update-package-data?id=${packageId}`, packageData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload image
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(
        `${API_BASE_URL}/files/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: false, // Don't send credentials for file upload
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error.response?.data || error.message;
    }
  },

  // Delete package
  deletePackage: async (packageId) => {
    try {
      const response = await packageApi.delete(`/package_data/delete-package/${packageId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};