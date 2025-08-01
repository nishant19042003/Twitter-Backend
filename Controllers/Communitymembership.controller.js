import { Community } from "../Models/Community.Model.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { CommunityMember } from "../Models/CommunityMember.Model.js";
export const togglecommunitymembership=async(req,res)=>{
    //login user
    const userid=req?.user._id;
    //given community 
    const {community_id}=req.params;
    //if combination exist than remove 
    const membership = await CommunityMember.find({
        Member: userid,
        Community: community_id
    });
    
    if(membership.length>0){
        await CommunityMember.findByIdAndDelete(membership[0]._id);
        return res.status(200).json(
            new ApiResponse(200,{},"membership closed")
        )
    }
    //else make combo
    else{
        const newmembership=new CommunityMember({
            Member:userid,
            Community:community_id
        })
        newmembership.save({ValidedvalidateBeforeSave:false})
        return res.status(200).json(
            new ApiResponse(200,newmembership,"membership closed")
        )
    }
}
export const isMember=async(req,res)=>{
    const user=req?.user._id;
    if(!user){
        throw new ApiError(400,"Login buddy!!");
    }
    const {community_id}=req.params;
    if(!community_id){
        throw new ApiError(400,"communty id is required to membership");
    }
    const membership= await CommunityMember.find({Member:user,Community:community_id});
    console.log(membership);
    if(membership.length>0){
        return res.status(200).json(
            new ApiResponse(200,true,"yes you are member of this community")
        )
    }
    else {
        return res.status(200).json(
            new ApiResponse(200,false,"sorry you are not member of this community")
        )
    }
}
export const communityMembers=async(req,res)=>{
    const {community_id}=req.params;
    if(!community_id){
        throw new ApiError(400,"community_id is required")
    }
    const members=await CommunityMember.find({Community:community_id});
    return res.status(200).json(
        new ApiResponse(200,members,"community members")
    )
}