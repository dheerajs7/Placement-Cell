//Interview Model schema

import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  companyName:{
   type:String,
   required:true
  }, 
  date: Date,

  students: [{ 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Student' 
    }],// Reference to the student

    result:{ type: String,
      enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'],
       default: 'Didn’t Attempt' }
});

export const Interview =mongoose.model('Interview', interviewSchema);
