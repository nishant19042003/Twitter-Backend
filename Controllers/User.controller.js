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
