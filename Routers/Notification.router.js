import {Router} from 'express';
import { authmiddleware } from "../Middlewares/auth.middleware.js";
import { upload } from '../Middlewares/Multer.middlerware.js';
import { CreateTweetNotification, GetNotifications, DeteleteNotification } from '../Controllers/Notification.controller.js';
const Notificationrouter = new Router();
Notificationrouter.route('/create').post(authmiddleware,upload.none(),CreateTweetNotification);
Notificationrouter.route('/').get(authmiddleware,upload.none(),GetNotifications);
Notificationrouter.route('/delete/:notificationid').delete(authmiddleware,upload.none(),DeteleteNotification);
export default Notificationrouter;