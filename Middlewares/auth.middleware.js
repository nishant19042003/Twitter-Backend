import jwt from "jsonwebtoken";
import {ApiError} from '../Utils/apiError.js'
import  {User} from '../Models/User.Model.js'
import dotenv from 'dotenv'
dotenv.config();
const authmiddleware=async(req,_,next)=>{
    try{
        //getting token from header
        const token=req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","")
        
        if(!token){
            throw new ApiError(400,"we have not get any token please provide token");
        }
        //decoding token
        const decodedToken=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY);
        if(!decodedToken){
            throw new ApiError(400,"Invalid token");
        }
        
        //find user by _id
        const user=await User.findById(decodedToken.id);
        if(!user){
            throw new ApiError(400,"Error while fatching user");
        }
        //add user in req
        req.user=user;
        
        next();
    }
    catch(e){
       throw new ApiError(400,"Error in Authentication");
    }
}
export {authmiddleware}