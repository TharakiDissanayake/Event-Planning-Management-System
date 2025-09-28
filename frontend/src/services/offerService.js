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
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
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
      const response = await api.put(`/v1/offer/update-package?id=${offerId}`, offerData);
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
      
      const response = await axios.post(
        `${API_BASE_URL}/v1/files/upload`,
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
};

export default offerService;