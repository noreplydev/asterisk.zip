import express from 'express';
import dotenv from 'dotenv';
import * as Minio from 'minio';
import { V1Router } from './routes/v1';

dotenv.config({ path: '../../.env' });
const app = express();

app.use("/v1", V1Router)

const PORT = process.env.API_PORT ?? 5544;
app.listen(PORT, () => {
    console.log(`Bucket listening on http://localhost:${PORT}`);
});

// exported api context handlers
export const minioClient = new Minio.Client({
    endPoint: process.env.STORAGE_ENDPOINT || 'localhost',
    port: parseInt(process.env.STORAGE_PORT, 10) || 9000,
    useSSL: process.env.STORAGE_USE_SSL === 'true',
    accessKey: process.env.STORAGE_ACCESS_KEY,
    secretKey: process.env.STORAGE_SECRET_KEY,
    sessionToken: process.env.STORAGE_SESSION_TOKEN || null,
});