import moment from "moment";
import { Interview } from "../model/interview.model.js";
import { Student } from "../model/student.model.js";

const addInterview = async(req,res)=>{
 try{
    
    const {companyName,date} =req.body;
     
    const formattedDate = moment(date, 'DD/MM/YY').toDate();

    if (!formattedDate || isNaN(formattedDate)) {
        return res.status(400).json({ message: "Invalid date format" });
    }

     const company = await Interview.findOne({companyName})
    
     console.log(company)
     if (company) {
        return res.status(405).json({
            message: "Company already added"
        })
    }
   
    const interview = new Interview({
        companyName,
        date:formattedDate
    })

    await interview.save()

    return res.status(201).json({message:"Company Added Successfully"})

  }catch(error){
   return res.status(500).json({ message: error.message });
}
}

const getInterview = async(req,res)=>{
    try{
        const interview = await Interview.find()
        return res.status(200).json({interview})
        }catch(error){
            return res.status(500).json({ message: error.message });
            }
}


const allocateInterview = async (req, res) => {
    try {
        
        const interviewId = req.params.id;
        const { studentName} = req.body;
    
        
        // Find the student and interview using their respective IDs
        const student = await Student.findOne({studentName});
        const interview = await Interview.findById(interviewId);
         
    //    console.log(interview)
       

        if (!student || !interview) {
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

        return res.status(200).json({
            message: "Interview allocated to student successfully",
            student,
            interview
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export {addInterview,getInterview,allocateInterview}