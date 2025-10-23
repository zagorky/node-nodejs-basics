import {getPathData, throwError} from "../utils.js";
import {join} from "node:path";
import {readFile} from 'node:fs/promises'
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";

const {dirName} = getPathData(import.meta.url)
const fileToReadPath = join(dirName, filesDirectory, 'fileToRead.txt')

const read = async () => {
    readFile(fileToReadPath, {encoding: 'utf-8'}).then(console.log).catch((error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error
    }))
};

await read();
