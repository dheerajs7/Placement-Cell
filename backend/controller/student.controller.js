import { Student } from "../model/student.model.js";



const addStudent = async(req,res)=>{
   try{
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
   }catch(error){
    return res.status(500).json({message:error.message});
   }
}

const getAllStudent = async(req,res)=>{
try { 
    const students = await  Student.find({}).select('name batch');
    
    if (!students) {
        return res.status(404).json({
            message: "No students found"
        })
    }

    return res.status(200).json({
        students,
        
    })
}catch (error) {
    return res.status(500).json({message:error.message});
    }
}

const getStudentDetails = async(req,res)=>{
    try{
        const id = req.params.id;
        const student = await Student.findById(id).select('name email batch college placement_status courseScores');
        if (!student) {
            return res.status(404).json({
                message:"Error getting details"
            })
        }
        return res.status(200).json({student});

}catch(error){
   return res.status(404).json(err.message)
}
}


export{addStudent,getAllStudent,getStudentDetails}