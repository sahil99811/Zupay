const Comment=require('../models/Comment');
const {errorResponse}=require('../utils/error-response')

const createComment=async ()=>{
    try{
        const {id}=req.user;
        const {postid}=req.params;
        const {text}=req.body;
        await Comment.create({
            text:text,
            post:postid,
            author:id
        })
        
    }catch(error){
 
    }
}