import {getPathData, logger, throwError} from "../utils.js";
import {join} from "node:path";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";
import {createHash} from "node:crypto";
import {createReadStream} from 'node:fs'

const {dirName} = getPathData(import.meta.url)
const fileToCalculatePath = join(dirName, filesDirectory, 'fileToCalculateHashFor.txt')
const calculateHash = async () => {
    try {
        const hash = createHash('sha256');
        const stream = createReadStream(fileToCalculatePath);

        for await (const chunk of stream) {
            hash.update(chunk);
        }

        logger({message: `SHA256 hash: ${hash.digest('hex')}`});
    } catch (error) {
        throwError({
            message: ERROR_MESSAGES.HASH_CALCULATION_FAILED,
            cause: error
        });
    }
};

await calculateHash();
