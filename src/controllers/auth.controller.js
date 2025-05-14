import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js";


export const login=async (req, res) => {
    res.send(`<h1>LOGIN PAGE</h1>`)
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
        const token= await createAccessToken({
            id:userSave._id
        })
    }catch(error){
        console.log("Error creating user",error);
        return res.status(500).send("Error creating user");
    }
}

