import axios from 'axios';
import { dispatchTokenExpired } from '../utils/authUtils';

const API_BASE_URL = 'http://localhost:8082/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
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

// Response interceptor for automatic token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // First try to get refresh token from localStorage
        let refreshToken = localStorage.getItem('refreshToken');
        
        // If not in localStorage, check for httpOnly cookie refresh mechanism
        if (!refreshToken) {
          // The system is likely using httpOnly cookies, so call refresh without a token
          try {
            const response = await axios.post(
              `${API_BASE_URL}/auth/refresh`,
              {},
              { withCredentials: true } // Important for cookies
            );
            
            // Store new access token
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            
            // Update the original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          } catch (cookieRefreshError) {
            console.error('Cookie-based refresh failed:', cookieRefreshError);
            dispatchTokenExpired();
            return Promise.reject(cookieRefreshError);
          }
        } else {
          // Use the token-based refresh mechanism
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken },
            { withCredentials: true }
          );

          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Refresh failed, redirect to login
        dispatchTokenExpired();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const offerService = {
  // Save a new offer
  saveOffer: async (offerData) => {
    try {
      const response = await api.post('/v1/offer/save-offer', offerData);
      return response.data;
    } catch (error) {
      console.error('Error saving offer:', error);
      throw error;
    }
  },

  // Get all offers
  getAllOffers: async () => {
    try {
      const response = await api.get('/v1/offer/get-all-offers');
      return response.data;
    } catch (error) {
      console.error('Error fetching offers:', error);
      throw error;
    }
  },

  // Get offer by ID
  getOfferById: async (offerId) => {
    try {
      const response = await api.get(`/v1/offer/get-offer-by-id?id=${offerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching offer by ID:', error);
      throw error;
    }
  },

  // Update offer
  updateOffer: async (offerId, offerData) => {
    try {
      const response = await api.put(`/v1/offer/update-offer?id=${offerId}`, offerData);
      return response.data;
    } catch (error) {
      console.error('Error updating offer:', error);
      throw error;
    }
  },

  // Upload image
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Create a custom instance for file uploads with proper headers
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      
      // Use the token refresh mechanism from the api instance
      const response = await api.post(
        `/v1/files/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Delete offer
  deleteOffer: async (offerId) => {
    try {
      const response = await api.delete(`/v1/offer/delete-offer/${offerId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting offer:', error);
      throw error;
    }
  },
  
  // Get offers by event category, package category, and event date
  getOffersByCategories: async (eventCategory, packageCategory, eventDate) => {
    try {
      console.log(`Fetching offers for event category: ${eventCategory}, package category: ${packageCategory}, event date: ${eventDate}`);
      
      // Build the URL with query parameters
      let url = `/v1/offer/get-offers-by-categories?eventCategory=${eventCategory}&packageCategory=${packageCategory}`;
      if (eventDate) {
        url += `&eventDate=${eventDate}`;
      }
      
      const response = await api.get(url);
      console.log('Offers response:', response);
      
      if (response && response.data && response.data.data) {
        console.log(`Found ${response.data.data.length} active offers matching criteria`);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching offers by categories:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw error;
    }
  },
};

export default offerService;