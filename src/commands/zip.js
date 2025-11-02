import {parseSrcDestPaths, throwIfFilesDontExist, validateArgs} from "../utils.js";
import {createReadStream, createWriteStream,} from 'node:fs';
import {createBrotliCompress, createBrotliDecompress} from 'node:zlib';
import {pipeline} from 'node:stream/promises';

export const compress = async (args) => {
    validateArgs(args, 2)
    const {src, dest} = parseSrcDestPaths(args)
    await throwIfFilesDontExist({src, dest, args});
    await pipeline(
        createReadStream(src),
        createBrotliCompress(),
        createWriteStream(dest),
    );

}


export const decompress = async (args) => {
    validateArgs(args, 2)
    const {src, dest} = parseSrcDestPaths(args)
    await throwIfFilesDontExist({src, dest, args});
    await pipeline(
        createReadStream(src),
        createBrotliDecompress(),
        createWriteStream(dest));
}