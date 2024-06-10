const { Thought, User } = require('../models'); // Import the Thought and User models

module.exports = { 
    getThoughts: async (req, res) => {  // async function to get all thoughts
        try { // Try to execute the following code
            const dbThoughtData = await Thought.find().sort({ createAt: -1 }); // Find all thoughts and sort by createdAt in descending order
            res.json(dbThoughtData); // Return the thoughts
        }   catch (err) { 
            console.log(err); // Log any errors
            res.status(500).json(err); // status 500 internal server error
        }
    },

    getSingleThought: async (req, res) => { // async function to get a single thought
        try { // Try to execute the following code
            const dbThoughtData = await Thought.findOne({ _id: req.params.id }); // Find a single thought
            if (!dbThoughtData) { // If no thought is found
                return res.status(404).json({ message: 'There is no user matching this id!' }); // status 404 bad request
            }
            res.json(dbThoughtData); // Return the thought
        }   catch (err) {
            console.log(err); // Log any errors
            res.status(500).json(err); // status 500 internal server error
        }
    },

    createThought: async (req, res) => { // async function to create a new thought
        try { // Try to execute the following code
            const dbThoughtData = await Thought.create(req.body); // Create a new thought

            const dbUserData = await User.findOneAndUpdate( // Find a user by its _id and update the user's thoughts array
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
            if (!dbUserData) { // If no user is found
                return res.status(404).json({ message: 'Thought created, but there is no user associated with this id!' }); // status 404 bad request
            }
            res.json({ message: 'Thought created!' }); // Return a message that the thought was successfully created
        }   catch (err) {
            console.log(err); // Log any errors
            res.status(500).json(err); // status 500 internal server error
        }
    },

    updateThought: async (req, res) => { // async function to update a thought
        try { // Try to execute the following code
            const dbThoughtData = await Thought.findOneAndUpdate( // Find a thought by its _id and update the thought
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true } // Validate any new information
            );
            if (!dbThoughtData) { // If no thought is found
                return res.status(404).json({ message: 'There is no thought corresponding to this id!' }); // status 404 bad request
            }
            res.json(dbThoughtData); // Return the updated thought
        }   catch (err) {
            console.log(err); // Log any errors
            res.status(500).json(err); // status 500 internal server error
        }
    },

    deleteThought: async (req, res) => { // async function to delete a thought 
        try { // Try to execute the following code
            const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId }); // Find a thought by its _id and delete the thought
            if (!dbThoughtData) { // If no thought is found
                return res.status(404).json({ message: 'There is no thought corresponding to this id!' }); // status 404 bad request
            }

            const dbUserData = await User.findOneAndUpdate( // Find a user by its _id and update the user's thoughts array
                { _id: dbThoughtData.userId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            if (!dbUserData) { // If no user is found
                return res.status(404).json({ message: 'Thought deleted, but there is no user associated with this id!' }); // status 404 bad request
            }

            res.json({ message: 'Thought deleted!' }); // Return a message that the thought was successfully deleted
        }   catch (err) {
            console.log(err); // Log any errors
            res.status(500).json(err); // status 500 internal server error
        }
    },

    addReaction: async (req, res) => { // async function to add a reaction to a thought
        try { // Try to execute the following code
            const dbThoughtData = await Thought.findOneAndUpdate( // Find a thought by its _id and update the thought's reactions array
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true } // Validate any new information
            );

            if (!dbThoughtData) { // If no thought is found
                return res.status(404).json({ message: 'There is no thought corresponding to this id!' }); // status 404 bad request
            }
            res.json(dbThoughtData); // Return the updated thought
        }   catch (err) {
            console.log(err); // Log any errors
            res.status(500).json(err); // status 500 internal server error
        }
    },

    deleteReaction: async (req, res) => { // async function to delete a reaction from a thought
        try { // Try to execute the following code
            const dbThoughtData = await Thought.findOneAndUpdate( // Find a thought by its _id and update the thought's reactions array
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true } // Validate any new information
            );
            if (!dbThoughtData) { // If no thought is found
                return res.status(404).json({ message: 'There is no thought corresponding to this id!' }); // status 404 bad request
            }
            res.json(dbThoughtData); // Return the updated thought
        }   catch (err) {
            console.log(err); // Log any errors
            res.status(500).json(err); // status 500 internal server error
        }
    },
};