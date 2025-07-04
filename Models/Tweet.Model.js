import mongoose from "mongoose";
const tweetschema=mongoose.Schema({
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
    original_tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
        default:null
    }
},{timestramps:true});
export const User=mongoose.model('Tweet',tweetSchema);