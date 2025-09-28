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
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          withCredentials: true,
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