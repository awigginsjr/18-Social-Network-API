const router = require('express').Router(); // Import the express router
const thoughtRoutes = require('./thoughtRoutes'); // Import the thought routes
const userRoutes = require('./userRoutes'); // Import the user routes

// api/thoughts endpoint
router.use('/thoughts', thoughtRoutes); // Add the thought routes 
// api/users endpoint
router.use('/users', userRoutes); // Add the user routes

module.exports = router; // Export the router