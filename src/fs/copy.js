import {join} from 'node:path';
import {copyDirectory, getPathData, throwError} from "../utils.js";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";

const {dirName} = getPathData(import.meta.url)
const filesFolderPath = join(dirName, filesDirectory)
const copyFilesFolderPath = join(dirName, 'files_copy')

const copy = async () => {
    copyDirectory({source: filesFolderPath, destination: copyFilesFolderPath}).catch((error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error,
    }))
};

await copy();

