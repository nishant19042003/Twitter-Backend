import mongoose from "mongoose";
const replySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})
export const Reply=mongoose.model("Reply",replySchema);