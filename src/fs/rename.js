import {getPathData, isFileExists, renameFile, throwError} from "../utils.js";
import {join} from "node:path";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";


const properName = 'properFilename.md'
const wrongName = 'wrongFilename.txt'
const {dirName} = getPathData(import.meta.url);
const wrongNamePath = join(dirName, filesDirectory, wrongName);
const properNamePath = join(dirName, filesDirectory, properName);

const rename = async () => {

    const isSourceFileExists = await isFileExists({path: wrongNamePath})
    const isTargetFileExists = await isFileExists({path: properNamePath})

    if (!isSourceFileExists || isTargetFileExists) {
        throwError({
            message: ERROR_MESSAGES.FS_OPERATION_FAILED,
            cause: new Error(`Source file doesn't exist or target file already exists`)
        })
    }

    renameFile({source: wrongNamePath, destination: properNamePath}).catch((error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error
    }))
};

await rename();
