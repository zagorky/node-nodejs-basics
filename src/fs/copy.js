import {join} from 'node:path';
import {getPathData, throwError} from "../utils.js";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";
import {cp} from "node:fs/promises";

const {dirName} = getPathData(import.meta.url)
const filesFolderPath = join(dirName, filesDirectory)
const copyFilesFolderPath = join(dirName, 'files_copy')

const copy = async () => {
    cp(filesFolderPath, copyFilesFolderPath, {
        recursive: true,
        errorOnExist: true,
        force: false
    }).catch((error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error,
    }))
};

await copy();

