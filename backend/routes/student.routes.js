import express from "express"
import { addStudent, deleteStudent, getAllStudent, updatePlacementStatus } from "../controller/student.controller.js";
import { isAuthenticate } from "../middeleware/auth.middleware.js";


const studentRouter = express.Router()

//route to add new student
studentRouter.route('/addstudent').post(isAuthenticate, addStudent);

//route to view add student page
studentRouter.get('/addstudents',(req,res)=>{
    res.render('student', { validAdmin: req.user, showNavbar: true });
})

//route to view student list
studentRouter.route('/getstudents').get(isAuthenticate,getAllStudent);

//route to update the student placement status
studentRouter.post('/update-placement/:id', updatePlacementStatus)

//route to delete the student
studentRouter.delete('/delete/:id', deleteStudent);

export {studentRouter}