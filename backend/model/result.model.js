import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  student: 
  { type: mongoose.Schema.Types.ObjectId,
     ref: 'Student' 
  },
  company: 
  { type: mongoose.Schema.Types.ObjectId,
     ref: 'Interview' }, // Links to the interview
  result:
   { type: String,
     enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'],
      default: 'Didn’t Attempt' }
});

const Result = mongoose.model('Result', resultSchema);
export default Result;
