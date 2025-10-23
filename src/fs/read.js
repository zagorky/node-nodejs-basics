import {getPathData, isFileExists, throwError} from "../utils.js";
import {join} from "node:path";
import {readFile} from 'node:fs/promises'
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";

const {dirName} = getPathData(import.meta.url)
const fileToReadPath = join(dirName, filesDirectory, 'fileToRead.txt')

const read = async () => {
    const isSourceFileExists = await isFileExists({path: fileToReadPath})
    if (!isSourceFileExists) {
        throwError({
            message: ERROR_MESSAGES.FS_OPERATION_FAILED,
            cause: new Error(`Source file doesn't exist`)
        })
    }

    readFile(fileToReadPath, {encoding: 'utf-8'}).then(console.log).catch((error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error
    }))
};

await read();
