import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  companyName:{
   type:String,
   required:true
  }, 
  date: Date,
  student: { 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Student' 
    } // Reference to the student
});

export const Interview =mongoose.model('Interview', interviewSchema);
