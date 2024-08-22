import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const TIME_LIMIT = 5000; // 1 second timeout
const OUTPUT_LIMIT = 900 * 10; // 10 KB limit

export const executeCpp = (filepath, inputPath) => {
  const jobId = path.basename(filepath, path.extname(filepath));
  const outPath = path.join(outputPath, `${jobId}.out`);
  const inputFile = inputPath ? `< "${inputPath}"` : '';

  const compileCommand = `g++ "${filepath}" -o "${outPath}"`;
  const runCommand = `"${outPath}" ${inputFile}`;

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Time limit exceeded')), TIME_LIMIT)
  );

  return Promise.race([
    new Promise((resolve, reject) => {
      exec(`${compileCommand} && ${runCommand}`, { maxBuffer: OUTPUT_LIMIT }, (error, stdout, stderr) => {
        if (error) {
          if (error.message.includes('maxBuffer')) {
             // Handle output limit exceeded
            return reject(new Error('Too much output'));
          }
          console.error(`Execution error: ${error.message}`);
          console.error(`stderr: ${stderr}`);
          return reject({ error: error.message, stderr });
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return reject(stderr);
        }
        resolve(stdout);
      });
    }),
    timeoutPromise
  ]);
};

export default executeCpp;
