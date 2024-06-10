const { Schema, Types } = require('mongoose'); // Import the Schema and Types from mongoose

const reactionSchema = new Schema( // Create a new ReactionSchema
    {
        reactionId: { // Add a reactionId field
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: { // Add a reactionBody field
            type: String,
            required: true,
            maxlength: 280
        },

        username: { // Add a username field
            type: String,
            required: true
        },
        
        createdAt: { // Add a createdAt field
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: { getters: true }, // Add virtuals to the ReactionSchema with getters
        id: false
    }
);

module.exports = reactionSchema; // Export the Reaction model