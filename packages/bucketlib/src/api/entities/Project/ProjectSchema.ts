import { z } from "zod";

export const ProjectSchema = z.object({
    "name": z.string()
}).passthrough() // temporal while understanding the domain

export type ProjectType = z.infer<typeof ProjectSchema>;