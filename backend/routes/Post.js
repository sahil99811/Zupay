const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/Auth');
const { getPosts, getUserPosts, getPostDetails, deletePost, createPost } = require('../contollers/Post');
const { searchPosts } = require('../contollers/Post');

router.get("/posts", auth, getPosts);                 // Get all posts
router.get("/user/posts", auth, getUserPosts);        // Get posts by a specific user
router.post("/posts", auth, createPost);              // Create a new post
router.get("/posts/search",auth,searchPosts)          // Searches for posts based on a query string
router.get("/posts/:postid", auth, getPostDetails);       // Get details of a specific post
router.delete("/posts/:postid", auth, deletePost);        // Delete a specific post

module.exports = router;
