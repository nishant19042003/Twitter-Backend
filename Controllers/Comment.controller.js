import { Comment } from "../Models/Comment.Model.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
export const createcomment=async(req,res)=>{
    //take user from req->user
    const userid=req?.user._id;
    if(!userid){
        throw  ApiError(400,"login please")
    }
    //take tweet_id form req.params
    const {tweet_id}=req.params;
    if(!tweet_id){
        throw  ApiError(400,"select tweet please")
    }
    //take content from  req.body
    const {content}=req.body;
    if(!content){
        throw  ApiError(400,"content is required")
    } 
    const comment=new Comment({
        user:userid,
        tweet:tweet_id,
        content:content
    })
    comment.save({validateBeforeSave:false})
    return res.status(200).json(
        new ApiResponse(200,comment,"comment successful")
    )
}

export const updatecomment=async(req,res)=>{
    //take user from req->user
    const userid=req?.user._id;
    if(!userid){
        throw  ApiError(400,"login please")
    }
    //find the comment by id
    const {comment_id}=req.params;
    const comment=await Comment.findById(comment_id)
    //check owner
    if(comment.user.toString()!==userid.toString()){
        throw ApiError(400,"this is not your comment")
    }
    //update
    const {content}=req.body;
    comment.content=content;
    await comment.save({validateBeforeSave:false})
    return res.status(200).json(
        new ApiResponse(200,comment,"comment updated successfully")
    )
}

export const deletecomment=async(req,res)=>{
    //take user from req->user
    const userid=req?.user._id;
    if(!userid){
        throw  ApiError(400,"login please")
    }
    //find the comment by id
    const {comment_id}=req.params;
    const comment=await Comment.findById(comment_id)
    if(!comment){
        throw ApiError(400,"comment not found")
    }
    //check owner
    if(comment.user.toString()!==userid.toString()){
        throw ApiError(400,"this is not your comment")
    }
    //delete
    await Comment.findByIdAndDelete(comment_id);
    return res.status(200).json(
        new ApiResponse(201,{},"comment deleted")
    )
}