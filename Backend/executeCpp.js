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

export const executeCpp = (filepath, inputPath) => {
  const jobId = path.basename(filepath, path.extname(filepath));
  const outPath = path.join(outputPath, `${jobId}.exe`); // Use .exe for Windows
  const inputFile = inputPath ? `< "${inputPath}"` : '';

  // Use quotes around paths to handle spaces
  const compileCommand = `g++ "${filepath}" -o "${outPath}"`;
  const runCommand = `"${outPath}" ${inputFile}`; // Use quotes around executable path

  return new Promise((resolve, reject) => {
    exec(`${compileCommand} && ${runCommand}`, (error, stdout, stderr) => {
      if (error) {
        return reject({ error: error.message, stderr });
      }
      if (stderr) {
        return reject(stderr);
      }
      resolve(stdout); // Resolve with the standard output
    });
  });
};
export default executeCpp;