import { MongoClient, Db as MongoDb } from "mongodb";
import * as Minio from 'minio';

async function genDocumentDb(): Promise<MongoDb> {
    const mongoUri = process.env.MONGO_URI || "mongodb://admin:password@127.0.0.1:27017";
    const client = new MongoClient(mongoUri);
    await client.connect();
    return client.db("bucket");
}

function genBlobDb(): Minio.Client {
    return new Minio.Client({
        endPoint: process.env.STORAGE_ENDPOINT || 'localhost',
        port: parseInt(process.env.STORAGE_PORT, 10) || 9000,
        useSSL: process.env.STORAGE_USE_SSL === 'true',
        accessKey: process.env.STORAGE_ACCESS_KEY || '',
        secretKey: process.env.STORAGE_SECRET_KEY || '',
        sessionToken: process.env.STORAGE_SESSION_TOKEN,
    });
}

export class Storage {
    private blobDb: Minio.Client;
    private documentDb: MongoDb;

    private constructor(blobDb: Minio.Client, documentDb: MongoDb) {
        this.blobDb = blobDb;
        this.documentDb = documentDb;
    }

    static async create(): Promise<Storage> {
        const blobDb = genBlobDb();
        const documentDb = await genDocumentDb();
        return new Storage(blobDb, documentDb);
    }

    async getProjects() {
        const projectsCollection = this.documentDb.collection("projects");
        const projects = await projectsCollection.find({}).toArray();
        return projects
    }
}


// GET BUCKETS OF A MINIO SERVER
// -----------------------------
// const buckets = await minioClient.listBuckets();
// const bucketNames = buckets.map(bucket => bucket.name);

// res.json({
//     success: true,
//     buckets: bucketNames,
// });

// GET OBJECTS OF A GIVEN BUCKET IN MINIO
// --------------------------------------
// const objects = [];
// const stream = minioClient.listObjectsV2(bucket.toString(), '', true);

// stream.on('data', obj => objects.push(obj.name));
// stream.on('error', err => {
//     res.status(500).json({
//         success: false,
//         message: 'Error retrieving objects',
//         error: err.message,
//     });
// });
// stream.on('end', () => {
//     res.json({
//         success: true,
//         objects,
//     });
// }