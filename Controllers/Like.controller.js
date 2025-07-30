import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { Like } from "../Models/Like.Model.js";
export const togglelike=async(req,res)=>{
    //login user
    const userid=req?.user._id;
    //given community 
    const {tweet_id}=req.params;
    if(!tweet_id){
        throw new ApiError(400,"select tweet")
    }
    //if combination exist than remove 
    const isLike = await Like.find({
        user: userid,
        tweet: tweet_id
    });
    if(isLike.length>0){
        await Like.findByIdAndDelete(isLike[0]._id);
        return res.status(200).json(
            new ApiResponse(200,{},"like removed")
        )
    }
    //else make combo
    else{
        const newlike=new Like({
            user: userid,
            tweet: tweet_id
        })
        newlike.save({ValidedvalidateBeforeSave:false})
        return res.status(200).json(
            new ApiResponse(200,newlike,"like successfuly")
        )
    }
}
export const getTweetLikes=async(req,res)=>{
    //login user
    const userid=req?.user._id;
    //given tweet
    const {tweet_id}=req.params;
    if(!tweet_id){
        throw new ApiError(400,"select tweet")
    }
    //if combination exist than remove 
    const Likes = await Like.find({
        tweet: tweet_id
    });
    
    return res.status(200).json(
        new ApiResponse(200,Likes,"like found")
    )
    
}
export const istweetliked=async(req,res)=>{
    const user=req?.user._id;
    if(!user){
        throw new ApiError(404,"user not login");
    }
    const {tweet_id}=req.params;
    if(!tweet_id){
        throw new ApiError(404,"tweet_id is required to get isliked details");
    }
    const isliked=await Like.find({tweet:tweet_id});
    if(isliked.length>0) {
        return res.status(200).json(
            new ApiResponse(200,true,"this video is liked by you")
        )
    }
    else{
        return res.status(200).json(
            new ApiResponse(200,false,"this video is not liked by you")
        )
    }
}