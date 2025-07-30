import { User } from "../Models/User.Model.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";
import jwt from "jsonwebtoken"
// Create a new user
export const createuser=async(req,res)=>{
    try{
        const {username,email,name,bio,password} = req.body;
        const avatar=req.file?.path;
        let url="";
        if (avatar) {
            const newThumbnail = await UploadOnCloudinary(avatar);
            url = newThumbnail.url;
        }
        if(!username || !email || !name || !password){
            return res.status(400).json({error: 'All fields are required'});
        }
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({error: 'Username already exists'});    
        }
        const newUser = new User({
            username,
            email,
            name,
            bio,
            avatar_url: url,
            password_hash: password
        });

        await newUser.save();
        return res.status(200).json({message: 'User created successfully', user: newUser});
        
    }
    catch(error){
        throw new Error('Error creating user: ' + error.message);
    }
}
const generateAccessandrefreshtoken=async(user_id)=>{
     //find user
     const user=await User.findById(user_id);
     //user has methoed to generate the access and refresh token
     const refreshToken=await user.generateRefreshToken();
     const accessToken=await user.generateAccessToken();
     //update the refresh token of user
     user.refresh_token=refreshToken;
     await user.save({validateBeforeSave:false})
     //return the tokens
     return {accessToken,refreshToken};
}
export const login=async(req,res)=>{
    //take username ,email and password to login
    const {username,email,password}=req.body;
    if(!username||!email||!password){
         throw new ApiError(400,"please send all the requied feild")
    }

    //find the user by username
    const user=await User.findOne({
        $or:[{username,email}]
    })
    if(!user){
        console.log("user not found")
        throw new ApiError(400,"user not found")
    }
   console.log(user)
    //varify the password
    const isPasswordCorrect=await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new ApiError(400,"invalid credentials")
    }

    //generate and send the access and refresh token to user and hide password and refreshtoken
    const {accessToken,refreshToken}=await generateAccessandrefreshtoken(user._id)

    const loggedinuser=await User.findById(user._id).select("-password -refreshtoken").lean();

    const options = {
    httpOnly: true,
    secure: false, // ✅ only secure in production
    sameSite:   'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
    };

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{user: { ...loggedinuser },accessToken,refreshToken},"user logged in successfully")
    )
}
export const logout=async(req,res)=>{
    //remove refresh token from User
    
    await  User.findByIdAndUpdate(req.user._id,
    {
        $unset: {
            refreshtoken: 1 // this removes the field from document
        }
        
    },
    {
        new :true
    }
   )
    const options={
        httpOnly:true,
        secure:true,
    }  
   
    
    //remove token form  res cookies 
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"user logged out"))
    
}


export const refreshaccesstoken = async (req, res) => {
    try {
        // 1. Get the incoming refresh token
        const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshtoken;

        // 2. Validate user
        const decodedrefreshtoken=jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY
        );
        console.log(decodedrefreshtoken.id)
        // 3. Find user in DB
        const user = await User.findById(decodedrefreshtoken.id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // 4. Compare stored and incoming refresh token
        if (user.refresh_token!== incomingRefreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }

        // 5. Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            await generateAccessandrefreshtoken(user._id);

        // 6. Update refresh token in DB
        user.refreshtoken = newRefreshToken;
        await user.save({validateBeforeSave:false})

        // 7. Send new tokens in cookies
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None", // if used with cross-origin frontend
        };

        return res
            .status(200)
            .cookie("accessToken", newAccessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        console.error("Refresh token error:", error.message);
        return res
            .status(401)
            .json(new ApiError(401, "Could not refresh access token"));
    }
};

export const getvarification=async(req,res)=>{
    //find the user
    const userid=req?.user._id;
    
    const user =await User.findById(userid);
    console.log(user)
    user.varified=true;
    const varifieduser=await user.save({validateBeforeSave:false});
    //update thr user
    //retun response
    return res.status(200).json(
        new ApiResponse(200,varifieduser,"you get blue tick")
    )
}
export const updatepassword=async(req,res)=>{
    //take newpassword
    //get the userid from req
    //find the user
    //hash the password 
    //update the password
    //return  password updated
}
export const updateavatar=async(req,res)=>{
    //get new avatar
    //get user id from req
    //get user
    //update avatar field
}
export const updateuserprofile=async(req,res)=>{
    //get username,email,name and bio 
    //find the user and update these fields
}
export const getchannelinfo=async(req,res)=>{
    //tweets,medias,likes,followers,following get all these and send
}
import { Tweet } from "../Models/Tweet.Model.js";

import {Follow} from "../Models/Follow.Model.js";
export const getprofile=async(req,res)=>{
    //get user and send with no password and no rerfeshtoken
    //all tweets,medias,likes,followers,following
    const {userid}=req.params;
    if (!userid) {
        throw new ApiError(400, "User ID is required");
    }
    const user = await User.findById(userid).select("-password -refreshtoken").lean();
    //tweets with media 
    const tweets = await Tweet.find({ owner: user._id }).populate('owner').lean();
    
    //likes
    
    
    //followers
    const followers = await Follow.find({ account: user._id });
    //following
    const following = await Follow.find({ follower: user._id });
    return res.status(200).json(
        new ApiResponse(200,{user,followers,following,tweets,},"user profile")
    )
}
export const getallusers=async(req,res)=>{
    //get all users except the logged in user
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password -refreshtoken").lean();
    if (!users || users.length === 0) {
        throw new ApiError(404, "No users found");
    }
    return res.status(200).json(new ApiResponse(200, users, "All users fetched successfully"));
}
