const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Get all tasks
router.get('/', taskController.getTasks);

// Get a specific task by ID
router.get('/:id', taskController.getTaskById);

// Create a new task
router.post('/', taskController.createTask);

// Update task status
router.put('/:id/status', taskController.updateTaskStatus);

// Assign a task to a user
router.put('/:id/assign', taskController.assignTask);

// Delete a task by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
