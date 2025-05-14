
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";


export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload,JWT_SECRET,{
            expiresIn:"1d"
        },
        (err,token)=>{
            if(err){
                console.log("Error generating token",err);
                return res.status(500).send("Error generating token");
            }
            res.cookie("token",token)
            res.json({
                message:"User created successfully",
            })
        }
    )
    })
}

