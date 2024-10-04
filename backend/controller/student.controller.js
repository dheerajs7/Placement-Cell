import { Student } from "../model/student.model.js";



const addStudent = async(req,res)=>{

    const{name,email,batch,college,placement_status,courseScores}=req.body;
    const isExist = await Student.findOne({email});

    if (isExist) {
        return res.status(400).json({message:"Student already added"})
    }

    const student = new Student({
        name,
        email,
        batch,
        college,
        placement_status,
        courseScores
    })

    await student.save();
    return res.status(201).json({student, message:"Student addded successfully"});

}

const getAllStudent = async(req,res)=>{

    const students = await  Student.find({}).select('name batch');
    
    if (!students) {
        return res.status(404).json({
            message: "No students found"
        })
    }

    return res.status(200).json({
        students,
        
    })
}


export{addStudent,getAllStudent}