import {readFile, rename, writeFile} from 'node:fs/promises'
import {cwd} from 'node:process';
import {dirname, join} from 'node:path';

import {ERROR_MESSAGES} from "../constants.js";
import {logSuccess, parsePath, throwError} from "../utils.js";

/**Read file and print it's content in console (should be done using Readable stream)**/
export const cat = async (args) => {
    if (!args[0]) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
    const readPath = parsePath(args[0]);
    await readFile(readPath, {encoding: 'utf-8'})
        .then(logSuccess,
            (error) => throwError({
                message: ERROR_MESSAGES.FS_OPERATION_FAILED,
                cause: error
            }))
}

/**Create empty file in current working directory**/
export const add = async (args) => {
    if (!args[0]) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
    await writeFile(join(cwd(), args[0]), {flag: 'wx'});
}

/**Create new directory in current working directory**/
export const mkdir = async (args) => {
    if (!args[0]) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
    await mkdir(join(cwd(), args[0]));
}

/** Rename file (content should remain unchanged)**/
export const rn = () => async (args) => {
    if (args.length < 2) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
    const oldPath = parsePath(args[0]);
    const dir = dirname(oldPath);
    await rename(oldPath, join(dir, args[1]));
}

/**Copy file (should be done using Readable and Writable streams)**/
export const cp = () => {
}

/**Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams)**/
export const mv = async (args) => {
    await cp(args);
    await rm(parsePath(args[0]));
}

/**Delete file **/
export const rm = async (args) => {
    if (!args[0]) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
    await rm(parsePath(args[0]));
}