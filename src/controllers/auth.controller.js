import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js";



export const login=async (req, res) => {
    const {email,password}=req.body;
    try{

        const user=await User.findOne({email})

        if(!user){
            return res.status(400).send("User not found")
        }

        const isMatch= await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).send("Invalid password")
        }
        
        const token= await createAccessToken({id:user._id})
        res.cookie("token",token,{
            maxAge: 5000,
            httpOnly: true,
            secure: true,
        })
        res.status(201).json({
            message:"User logged in",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
            },
            token:token
        })
    }catch(error){
        return res.status(500).send("Error Logging in");
    }
}

export const register=async (req, res) => {
    const {email,password,username}=req.body;
    try{
        const passwordhash= await bcrypt.hash(password,10)
        const newuser= new User({
            username:username,
            email:email,
            password:passwordhash,
        })
        const userSave= await newuser.save()
        const token= await createAccessToken({id:userSave._id})
        res.cookie("token",token,{
            maxAge: 5000,
            sameSite: 'None',
            httpOnly: true,
            secure: false,
        })
        res.status(201).json({
            message:"User created",
            user:{
                id:userSave._id,
                username:userSave.username,
                email:userSave.email,
            },
            token:token
        })
    }catch(error){
        return res.status(500).send("Error creating user");
    }
}


export const logout=async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out"
    })
}


export const profile=async (req, res) => {
    const user= await User.findById(req.user.id)
    if(!user){
        return res.status(400).send("User not found")
    }
    res.status(200).json({
        message:"User profile",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt
        }
    })
}

