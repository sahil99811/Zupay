// Fetch trending and popular posts
const getPosts = async (req, res) => {
    try {
        const trendingPosts = await Post.find({})
            .select("title like impression thumbnail createdBy")
            .populate({ path: "createdBy", select: "name" })
            .sort({ impression: -1 })
            .limit(5);

        const popularPosts = await Post.find({})
            .select("title content like impression thumbnail createdBy")
            .populate({ path: "createdBy", select: "name" })
            .sort({ like: -1 });

        res.status(200).json({
            success:true,
            data:{ trendingPosts, popularPosts },
             message:"Posts fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return errorResponse(res, 500, "Server error while fetching posts");
    }
};

const getUserPosts=async (req,res)=>{
    try{
        const {id}=req.user;
        const popularPosts = await Post.findAll({createdBy:id})
        .select("title content like impression thumbnail createdBy")
        .populate({ path: "createdBy", select: "name" })
        .sort({ like: -1 });
    }catch(error){
        console.error("Error while fetching user posts:", error);
        return errorResponse(res, 500, "Server error while fetching posts");
    }
}
// Fetch details of a single post by its ID
const getPostDetails = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndUpdate(postid, {
            $inc: { impression: 1 }
        }, { new: true });
        const post = await Post.findById(id)
            .select("title content category like impression thumbnail createdBy comments createdAt")
            .populate({ path: "createdBy", select: "name" })
            .populate({
                path: "comments",
                select: "text author createdAt",
                populate: { path: "author", select: "name" }
            });

        if (!post) {
            return errorResponse(res, 404, "Post not found");
        }

        res.status(200).json({
            success:true,
            data:post,
            message:"Post details fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching post details:", error);
        return errorResponse(res, 500, "Server error");
    }
};


// Create a new post
const createPost = async (req, res) => {
    try {
        const { id } = req.user;
        const { title, category, content, thumbnail } = req.body;

        const post = await Post.create({
            title, thumbnail, content, category, createdBy: id
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

        const deletedPost = await Post.findByIdAndDelete(postid);

        if (!deletedPost) {
            return errorResponse(res, 404, "Post not found");
        }

        await Comment.deleteMany({ _id: { $in: deletedPost.comments } });

        await User.findByIdAndUpdate(id, {
            $pull: { blog: postid }
        });

        res.status(200).json({ success:true,message: "Post and associated comments deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return errorResponse(res, 500, "Server error");
    }
};

// Like a post by its ID
const likePost = async (req, res) => {
    try {
        const { postid } = req.params;

        const post = await Post.findByIdAndUpdate(postid, {
            $inc: { like: 1 }
        }, { new: true });

        if (!post) {
            return errorResponse(res, 404, "Post not found");
        }

        res.status(200).json({
            success:true,
            message:"Post liked succesfully"
        });
    } catch (error) {
        console.error("Error liking post:", error);
        return errorResponse(res, 500, "Server error");
    }
};


