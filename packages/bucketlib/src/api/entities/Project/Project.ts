import { ProjectSchema } from "./ProjectSchema";

export class Project {
    name: string;

    constructor(name: string) {
        this.name = name
    }

    static load(rawObject): Project | null {
        const resultado = ProjectSchema.safeParse(rawObject);

        if (!resultado.success) {
            return null
        }

        return new Project(rawObject.name)
    }
}