import mongoose from "mongoose";
const communitymemberSchema=mongoose.Schema({
    Community:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Community"
    },
    Member:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});
export const CommunityMember=new mongoose.model("CommunityMember",communitymemberSchema);