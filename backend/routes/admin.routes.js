import express from "express"
import { loginAdmin, logout, signUpAdmin } from "../controller/admin.controller.js";
import { isAuthenticate } from "../middeleware/auth.middleware.js";
import { Student } from "../model/student.model.js";

const adminRouter = express.Router()


adminRouter.get('/signup', (req, res) => {
    res.render('signup',  { showNavbar: false }); // Render signup page with no initial message
});

adminRouter.route("/signup").post(signUpAdmin)

adminRouter.get('/', (req, res) => {
res.render('signin',{ showNavbar: false }); // Render login page with no initial message
});


adminRouter.route("/signin").post(loginAdmin)



// adminRouter.get('/dashboard',isAuthenticate,(req,res)=> {
//     res.render('dashboard', { validAdmin: req.user, showNavbar: true })
// });
// Assuming you have a function to fetch students
adminRouter.get('/dashboard', isAuthenticate, async (req, res) => {
    try {
        // Fetch students from your database
        const students = await Student.find(); // Adjust this query to your schema

        // Render the dashboard view and pass the students data
        res.render('dashboard', { validAdmin: req.user, students, showNavbar: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


adminRouter.route("/logout").get(logout)

adminRouter.get('/allocateinterview/:id', isAuthenticate, (req, res) => {
    const interviewId = req.params.id;
    // Fetch interview details and students here and render the allocation page
    res.render('allocate', { interviewId, students: [], showNavbar: true });
});
// const students = await Student.find()
// adminRouter.get('/dashboard',isAuthenticate, (req, res) => {
//     res.render('dashboard', { validAdmin: req.user,students, showNavbar: true });
// });
export default adminRouter;