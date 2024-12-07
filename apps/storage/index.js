import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const MINIO_EXECUTABLE = 'minio'; // assumes minio binary is on the $path 
const MINIO_DATA_DIR = process.env.STORAGE_DATA_DIR ?? "~/";

process.env.MINIO_ROOT_USER = process.env.STORAGE_ROOT_USER ?? "changeme"
process.env.MINIO_ROOT_PASSWORD = process.env.STORAGE_ROOT_PASSWORD ?? "changeme"


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
