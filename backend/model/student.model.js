//Student model schema

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 batch:{
    type:String,
    required:true
 },
  college:{
    type:String,
  },
  placement_status:{
   type:String,
   enum:['placed','not_placed']
  },
  courseScores: {
   dsaFinalScore: Number,
   webDFinalScore: Number,
   reactFinalScore: Number
 },
 interviews: [
   { type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview' 
   }],
 result: [
   { type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview' 
   }]
})

export const Student = mongoose.model("Student",studentSchema)