import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import cors from "cors"
import connectDb from './utils/db.js';
import adminRouter from './routes/admin.routes.js';
import { studentRouter } from './routes/student.routes.js';


dotenv.config({
    path:'./env'
});

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

 app.use(express.json());
 app.use(express.urlencoded({extended:true}))
 
 app.use(cookieParser())
 
 app.use('/api/admin',adminRouter)
 app.use('/api',studentRouter)


const PORT = process.env.PORT 
app.listen(PORT,connectDb(),()=>{
        console.log(`server is running on port ${PORT}`)
})
// connectDb().then(()=>{
// app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`)
// // });
// })