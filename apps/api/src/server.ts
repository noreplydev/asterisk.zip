import fs from 'fs'
import express from 'express'
import dotenv from 'dotenv'
import config from '../../../bucket.config.js'
import { Storage } from '@root/packages/persistence'


dotenv.config({ path: '../../.env' });
const app = express()
const bucketPath = process.argv[2] ?? process.cwd()
console.log('process', process.env.STORAGE_ACCESS_KEY)
const storage = new Storage(process.env.STORAGE_ACCESS_KEY, process.env.STORAGE_SECRET_KEY, false)

app.get("/entries", (req, res) => {
    const entries = fs.readdirSync(bucketPath, { withFileTypes: true })
    const augmentedEntries = entries.map(entry => {
        return {
            name: entry.name,
            type: entry.isDirectory() ? 'folder' : 'file'
        };
    });
    res.send(augmentedEntries)
})

app.listen(config.BUCKET_PORT, () => {
    console.log('Bucket listening on http://localhost:' + config.BUCKET_PORT)
})