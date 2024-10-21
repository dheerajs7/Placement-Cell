import { Student } from "../model/student.model.js";


// Add new student 
const addStudent = async(req,res)=>{
   try{
    const{name,email,batch,college,placement_status,courseScores}=req.body;
    const isExist = await Student.findOne({email});

    if (isExist) {
        return res.status(400).json({message:"Student already added"})
    }

    const students = new Student({
        name,
        email,
        batch,
        college,
        placement_status,
        courseScores
    })

    await students.save();
    return res.redirect('/dashboard');
   }catch(error){
    return res.status(500).json({message:error.message});
   }
}

//Get all the student to show them
const getAllStudent = async(req,res)=>{
try { 
    const students = await  Student.find()
    
    if (!students) {
        return res.status(404).json({
            message: "No students found"
        })
    }

    res.status(201).render('dashboard', {students,showNavbar: true});
        
}catch (error) {
    return res.status(500).json({message:error.message});
    }
}

//update the placement status of students
const updatePlacementStatus = async (req, res) => {
    try {
        const studentId = req.params.id;
        const { placement_status } = req.body;

        // Find the student by ID and update the placement status
        await Student.findByIdAndUpdate(studentId, { placement_status });

        return res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating placement status' });
    }
};

//Delete  existing student 
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id; // Get the student ID from the request parameters

        // Find the student by ID and remove it
        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Redirect to the student list after successful deletion
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while deleting student');
    }
};



export{addStudent,getAllStudent,updatePlacementStatus,deleteStudent}