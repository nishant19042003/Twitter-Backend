import mongoose from "mongoose";
const notificationSchema=new mongoose.Schema({
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        enum:['like','tweet','follow','massage','retweet','reply'],
        required:true
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
    },
    seen:{
        type:Boolean,
        default:false
    },
    tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
    },
    message:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
    media:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Media",
    },
    
    
},{timestamps:true});
export const Notification= mongoose.model('Notification',notificationSchema);