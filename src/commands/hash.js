import {createHash} from "node:crypto";
import {createReadStream} from 'node:fs'
import {logSuccess, parsePath, validateArgs} from "../utils.js";

export const hash = async (args) => {
    validateArgs(args)
    const hashPath = parsePath(args[0]);
    const hash = createHash('sha256');
    const stream = createReadStream(hashPath);

    for await (const chunk of stream) {
        hash.update(chunk);
    }

    logSuccess(`SHA256 hash: ${hash.digest('hex')}`);
}