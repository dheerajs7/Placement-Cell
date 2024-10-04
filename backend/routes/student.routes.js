import express from "express"
import { addStudent, getAllStudent } from "../controller/student.controller.js";

const studentRouter = express.Router()


studentRouter.route('/addstudent').post(addStudent);
studentRouter.route('/getstudents').get(getAllStudent);


export {studentRouter}