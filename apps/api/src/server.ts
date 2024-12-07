import express from 'express';
import dotenv from 'dotenv';
import * as Minio from 'minio';

dotenv.config({ path: '../../.env' });
const app = express();

const minioClient = new Minio.Client({
    endPoint: process.env.STORAGE_ENDPOINT || 'localhost',
    port: parseInt(process.env.STORAGE_PORT, 10) || 9000,
    useSSL: process.env.STORAGE_USE_SSL === 'true',
    accessKey: process.env.STORAGE_ACCESS_KEY,
    secretKey: process.env.STORAGE_SECRET_KEY,
    sessionToken: process.env.STORAGE_SESSION_TOKEN || null,
});

app.get('/entries', async (req, res) => {
    try {
        const buckets = await minioClient.listBuckets();
        const bucketNames = buckets.map(bucket => bucket.name);

        res.json({
            success: true,
            buckets: bucketNames,
        });
    } catch (error) {
        console.error('Error al listar los buckets:', error);

        res.status(500).json({
            success: false,
            message: 'Error al listar los buckets',
            error: error.message,
        });
    }
});

const PORT = process.env.API_PORT ?? 5544;
app.listen(PORT, () => {
    console.log(`Bucket listening on http://localhost:${PORT}`);
});
