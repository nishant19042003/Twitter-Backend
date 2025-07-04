import mongoose from "mongoose";
const notificationSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        enum:['like','tweet','follow','massage'],
        required:true
    },
    source_user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
    },
    content:{
        type:String,
    },
    tweet_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet"
    }
},{timestamps:true});
export const Notification= mongoose.model('Notification',notificationSchema);