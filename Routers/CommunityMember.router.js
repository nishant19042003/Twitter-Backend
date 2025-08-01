import { Router } from "express";
import { authmiddleware } from "../Middlewares/auth.middleware.js";
import { togglecommunitymembership } from "../Controllers/Communitymembership.controller.js";
import { upload } from "../Middlewares/Multer.middlerware.js";
import { isMember } from "../Controllers/Communitymembership.controller.js";
import { communityMembers } from "../Controllers/Communitymembership.controller.js";
const membershiprouter=new Router();
membershiprouter.use(authmiddleware);
membershiprouter.route("/toggle/:community_id").post(upload.none(),togglecommunitymembership)
membershiprouter.route("/ismember/:community_id").get(isMember);
membershiprouter.route("/members/:community_id").get(communityMembers)
export default membershiprouter;

