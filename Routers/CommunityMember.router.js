import { Router } from "express";
import { authmiddleware } from "../Middlewares/auth.middleware.js";
import { togglecommunitymembership } from "../Controllers/Communitymembership.controller.js";
import { upload } from "../Middlewares/Multer.middlerware.js";
const membershiprouter=new Router();
membershiprouter.use(authmiddleware);
membershiprouter.route("/toggle/:community_id").post(upload.none(),togglecommunitymembership)
export default membershiprouter;

