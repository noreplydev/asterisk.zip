import { execSync } from 'child_process';
import { runCommand } from './index.js';

export function RunDocumentDatabase() {
  const MONGO_CONTAINER_NAME = 'mongodb';
  const MONGO_PORT = process.env.MONGO_PORT ?? "27017";
  const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME ?? "admin";
  const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD ?? "password";
  const MONGO_VOLUME_PATH = process.env.STORAGE_DOCUMENT_DIR

  if (!MONGO_VOLUME_PATH) {
    console.error("STORAGE_DOCUMENT_DIR envar not provided.")
    process.exit(1)
  }

  try {
    const containerExists = execSync(
      `docker ps -a -q -f name=^/${MONGO_CONTAINER_NAME}$`
    ).toString().trim();

    if (containerExists) {
      console.log(`Starting container with name: "${MONGO_CONTAINER_NAME}"`);
      runCommand('docker', [
        'start',
        '-ai', // attach STDOUT/STDERR and STDIN open
        MONGO_CONTAINER_NAME
      ], 'MongoDB');
    } else {
      console.log(`Creating and starting container with name: "${MONGO_CONTAINER_NAME}"`);
      runCommand('docker', [
        'run',
        '--name', MONGO_CONTAINER_NAME,
        '-p', `${MONGO_PORT}:27017`,
        '-e', `MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME}`,
        '-e', `MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}`,
        '-v', `mongo-data:${MONGO_VOLUME_PATH}`,
        'mongo'
      ], 'MongoDB');
    }
  } catch (error) {
    console.error('Error gestionando el contenedor de MongoDB:', error.message);
  }
}
