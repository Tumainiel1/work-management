import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState(''); // 'success' or 'danger'

  const fetchUsers = () => {
    axios
      .get('http://localhost:5000/users')
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers(); // Fetch all users when the component loads
  }, []);

  const handleShowEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleEditUser = async () => {
    const formData = new FormData();
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const role = document.getElementById('formRole').value;
    const image = document.getElementById('formImage').files[0];

    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);
    if (image) formData.append('image', image);

    try {
      const response = await axios.put(
        `http://localhost:5000/users/${selectedUser.id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      // Show success alert
      alert('User updated successfully!');
      fetchUsers(); // Refresh the user list
      setShowEditModal(false); // Close modal
    } catch (error) {
      // Show error alert
      alert('Failed to update user. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Alert Message */}
      {alertMessage && (
        <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
      )}

      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>User Management</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">User List</h3>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Image</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                              {user.image ? (
                                <img
                                  src={`http://localhost:5000/uploads/${user.image}`}
                                  alt={user.name}
                                  className="rounded-circle"
                                  width="50"
                                  height="50"
                                />
                              ) : (
                                <span>No image</span>
                              )}
                            </td>
                            <td>
                              <Button
                                variant="primary"
                                className="me-2"
                                onClick={() => handleShowEditModal(user)}
                              >
                                <FaEdit /> Edit
                              </Button>
                              <Button variant="danger">
                                <FaTrashAlt /> Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal for editing user */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  defaultValue={selectedUser.name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  defaultValue={selectedUser.email}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={selectedUser.role}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserManagement;
