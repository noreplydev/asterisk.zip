import { spawn } from 'child_process';
import dotenv from 'dotenv';
import { RunBlobStorage } from './blobs.js';

dotenv.config({ path: '../../.env' });
RunBlobStorage()

export function runCommand(command, args, name) {
  const process = spawn(command, args);

  process.stdout.on('data', (data) => {
    console.log(`[${name} stdout]: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`[${name} stderr]: ${data}`);
  });

  process.on('close', (code) => {
    console.log(`${name} process exited with code ${code}`);
  });

  process.on('error', (err) => {
    console.error(`Failed to start ${name} process:`, err);
  });

  return process;
}