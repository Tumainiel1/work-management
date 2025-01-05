import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [users, setUsers] = useState([]); // To hold the list of users

  // Function to fetch tasks and users
  const fetchData = async () => {
    setLoading(true);
    try {
      const tasksResponse = await axios.get('http://localhost:5000/tasks');
      setTasks(tasksResponse.data.tasks);

      const usersResponse = await axios.get('http://localhost:5000/users');
      setUsers(usersResponse.data.users); // Set the list of users
      setLoading(false);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  // Call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle form submission to create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      status,
      due_date: dueDate, // Match backend field
      userId: assignedUser, // Update key to match backend expectations
    };

    try {
      await axios.post('http://localhost:5000/tasks', newTask);
      setTitle('');
      setDescription('');
      setStatus('To Do');
      setDueDate('');
      setAssignedUser('');
      setModalOpen(false); // Close modal after task creation
      fetchData(); // Re-fetch tasks after adding the new task
    } catch (err) {
      setError('Failed to create task');
    }
  };

  return (
    <div className="content-wrapper">
      {/* Page Header */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Task Management</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Task Management</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Task List</h3>
                  <button onClick={() => setModalOpen(true)} className="btn btn-primary mb-3 float-right">
                    Add New Task
                  </button>
                </div>
                <div className="card-body">
                  {loading ? (
                    <p>Loading tasks...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Due Date</th>
                          <th>Assigned User</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((task, index) => (
                          <tr key={task.id}>
                            <td>{index + 1}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</td>
                            <td>
                              {task.assignments && task.assignments.length > 0 && task.assignments[0].user
                                ? task.assignments[0].user.name
                                : 'Unassigned'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Adding Task */}
      {modalOpen && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Task</h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="form-select"
                      required
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                    <input
                      type="date"
                      id="dueDate"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="assignedUser" className="form-label">Assigned User</label>
                    <select
                      id="assignedUser"
                      value={assignedUser}
                      onChange={(e) => setAssignedUser(e.target.value)}
                      className="form-select"
                      required
                    >
                      <option value="">Select User</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
                    <button type="submit" className="btn btn-primary">Create Task</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
