import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    bio:{
        type: String,
    },
    avatar_url: {
        type: String,
    },
    password_hash: {
        type: String,
        required: true
    },
    varified:{
        type: Boolean,
        default: false
    },
    refresh_token:{
        type:String,
        default:null
    }
}, {
    timestamps: true
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password_hash')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password_hash = await bcrypt.hash(this.password_hash, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password_hash);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({id:this._id,username:this.username},process.env.ACCESS_TOKEN_SECRET_KEY,{
        expiresIn:'1h'
    });
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({id:this._id,username:this.username},process.env.REFRESH_TOKEN_SECRET_KEY,{
        expiresIn:'20day'
    });
}
export const User=mongoose.model('User',userSchema);