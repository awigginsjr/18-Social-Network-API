const { Schema, model } = require('mongoose'); // Import the Schema and model from mongoose

const userSchema = new Schema( // Create a new UserSchema
    {
        username: { // Add a username field
            type: String, 
            unique: true, // Set the field to be unique
            required: true,
            trim: true, 
        },

        email: { // Add an email field
            type: String, 
            required: true,
            unique: true, // Set the field to be unique
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address'] // Use a regular expression to validate the email
        },

        thoughts: [ // Add a thoughts field
            { 
                type: Schema.Types.ObjectId, 
                ref: 'Thought' // Set the reference to the Thought model
            }
        ],

        friends: [ // Add a friends field
            { 
                type: Schema.Types.ObjectId, 
                ref: 'User' // Set the reference to the User model
            }
        ],
    },
    {
        toJSON: { virtuals: true }, // Add virtuals to the UserSchema
        id: false,
    }
);

UserSchema.virtual('friendCount').get(() => this.friends.length);

const User = model('User', userSchema); // Create the User model using the UserSchema

module.exports = User; // Export the User model