import { Router } from "express";
import {login,register,logout,profile} from '../controllers/auth.controller.js';
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middeware.js";
import {loginSchema,registerSchema} from '../schemas/auth.schema.js';


const routerAuth=Router();

routerAuth.get('/',(req,res)=>{
    res.send(`<h1>AUTH PAGE</h1>`)
})

routerAuth.post('/login',validateSchema(loginSchema),login)

routerAuth.post('/register',validateSchema(registerSchema),register)

routerAuth.post('/logout',logout)

// routerAuth.get('/verify-token',authRequired,(req,res)=>{
//     res.json({message:"Token is valid"})
// })

routerAuth.get('/profile',authRequired,profile)


export default routerAuth;