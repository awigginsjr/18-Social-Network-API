const { User, Thought } = require('../models'); // Import the User and Thought models

module.exports = { // Export the user controller

    getUser: async (req, res) => { // GET all users
        try {
            const dbUserData = await User.find().populate('thoughts').populate('friends').select('-__v'); // Find all users and populate their thoughts and friends
            res.json(dbUserData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err); // status 500 internal server error
        }
    },

    getSingleUser: async (req, res) => { // GET a single user by its _id
        try {
            const dbUserData = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends').select('-__v'); // Find a single user by its _id and populate their thoughts and friends
            if (!dbUserData) {
                return res.status(404).json({ message: 'There is no user matching this id!' }); // status 404 bad request
            }
            res.json(dbUserData)
        }   catch (err) {
            console.log(err);
            res.status(500).json(err); // status 500 internal server error
        }
    },

    createUser: async (req, res) => { // POST a new user
        try {
            const dbUserData = await User.create(req.body); // Create a new user
            res.json(dbUserData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err); // status 500 internal server error
        }
    },

    updateUser: async (req, res) => { // PUT to update a user by its _id
        try {
            const dbUserData = await User.findOneAndUpdate( // Find a user by its _id and update the user
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'There is no user matching this id!' }); // status 404 bad request
            }
            res.json(dbUserData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err); // status 500 internal server error
        }
    },

    deleteUser: async (req, res) => { // DELETE to remove a user by its _id
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.userId }); // Find a user by its _id and delete the user
            if (!dbUserData) {
                return res.status(404).json({ message: 'There is no user matching this id!' }); // status 404 bad request
            }
            await Thought.deleteMany({ _id: {$in: dbUserData.thoughts} }); // Delete all thoughts associated with the user

            res.json({ message: 'User and their thoughts are deleted!' }); // Return a message that the user and their thoughts are deleted
        }   catch (err) {
            console.log(err);
            res.status(500).json(err); // status 500 internal server error
        }
    },

    addFriend: async (req, res) => { // POST to add a new friend to a user's friend list
        try {
            const dbUserData = await User.findOneAndUpdate( // Find a user by its _id and update the user's friends array
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'There is no user matching this id!' }); // status 404 bad request
            }
            res.json(dbUserData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err); // status 500 internal server error
        }
    },

    deleteFriend: async (req, res) => { // DELETE to remove a friend from a user's friend list
        try {
            const dbUserData = await User.findOneAndUpdate( // Find a user by its _id and update the user's friends array
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'There is no user matching this id!' }); // status 404 bad request
            }
            res.json(dbUserData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err); // status 500 internal server error
        }
    },
};
