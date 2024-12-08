import { bucketDb, minioClient } from "@/server";
import express from "express"
export const V1Router = express.Router()

V1Router.get('/projects', async (req, res) => {
    try {
        const projectsCollection = bucketDb.collection("projects");
        const projects = await projectsCollection.find({}).toArray();

        res.json({
            success: true,
            projects,
        });
    } catch (error) {
        console.error('Error fetching projects:', error);

        res.status(500).json({
            success: false,
            message: 'Error fetching projects',
        });
    }
});

V1Router.get('/buckets', async (req, res) => {
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

V1Router.get('/objects', async (req, res) => {
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
