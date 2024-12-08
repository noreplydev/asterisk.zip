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

app.get('/buckets', async (req, res) => {
    try {
        const buckets = await minioClient.listBuckets();
        const bucketNames = buckets.map(bucket => bucket.name);

        res.json({
            success: true,
            buckets: bucketNames,
        });
    } catch (error) {
        console.error('Error listing buckets:', error);

        res.status(500).json({
            success: false,
            message: 'Error listing buckets',
            error: error.message,
        });
    }
});

app.get('/objects', async (req, res) => {
    const { bucket } = req.query;

    if (!bucket) {
        return res.status(400).json({
            success: false,
            message: 'Bucket name is required',
        });
    }

    try {
        const objects = [];
        const stream = minioClient.listObjectsV2(bucket.toString(), '', true);

        stream.on('data', obj => objects.push(obj.name));
        stream.on('error', err => {
            res.status(500).json({
                success: false,
                message: 'Error retrieving objects',
                error: err.message,
            });
        });
        stream.on('end', () => {
            res.json({
                success: true,
                objects,
            });
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving objects',
            error: error.message,
        });
    }
});

const PORT = process.env.API_PORT ?? 5544;
app.listen(PORT, () => {
    console.log(`Bucket listening on http://localhost:${PORT}`);
});
