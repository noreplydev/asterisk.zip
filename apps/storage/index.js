import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const MINIO_EXECUTABLE = 'minio'; // assumes minio binary is on the $path 
const MINIO_DATA_DIR = process.env.STORAGE_DATA_DIR ?? "~/";
const MINIO_ACCESS_KEY = process.env.STORAGE_ACCESS_KEY;
const MINIO_SECRET_KEY = process.env.STORAGE_SECRET_KEY;

process.env.MINIO_ACCESS_KEY = MINIO_ACCESS_KEY;
process.env.MINIO_SECRET_KEY = MINIO_SECRET_KEY;


const minioProcess = spawn(MINIO_EXECUTABLE, ['server', MINIO_DATA_DIR]);

minioProcess.stdout.on('data', (data) => {
  console.log(`[MinIO stdout]: ${data}`);
});

minioProcess.stderr.on('data', (data) => {
  console.error(`[MinIO stderr]: ${data}`);
});

minioProcess.on('close', (code) => {
  console.log(`MinIO process exited with code ${code}`);
});

minioProcess.on('error', (err) => {
  console.error('Failed to start MinIO process:', err);
});
