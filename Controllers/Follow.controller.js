import { Community } from "../Models/Community.Model.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { Follow } from "../Models/Follow.Model.js";
export const togglefollow=async(req,res)=>{
    //login user
    const userid=req?.user._id;
    //given community 
    const {account_id}=req.params;
    //if combination exist than remove 
    const Following = await Follow.find({
        follower: userid,
        account: account_id
    });
    if(Following.length>0){
        await Follow.findByIdAndDelete(Following[0]._id);
        return res.status(200).json(
            new ApiResponse(200,{},"unfollow")
        )
    }
    //else make combo
    else{
        const newfollower=new Follow({
            follower: userid,
            account: account_id
        })
        newfollower.save({ValidedvalidateBeforeSave:false})
        return res.status(200).json(
            new ApiResponse(200,newfollower,"follow successfuly")
        )
    }
}