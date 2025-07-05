import mongoose from "mongoose";
const tweetschema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    media_url:{
        type:String,
        default:null
    },
    is_retweet:{
        type:Boolean,
        default:false
    },
    retweet_of:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
        default:null
    },
    community:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Community"
    }
    
},{timestramps:true});
export const Tweet= mongoose.model('Tweet',tweetschema);