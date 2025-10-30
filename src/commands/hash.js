import {createHash} from "node:crypto";
import {createReadStream} from 'node:fs'
import {ERROR_MESSAGES} from "../constants.js";
import {logSuccess, parsePath, throwError} from "../utils.js";

/**Calculate hash for file and print it into console**/
export const hash = async (args) => {
    if (!args[0]) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }

    try {
        const hashPath = parsePath(args[0]);
        const hash = createHash('sha256');
        const stream = createReadStream(hashPath);

        for await (const chunk of stream) {
            hash.update(chunk);
        }

        logSuccess(`SHA256 hash: ${hash.digest('hex')}`);
    } catch (error) {
        throwError({
            message: ERROR_MESSAGES.HASH_CALCULATION_FAILED,
            cause: error
        });
    }

}