import express from "express"
import { downloadCSV, loginAdmin, logout, signUpAdmin } from "../controller/admin.controller.js";
import { isAuthenticate } from "../middeleware/auth.middleware.js";
import { Student } from "../model/student.model.js";
import { Interview } from "../model/interview.model.js";

const adminRouter = express.Router()


adminRouter.get('/signup', (req, res) => {
    res.render('signup',  { showNavbar: false }); // Render signup page with no initial message
});

//call the signup function to regsiter new user
adminRouter.route("/signup").post(signUpAdmin)

adminRouter.get('/', (req, res) => {
res.render('signin',{ message:"Welcome!!",showNavbar: false }); // Render login page with no initial message
});

//call the signup function to login user
adminRouter.route("/signin").post(loginAdmin)

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

// call the logout function to logout the user 
adminRouter.route("/logout").get(logout)

// Assuming you have a function to fetch interviews
adminRouter.get('/getinterview', isAuthenticate, async(req, res) => {
    // Fetch interview details and students here and render the allocation page
    try{
        const interview = await Interview.find().populate('students', 'name email');
        res.render('interview', { validAdmin:req.user,interview,showNavbar: true });
    }catch(err){
        console.log(err);
    }
    
});

// Route to handle download  CSV file  
adminRouter.route('/download-csv').get(isAuthenticate,downloadCSV) 

export default adminRouter;