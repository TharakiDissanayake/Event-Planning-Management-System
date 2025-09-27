// Utility functions for handling authentication and token expiration

/**
 * Dispatch a custom event to notify the app about token expiration
 */
export const dispatchTokenExpired = () => {
  const event = new CustomEvent('tokenExpired', {
    detail: { type: 'TOKEN_EXPIRED' }
  });
  window.dispatchEvent(event);
};

/**
 * Handle token expiration - clear storage and redirect to login
 */
export const handleTokenExpiration = () => {
  // Clear all authentication data
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userInfo');
  
  // Show user notification
  alert('Your session has expired. Please log in again.');
  
  // Redirect to login page
  window.location.href = '/login';
};

/**
 * Check if error is due to token expiration
 */
export const isTokenExpiredError = (error) => {
  // Only check for actual HTTP error responses
  if (!error.response) {
    return false;
  }
  
  // Only trigger on 401 (Unauthorized) status
  if (error.response.status !== 401) {
    return false;
  }
  
  // Check for specific token-related error messages
  const message = error.response.data?.message || '';
  return message.includes('Access denied') || 
         message.includes('token') || 
         message.includes('expired') ||
         message.includes('Unauthorized');
};

/**
 * Generic error handler for API responses
 */
export const handleApiError = (error, originalRequest = null) => {
  if (isTokenExpiredError(error) && !originalRequest?._retry) {
    dispatchTokenExpired();
    return Promise.reject(error);
  }
  
  // For other errors, just pass them through
  return Promise.reject(error);
};