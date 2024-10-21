import { Admin } from "../model/admin.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import fs from 'fs'
import { Student } from "../model/student.model.js";
import { Interview } from "../model/interview.model.js";
import fastcsv from 'fast-csv'



// import { asyncHandler } from "../utils/asyncHandler.js";
function isEmployeeEmail(email) {
    return email.endsWith('@cn.com');
}

const signUpAdmin = async(req,res)=>{

    const {name,email,password} = req.body;

    if (!isEmployeeEmail(email)) {
        return res.status(401).render('signup', { message: "Not authorised to signup" ,showNavbar:false});
        
      }
   
    const ifAdminExist = await Admin.findOne({email})

    if (ifAdminExist) {
        return res.redirect('/signin');
    }
    if (password.length < 8) {
        return res.status(401).render('signup', { message: "Password must be at least 8 characters long" ,showNavbar:false});
        
      }
   
      const hashedPassword = await bcrypt.hash(password,10)

     const admin =new Admin({
        name,
        email,
        password:hashedPassword
     })

     await admin.save()

     res.redirect('/signin'); 
}

const loginAdmin = async(req,res)=>{
try{
    const {email,password} =req.body;
    const validAdmin = await Admin.findOne({email})
    
    if (!validAdmin) {
        return res.status(401).render('signin', { message: "Please register First", showNavbar: false});
        
    }

    const validPassword = await bcrypt.compare(password,validAdmin.password)

    if (!validPassword) {
        return res.status(401).render('signin', { message: "Password does not match!!", showNavbar:false});
        
    }
    const token = jwt.sign({id:validAdmin._id},process.env.JWT_SECRET)
    
     
    res.cookie("access_token",token,{httpOnly:true})
    
   const students = await Student.find();

    res.status(201).render('dashboard',
        {message:"User Logged in Successfully",validAdmin, students,showNavbar: true})
}
catch(err){
    return res.status(401).render('signin', { message: "Error logging in",showNavbar: false});
    
}
}

const logout =(req,res)=>{
    try {
        res.clearCookie("access_token")

        return res.status(200).render('signin', { message: "Logout Successfully",showNavbar: false});
    } catch (error) {
        return res.status(401).render('dashboard', { message: "Error logging in",showNavbar: true});
}
}

// Helper to get directory name in ES6
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const downloadCSV = async (req, res) => {
    try {
        // Fetch students and populate interviews and results
        const students = await Student.find({})
            .populate('interviews', 'companyName date result') // Populate interviews with company and date
            // .populate('result',);    // Populate results with company and date

        // Initialize CSV string with header
        let csv = 'S.No, Name, Email, Batch, College, Placement Status, DSA Score, WebDev Score, React Score, Interview Company, Interview Date, Result';

        let no = 1;

        // Iterate through students
        for (let student of students) {
            // Concatenate basic student details with course scores
            let data = `${no},${student.name},${student.email},${student.batch},${student.college || 'N/A'},${student.placement_status || 'N/A'},${student.courseScores.dsaFinalScore || 'N/A'},${student.courseScores.webDFinalScore || 'N/A'},${student.courseScores.reactFinalScore || 'N/A'}`;

            // If there are interviews, append company and date
            if (student.interviews.length > 0) {
                for (let interview of student.interviews) {
                    data += `,${interview.companyName || 'N/A'},${interview.date ? interview.date.toISOString().split('T')[0] : 'N/A'},${interview.result || 'N/A'}`;
                }
            } else {
                data += ',N/A,N/A'; // No interviews, default values
            }


            // Increment the serial number
            no++;
            csv += '\n' + data; // Add the data row to the CSV string
        }

        // Write the CSV string to a file
        fs.writeFileSync('csv/data.csv', csv);

        console.log('CSV report generated successfully');
        // Send the CSV file to the client for download
        return res.download('csv/data.csv');
    } catch (error) {
        console.log(`Error in generating CSV file: ${error.message}`);
        res.status(500).send('Error in downloading CSV');
    }
};








export {signUpAdmin,loginAdmin,logout,downloadCSV}