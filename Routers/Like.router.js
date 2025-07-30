import { Router } from "express";
import { authmiddleware } from "../Middlewares/auth.middleware.js";
import { togglelike,getTweetLikes,istweetliked } from "../Controllers/Like.controller.js";
const likerouter=new Router();
likerouter.use(authmiddleware);
likerouter.route("/toggle/:tweet_id").post(togglelike);
likerouter.route("/likes/:tweet_id").get(getTweetLikes);
likerouter.route("/isliked/:tweet_id").get(istweetliked);
export default likerouter;