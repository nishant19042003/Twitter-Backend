import { Notification } from "../Models/Notification.Model.js";
export const CreateTweetNotification=async(req,res)=>{
    
        const {to, type, from,tweetid} = req.body;
        console.log("Creating notification for:", req.body);
        const notification = new Notification({
            to,
            type,
            from,
            tweet: tweetid,
            seen: false
        });
        await notification.save();
        return res.status(201).json({message: "Notification created successfully",notification});
   
}
export const GetNotifications=async(req,res)=>{
    try {
        const userId = req?.user?._id;
        if (!userId) {
            return res.status(400).json({message: "User ID is required"});
        }
        const notifications = await Notification.find({to: userId})
            .sort({createdAt: -1});
        return res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({message: "Error fetching notifications", error: error.message});
    }
}
export const DeteleteNotification=async(req,res)=>{
    try {
        const notification = await Notification.findByIdAndDelete(req.params.notificationid);
        if (!notification) {
            return res.status(404).json({message: "Notification not found"});
        }
        return res.status(200).json({message: "Notification deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error deleting notification", error: error.message});
    }
}