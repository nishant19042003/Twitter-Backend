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