const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/Auth');
const { getPosts, getUserPosts, getPostDetails, likePost, deletePost, createPost } = require('../contollers/Post');
const { searchPosts } = require('../contollers/Post');

router.get("/posts", auth, getPosts);                 // Get all posts
router.get("/user/posts", auth, getUserPosts);        // Get posts by a specific user
router.post("/posts", auth, createPost);              // Create a new post
router.get("/posts/:id", auth, getPostDetails);       // Get details of a specific post
router.delete("/posts/:id", auth, deletePost);        // Delete a specific post
router.put("/posts/:id/like", auth, likePost);        // Like a specific post
router.get("/posts/search",auth,searchPosts)          // Searches for posts based on a query string
module.exports = router;
