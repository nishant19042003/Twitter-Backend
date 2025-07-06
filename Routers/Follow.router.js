import { Router } from "express";
import { togglefollow } from "../Controllers/Follow.controller.js";
import { authmiddleware } from "../Middlewares/auth.middleware.js";
const followRouter=new Router();
followRouter.use(authmiddleware)
followRouter.route("/toggle/:account_id").post(togglefollow)
export default followRouter;

