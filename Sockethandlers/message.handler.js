import {Message} from "../Models/Message.Model.js"
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";
export default function messageHandler(io, socket) {
  socket.on("join_chat", (roomid) => {
    socket.join(roomid);
    console.log(`User ${socket.id} joined chat room ${roomid}`);
  });

  socket.on("send-message", async (data) => {
   console.log("Message data received:", data);
   const{roomId,formdata}=data;
   //const message = await Message.create({ sender:data.sender._id, receiver:data.recipientId, 
   // content: data.content, media_url: mediaUrl });
    //console.log("Message saved to database:", message);
   io.to(roomId).emit("receive-message", formdata);
  });
}
