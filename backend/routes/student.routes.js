import express from "express"
import { addStudent, deleteStudent, getAllStudent, updatePlacementStatus } from "../controller/student.controller.js";
import { isAuthenticate } from "../middeleware/auth.middleware.js";


const studentRouter = express.Router()


studentRouter.route('/addstudent').post(isAuthenticate, addStudent);

studentRouter.get('/addstudent',(req,res)=>{
    res.render('student', { validAdmin: req.user, showNavbar: true });
})

studentRouter.route('/getstudents').get(isAuthenticate,getAllStudent);
studentRouter.post('/update-placement/:id', updatePlacementStatus)
studentRouter.delete('/delete/:id', deleteStudent);

export {studentRouter}