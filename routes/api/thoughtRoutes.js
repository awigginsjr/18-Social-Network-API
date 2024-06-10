// import modules for the routes
const router = require('express').Router();

// Import the thought controller for different routes
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtControllers');  

// /api/thoughts endpoint
router.route('/')
    .get(getThoughts) // GET all thoughts
    .post(createThought); // POST a new thought

// /api/thoughts/:id endpoint
router.route('/:id')
    .get(getSingleThought) // GET a single thought by its _id
    .put(updateThought) // PUT to update a thought by its _id
    .delete(deleteThought); // DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions endpoint
router.route('/:thoughtId/reactions')
    .post(addReaction); // POST to create a reaction stored in a single thought's reactions array

// /api/thoughts/:thoughtId/reactions/:reactionId endpoint
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction); // DELETE to pull and remove a reaction by the reaction's reactionId

module.exports = router; // Export the router