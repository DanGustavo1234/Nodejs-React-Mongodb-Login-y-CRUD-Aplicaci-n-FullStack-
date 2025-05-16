import express from 'express';
import morgan from 'morgan';
import routerAuth from './routes/auth.routes.js';
import routerTask from './routes/task.routes.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api",routerAuth);
app.use("/api",routerTask);


export default app;

