import { Message } from "../Models/Message.Model.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";
export const createmessagewithmedia=async(req,res)=>{
    //sender
    const userid=req?.user._id;
    if(!userid){
        throw ApiError(400,"login please")
    }
    //receiver
    const {receiver_id}=req.params;
    if(!receiver_id){
        throw ApiError(400,"choose receiver please")
    }
    //content and media
    const {content}=req.body;
    const tx=req?.file.path;
    console.log(tx,"mmmmmmmmmmmm")
    const hh=await UploadOnCloudinary(tx);
    const message=new Message({
        sender:userid,
        receiver:receiver_id,
        media_url:hh.url,
        content:content
    })
    message.save({validateBeforeSave:false})
    return res.status(200).json(
    new ApiResponse(200,message,"message is with media send")
    )
   
}
export const createmessage=async(req,res)=>{
    //sender
    const userid=req?.user._id;
    if(!userid){
        throw new ApiError(400,"login please")
    }
    //receiver
    const {receiver_id}=req.params;
    if(!receiver_id){
        throw new ApiError(400,"choose receiver please")
    }
    //content and media
    const {content}=req.body;
    
    const message=new Message({
        sender:userid,
        receiver:receiver_id,
        content:content
    })
    message.save({validateBeforeSave:false})
    return res.status(200).json(
       new ApiResponse(200,message,"message is  send")
    )
}
export const deletemessage=async(req,res)=>{
    //user
    const userid=req?.user._id;
    if(!userid){
        throw ApiError(400,"login please")
    }
    //message_id
    const {message_id}=req.params;
    const message=await Message.findById(message_id);
    if(!message){
        throw ApiError(400,"message is not found")
    }
    if(message.sender.toString()!==userid.toString()){
        throw ApiError(400,"this is not your message")
    }
    await Message.findByIdAndDelete(message_id);
    return res.status(200).json(
        new ApiResponse(200,{},"message is deleted")
    )
}
export const getPairMessages=async(req,res)=>{
    const user=req?.user._id;
    const {receiver_id}=req.params;
    const messages=await Message.find({
        $or: [
        { sender: user, receiver: receiver_id },
        { sender: receiver_id, receiver: user }
      ]
    }).
    sort({CreatecreatedAt: 1 });
    return res.status(200).json(
        new ApiResponse(200,messages,"your conversetion")
    )
}