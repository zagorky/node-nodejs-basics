import {createWriteStream} from "node:fs";
import {getPathData, throwError} from "../utils.js";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";
import {join} from "node:path";

const {dirName} = getPathData(import.meta.url)

const fileToWritePath = join(dirName, filesDirectory, 'fileToWrite.txt')


const write = async () => {
    process.stdout.pipe(createWriteStream(fileToWritePath))
        .on('error', (error) => throwError({
            message: ERROR_MESSAGES.STREAM_OPERATION_FAILED,
            cause: error
        }))
}

await write();
