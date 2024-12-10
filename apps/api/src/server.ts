import express from 'express';
import dotenv from 'dotenv';
import { V1Router } from './routes/v1';
import { Storage } from '@bucketlib/api';

dotenv.config({ path: '../../.env' });

export const storage = await Storage.create()
const app = express();

app.use("/v1", V1Router)

const PORT = process.env.API_PORT ?? 5544;
app.listen(PORT, () => {
    console.log(`Bucket listening on http://localhost:${PORT}`);
});
