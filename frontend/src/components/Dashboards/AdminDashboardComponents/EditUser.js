import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    image: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const updateUser = () => {
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('role', user.role);
    if (user.password) {
      formData.append('password', user.password);
    }
    if (user.image instanceof File) {
      formData.append('image', user.image);
    }

    axios
      .put(`http://localhost:5000/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        alert('User updated successfully!');
        navigate('/users');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          updateUser();
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Leave blank to keep current password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setUser({ ...user, image: e.target.files[0] })}
          />
        </Form.Group>

        {user.image && !(user.image instanceof File) && (
          <img
            src={`http://localhost:5000/uploads/${user.image}`}
            alt="Profile"
            style={{ width: '100px', height: '100px', marginTop: '10px' }}
          />
        )}

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
        <Button
          variant="secondary"
          className="ms-3"
          onClick={() => navigate('/users')}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default EditUser;
