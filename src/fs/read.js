import {getPathData, throwError} from "../utils.js";
import {join} from "node:path";
import {createReadStream} from "node:fs";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";

const {dirName} = getPathData(import.meta.url)
const fileToReadPath = join(dirName, filesDirectory, 'fileToRead.txt')

const read = async () => {
    createReadStream(fileToReadPath).pipe(process.stdout).on('error', (error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error
    }))
};

await read();
