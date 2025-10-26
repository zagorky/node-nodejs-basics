import {getPathData, throwError} from "../utils.js";
import {join} from "node:path";
import {createReadStream} from "node:fs";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";
import {pipeline} from "node:stream/promises";

const {dirName} = getPathData(import.meta.url)
const fileToReadPath = join(dirName, filesDirectory, 'fileToRead.txt')

const read = async () => {
    await pipeline(createReadStream(fileToReadPath), process.stdout, {end: false})
        .catch((error) => throwError({
            message: ERROR_MESSAGES.STREAM_OPERATION_FAILED,
            cause: error
        }));
};

await read();
