import { Router } from "express";
import { authmiddleware } from "../Middlewares/auth.middleware.js";
import { createreply } from "../Controllers/Reply.controller.js";
import { upload } from "../Middlewares/Multer.middlerware.js";
const replyRouter=new Router();
replyRouter.use(authmiddleware);
replyRouter.route("/create/:tweet_id").post(upload.none(),createreply);
export default replyRouter;