import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('authToken');

    // Redirect to login page
    navigate('/login');
  };

  // Get the user data from the token stored in localStorage
  const token = localStorage.getItem('authToken');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;

  return (
    <div>
      <h2>Welcome, Admin!</h2>
      <p>Welcome, {decodedToken ? decodedToken.name : 'Admin'}!</p>
      <p>Your email: {decodedToken ? decodedToken.email : ''}</p>
      <p>Here you can manage users, tasks, and more.</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
