import { Router } from "express";
import {login,register} from '../controllers/auth.controller.js';



const routerAuth=Router();

routerAuth.get('/',(req,res)=>{
    res.send(`<h1>AUTH PAGE</h1>`)
})

routerAuth.post('/login',login)

routerAuth.post('/register',register)


export default routerAuth;