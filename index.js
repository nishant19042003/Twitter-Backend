import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config()
const app = express();
// ✅ Parse JSON request bodies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import connectToDatabase from './Database/db.js';
import userRouter from './Routers/User.router.js';
import tweetrouter from './Routers/Tweet.router.js';
import communityrouter from './Routers/Community.router.js';
const PORT = process.env.PORT ;
connectToDatabase();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/user', userRouter);
app.use('/tweet',tweetrouter);
app.use('/community',communityrouter);




