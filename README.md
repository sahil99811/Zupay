# Zupay Blog Platform

Zupay Blog Platform is a comprehensive blogging application that allows users to create, view, and interact with blog posts. It leverages AI to generate concise summaries of blog content, making it easier for readers to quickly grasp the key points. The platform includes user authentication, state management, and various other features to enhance the user experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Models](#models)
- [Middleware](#middleware)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)

## Project Overview

The Zupay Blog Platform is designed to provide a seamless experience for both readers and authors. It utilizes AI to automatically generate summaries of blog posts, helping users quickly understand the content. The application also includes features such as a comment system, user authentication, search functionality, and trending content display.

## Features

- **AI-Powered Blog Summaries**: Automatically generate concise summaries of blog posts using AI technology.
- **Blog Post Listing**: Display a list of blog posts with titles and excerpts.
- **Detailed Blog Views**: Access individual blog posts with full content and comments.
- **Create New Blog Posts**: Users can add new blog posts through a form.
- **User Authentication**: Secure the platform with token-based authentication and authorization.
- **Comment System**: Engage readers with a comment section for each blog post.
- **Search Functionality**: Allow users to search for specific blog posts.
- **Delete User Posts**: Users can delete their posts.
- **Trending Content & Top Stories**: Display trending content and top stories on the homepage.
- **State Management**: Manage the application's state using Redux.
- **Modal and Spinner**: Use modals for pop-ups and React-Spinners for loading indicators.

## Tech Stack

- **Frontend**: React (Vite) 
- **Backend**: Node.js with Express
- **Database**: MongoDb
- **State Management**: Redux
- **Authentication**: Token-based (JWT)
- **AI Integration**: AI technology for generating blog summaries
- **Other Libraries**: React-Modal, React-Spinner

## Folder Structure

### Frontend
```
frontend/
│
├── src/
│   ├── assets/          # Static assets like images, icons, etc.
│   ├── components/      # Reusable React components
│   │   ├── addpost/
│   │   │   └── AddPostForm.js
│   │   │       # Form component for adding new blog posts
│   │   ├── auth/
│   │   │   ├── LoginForm.js
│   │   │   │       # Form component for user login
│   │   │   ├── SignupForm.js
│   │   │   │       # Form component for user registration
│   │   │   ├── PrivateRoute.js
│   │   │   │       # Component to protect routes that require authentication
│   │   │   ├── PublicRoute.js
│   │   │   │       # Component to expose routes that are accessible without authentication
│   │   │   └── TemplateForm.js
│   │   │           # Template form for various forms with common styles
│   │   ├── common/
│   │   │   ├── NavBar.js
│   │   │   │       # Navigation bar component
│   │   │   └── PostCard.js
│   │   │           # Card component to display blog posts in a list
│   │   ├── homepage/
│   │   │   └── TrendingPost.js
│   │   │       # Component to display trending blog posts
│   │   ├── postdetails/
│   │   │   └── PostDetails.js
│   │   │       # Component to display detailed view of a single blog post
│   ├── pages/
│   │   ├── AddPostPage.js
│   │   │       # Page component for adding new blog posts
│   │   ├── AuthPage.js
│   │   │       # Page component for authentication (login/signup)
│   │   ├── HomePage.js
│   │   │       # Page component for the homepage with trending posts
│   │   ├── PostDetailsPage.js
│   │   │       # Page component for viewing a detailed blog post
│   │   └── UserPostPage.js
│   │           # Page component for managing user’s posts
│   ├── hooks/
│   │   ├── usePostDetails.js
│   │   │       # Custom hook for fetching and managing post details
│   │   └── usePostForm.js
│   │           # Custom hook for managing the post creation form
│   ├── reducers/
│   │   └── index.js
│   │       # Combines all reducers into a single root reducer
│   ├── services/
│   │   ├── Auth.js
│   │   │       # Service for handling authentication requests
│   │   ├── Comment.js
│   │   │       # Service for handling comment-related requests
│   │   ├── Post.js
│   │   │       # Service for handling blog post-related requests
│   │   └── Summarize.js
│   │           # Service for summarizing blog content
│   ├── slices/
│   │   └── authSlice.js
│   │       # Redux slice for managing authentication state
│   ├── utility/
│   │   └── formValidation.js
│   │       # Utility functions for form validation
│   ├── state/           # Redux state management
│   ├── App.js           # Main App component
│   ├── index.js         # Entry point for the React app
│   └── ...              # Other files
│
└── ...
```

### Backend
```
backend/
│
├── src/
│   ├── controllers/
│   │   ├── Auth.js        # Handle authentication-related requests
│   │   ├── Comment.js     # Manage comments
│   │   ├── Post.js        # Manage blog posts
│   │   └── Summarize.js   # Handle blog summary generation
│   ├── middlewares/
│   │   ├── Auth.js        # Handle authentication middleware
│   ├── models/
│   │   ├── Comment.js     # Define the Comment model
│   │   ├── Post.js        # Define the Post model
│   │   └── User.js        # Define the User model
│   ├── routes/
│   │   ├── Auth.js        # Define authentication routes
│   │   ├── Comment.js     # Define comment routes
│   │   ├── Post.js        # Define blog post routes
│   │   └── Summarize.js   # Define summarize routes
│   ├── utils/
│   │   ├── error-response.js   # Utility for standardized error responses
│   │   ├── generate-token.js   # Utility for generating JWT tokens
│   │   └── summarizeUtils.js   # Utility functions for summarizing content
│   ├── app.js             # Express app setup
│   ├── server.js          # Entry point for the server
│   └── ...                # Other files
│
└── ...
```

## Models

### Comment
- **Comment.js**: Defines the schema for comments on blog posts. Includes fields for content, author, and associated blog post.

### Post
- **Post.js**: Defines the schema for blog posts. Includes fields for title, content, author, and summary.

### User
- **User.js**: Defines the schema for users. Includes fields for username, email, hashed password, and role.

## Middleware

### Auth
- **Auth.js**: Middleware for handling authentication and authorization. Ensures that routes requiring authentication are protected and that users have the necessary permissions.

## Installation

1. **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Backend Setup**
    - Navigate to the `backend` directory.
    - Install dependencies:
        ```bash
        cd backend
        npm install
        ```
    - Create a `.env` file with the required environment variables (refer to [Environment Variables](#environment-variables)).
    - Start the server:
        ```bash
        npm start
        ```

3. **Frontend Setup**
    - Navigate to the `frontend` directory.
    - Install dependencies:
        ```bash
        cd frontend
        npm install
        ```
    - Create a `.env` file with the required environment variables (refer to [Environment Variables](#environment-variables)).
    - Start the development server:
        ```bash
        npm run dev
        ```

4. **Open your browser** and

 navigate to `http://localhost:3000` to view the frontend application.

## Environment Variables

Create a `.env` file in the `backend` and `frontend` directories with the following variables:

### Backend
- `MONGODB_URL`: MongoDB connection string
- `PORT`: Port for the server to listen on
- `JWT_SECRET`: Secret key for JWT authentication
- `GROQ_API_KEY`: API key for GROQ services

### Frontend
- `VITE_BACKEND_BASE_URL`: Base URL for backend API requests

## API Endpoints

### Authentication
- **POST /api/auth/login**: User login
- **POST /api/auth/signup**: User registration

### Blog Posts
- **GET /api/posts**: List all blog posts
- **POST /api/posts**: Create a new blog post
- **GET /api/posts/:id**: Get a single blog post by ID
- **DELETE /api/posts/:id**: Delete a blog post

### Comments
- **POST /api/comments**: Add a comment to a blog post
- **GET /api/comments/:postId**: Get all comments for a blog post

### Summarize
- **POST /api/summarize**: Get a summary of blog content

## Usage

1. **Start the Backend Server** as described in the [Installation](#installation) section.
2. **Start the Frontend Development Server** as described in the [Installation](#installation) section.
3. **Navigate to `http://localhost:3000`** in your browser to use the application.

