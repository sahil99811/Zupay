// Import necessary modules
const express = require('express'); // Express is a web framework for Node.js
const app = express(); // Create an instance of the Express application
const dotenv = require('dotenv'); // dotenv is used to load environment variables from a .env file
const cors=require('cors')
const { dbConnect } = require('./config/dbConnect'); // Import the database connection function
const authRoutes=require('./routes/Auth');
dotenv.config(); // Load environment variables from the .env file into process.env
app.use(express.json()); // Middleware to parse JSON bodies

// Use CORS middleware
app.use(cors());
// Use authentication routes, prefixed with /api/v1/auth
app.use('/api/v1/auth', authRoutes);

// Connect to the database
dbConnect()
    .then(() => {
        console.log("Db connected successfully"); // Log a message if the database connection is successful

        // Start the server on the port defined in environment variables
        const server = app.listen(process.env.PORT, () => {
            console.log("Server is started"); // Log a message when the server starts
        });

        // Handle server startup errors
        server.on('error', (error) => {
            console.error("Server failed to start:", error); // Log any errors that occur while starting the server
            process.exit(1); // Exit the process with a failure code (1) if there's an error
        });
        
    })
    .catch((error) => {
        console.error("DB Connection Failed:", error); // Log an error message if the database connection fails
        process.exit(1); // Exit the process with a failure code (1) if there's an error
    });
