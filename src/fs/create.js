import {writeFile} from 'node:fs/promises'
import {join} from 'node:path';
import {getPathData, throwError} from "../utils.js";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";

const data = 'I am fresh and young'
const {dirName} = getPathData(import.meta.url);
const filePath = join(dirName, filesDirectory, 'fresh.txt');

const create = async () => {
    writeFile(filePath, data, {flag: 'wx'}).catch((error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error,
    }))
};

await create();
