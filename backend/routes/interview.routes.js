import express from  "express";
import { addInterview, allocateInterview, getInterview } from "../controller/interview.controller.js";


const interviewRouter = express.Router()


interviewRouter.route('/addinterview').post(addInterview);
interviewRouter.route('/getinterview').get(getInterview)
interviewRouter.route('/allocateinterview/:id').post(allocateInterview)

export {interviewRouter}