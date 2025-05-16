import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";


const routerTask=Router();

routerTask.get('/task',authRequired,(req,res)=>{
    res.send(`<h1>TASK<h1>`)
})


export default routerTask;