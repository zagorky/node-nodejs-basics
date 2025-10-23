import {Transform} from "node:stream";
import {throwError} from "../utils.js";
import {ERROR_MESSAGES} from "../constants.js";

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        this.push(String(chunk).split('').reverse().join(''));
        callback();
    }
})

const transform = async () => {
    process.stdin
        .pipe(transformStream)
        .pipe(process.stdout)
        .on('error', (error) => throwError({
            message: ERROR_MESSAGES.STREAM_OPERATION_FAILED,
            cause: error
        }))

};

await transform();
