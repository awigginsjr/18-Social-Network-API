const express = require('express'); // Import the express module
const db = require('./config/connection'); // Import the connection to the database
const routes = require('./routes'); // Import the routes

// Set up the port and require express
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add the routes to the express app
app.use(routes);

// Start the API server after the database connection is ready
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!!!`);
  });
});