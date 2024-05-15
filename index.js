import express from 'express';
import cors from 'cors';
import * as indexRouter from './src/modules/index.route.js';
import dotenv from 'dotenv';
import connectDB from './DB/connection.js';

const app=express();
dotenv.config();
connectDB();
app.use(express.json())
app.use(cors());

app.use(`${process.env.BaseUrl}auth`,indexRouter.authRouter)
app.use(`${process.env.BaseUrl}services`,indexRouter.servecesRouter)
app.use(`${process.env.BaseUrl}servicesByUser`,indexRouter.serverRouterbyUser)
app.use(`${process.env.BaseUrl}job`,indexRouter.jobRuteer)
app.use(`${process.env.BaseUrl}bag`,indexRouter.bagRouter)
app.use(`${process.env.BaseUrl}comment`,indexRouter.commentRouter)
app.use(`${process.env.BaseUrl}contact`,indexRouter.contactRouter)
app.use(`${process.env.BaseUrl}contactjob`,indexRouter.contactRouterjob)
app.use('*',(req,res)=>{
    res.status(400).json({message:"invalid page"})
})
app.listen(process.env.port,(req,res)=>{
    console.log(`Running server  ${process.env.port}`)
})  