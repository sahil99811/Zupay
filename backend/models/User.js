// Import Mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// Define the User schema using Mongoose's Schema class
const userSchema = new mongoose.Schema({
    // The 'name' field stores the user's name as a string and is required
    name: {
        type: String, // Data type for the field
        required: true // This field is mandatory
    },
    // The 'email' field stores the user's email as a string, is required, and must be unique
    email: {
        type: String, // Data type for the field
        required: true, // This field is mandatory
        unique: true // Ensures that each email is unique across all User documents
    },
    // The 'password' field stores the user's password as a string and is required
    password: {
        type: String, // Data type for the field
        required: true // This field is mandatory
    },
    // The 'Blog' field is an array that stores references to Blog documents
    Blog: [
        {
            type: mongoose.Types.ObjectId, // Data type for the field (ObjectId)
            ref: "Blog" // Reference to the Blog model (collection)
        }
    ]
});

// Export the User model, making it available for use in other parts of the application
module.exports = mongoose.model("User", userSchema);
