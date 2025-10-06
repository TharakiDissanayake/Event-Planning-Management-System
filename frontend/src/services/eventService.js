import axios from 'axios';
import { dispatchTokenExpired } from '../utils/authUtils';

// Use consistent base URL format - confirm this matches what the backend is using
const API_BASE_URL = 'http://localhost:8082/api/v1';

// Create axios instance with base configuration
const eventApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to include auth token
eventApi.interceptors.request.use(
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
eventApi.interceptors.response.use(
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
          return eventApi(originalRequest);
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

export const eventService = {
  // Create a new event
  createEvent: async (eventData) => {
    try {
      const response = await eventApi.post('/event/save-event', eventData);
      return response.data;
    } catch (error) {
      console.log('Error with authenticated endpoint, trying public endpoint:', error);
      // If authentication fails, try the public endpoint as fallback
      if (error.response?.status === 401) {
        try {
          // Use axios directly without the interceptor to call the public endpoint
          const publicResponse = await axios.post(
            `${API_BASE_URL}/public/save-event`, 
            eventData,
            { 
              headers: { 'Content-Type': 'application/json' },
              withCredentials: false
            }
          );
          return publicResponse.data;
        } catch (publicError) {
          console.error('Public endpoint also failed:', publicError);
          throw publicError.response?.data || publicError.message;
        }
      }
      throw error.response?.data || error.message;
    }
  },

  // Get all events
  getAllEvents: async () => {
    try {
      const response = await eventApi.get('/event/get-all-events');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get event by ID
  getEventById: async (eventId) => {
    try {
      const response = await eventApi.get(`/event/get-event-by-id?id=${eventId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get events by customer ID
  getEventsByCustomerId: async (customerId) => {
    try {
      const response = await eventApi.get(`/event/get-events-by-customer?id=${customerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Get events by status
  getEventsByStatus: async (status) => {
    try {
      const response = await eventApi.get(`/event/get-events-by-status?status=${status}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await eventApi.put(`/event/update-event?id=${eventId}`, eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete event
  deleteEvent: async (eventId) => {
    try {
      const response = await eventApi.delete(`/event/delete-event/${eventId}`);
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
      
      console.log('Uploading image file:', file.name);
      
      const response = await axios.post(
        `${API_BASE_URL}/files/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
          },
          withCredentials: false, // Don't send credentials for file upload
        }
      );
      
      // Log the raw response to help with debugging
      console.log('Image upload raw response:', response);
      console.log('Image upload response data:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error.response?.data || error.message;
    }
  },
  
  // Get packages by event category
  getPackagesByEventCategory: async (eventCategory) => {
    try {
      const response = await eventApi.get(`/package_data/get-packages-by-event-category?category=${eventCategory}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Get offers by event category and package category
  getOffersByEventAndPackageCategory: async (eventCategory, packageCategory) => {
    try {
      const response = await eventApi.get(`/offer/get-offers-by-categories?eventCategory=${eventCategory}&packageCategory=${packageCategory}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Check if customer exists by ID (for event creation)
  checkCustomerExists: async (customerId) => {
    try {
      const response = await eventApi.get(`/customer/get-customer-by-id?id=${customerId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return { exists: false };
      }
      throw error.response?.data || error.message;
    }
  },
  
  // Generate event quotation with pricing details
  generateEventQuotation: async (eventDetails) => {
    try {
      const response = await eventApi.post('/event/generate-quotation', eventDetails);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Save event quotation after customer approval
  saveEventQuotation: async (quotationData) => {
    try {
      const response = await eventApi.post('/event/save-quotation', quotationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Get events by date range (for calendar view)
  getEventsByDateRange: async (startDate, endDate) => {
    try {
      const response = await eventApi.get(`/event/get-events-by-date-range?startDate=${startDate}&endDate=${endDate}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Get events by status (pending, confirmed, completed, cancelled)
  getEventsByStatus: async (status) => {
    try {
      const response = await eventApi.get(`/event/get-events-by-status?status=${status}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Check for date/time conflicts when scheduling a new event
  checkEventTimeConflicts: async (date, startTime) => {
    try {
      const response = await eventApi.get(`/event/check-time-conflicts?date=${date}&startTime=${startTime}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Get event statistics (for dashboard/reporting)
  getEventStatistics: async (fromDate, toDate) => {
    try {
      const response = await eventApi.get(`/event/statistics?fromDate=${fromDate}&toDate=${toDate}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};