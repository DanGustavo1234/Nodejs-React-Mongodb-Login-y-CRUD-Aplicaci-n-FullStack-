import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middeware.js";
import { createTaskSchema } from "../schemas/task.schema.js"; 
import {getTasks,createTask,getTask,deleteTask,updateTask} from '../controllers/task.controller.js';

const routerTask=Router();

routerTask.get('/tasks',authRequired,getTasks)
routerTask.get('/tasks/:id',authRequired,getTask)
routerTask.post('/tasks',validateSchema(createTaskSchema),authRequired,createTask)
routerTask.delete('/tasks/:id',authRequired,deleteTask)
routerTask.put('/tasks/:id',authRequired,updateTask)

export default routerTask;