// import modules for the routes
const router = require('express').Router();

// Import the thought controller for different routes
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userControllers.js');  

// /api/users endpoint
router.route('/')
    .get(getUsers) // GET all users
    .post(createUser); // POST a new user

// /api/users/:id endpoint
router.route('/:id')
    .get(getSingleUser) // GET a single user by its _id
    .put(updateUser) // PUT to update a user by its _id
    .delete(deleteUser); // DELETE to remove a user by its _id

// /api/users/:userId/friends/:friendId endpoint
router.route('/:userId/friends/:friendId')
    .post(addFriend) // POST to add a new friend to a user's friend list
    .delete(deleteFriend); // DELETE to remove a friend from a user's friend list

module.exports = router; // Export the router