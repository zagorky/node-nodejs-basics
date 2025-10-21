import {writeFile} from 'node:fs/promises'
import {join} from 'node:path';
import {getPathData, throwError} from "../utils.js";

const data = 'I am fresh and young'
const errorMessage = 'FS operation failed'
const {dirName} = getPathData(import.meta.url);
const filePath = join(dirName, 'files', 'fresh.txt');

const create = async () => {
    writeFile(filePath, data, {flag: 'wx'}).catch((error) => throwError({
        message: errorMessage,
        cause: error,
    }))
};

await create();
