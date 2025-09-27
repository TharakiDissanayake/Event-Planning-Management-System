// Test component to manually trigger session expiration
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const SessionTestComponent = () => {
  const { handleSessionExpiration } = useAuth();

  const handleTestExpiration = () => {
    // Simulate session expiration for testing
    handleSessionExpiration();
  };

  return (
    <div className="p-4">
      <button 
        onClick={handleTestExpiration}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Test Session Expiry (For Development)
      </button>
    </div>
  );
};

export default SessionTestComponent;