import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!getAuthToken(); // Check if token exists

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;