import moment from "moment";
import { Interview } from "../model/interview.model.js";
import { Student } from "../model/student.model.js";

const addInterview = async (req, res) => {
    try {
        const { studentName, companyName, interviewDate } = req.body;

        // Find the student by their name
        const students = await Student.findOne({ name: studentName });

        // If student is not found, return an error
        if (!students) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Validate the interview date
        const parsedDate = new Date(interviewDate);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Create a new Interview
        const interview = new Interview({
            companyName,
            date: parsedDate,
            students: [students._id], // Add the student's ID
        });

        // Save the interview to the database
        await interview.save();

        // Add the interview to the student's `interviews` array
        students.interviews.push(interview._id);

        // Save the updated student document
        await students.save();

        return res.redirect('/getinterview');
      
    } catch (error) {
        console.error("Error allocating interview:", error);
        res.status(500).json({ message: error.message });
    }
}

const getInterview = async(req,res)=>{
    try{
        const interview = await Interview.find().populate('students', 'name email');
        res.status(201).render('interview',
            {interview,showNavbar: true})
        }catch(error){
            return res.status(500).json({ message: error.message });
            }
}


const allocateInterview = async (req, res) => {
    try {

        const { studentName,interviewId} = req.body;
    
        
        // Find the student and interview using their respective IDs
        const student = await Student.findOne({studentName});
        const interview = await Interview.findById(interviewId);
         
    //    console.log(interview)
       

        if (!student) {
            return res.status(404).json({ message: "Student or Interview not found" });
        }
        

        // Add interview to student's interviews array (if not already present)
        if (!student.interviews.includes(interviewId)) {
            student.interviews.push(interviewId);
        }

        // Add student to interview's students array (if not already present)
        if (!interview.students.includes(student._id)) {
            interview.students.push(student._id);
        }

        // Save both updated documents
        await student.save();
        await interview.save();

        res.render('interview', {
            interview,
            students,
            showNavbar: true
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const allocateInterviewPage = async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all students

        
        res.render('allocate', {
            // interview,
            students,
            showNavbar: true
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const updateInterviewResult = async (req, res) => {
    const { interviewId, studentId } = req.params;
    const { result } = req.body;

    try {
        // Find the interview by its ID
        const interview = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        // Check if the student is part of this interview
        const studentIndex = interview.students.findIndex(student => student._id.toString() === studentId);

        if (studentIndex === -1) {
            return res.status(404).json({ message: 'Student not found in this interview' });
        }

        // Update the result for this student
        interview.result = result;

        // Save the updated interview
        await interview.save();

        return res.redirect('/interview/getinterview'); // Redirect back to the interview list or any desired page
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteInteriew = async (req, res) => {
    const { interviewId, studentId } = req.params;
    console.log(interviewId,studentId)
    try {
        // Find the interview and remove the student
        await Interview.findByIdAndUpdate(interviewId, {
            $pull: { students: studentId }
        });

        res.redirect('/dashboard'); // Redirect after deletion
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting interview');
    }
}


export {addInterview,getInterview,allocateInterview,allocateInterviewPage,updateInterviewResult,deleteInteriew}