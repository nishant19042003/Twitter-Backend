import {Message} from "../Models/Message.Model.js"
export default function messageHandler(io, socket) {
  socket.on("join_chat", (roomid) => {
    socket.join(roomid);
    console.log(`User ${socket.id} joined chat room ${roomid}`);
  });

  socket.on("send-message", async (data) => {
   console.log("Message data received:", data);
   let mediaUrl = '';
   
   
   const message = await Message.create({ sender:data.sender._id, receiver:data.recipientId, 
    content: data.content, media_url: mediaUrl });
    console.log("Message saved to database:", message);
   io.to(data.roomId).emit("receive-message", message);
  });
}
