import { Router } from "express";
import { createuser } from "../Controllers/User.controller.js";
import { upload } from "../Middlewares/Multer.middlerware.js";
const userRouter = Router();
// Route to create a new user
userRouter.route("/create").post(upload.none(), createuser);
export default userRouter;