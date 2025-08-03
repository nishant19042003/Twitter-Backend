import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import dotenv from 'dotenv';
dotenv.config(); // Must be before accessing any process.env.*

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const UploadOnCloudinary=async(localfilepath)=>{
    

    try {
        if(!localfilepath)return null;
        const response= await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        
        fs.unlinkSync(localfilepath)
        return response;
    } catch (error) {
        console.log("CLOUDINARY UPLOAD ERROR",error)
        fs.unlinkSync(localfilepath)
        return null;
    }
}
export {UploadOnCloudinary}