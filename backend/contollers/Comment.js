const Comment=require('../models/Comment');
const {errorResponse}=require('../utils/error-response')

const createComment=async (re,res)=>{
    try{
        const {id}=req.user;
        const {postid}=req.params;
        const {text}=req.body;
        await Comment.create({
            text:text,
            post:postid,
            author:id
        })
        res.status(200).json({
            success:true,
            message:"Comment Created Successfully..."
        });
    }catch(error){
        console.error("Error liking post:", error);
        return errorResponse(res, 500, "Server error");
    }
}


module.exports={createComment}