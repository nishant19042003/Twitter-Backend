import mongoose from "mongoose";
const commentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet"
    },
    content:{
        type:String,
    }
},{timestamps:true})
export const Comment=mongoose.model("Comment",commentSchema);