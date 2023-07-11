import express from 'express'; 
import userRouter from './routes/usersRoutes.js';
import taskRouter from './routes/taskRouter.js';
import { configDotenv } from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import {errorMiddleware } from './middlewares/error.js';
import cors from 'cors';

export const app = express();

app.use(express.static(path.join(path.resolve(), "public"))) 

app.use(express.json());
app.use(cookieParser())
configDotenv({
    path:"./database/config.env"
})
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    method:["GET","POST","PUT","DELETE"],
    credentials:true,
}))
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);

app.use(errorMiddleware)

app.get('/', (req,res)=>{
    res.sendFile("index");
})
