import { User } from "../Models/User.Model.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
// Create a new user
export const createuser=async(req,res)=>{
    try{
        const {username,email,name,bio,avatar,password} = req.body;
        
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
            avatar_url: avatar,
            password_hash: password
        });
        await newUser.save();
        return res.status(201).json({message: 'User created successfully', user: newUser});
        
    }
    catch(error){
        throw new Error('Error creating user: ' + error.message);
    }
}
const generateAccessandrefreshtoken=async(user_id)=>{
     //find user
     const user=await User.findById(user_id);
     //user has methoed to generate the access and refresh token
     const refreshToken=user.generateRefreshToken();
     const accessToken=user.generateAccessToken();
     //update the refresh token of user
     user.refresh_token=refreshToken;
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
        throw new ApiError(400,"user not found")
    }

    //varify the password
    const isPasswordCorrect=await user.isPasswordCorrect(password);
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
export const refreshaccesstoken=async(req,res)=>{
    //incoming refresh token
    const incomingrefreshtoken=req.cookies.refreshToken||req.body.refreshtoken;
    //if authenticated then user will be there get user
    const id=req.user._id;
    const user=await User.findById(id);
    if(user.refresh_token!==incomingrefreshtoken){
        throw new ApiError(400,"bad request");
    }
    //generate new accesstoken 
    const {newaccesstoken,newRefreshToken}=await generateAccessandrefreshtoken(id);
    //update user
    //send that in res cookie
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.staus(200)
    .cookie("accesstoken",newaccesstoken,options)
    .cookie("refreshtoken",newrefreshtoken,options)
    .json(
        new ApiResponse(
            200,
            {newaccessToken, refreshToken: newRefreshToken},
            "Access token refreshed"
        )
    )
}
export const getvarification=async(req,res)=>{
    //find the user
    //update thr user
    //retun response
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
export const getprofile=async(req,res)=>{
    //get user and send with no password and no rerfeshtoken
}
