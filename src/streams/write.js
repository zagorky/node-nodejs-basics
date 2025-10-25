import {createWriteStream} from "node:fs";
import {getPathData, throwError} from "../utils.js";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";
import {join} from "node:path";
import {pipeline} from "node:stream/promises";

const {dirName} = getPathData(import.meta.url)

const fileToWritePath = join(dirName, filesDirectory, 'fileToWrite.txt')


const write = async () => {
    await pipeline(process.stdin, createWriteStream(fileToWritePath))
        .catch((error) => throwError({
            message: ERROR_MESSAGES.STREAM_OPERATION_FAILED,
            cause: error
        }));
}

await write();
