const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JSON Web Tokens
const multer = require('multer'); // For handling file uploads
const { User } = require('../models'); // Import the User model

const SECRET_KEY = 'your_jwt_secret_key'; // Replace with a secure key

// Configure multer for storing images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images in the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
  },
});

const upload = multer({ storage }); // Initialize multer

// Controller for user registration
// exports.register = [
//   upload.single('image'), // Middleware to handle image upload
//   async (req, res) => {
//     try {
//       const { name, email, password, role } = req.body;

//       // Check if the email is already registered
//       const existingUser = await User.findOne({ where: { email } });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Email already exists' });
//       }

//       // Hash the user's password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Handle image upload (if any)
//       const image = req.file ? req.file.filename : null;

//       // Create a new user in the database
//       const newUser = await User.create({
//         name,
//         email,
//         password: hashedPassword,
//         role: role || 'user', // Default role is 'user'
//         image,
//       });

//       res.status(201).json({
//         message: 'User registered successfully',
//         user: {
//           id: newUser.id,
//           name: newUser.name,
//           email: newUser.email,
//           role: newUser.role,
//           image: newUser.image,
//         },
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Error registering user', error: error.message });
//     }
//   },
// ];

// Controller for user registration
exports.register = [
  upload.single('image'), // Middleware to handle image upload
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the user's password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Handle image upload (if any)
      const image = req.file ? req.file.filename : null;

      // Create a new user in the database
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user', // Default role is 'user'
        image,
      });

      // Automatically assign unassigned tasks to this user
      const unassignedTasks = await Task.findAll({
        include: [{ model: TaskAssignment, required: false, where: { userId: null } }],
      });

      for (const task of unassignedTasks) {
        await TaskAssignment.create({
          userId: newUser.id,
          taskId: task.id,
        });
      }

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          image: newUser.image,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  },
];


// Controller for user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Controller for getting all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Controller for getting a single user by ID
exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Controller for editing a user's details
exports.editUser = [
  upload.single('image'), // Middleware to handle image upload (if present)
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, role } = req.body;

      // Find the user by ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Hash the new password if provided
      const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

      // Handle image upload (if any)
      const image = req.file ? req.file.filename : user.image;

      // Update user details
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = hashedPassword;
      user.role = role || user.role;
      user.image = image;

      await user.save();

      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  },
];

// Controller for deleting a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};
