const express = require('express'); // Import express to create a router
const userController = require('../controllers/userController'); // Import the userController

// Initialize the router
const router = express.Router();

// Route for user registration
// This route will handle POST requests to '/register'
router.post('/register', userController.register); 
// Calls the register method from the userController, which includes logic for creating a new user

// Route for user login
// This route will handle POST requests to '/login'
router.post('/login', userController.login); 
// Calls the login method from the userController, which handles user authentication

// Route for getting all users
// This route will handle GET requests to '/users'
router.get('/', userController.getAllUsers); 
// Calls the getAllUsers method from the userController, which fetches all users

// Route for getting a single user by ID
// This route will handle GET requests to '/users/:id'
router.get('/:id', userController.getSingleUser); 
// Calls the getSingleUser method from the userController to fetch a user by ID

// Route for editing a user's details
// This route will handle PUT requests to '/users/:id'
router.put('/:id', userController.editUser); 
// Calls the editUser method from the userController, which updates a user's data

// Route for deleting a user
// This route will handle DELETE requests to '/users/:id'
router.delete('/:id', userController.deleteUser); 
// Calls the deleteUser method from the userController to delete a user

// Export the router so it can be used in the server file
module.exports = router;
