import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('authToken');

    // Redirect to login page
    navigate('/login');
  };

  // Get the user data from the token stored in localStorage
  const token = localStorage.getItem('authToken');
  let decodedToken = null;
  
  if (token) {
    try {
      decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
      console.log(decodedToken); // Check the decoded token in the console
    } catch (error) {
      console.error('Token decoding error:', error);
    }
  }

  return (
    <div>
      <h2>Welcome, User!</h2>
      <p>Welcome, {decodedToken ? decodedToken.name : 'User'}!</p>
      <p>Your email: {decodedToken ? decodedToken.email : ''}</p>
      <p>Here you can view your tasks, progress, and more.</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
