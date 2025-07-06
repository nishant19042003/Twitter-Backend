import { Router } from "express";
import { authmiddleware } from "../Middlewares/auth.middleware.js";
import { togglelike } from "../Controllers/Like.controller.js";
const likerouter=new Router();
likerouter.use(authmiddleware);
likerouter.route("/toggle/:tweet_id").post(togglelike);
export default likerouter;