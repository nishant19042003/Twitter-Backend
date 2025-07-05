import { Router } from "express";
import { createtweet } from "../Controllers/Tweet.controller.js";
import { upload } from "../Middlewares/Multer.middlerware.js";
import { authmiddleware } from "../Middlewares/auth.middleware.js";
import { createretweet } from "../Controllers/Tweet.controller.js";
import { createcommunitytweet } from "../Controllers/Tweet.controller.js";
const tweetrouter=new Router();
tweetrouter.route("/create").post(authmiddleware,upload.single("media"),createtweet)
tweetrouter.route("/createretweet/:tweet_id").post(authmiddleware,upload.single("media"),createretweet)
tweetrouter.route("/create/:community_id").post(authmiddleware,upload.single("media_url"),createcommunitytweet)
export default tweetrouter;