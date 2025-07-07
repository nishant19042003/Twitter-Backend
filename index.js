import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors"
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
import connectToDatabase from './Database/db.js';
import userRouter from './Routers/User.router.js';
import tweetrouter from './Routers/Tweet.router.js';
import communityrouter from './Routers/Community.router.js';
import membershiprouter from './Routers/CommunityMember.router.js';
import followRouter from './Routers/Follow.router.js';
import likerouter from './Routers/Like.router.js';
import commentRouter from './Routers/Comment.router.js';
import messagerouter from './Routers/Message.router.js';
const PORT = process.env.PORT ;
connectToDatabase();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/user', userRouter);
app.use('/tweet',tweetrouter);
app.use('/community',communityrouter);
app.use('/membership',membershiprouter);
app.use("/follow",followRouter);
app.use("/like",likerouter);
app.use("/comment",commentRouter);
app.use("/message",messagerouter);



