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
    if(membership){
        await CommunityMember.findByIdAndDelete(membership._id);
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