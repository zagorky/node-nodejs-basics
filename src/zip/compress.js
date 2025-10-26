import {createReadStream, createWriteStream,} from 'node:fs';
import {createGzip} from 'node:zlib';
import {pipeline} from 'node:stream/promises';
import {getPathData, throwError} from "../utils.js";
import {join} from "node:path";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";

const {dirName} = getPathData(import.meta.url)
const inputPath = join(dirName, filesDirectory, 'fileToCompress.txt')
const outputPath = join(dirName, filesDirectory, 'archive.gz')

const compress = async () => {
    try {
        const gzip = createGzip();
        const source = createReadStream(inputPath)
        const destination = createWriteStream(outputPath);
        await pipeline(source, gzip, destination);
    } catch (error) {
        throwError({message: ERROR_MESSAGES.FAIL_TO_COMPRESS, cause: error})
    }
};

await compress();
