import {access, writeFile} from 'node:fs/promises'
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isFileExists = async (filePath) => {
    try {
        await access(filePath)
        throw new Error('FS operation failed')
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error
        }
    }
}

const create = async () => {
    try {
        const data = 'I am fresh and young'
        const filePath = join(__dirname, 'files', 'fresh.txt');
        await isFileExists(filePath)
        await writeFile(filePath, data)
    } catch (error) {
        console.log(error.message)
    }
};

await create();
