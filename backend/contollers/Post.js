const Post=require('../models/Post')
const User=require('../models/User');
const Comment=require('../models/Comment')
const {errorResponse} =require('../utils/error-response')
const mongoose=require('mongoose');
// Fetch trending and popular posts
 const getPosts = async (req, res) => {
    try {
        const {id}=req.user;
        const trendingPosts = await Post.find({createdBy:{$ne:id}})
            .select("title  impression thumbnail createdBy")
            .populate({ path: "createdBy", select: "name" })
            .sort({ impression: -1 })
            .limit(10);

        const popularPosts = await Post.find({createdBy:{$ne:id}})
            .select("title description like impression thumbnail createdBy")
            .populate({ path: "createdBy", select: "name" })
            .sort({ impression: -1 })
            .limit(10)

        res.status(201).json({
            success:true,
            data:{ trendingPosts, popularPosts },
             message:"Posts fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return errorResponse(res, 500, "Server error while fetching posts");
    }
};

// Fetch user-specific posts
const getUserPosts = async (req, res) => {
    try {
        const { id } = req.user;
        const userPosts = await Post.find({ createdBy: id })
            .select("title content description  impression thumbnail createdBy")
            .populate({ path: "createdBy", select: "name" });
        
        res.status(201).json({
            success: true,
            data: userPosts,
            message: "Posts fetched successfully"
        });
    } catch (error) {
        console.error("Error while fetching user posts:", error);
        return errorResponse(res, 500, "Server error while fetching posts");
    }
};
// Fetch details of a single post by its ID
const getPostDetails = async (req, res) => {
    try {
        const { postid } = req.params;
        const { id } = req.user;
        // Check if quizId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(postid)) {
            return res.status(404).json({ success: false, message: 'Invalid post ID' });
        }
        // Fetch the post by ID to check its creator
        const post = await Post.findById(postid)
            .select("title description content category like impression thumbnail createdBy comments createdAt")
            .populate({ path: "createdBy", select: "name" })
            .populate({
                path: "comments",
                select: "text author createdAt",
                populate: { path: "author", select: "name" }
            });

        if (!post) {
            return errorResponse(res, 404, "Post not found");
        }
        // Increment impression count if user is not the post creator (admin)
        if (id !== post.createdBy._id.toString()) {
            post.impression += 1;
            await post.save();
        }

        res.status(201).json({
            success: true,
            data: post,
            admin: id === post.createdBy._id.toString(),
            message: "Post details fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching post details:", error);
        return errorResponse(res, 500, "Server error");
    }
};

const searchPosts = async (req, res) => {
    try {
        const { search } = req.query;
        const {id}=req.user;
        // Check if the search query is provided
        if (!search) {
            return res.status(400).json({
                success: false,
                message: "Search query is required."
            });
        }

        // Perform a case-insensitive search using RegExp
        const posts = await Post.find({ title: new RegExp(search, "i") ,createdBy:{$ne:id}})
            .select("title content description impressions thumbnail createdBy")
            .populate({ path: "createdBy", select: "name" });
        // Respond with the fetched posts
        res.status(201).json({
            success: true,
            data: posts,
            message: "Posts fetched successfully"
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
};


// Create a new post
const createPost = async (req, res) => {
    try {
        const { id } = req.user;
        const { title, category,content,thumbnail,points } = req.body;

        const post = await Post.create({
            title, thumbnail, description:content,content:points, category, createdBy: id
        });

        await User.findByIdAndUpdate(id, {
            $push: { blog: post._id }
        });

        res.status(201).json({
            success:true,
            message:"Post created succesfully"
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return errorResponse(res, 500, "Server error");
    }
};

// Delete a post by its ID
const deletePost = async (req, res) => {
    try {
        const { id } = req.user;
        const { postid } = req.params;
        if (!mongoose.Types.ObjectId.isValid(postid)) {
            return res.status(404).json({ success: false, message: 'Invalid post ID' });
        }
        const deletedPost = await Post.findByIdAndDelete(postid);
        await Comment.deleteMany({ _id: { $in: deletedPost.comments } });
        await User.findByIdAndUpdate(id, {
            $pull: { blog: postid }
        });

        res.status(201).json({ success:true,message: "Post and associated comments deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return errorResponse(res, 500, "Server error");
    }
};




module.exports={getPosts,getUserPosts,getPostDetails,deletePost,createPost,searchPosts}