import mongoose from "mongoose";
const MediaSchema=mongoose.Schema({
    tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet"
    },
    media_url:{
        type:String,
        required:true
    }
},{timestramps:true})
export const Media=new mongoose.model("Media",MediaSchema);