import dotenv from 'dotenv';
import { runCommand } from './index.js';

export function RunBlobStorage() {
  const MINIO_EXECUTABLE = 'minio'; // assumes minio binary is on the $PATH
  const MINIO_DATA_DIR = process.env.STORAGE_DATA_DIR ?? "~/";
  process.env.MINIO_ROOT_USER = process.env.STORAGE_ROOT_USER ?? "changeme";
  process.env.MINIO_ROOT_PASSWORD = process.env.STORAGE_ROOT_PASSWORD ?? "changeme";

  runCommand(MINIO_EXECUTABLE, ['server', MINIO_DATA_DIR], 'MinIO');
}