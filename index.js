import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
const app = express();
// ✅ Parse JSON request bodies
app.use(express.json());
import connectToDatabase from './Database/db.js';
import userRouter from './Routers/User.router.js';

const PORT = process.env.PORT ;
connectToDatabase();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/user', userRouter);




