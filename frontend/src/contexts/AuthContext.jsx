import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import SessionExpiredModal from '../components/SessionExpiredModal';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  // Function to handle session expiration
  const handleSessionExpiration = () => {
    setUser(null);
    setIsAuthenticated(false);
    authService.clearAuthData();
    
    // Show session expired modal instead of alert
    setShowSessionExpired(true);
  };

  // Global error handler for token expiration
  useEffect(() => {
    const handleTokenExpiration = (event) => {
      if (event.detail && event.detail.type === 'TOKEN_EXPIRED') {
        handleSessionExpiration();
      }
    };

    window.addEventListener('tokenExpired', handleTokenExpiration);
    
    return () => {
      window.removeEventListener('tokenExpired', handleTokenExpiration);
    };
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = authService.getToken();
        
        if (!token) {
          // No token found, user is not authenticated
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Validate the token by making a request to the backend
        try {
          const response = await fetch('http://localhost:8082/auth/validate', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            // Token is valid, get user info
            const userInfo = authService.getCurrentUser();
            if (userInfo) {
              setUser(userInfo);
              setIsAuthenticated(true);
            } else {
              // No user info, clear everything
              await authService.logout();
              setUser(null);
              setIsAuthenticated(false);
            }
          } else {
            // Token validation failed
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          // Token is invalid, clear it
          await authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        await authService.logout();
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { userInfo } = response;
      
      setUser(userInfo);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const hasRole = (role) => {
    return user?.userRole === role;
  };

  const isAdmin = () => {
    return hasRole('ADMIN');
  };

  const isStaff = () => {
    return hasRole('STAFF') || isAdmin();
  };

  // Function to handle redirect to login from modal
  const handleRedirectToLogin = () => {
    setShowSessionExpired(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    hasRole,
    isAdmin,
    isStaff,
    handleSessionExpiration
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <SessionExpiredModal 
        isVisible={showSessionExpired}
        onRedirectToLogin={handleRedirectToLogin}
      />
    </AuthContext.Provider>
  );
};

export default AuthContext;