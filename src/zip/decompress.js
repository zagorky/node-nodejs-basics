import {createGunzip} from "node:zlib";
import {createReadStream, createWriteStream} from "node:fs";
import {pipeline} from "node:stream/promises";
import {getPathData, throwError} from "../utils.js";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";
import {join} from "node:path";

const {dirName} = getPathData(import.meta.url)
const outputPath = join(dirName, filesDirectory, 'fileToCompress.txt')
const inputPath = join(dirName, filesDirectory, 'archive.gz')

const decompress = async () => {
    try {
        const gzip = createGunzip();
        const source = createReadStream(inputPath)
        const destination = createWriteStream(outputPath);
        await pipeline(source, gzip, destination);
    } catch (error) {
        throwError({message: ERROR_MESSAGES.FAIL_TO_DECOMPRESS, cause: error})
    }
};

await decompress();
