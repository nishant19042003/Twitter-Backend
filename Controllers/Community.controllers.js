import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { Community } from "../Models/Community.Model.js";
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";
export const createCommunity=async(req,res)=>{
    //creater->owner
    const ownerid=req?.user._id;
    //name bio from req.body
    const {name,bio}=req.body;
    const photo=req?.file.path;
    if(!photo){
        throw ApiError(400,"picture not found")
    }
    const picture=await UploadOnCloudinary(photo);
    //create and send
    const community=new Community({
        owner:ownerid,
        name:name,
        bio:bio,
        picture:picture.url
    })
    community.save({validateBeforeSave:false})
    
    return res.status(200).json(
        new ApiResponse(200,community,"updated Successfully")
    )
}
export const updateCommunity=async(req,res)=>{
    //community_id
    const {community_id}=req.params;
    //current user
    const userid=req?.user._id;
    if(!userid){
        throw new  ApiError(400,"please login")
    }
    //check if owner
    const communityfound=await Community.findById(community_id);
    if(communityfound.owner.toString()!==userid.toString()){
        throw new ApiError(400,"you are not owner of this community")
    }
    //than update
    const {name,bio}=req.body;
    const photo=req?.file.path;
    const picture=await UploadOnCloudinary(photo).url;
    const updatedcommunity=await Community.findByIdAndUpdate(
        community_id,
        { name, bio, picture },
        { new: true }
    )
    return res.status(200).json(
        new ApiResponse(200,updatedcommunity,"updated Successfully")
    )

}