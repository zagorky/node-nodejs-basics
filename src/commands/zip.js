import {parsePath, validateArgs} from "../utils.js";
import {createReadStream, createWriteStream,} from 'node:fs';
import {createBrotliCompress, createBrotliDecompress} from 'node:zlib';
import {pipeline} from 'node:stream/promises';

/** Compress file (using Brotli algorithm, should be done using Streams API)**/
export const compress = async (args) => {
    validateArgs(args, 2)
    const srcFile = parsePath(args[0]);
    const destFile = parsePath(args[1]);
    await pipeline(
        createReadStream(srcFile),
        createBrotliCompress(),
        createWriteStream(destFile),
    );

}


/** Decompress file (using Brotli algorithm, should be done using Streams API)**/
export const decompress = async (args) => {
    validateArgs(args, 2)
    const srcFile = parsePath(args[0]);
    const destFile = parsePath(args[1]);
    await pipeline(
        createReadStream(srcFile),
        createBrotliDecompress(),
        createWriteStream(destFile));
}