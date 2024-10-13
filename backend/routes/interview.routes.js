import express from  "express";
import { addInterview, allocateInterview, allocateInterviewPage, getInterview, updateInterviewResult } from "../controller/interview.controller.js";
import { isAuthenticate } from "../middeleware/auth.middleware.js";


const interviewRouter = express.Router()


interviewRouter.route('/addinterview').post(isAuthenticate, addInterview);
interviewRouter.route('/getinterview').get(isAuthenticate,getInterview)
// interviewRouter.route('/allocateinterview').post(isAuthenticate,allocateInterview)

// interviewRouter.get('/allocateinterview/:id',(req,res)=>{
//     res.render('allocate', { validAdmin: req.user, showNavbar: true });
// })
interviewRouter.get('/allocate', isAuthenticate,allocateInterviewPage);

interviewRouter.post('/update-interview-result/:interviewId/:studentId', updateInterviewResult);



export {interviewRouter}