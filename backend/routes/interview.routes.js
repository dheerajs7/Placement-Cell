import express from  "express";
import { addInterview, allocateInterviewPage, deleteInteriew, getInterview, updateInterviewResult } from "../controller/interview.controller.js";
import { isAuthenticate } from "../middeleware/auth.middleware.js";


const interviewRouter = express.Router()

//routes to add new interview comany and allocate to student
interviewRouter.route('/addinterview').post(isAuthenticate, addInterview);

//route to get the schedule interview of students
interviewRouter.route('/getinterview').get(isAuthenticate,getInterview)

//route to view the allocate interview page
interviewRouter.get('/allocate', isAuthenticate,allocateInterviewPage);

//route to update the interview results
interviewRouter.post('/update-interview-result/:interviewId/:studentId',isAuthenticate, updateInterviewResult);

//route to delete the interview
interviewRouter.post('/delete/:interviewId/:studentId',isAuthenticate,deleteInteriew);



export {interviewRouter}