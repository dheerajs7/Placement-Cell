import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import cors from "cors"
import connectDb from './utils/db.js';
import adminRouter from './routes/admin.routes.js';
import { studentRouter } from './routes/student.routes.js';
import { interviewRouter } from './routes/interview.routes.js';
import ejsLayouts from 'express-ejs-layouts'
import methodOverride from 'method-override';




dotenv.config({
    path:'./env'
});

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.static('public'));
 app.use(express.json());
 app.use(express.urlencoded({extended:true}))
   
 app.set('view engine', 'ejs');
 app.set('views','./views');

 app.use(ejsLayouts);
 app.set('layout', 'layout'); 
 // Serve static files from 'public' folder
 app.use(methodOverride('_method'));

 app.use(cookieParser())
 
 app.use('/',adminRouter)
 app.use('/api',studentRouter)
 app.use('/interview',interviewRouter)


const PORT = process.env.PORT 
app.listen(PORT,connectDb(),()=>{
        console.log(`server is running on port ${PORT}`)
})
// connectDb().then(()=>{
// app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`)
// // });
// })