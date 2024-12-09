import { storage } from "@/server";
import express from "express"
export const V1Router = express.Router()

V1Router.get('/projects', async (req, res) => {
    try {
        const projects = await storage.getProjects()

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
