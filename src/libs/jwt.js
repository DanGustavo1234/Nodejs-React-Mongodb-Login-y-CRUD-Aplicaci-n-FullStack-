
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";


export function createAccessToken(payload) {
    
    return new Promise((resolve, reject) => {
        jwt.sign(payload,JWT_SECRET,{
            expiresIn:"1d"
        },
        (err, token) => {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        }
    )
    })
}

