import { MongoClient, Db as MongoDb } from "mongodb";
import * as Minio from 'minio';

async function genDocumentDb() {
    const mongoUri = process.env.MONGO_URI || "mongodb://admin:password@127.0.0.1:27017";
    const client = new MongoClient(mongoUri);
    await client.connect();
    return client.db("bucketDb")
}

function genBlobDb() {
    return new Minio.Client({
        endPoint: process.env.STORAGE_ENDPOINT || 'localhost',
        port: parseInt(process.env.STORAGE_PORT, 10) || 9000,
        useSSL: process.env.STORAGE_USE_SSL === 'true',
        accessKey: process.env.STORAGE_ACCESS_KEY,
        secretKey: process.env.STORAGE_SECRET_KEY,
        sessionToken: process.env.STORAGE_SESSION_TOKEN || null,
    });
}

export class Storage {
    private blobDb: Minio.Client;
    private documentDb: MongoDb;
    private initialized: boolean;

    constructor() {
        this.init()
    }

    async init(): Promise<void> {
        this.blobDb = genBlobDb()
        this.documentDb = await genDocumentDb()
        this.initialized = true
    }
}