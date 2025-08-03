import {Message} from "../Models/Message.Model.js"
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";
export default function messageHandler(io, socket) {
  socket.on("join_chat", (recipientId) => {
    socket.join(recipientId);
    console.log(`User ${socket.id} joined chat room ${recipientId}`);
  });

  socket.on("send-message", async (data) => {
   console.log("Message data received:", data);
   io.to(data.currentUserId).emit("receive-message",data.message);
  });
}
