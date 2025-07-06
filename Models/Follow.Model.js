import mongoose from "mongoose";
const followSchema=new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestramps:true});
export const Follow=mongoose.model('Follow',followSchema);