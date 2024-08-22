import mongoose from "mongoose";
const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true }, 
  expectedOutput: { type: String, required: true }, 
  explanation: { type: String },
});
const SampletestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true }, 
  output: { type: String, required: true }, 
});


const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  testCases: [testCaseSchema],
  Sampletestcases:[SampletestCaseSchema],
  topic:{type: String, required:true},
  constraints:{type: [String],required:true},
});

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;