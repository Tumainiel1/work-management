const { Task, User, TaskAssignment } = require('../models');

// Get all tasks with their assigned user and due date
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: TaskAssignment,
          as: 'assignments', // Alias for the relationship in Task
          include: [
            {
              model: User,
              as: 'user', // Alias for the relationship in TaskAssignment
              attributes: ['id', 'name', 'email'], // Include user details
            },
          ],
        },
      ],
    });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};



// Create a new task with due date and assign user
// const createTask = async (req, res) => {
//   const { title, description, due_date, status, userId } = req.body;  // Add userId to request body

//   try {
//     // Create the new task
//     const task = await Task.create({
//       title,
//       description,
//       status: status || 'To Do', // Default status is 'To Do'
//       due_date, // Add due date here
//     });

//     // If a userId is provided, assign the user to the task
//     if (userId) {
//       await TaskAssignment.create({
//         userId, // Assign the user to the task
//         taskId: task.id, // Link the task with the user
//       });
//     }

//     res.status(201).json({ message: 'Task created successfully', task });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create task', error: error.message });
//   }
// };



const createTask = async (req, res) => {
  const { title, description, due_date, status, userId } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  try {
    const task = await Task.create({
      title,
      description,
      status: status || "To Do",
      due_date,
    });

    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await TaskAssignment.create({
        userId: user.id,
        taskId: task.id,
      });
    }

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};



// Update task status (e.g., mark as 'Completed')
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status; // Update task status
    await task.save();

    res.status(200).json({ message: 'Task status updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task status', error: error.message });
  }
};

// Assign a task to a user
const assignTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // User ID to assign the task to

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Create a new TaskAssignment to link the task with a user
    await TaskAssignment.create({
      userId,
      taskId: task.id,
    });

    res.status(200).json({ message: 'Task assigned successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Failed to assign task', error: error.message });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id, {
      include: [
        {
          model: TaskAssignment,
          as: 'assignments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch task', error: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
  assignTask,
  getTaskById,
  deleteTask,
};
