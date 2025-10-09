import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user role matches the required role (case-insensitive)
  // Also allow access if the user has ADMIN role (case-insensitive)
  const userRole = user?.userRole?.toUpperCase() || user?.role?.toUpperCase() || '';
  const requiredRoleUpper = requiredRole?.toUpperCase();
  
  if (requiredRole && userRole !== requiredRoleUpper && userRole !== 'ADMIN') {
    console.log('Access denied. User role:', userRole, 'Required role:', requiredRoleUpper);
    // User doesn't have required role
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;