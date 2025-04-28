import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try{
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({message:'Username and password are required'});
    }
    const hashedPassword=await bcrypt.hash(password,12);
    if(!hashedPassword){
        return res.status(500).json({message:'Failed to hash password'}); 
    }
    const user= new User({username,password:hashedPassword});
    if(!user){
        return res.status(500).json({message:'Failed to create user'});
    }
    await user.save();
    return res.status(200).json({success: true, message: 'User registered successfully', data: {userId: user._id, username:username}}); // Updated response format
}catch(error){
    console.error(error);
    return res.status(500).json({message:'Internal Server Error'});
}
};

export const login= async(req,res)=>{
    try{
        const {username,password}=req.body;
        if(!username ||!password){
            return res.status(400).json({success: false, message: 'Username and password are required'}); // Updated response format
        }
        const user = await User.findOne({username});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({success: false, message: 'Invalid credentials'}); // Updated response format
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        return res.status(200).json({success: true, token, userId: user._id}); // Updated response format

    }
    catch(error){
        console.error(error);
        return res.status(500).json({success: false, message: 'Internal Server Error'}); // Updated response format
    }
};