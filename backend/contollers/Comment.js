const Comment = require('../models/Comment');
const Post=require('../models/Post');
const { post } = require('../routes/Post');
const { errorResponse } = require('../utils/error-response');

const createComment = async (req, res) => {
    try {
        const { id } = req.user; // The user's ID
        const { postid } = req.params; // The post ID from the request parameters
        const { text } = req.body; // The comment text from the request body
     
        // Create the comment
        let comment = await Comment.create({
            text: text,
            post: postid,
            author: id
        });

        await Post.findByIdAndUpdate(postid,{
            $push: { comments:comment._id }
        })
        // Populate the author's name in the created comment
        comment = await comment.populate({
            path: "author",
            select: "name"
        });

        res.status(200).json({
            success: true,
            comment,
            message: "Comment Created Successfully..."
        });
    } catch (error) {
        console.error("Error creating comment:", error);
        return errorResponse(res, 500, "Server error");
    }
};

module.exports = { createComment };
