const express = require('express'); // Import express to create the app
const bodyParser = require('body-parser'); // Middleware for parsing JSON bodies
const path = require('path'); // To handle static files (like images)
const { sequelize } = require('./models'); // Import sequelize instance for syncing models
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config(); // Load environment variables (JWT secret)
const cors = require('cors'); // Import CORS package

const app = express(); // Initialize express app
app.use(cors());  // This will allow requests from any origin (e.g., localhost:3000)


// Middleware for parsing JSON bodies in requests
app.use(bodyParser.json());

// Middleware to serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serves files from 'uploads/' directory

// Use userRoutes for handling routes related to user registration and login
app.use('/users', userRoutes); // API routes for user management (without 'api' prefix)
// Task management routes
app.use('/tasks', taskRoutes);


// Default route to test if server is working
app.get('/', (req, res) => {
  res.send('Welcome to the User Management API!');
});

// Sync the models with the database
sequelize.sync({ force: false }) // Use force: false to avoid dropping tables
  .then(() => {
    console.log('Database connected and models synchronized.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
