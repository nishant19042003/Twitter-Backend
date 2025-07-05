import { Router } from "express";
import { createuser } from "../Controllers/User.controller.js";
import { upload } from "../Middlewares/Multer.middlerware.js";
import { login } from "../Controllers/User.controller.js";
import { authmiddleware } from "../Middlewares/auth.middleware.js";
import { logout } from "../Controllers/User.controller.js";
import { refreshaccesstoken } from "../Controllers/User.controller.js";
import {getvarification}  from "../Controllers/User.controller.js"
const userRouter = Router();
// Route to create a new user
userRouter.route("/create").post(upload.single('avatar'), createuser);
userRouter.route("/login").post(upload.none(),login)
userRouter.route("/logout").post(authmiddleware,logout)
userRouter.route("/refresh_access").post(authmiddleware,refreshaccesstoken);
userRouter.route("/getvarified").post(authmiddleware,getvarification);
export default userRouter;