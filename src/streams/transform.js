import {Transform} from "node:stream";
import {throwError} from "../utils.js";
import {ERROR_MESSAGES} from "../constants.js";
import {pipeline} from "node:stream/promises";

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        this.push(String(chunk).split('').reverse().join(''));
        callback();
    }
})

const transform = async () => {
    await pipeline(
        process.stdin,
        transformStream,
        process.stdout
    ).catch((error) => throwError({
        message: ERROR_MESSAGES.STREAM_OPERATION_FAILED,
        cause: error
    }));

};

await transform();
