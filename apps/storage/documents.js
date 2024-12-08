import { execSync } from 'child_process';
import { runCommand } from './index.js';

export function RunDocumentDatabase() {
  const MONGO_CONTAINER_NAME = 'mongodb';
  const MONGO_PORT = process.env.MONGO_PORT ?? "27017";
  const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME ?? "admin";
  const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD ?? "password";

  try {
    // Check if the container exists
    const existingContainer = execSync(`docker ps -aq -f name=${MONGO_CONTAINER_NAME}`).toString().trim();
    if (existingContainer) {
      console.log(`Removing existing container with name "${MONGO_CONTAINER_NAME}"`);
      execSync(`docker rm -f ${MONGO_CONTAINER_NAME}`);
    }
  } catch (error) {
    console.error('Error checking/removing existing container:', error.message);
  }

  runCommand('docker', [
    'run', // if you want to run mongodb in detached mode uncomment this: '-d',
    '--name', MONGO_CONTAINER_NAME,
    '-p', `${MONGO_PORT}:27017`,
    '-e', `MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME}`,
    '-e', `MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}`,
    'mongo'
  ], 'MongoDB');
}
