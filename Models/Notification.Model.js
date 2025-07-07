import mongoose from "mongoose";
const notificationSchema=new mongoose.Schema({
    to:{
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
        default:"you got notification"
    },
    
},{timestamps:true});
export const Notification= mongoose.model('Notification',notificationSchema);