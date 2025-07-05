import mongoose from "mongoose";
const communitySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uniqu:true
    },
    bio:{
        type:String,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    picture:{
        type:String,
        required:true,
    }
},{timestamps:true});
export const Community= mongoose.model("Community",communitySchema);

