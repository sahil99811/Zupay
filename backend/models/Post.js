// Import Mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// Define the Blog schema using Mongoose's Schema class
const postSchema = new mongoose.Schema({
   
    // The 'title' field stores the title of the blog post and is required
    title: {
        type: String, // Data type for the field
        required: true // This field is mandatory
    },
    // The 'category' field stores the category of the blog post and is required
    category: {
        type: String, // Data type for the field
        required: true // This field is mandatory
    },
    // The 'content' field stores the main content of the blog post and is required
    content: {
        type: String, // Data type for the field
        required: true // This field is mandatory
    },
    // The 'like' field tracks the number of likes on the blog post
    like: {
        type: Number, // Data type for the field
        default: 0 // Default value is 0, meaning no likes initially
    },
    // The 'comments' field is an array that stores references to Comment documents
    comments: [
        {
            type: mongoose.Types.ObjectId, // Data type for the field (ObjectId)
            ref: "Comment" // Reference to the Comment model (collection)
        }
    ],
    // The 'thumbnail' field stores the URL or path to an image that represents the blog post
    thumbnail: {
        type: String, // Data type for the field
        required: true // This field is mandatory, ensuring that every blog has a thumbnail
    },
    // The 'createdBy' field stores a reference to the User who created the blog post
    createdBy: {
        type: mongoose.Types.ObjectId, // Data type for the field (ObjectId)
        ref: "User" // Reference to the User model (collection)
    }
}, 
// Schema options object
{ 
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields to the schema
});

// Export the Blog model, making it available for use in other parts of the application
module.exports = mongoose.model("Post", postSchema);
