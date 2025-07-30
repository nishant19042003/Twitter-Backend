import { Reply } from "../Models/Reply.Model.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
export const createreply=async(req,res)=>{
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
    const reply=new Reply({
        user:userid,
        tweet:tweet_id,
        content:content
    })
    reply.save({validateBeforeSave:false})
    return res.status(200).json(
        new ApiResponse(200,reply,"reply successful")
    )
}



