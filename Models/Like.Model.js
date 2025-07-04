import mongoose from "mongoose";
const likeSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    ,tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
        required:true
    }
},{timestamps:true});
export const Like=mongoose.model('Like',likeSchema);