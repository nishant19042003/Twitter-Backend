import mongoose from "mongoose";
const communitySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        uniqu:true
    },
    bio:{
        type:String,
    },
    
},{timestamps:true});
export const Community=new mongoose.model("Community",communitySchema);
//community->user+community
//tweet->user+if community than community id  
//are you member ->find member(user) in community
//community tweets ->in the tweets find for community 
//if some tweet is community tweet than it is private 
//community member schema ->community + user
//tweet with community id are community tweet.
