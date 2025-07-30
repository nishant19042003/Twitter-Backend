import http from "http";
import { Server } from "socket.io";
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors"
import messageHandler from "./Sockethandlers/message.handler.js";
dotenv.config()
const app = express();
// ✅ Parse JSON request bodies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
// Create an HTTP server from your Express app
const server = http.createServer(app);

// Attach socket.io to the server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // ✅ Your frontend URL
        credentials: true
    }
});


// Handle socket.io connections
io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // Handle message events
    messageHandler(io, socket);

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
    });
});

import connectToDatabase from './Database/db.js';
import userRouter from './Routers/User.router.js';
import tweetrouter from './Routers/Tweet.router.js';
import communityrouter from './Routers/Community.router.js';
import membershiprouter from './Routers/CommunityMember.router.js';
import followRouter from './Routers/Follow.router.js';
import likerouter from './Routers/Like.router.js';
import replyRouter from './Routers/Reply.router.js';
import messagerouter from './Routers/Message.router.js';
import Notificationrouter from './Routers/Notification.router.js';
const PORT = process.env.PORT ;
connectToDatabase();
// Start the server
server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Optional: make io available globally
global.io = io;

app.use('/user', userRouter);
app.use('/tweet',tweetrouter);
app.use('/community',communityrouter);
app.use('/membership',membershiprouter);
app.use("/follow",followRouter);
app.use("/like",likerouter);
app.use("/reply",replyRouter);
app.use("/message",messagerouter);
app.use("/notification",Notificationrouter);


