import { ApiError}from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { Tweet } from "../Models/Tweet.Model.js";
import {Media} from '../Models/Media.Model.js'
import { User } from "../Models/User.Model.js";
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";
export const createtweet=async(req,res)=>{
    //user  from req
   const userid=req?.user?._id;
    
    if(!userid){
        throw new ApiError(400,"login is required")
    }
    const user=await User.findById(userid);
    // get content media
    const content=req.body?.content;
    if(!content){
        throw new ApiError(400,"content is required")
    }
    //if media then upload on cloudinary get media_url
    const media=req?.file?.path;
    let media_url="";
    if(media){
        const uplodedMedia=await UploadOnCloudinary(media);
        media_url=uplodedMedia.url;
    }
    //create tweet 
    const tweet=new Tweet({
        owner:userid,
        content:content,
    })
    await tweet.save();
    if(media){
        const newmedia=new Media({
            tweet:tweet._id,
            media_url:media_url
        })
        
        await newmedia.save({validateBeforeSave:true});
        tweet.media_url=media_url;
        const newtweet=await tweet.save({validateBeforeSave:false});
        return res.status(200).json(
            new ApiResponse(200,newtweet,"successfly tweeted")
        )
        
    }
    
    //send res
    
    return res.status(200).json(
        new ApiResponse(200,tweet,"successfly tweeted")
    )
    
    
}
export const createretweet=async(req,res)=>{
    //user  from req
   const userid=req?.user?._id;
    
    if(!userid){
        throw new ApiError(400,"login is required")
    }
    
    const {tweet_id}=req.params;
    // get content media
    const content=req.body?.content;
    if(!content){
        throw new ApiError(400,"content is required")
    }
    //if media then upload on cloudinary get media_url
    const media=req?.file?.path;
    let media_url="";
    if(media){
        const uplodedMedia=await UploadOnCloudinary(media);
        media_url=uplodedMedia.url;
    }
    //create tweet 
    const tweet=new Tweet({
        owner:userid,
        content:content,
        is_retweet:true,
        retweet_of:tweet_id
    })
    await tweet.save();
    if(media){
        const newmedia=new Media({
            tweet:tweet._id,
            media_url:media_url
        })
        
        await newmedia.save({validateBeforeSave:true});
        tweet.media_url=media_url;
        const newtweet=await tweet.save({validateBeforeSave:false});
        return res.status(200).json(
            new ApiResponse(200,newtweet,"successfly tweeted")
        )
        
    }
    
    //send res
    
    return res.status(200).json(
        new ApiResponse(200,tweet,"successfly tweeted")
    )
    
}
export const createcommunitytweet=async(req,res)=>{
     //user  from req
   const userid=req?.user?._id;
    
    if(!userid){
        throw new ApiError(400,"login is required")
    }
    
    const {community_id}=req.params;
    // get content media
    const content=req.body?.content;
    if(!content){
        throw new ApiError(400,"content is required")
    }
    //if media then upload on cloudinary get media_url
    const media=req?.file?.path;
    let media_url="";
    if(media){
        const uplodedMedia=await UploadOnCloudinary(media);
        media_url=uplodedMedia.url;
    }
    //create tweet 
    const tweet=new Tweet({
        owner:userid,
        content:content,
        community:community_id
    })
    await tweet.save();
    if(media){
        const newmedia=new Media({
            tweet:tweet._id,
            media_url:media_url
        })
        
        await newmedia.save({validateBeforeSave:true});
        tweet.media_url=media_url;
        const newtweet=await tweet.save({validateBeforeSave:false});
        return res.status(200).json(
            new ApiResponse(200,newtweet,"successfly tweeted")
        )
        
    }
    
    //send res
    
    return res.status(200).json(
        new ApiResponse(200,tweet,"successfly tweeted")
    )
}
export const deletetweet=async(req,res)=>{
    
}