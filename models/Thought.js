const { Schema, model } = require('mongoose'); // Import the Schema and model from mongoose
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema( // Create a new ThoughtSchema
    {
        thoughtText: { // Add a thoughtText field
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 280, 
        },

        createdAt: { // Add a createdAt field
            type: Date, 
            default: Date.now, 
        },

        username: { // Add a username field
            type: String, 
            required: true, 
        },
        
        reactions: [reactionSchema], // Add a reactions field
    },
    {
        toJSON: { // Add virtuals to the ThoughtSchema
            virtuals: true,
            getters: true,
        },

        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(() => this.reactions.length);

const Thought = model('Thought', thoughtSchema); // Create the Thought model using the ThoughtSchema

module.exports = Thought; // Export the Thought model