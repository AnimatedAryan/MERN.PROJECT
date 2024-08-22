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

const TIME_LIMIT = 5000; // 5 seconds timeout
const OUTPUT_LIMIT = 1024 * 10; // 10 KB limit

export const executePython = (filepath, inputPath) => {
  const jobId = path.basename(filepath, path.extname(filepath));
  const outPath = path.join(outputPath, `${jobId}.out`);
  const pythonCommand = `python "${filepath}"`;

  // Redirect input if provided
  const runCommand = inputPath ? `${pythonCommand} < "${inputPath}"` : pythonCommand;

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Time limit exceeded')), TIME_LIMIT)
  );

  return Promise.race([
    new Promise((resolve, reject) => {
      exec(`${runCommand} > "${outPath}"`, { maxBuffer: OUTPUT_LIMIT }, (error, stdout, stderr) => {
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
        // Read the output file
        fs.readFile(outPath, 'utf8', (err, data) => {
          if (err) {
            console.error(`Error reading output file: ${err}`);
            return reject(err);
          }
          resolve(data);
        });
      });
    }),
    timeoutPromise
  ]);
};

export default executePython;
