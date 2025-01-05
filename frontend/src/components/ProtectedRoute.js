import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute Component
const ProtectedRoute = ({ children, isAdmin, isUser }) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('authToken');
  
  // Decode the token to get the user role (if token exists)
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;

  // If the user is not logged in, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the route is for the admin but the user is not an admin, redirect to user-dashboard
  if (isAdmin && decodedToken.role !== 'admin') {
    return <Navigate to="/user-dashboard" />;
  }

  // If the route is for the user but the logged-in user is an admin, redirect to admin-dashboard
  if (isUser && decodedToken.role === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  }

  // If the user has the correct role, render the child components
  return children;
};

export default ProtectedRoute;
