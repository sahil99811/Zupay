const jwt = require('jsonwebtoken'); // Import JWT for token generation
// Function to generate a JWT token
exports.generateToken = (user) => {
    return jwt.sign(
        { id: user._id.toString() }, // Payload with user ID
        process.env.JWT_SECRET, // Secret key from environment variables
        { expiresIn: '24hr' } // Token expiration time
    );
};