import {join} from 'node:path';
import {copyDirectory, getPathData, throwError} from "../utils.js";

const errorMessage = 'FS operation failed'
const {dirName} = getPathData(import.meta.url)
const filesFolderPath = join(dirName, 'files')
const copyFilesFolderPath = join(dirName, 'files_copy')

const copy = async () => {
    copyDirectory({source: filesFolderPath, destination: copyFilesFolderPath}).catch((error) => throwError({
        message: errorMessage,
        cause: error,
    }))
};

await copy();

