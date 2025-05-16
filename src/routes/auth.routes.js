import { Router } from "express";
import {login,register,logout,profile} from '../controllers/auth.controller.js';
import { authRequired } from "../middlewares/validateToken.js";


const routerAuth=Router();

routerAuth.get('/',(req,res)=>{
    res.send(`<h1>AUTH PAGE</h1>`)
})

routerAuth.post('/login',login)

routerAuth.post('/register',register)

routerAuth.post('/logout',logout)

routerAuth.get('/profile',authRequired,profile)


export default routerAuth;