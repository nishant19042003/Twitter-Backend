import mongoose from "mongoose";
const mediaSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    media_url:{
        type:String,
        required:true
    },
    tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
        default:null
    }
},{timestamps:true});
export const Media=mongoose.model('Media',mediaSchema);