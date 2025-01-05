import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post('http://localhost:5000/users/login', { email, password });

      if (response.status === 200) {
        alert('Login successful!');
        localStorage.setItem('authToken', response.data.token); // Store token in localStorage

        // Navigate to the appropriate dashboard based on the role
        const userRole = response.data.user.role;
        if (userRole === 'admin') {
          navigate('/admin-dashboard'); // Admin dashboard route
        } else {
          navigate('/user-dashboard'); // User dashboard route
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
