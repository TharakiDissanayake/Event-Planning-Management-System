import { useCallback } from 'react';

const useFormPersistence = () => {
  // Save form data to localStorage
  const saveFormData = useCallback((formName, data) => {
    try {
      const formData = {
        data,
        timestamp: Date.now(),
        url: window.location.pathname // Save current page
      };
      localStorage.setItem(`saved_form_${formName}`, JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }, []);

  // Restore form data from localStorage
  const restoreFormData = useCallback((formName) => {
    try {
      const savedData = localStorage.getItem(`saved_form_${formName}`);
      if (savedData) {
        const { data, timestamp, url } = JSON.parse(savedData);
        
        // Only restore if saved within last hour and on same page
        const oneHour = 60 * 60 * 1000;
        if (Date.now() - timestamp < oneHour && url === window.location.pathname) {
          // Remove the saved data after restoring
          localStorage.removeItem(`saved_form_${formName}`);
          return data;
        } else {
          // Clean up old data
          localStorage.removeItem(`saved_form_${formName}`);
        }
      }
    } catch (error) {
      console.error('Error restoring form data:', error);
    }
    return null;
  }, []);

  // Clear saved form data
  const clearFormData = useCallback((formName) => {
    try {
      localStorage.removeItem(`saved_form_${formName}`);
    } catch (error) {
      console.error('Error clearing form data:', error);
    }
  }, []);

  return {
    saveFormData,
    restoreFormData,
    clearFormData
  };
};

export default useFormPersistence;