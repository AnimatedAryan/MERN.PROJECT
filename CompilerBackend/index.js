import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import Problem from './models/Problem.js';
import { generateFile } from './generateFile.js';
import { generateInputFile } from './generateInputFile.js';
import {executeCpp} from './executeCpp.js';
import executePython from './executePy.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;
const allowedOrigins = JSON.parse(process.env.CORS_ALLOWED_ORIGINS|| '[]');
const mongoURI = process.env.MONGO_URI;
// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins, 
  credentials: true,
}));

// MongoDB connection

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
// Example route
app.get("/", (req, res) => {
    res.json({ online: 'compiler' });
});

// /run route
app.post('/submit', async (req, res) => {
    const { language = 'cpp', code, problemId } = req.body;
    console.log("REACHED HERE 1");

    if (!language || !code || !problemId) {
        return res.status(400).json({ success: false, error: 'Missing required fields!' });
    }
    console.log("REACHED HERE 2");
    try {
        const problem = await Problem.findById(problemId).populate('Sampletestcases');
        console.log("REACHED HERE 3");
        if (!problem) {
            return res.status(404).json({ success: false, error: 'Problem not found!' });
        }
        console.log("REACHED HERE 4");
        const { Sampletestcases } = problem;
        console.log("REACHED HERE 5");
        const filePath = await generateFile(language, code);
        console.log("REACHED HERE 6");
        const results = [];
        console.log("REACHED HERE 7");

        for (const [index, testCase] of Sampletestcases.entries()) {
            const inputPath = await generateInputFile(testCase.input);
            let output;

            switch (language) {
                case 'cpp':
                    output = await executeCpp(filePath, inputPath);
                    console.log("reached here");
                    break;
                case 'py':
                    output = await executePython(filePath, inputPath);
                    break;
                default:
                    return res.status(400).json({ success: false, error: 'Unsupported language!' });
            }
            console.log("REACHED HERE 8");
            const processedOutput = output.trim();
            const passed = processedOutput === testCase.output.trim();
            results.push({
                testCaseIndex: index + 1,
                input: testCase.input,
                expectedOutput: testCase.output.trim(),
                actualOutput: processedOutput,
                passed
            });
            console.log("REACHED HERE 9");
            if (!passed) {
                console.log(`Test case ${index + 1} failed.`);
            }
        }
        console.log("REACHED HERE 10");
        const allTestCasesPassed = results.every(result => result.passed);
        const verdict = allTestCasesPassed ? 'All test cases passed' : 'Some test cases failed';
        res.json({ results, verdict });

    } catch (error) {
        if (error.message === 'Time limit exceeded') {
            return res.status(500).json({ success: false, verdict: 'Time limit exceeded' });
        }
        console.error('Server error:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/run', async (req, res) => {
    let { language, code, input } = req.body;
    console.log("REACHED HERE 1");
    if (!language || !code) {
      return res.status(400).json({ success: false, error: 'Missing required fields!' });
    }
    console.log("REACHED HERE 2");
    if(language=='python')
    {
        language='py';
    }
    console.log("REACHED HERE 3");
  
    try {
      const filePath = await generateFile(language, code);
      const inputPath = await generateInputFile(input);
      let output;
      switch (language) {
        case 'cpp':
          output = await executeCpp(filePath, inputPath);
          break;
        case 'py':
          output = await executePython(filePath, inputPath); // Implement executePython similarly
          break;
        default:
          return res.status(400).json({ success: false, error: 'Unsupported language!' });
      }
      console.log("REACHED HERE 3");
      res.json({ success: true, output });
    } catch (error) {
      // Check if headers have already been sent
      if (!res.headersSent) {
        if (error.message === 'Time limit exceeded'){
          console.log(error.message);
          return res.status(408).json({ success: false, verdict: 'Time limit exceeded' });
        } else if (error.message === 'Too much output') {
          console.log(error.message);
          return res.status(413).json({ success: false, verdict: 'Too much output' });
      
        } else {
          console.log("THIS WAS EXECUTED");
          console.log(error.message);
          return res.status(500).json({ success: false, error: error.message });
        }
      }
    }
  });
// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
