// Import Mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// Define the Comment schema using Mongoose's Schema class
const commentSchema = new mongoose.Schema({
    // The 'text' field stores the content of the comment and is required
    text: {
        type: String, // Data type for the field
        required: true // This field is mandatory
    },
    // The 'blog' field stores a reference to the associated Blog post and is required
    post: {
        type: mongoose.Types.ObjectId, // Data type for the field (ObjectId)
        ref: "Post", // Reference to the Blog model (collection)
        required: true // This field is mandatory
    },
    // The 'author' field stores a reference to the User who made the comment and is required
    author: {
        type: mongoose.Types.ObjectId, // Data type for the field (ObjectId)
        ref: "User", // Reference to the User model (collection)
        required: true // This field is mandatory
    }
}, 
// Schema options object
{
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields to the schema
});

// Export the Comment model, making it available for use in other parts of the application
module.exports = mongoose.model("Comment", commentSchema);
